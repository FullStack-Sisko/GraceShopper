import axios from 'axios'

//ACTION TYPES

const GOT_ALL_CART_ITEMS = 'GOT_ALL_CART_ITEMS';

const CREATED_CART_ITEM = 'CREATED_CART_ITEM'

const DELETED_CART_ITEM = 'DELETED_CART_ITEM'

const PURCHASED_CART = 'PURCHASED_CART'

const INCREMENTED_CART_ITEM_QTY = 'INCREMENTED_CART_ITEM'

const DECREMENTED_CART_ITEM_QTY = 'DECREMENTED_CART_ITEM'



//ACTION CREATORS

const gotAllCartItems = (cart_items) => ({
  type: GOT_ALL_CART_ITEMS, cart_items
})

const createdCartItem = (cart_item) => ({
  type: CREATED_CART_ITEM, cart_item
})

const deletedCartItem = (cart_item) => ({
  type: DELETED_CART_ITEM, cart_item
})

const purchasedCart = (userId) => ({
  type: PURCHASED_CART, cart_items
})

const incrementedCartItemQty = (cart_item) => ({
  type: INCREMENTED_CART_ITEM_QTY, cart_item
})

const decrementedCartItemQty = (cart_item) => ({
  type: DECREMENTED_CART_ITEM_QTY, cart_item
})

//THUNKS

export const getAllCartItems = (userId) => async (dispatch) => {
  const { data: cart_items } = await axios.get(`/api/cart_items/${userId}`);
  dispatch(gotAllCartItems(cart_items))
}

export const createCartItem = (plantId, userId, Qty) => {
  return async (dispatch) => {
    const { data: cart_item } = axios.create(`/api/cart_items`, plantId, userId, Qty);
    dispatch(createdCartItem(cart_item))
  }
}

export const deleteCartItem = (cart_itemId) => {
  return async (dispatch) => {
    const { data: cart_item } = await axios.delete(`/api/cart_items/${cart_itemId}`);
    dispatch(deletedCartItem(cart_item))
  }
}

export const purchaseCart = (userId) => {
  return async (dispatch) => {
    const { data: cart_items } = await axios.delete(`api/cart_items/purchase/${userId}`);
    dispatch(purchasedCart(cart_items));
    //history.push
  }
}

export const incrementCartItemQty = (cart_itemId) => {
  return async (dispatch) => {
    const { data } = await axios.put(`/cart_items/inc/${cart_itemId}`);
    dispatch(incrementedCartItemQty(cart_itemId))
  }
}

export const decrementCartItemQty = (cart_itemId) => {
  return async (dispatch) => {
    const { data } = await axios.put(`/cart_items/inc/${cart_itemId}`);
    dispatch(decrementedCartItemQty(cart_itemId))
  }
}

//REDUCER

const cartItemsReducer = (state = [], action) => {
  switch (action.type) {
    case GOT_ALL_CART_ITEMS:
      return action.cart_items;
    case CREATED_CART_ITEM:
      return action.cart_item;
    case DELETED_CART_ITEM:
      return state.filter((cart_item) => cart_item.id !== action.cart_item.id);
    case PURCHASED_CART:
      return action.cart_items
    case INCREMENTED_CART_ITEM_QTY:
      return action.cart_item;
    case DECREMENTED_CART_ITEM_QTY:
      return action.cart_item;

    default:
      return state;
  }
}


export default cartItemsReducer

