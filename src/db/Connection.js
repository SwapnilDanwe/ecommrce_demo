import { MongoClient } from 'mongodb';

// Create a new MongoClient
const client = new MongoClient(process.env.MONGODB_URI);
export default client.db("ecommerce");