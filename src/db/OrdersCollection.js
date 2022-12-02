import Connection from './Connection.js';

const collection = Connection.collection('orders')
await collection.createIndex({order_id:1},{unique:true})

export default collection;