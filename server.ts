import 'dotenv/config';
import express from 'express';
import crypto from 'node:crypto';
import { MongoClient } from 'mongodb';
import { GoogleGenAI } from '@google/genai';

const app = express();
const port = Number(process.env.PORT || 4000);
const mongoUri = process.env.MongoDB_URI;
const client = mongoUri ? new MongoClient(mongoUri) : null;

app.use(express.json({ limit: '1mb' }));

const getDatabase = async () => {
  if (!client) throw new Error('MongoDB_URI is not configured');
  await client.connect();
  return client.db('general-store');
};

const hashPassword = (password: string) => crypto.createHash('sha256').update(password).digest('hex');

app.get('/api/health', async (_req, res) => {
  try {
    const db = await getDatabase();
    await db.command({ ping: 1 });
    res.json({ ok: true, database: 'connected' });
  } catch (error) {
    res.status(503).json({ ok: false, error: error instanceof Error ? error.message : 'Database unavailable' });
  }
});

app.post('/api/auth/register', async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;
    if (!name || !email || !phone || !password) return res.status(400).json({ error: 'All registration fields are required' });
    const db = await getDatabase();
    const users = db.collection('users');
    const normalizedEmail = String(email).trim().toLowerCase();
    if (await users.findOne({ email: normalizedEmail })) return res.status(409).json({ error: 'An account with this email already exists' });
    const result = await users.insertOne({ name: String(name).trim(), email: normalizedEmail, phone: String(phone).trim(), passwordHash: hashPassword(String(password)), createdAt: new Date(), role: 'customer' });
    res.status(201).json({ id: result.insertedId.toString(), name, email: normalizedEmail, phone });
  } catch (error) {
    res.status(500).json({ error: error instanceof Error ? error.message : 'Registration failed' });
  }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const db = await getDatabase();
    const user = await db.collection('users').findOne({ email: String(email || '').trim().toLowerCase(), passwordHash: hashPassword(String(password || '')) });
    if (!user) return res.status(401).json({ error: 'Invalid email or password' });
    res.json({ id: user._id.toString(), name: user.name, email: user.email, phone: user.phone, role: user.role });
  } catch (error) {
    res.status(500).json({ error: error instanceof Error ? error.message : 'Login failed' });
  }
});

app.post('/api/orders', async (req, res) => {
  try {
    const db = await getDatabase();
    const order = { ...req.body, createdAt: new Date() };
    const result = await db.collection('orders').insertOne(order);
    res.status(201).json({ ...order, id: result.insertedId.toString() });
  } catch (error) {
    res.status(500).json({ error: error instanceof Error ? error.message : 'Order could not be saved' });
  }
});

app.get('/api/products', async (_req, res) => {
  try {
    const db = await getDatabase();
    res.json(await db.collection('products').find({ isActive: { $ne: false } }).sort({ createdAt: -1 }).toArray());
  } catch (error) {
    res.status(500).json({ error: error instanceof Error ? error.message : 'Products could not be loaded' });
  }
});

app.post('/api/products', async (req, res) => {
  try {
    const db = await getDatabase();
    const product = { ...req.body, createdAt: new Date(), updatedAt: new Date() };
    const result = await db.collection('products').insertOne(product);
    res.status(201).json({ ...product, id: result.insertedId.toString() });
  } catch (error) {
    res.status(500).json({ error: error instanceof Error ? error.message : 'Product could not be saved' });
  }
});

app.put('/api/products/:id', async (req, res) => {
  try {
    const db = await getDatabase();
    const { ObjectId } = await import('mongodb');
    const filter = ObjectId.isValid(req.params.id) ? { _id: new ObjectId(req.params.id) } : { id: req.params.id };
    const update = { ...req.body, updatedAt: new Date() };
    await db.collection('products').updateOne(filter, { $set: update });
    res.json(update);
  } catch (error) {
    res.status(400).json({ error: error instanceof Error ? error.message : 'Product could not be updated' });
  }
});

app.delete('/api/products/:id', async (req, res) => {
  try {
    const db = await getDatabase();
    const { ObjectId } = await import('mongodb');
    const filter = ObjectId.isValid(req.params.id) ? { _id: new ObjectId(req.params.id) } : { id: req.params.id };
    await db.collection('products').deleteOne(filter);
    res.status(204).end();
  } catch (error) {
    res.status(400).json({ error: error instanceof Error ? error.message : 'Product could not be deleted' });
  }
});

app.get('/api/categories', async (_req, res) => {
  try {
    const db = await getDatabase();
    res.json(await db.collection('categories').find({ isActive: { $ne: false } }).sort({ name: 1 }).toArray());
  } catch (error) {
    res.status(500).json({ error: error instanceof Error ? error.message : 'Categories could not be loaded' });
  }
});

app.post('/api/chat', async (req, res) => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === 'MY_GEMINI_API_KEY') return res.status(503).json({ error: 'Chatbot is not configured on the server yet' });
  try {
    const ai = new GoogleGenAI({ apiKey });
    const prompt = `You are the helpful shopping assistant for Imran General Store in Pakistan. Answer in the user's language, including Roman Urdu or Urdu. Know that the store sells groceries, personal care, beauty, household, Garments, Ladies Undergarments, and Gents Undergarments. Keep answers concise and guide users to products, cart, checkout, delivery, COD, WhatsApp support, and account creation. User message: ${String(req.body.message || '')}`;
    const response = await ai.models.generateContent({ model: 'gemini-2.5-flash', contents: prompt });
    res.json({ reply: response.text || 'Main abhi jawab nahi de saka. WhatsApp support se rabta karein.' });
  } catch (error) {
    res.status(500).json({ error: error instanceof Error ? error.message : 'Chatbot request failed' });
  }
});

export default app;

if (!process.env.VERCEL) {
  const server = app.listen(port, () => console.log(`API server listening on http://localhost:${port}`));

  server.on('error', (error: NodeJS.ErrnoException) => {
    if (error.code === 'EADDRINUSE') {
      console.error(`Port ${port} is already in use. The API may already be running at http://localhost:${port}.`);
      process.exit(1);
    }
    throw error;
  });
}
