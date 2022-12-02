import express from 'express';
import OrderController from '../controllers/OrderController.js';
const router = express.Router()

router
.put('/create', OrderController.create)
.post('/update/:order_id', OrderController.update)
.get('/list', OrderController.list)
.get('/search/:order_id', OrderController.search)
.delete('/delete/:order_id', OrderController.delete);

export default router;