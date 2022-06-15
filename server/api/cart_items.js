const router = require('express').Router()
const { models: { User, Order, Plant, Cart_Item } } = require('../db')


// display cart (all cart_items belonging to :userId)
router.get('/:userId', async (req, res, next) => {
  let cart
  try {
    cart = await Cart_Item.findAll({
      where: {
        userId: req.params.userId
      },
      include: [User, Plant]
    });
  }
  catch (err) {
    next(err);
  }
  res.json(cart);
})

//create new cart_item (need userId and plantId)
router.post('/', async (req, res, next) => {
  try {
    res.status(201).send(await Cart_Item.create(req.body));
  } catch (error) {
    next(error);
  }
});

//delete cart_item from cart
router.delete('/:cart_itemId', async (req, res, next) => {

  try {
    const cart_item = await Cart_Item.findByPk(req.params.cart_itemId)
    cart_item.destroy()
    res.send(cart_item)
  } catch (error) {
    next(error)
  }
})

//purchase cart and delete items
router.delete('/purchase/:userId', async (req, res, next) => {

  try {
    const cart_items = await Cart_Item.findAll({ where: { userid: req.params.userId } })
    cart_items.destroy()
    res.send(cart_items)
  } catch (error) {
    next(error)
  }
})

// increment quantity of item in cart
router.put('/inc/:cart_itemId', async (req, res, next) => {
  try {
    const cart_item = await Cart_Item.findByPk(req.params.cart_itemId)
    res.send(await cart_item.update({ quantity: quantity + 1 }))
  } catch (error) {
    next(error)
  }
})

// decrement quantity of item in cart
router.put('/dec/:cart_itemId', async (req, res, next) => {
  try {
    const cart_item = await Cart_Item.findByPk(req.params.cart_itemId)
    res.send(await cart_item.update({ quantity: quantity - 1 }))
  } catch (error) {
    next(error)
  }
})


module.exports = router
