const router = require('express').Router()
const { models: { Order, User }} = require('../db')
module.exports = router

//POST /orders
router.post("/", async (req, res, next) => {
  try {
    const order = await Order.create(req.body);
    res.send(order);
  } catch (err) {
    next(err);
  }
});

//GET /orders/:orderId
router.get("/:orderId", async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.orderId, {
      include: [
        { model: User, as: 'customer'},
        //include plant model
      ]
    });
    res.send(order);
  } catch (err) {
    next(err);
  }
});
