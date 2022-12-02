import OrderCollection from '../db/OrdersCollection.js';
import moment from 'moment';

class OrderController {
    async create(req, res){
        try {
            const {order_id, item_name, cost, order_date, delivery_date} = req.body

            if (!order_id || !item_name || !cost || !parseFloat(cost) || !order_date || !delivery_date) {
                res.status(500).json({
                    status: false,
                    message: "PROVIDE_VALID_DATA",
                }) 
            }

            const result = await OrderCollection.insertOne({
                order_id: order_id,
                item_name, 
                cost: parseFloat(cost), 
                order_date : moment(order_date, "YYYY-MM-DD").format("YYYY-MM-DD"), 
                delivery_date : moment(delivery_date, "YYYY-MM-DD").format("YYYY-MM-DD")
            });
          
            res.status(200).json({
                status: true,
                message: "ORDER_CREATED",
            })
        } catch (error) {
            console.log(error)
            res.status(500).json({
                status: false,
                message: "SOMETHING_WENT_WRONG",
            }) 
        }
    }
    
    async update(req, res){
        try {
            const {delivery_date} = req.body
            const {order_id} = req.params

            if (!order_id || !delivery_date) {
                res.status(500).json({
                    status: false,
                    message: "PROVIDE_VALID_DATA",
                }) 
            }
            const result = await OrderCollection.updateOne({
                order_id : parseInt(order_id)
            },{
                $set: {
                    delivery_date: moment(delivery_date, "YYYY-MM-DD").format("YYYY-MM-DD")
                }
            });
          
            res.status(200).json({
                status: true,
                message: "ORDER_UPDATED",
            })
        } catch (error) {
            console.log(error)
            res.status(500).json({
                status: false,
                message: "SOMETHING_WENT_WRONG",
            }) 
        }
    }
    
    async delete(req, res){
        try {
            const {order_id} = req.params
            if (!order_id) {
                res.status(500).json({
                    status: false,
                    message: "PROVIDE_VALID_DATA",
                }) 
            }
            const result = await OrderCollection.deleteOne({
                order_id
            });
          
            res.status(200).json({
                status: true,
                message: "ORDER_DELETED",
            })
        } catch (error) {
            console.log(error)
            res.status(500).json({
                status: false,
                message: "SOMETHING_WENT_WRONG",
            }) 
        }
    }
    
    async search(req, res){
        try {
            const {order_id} = req.params
            if (!order_id) {
                res.status(500).json({
                    status: false,
                    message: "PROVIDE_VALID_DATA",
                }) 
            }
            const result = await OrderCollection.findOne({
                order_id: parseInt(order_id),
            });

            res.status(200).json({
                status: true,
                message: "SUCCESS",
                response: result
            })
    
        } catch (error) {
            res.status(500).json({
                status: false,
                message: "SOMETHING_WENT_WRONG",
            }) 
        }
    }

    async list(req, res){
        try {
            const {date} = req.query
            let result;
            if (date) {
                result = await OrderCollection.find({
                    order_date: moment(date, "YYYY-MM-DD").format("YYYY-MM-DD")
                }).toArray()    
            }
            else{
                result = await OrderCollection.find({}).toArray()
            }
          
            res.status(200).json({
                status: true,
                message: "SUCCESS",
                response: result
            })
        } catch (error) {
            console.log(error);
            res.status(500).json({
                status: false,
                message: "SOMETHING_WENT_WRONG",
            }) 
        }
    }
}

export default new OrderController;