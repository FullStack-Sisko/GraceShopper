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


//purchase cart items
router.put('/purchase/:userId', async (req, res, next) => {
  try {
    const cart_items = await Cart_Item.update(
      {
        purchaseStatus: "purchased",
        purchaseDate: new Date(),
        purchasePrice: 100
      },

      {
        where: {
          userId: req.params.userId,
          purchaseStatus: "cart"
        }
      }
    )
    res.send(cart_items)
    // res.send(await cart_items.update({ isPurchased: true }))
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

// save cart item for later
router.put('/later/:cart_itemId', async (req, res, next) => {
  try {
    const cart_item = await Cart_Item.update(
      { purchaseStatus: "later" },
      { where: { id: req.params.cart_itemId } })

    res.send(cart_item)
  } catch (error) {
    next(error)
  }
})

// move saved item into cart
router.put('/saved/:cart_itemId', async (req, res, next) => {
  try {
    const cart_item = await Cart_Item.update(
      { purchaseStatus: "cart" },
      { where: { id: req.params.cart_itemId } })

    res.send(cart_item)
  } catch (error) {
    next(error)
  }
})

//create new cart_item and save it for later
router.post('/later/:userId/:plantId', async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.userId)

    const plant = await Plant.findByPk(req.params.plantId)

    const cart_item = await Cart_Item.create({ userId: user.id, plantId: plant.id, purchaseStatus: "later" })

    res.status(201).send(cart_item);
  } catch (error) {
    next(error);
  }
});

module.exports = router
