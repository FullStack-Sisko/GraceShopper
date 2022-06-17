const router = require('express').Router()
const { models: { User, Order, Plant, Cart_Item } } = require('../db')


// display cart (all cart_items belonging to :userId)
router.get('/:userId', async (req, res, next) => {
  let cart_items
  try {
    cart_items = await Cart_Item.findAll({
      where: {
        userId: req.params.userId
      },
      include: [User, Plant]
    });
  }
  catch (err) {
    next(err);
  }
  res.json(cart_items);
})

//create new cart_item (need userId and plantId)
router.post('/:userId/:plantId', async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.userId)

    const plant = await Plant.findByPk(req.params.plantId)

    const cart_item = await Cart_Item.create({ userId: user.id, plantId: plant.id })

    res.status(201).send(cart_item);
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

// increment quantity of item in cart
router.put('/inc/:cart_itemId', async (req, res, next) => {
  try {

    const cart_item = await Cart_Item.findByPk(req.params.cart_itemId)

    res.send(await cart_item.increment('quantity')
    )
  } catch (error) {
    next(error)
  }
})

// decrement quantity of item in cart
router.put('/dec/:cart_itemId', async (req, res, next) => {
  try {

    const cart_item = await Cart_Item.findByPk(req.params.cart_itemId)

    res.send(await cart_item.decrement('quantity')
    )
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


module.exports = router