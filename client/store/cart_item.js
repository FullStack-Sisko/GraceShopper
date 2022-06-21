import axios from 'axios'

//ACTION TYPES

const GOT_ALL_CART_ITEMS = 'GOT_ALL_CART_ITEMS';

const CREATED_CART_ITEM = 'CREATED_CART_ITEM'

const DELETED_CART_ITEM = 'DELETED_CART_ITEM'

const PURCHASED_CART = 'PURCHASED_CART'

const INCREMENTED_CART_ITEM_QTY = 'INCREMENTED_CART_ITEM_QTY'

const DECREMENTED_CART_ITEM_QTY = 'INCREMENTED_CART_ITEM_QTY'

const SAVED_FOR_LATER = 'SAVED_FOR_LATER'

const MOVED_SAVED_TO_CART = 'MOVED_SAVED_TO_CART'

const CREATED_LATER_CART_ITEM = 'CREATED_LATER_CART_ITEM'


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

const purchasedCart = (cart_items) => ({
  type: PURCHASED_CART, cart_items
})

const incrementedCartItemQty = (cart_item) => ({
  type: INCREMENTED_CART_ITEM_QTY, cart_item
})

const decrementedCartItemQty = (cart_item) => ({
  type: DECREMENTED_CART_ITEM_QTY, cart_item
})

const savedForLater = (cart_item) => ({
  type: SAVED_FOR_LATER,
  cart_item
})

const movedSavedToCart = (cart_item) => ({
  type: MOVED_SAVED_TO_CART, cart_item
})

const createdLaterCartItem = (cart_item) => ({
  type: CREATED_LATER_CART_ITEM, cart_item
})

//THUNKS

export const getAllCartItems = (userId) => async (dispatch) => {
  const token = window.localStorage.getItem('token')
  if (token) {
    const { data: cart_items } = await axios.get(`/api/cart_items/${userId}`, {
      headers: {
        authorization: token
      }
    })
    return dispatch(gotAllCartItems(cart_items))
  }
}

export const createCartItem = (plantId, userId, history) => {
  return async (dispatch) => {
    const { data: cart_item } = axios.post(`/api/cart_items/${userId}/${plantId}`);
    dispatch(createdCartItem(cart_item));
    // history.push(`/cart/${userId}`)
  }
}

export const deleteCartItem = (cart_itemId, history, userId) => {
  return async (dispatch) => {
    const { data: cart_item } = await axios.delete(`/api/cart_items/${cart_itemId}`);
    dispatch(deletedCartItem(cart_item))
    // history.push(`/cart/${userId}`)

  }
}

export const incrementCartItemQty = (cart_itemId, history, userId) => {
  return async (dispatch) => {
    const { data: cart_item } = await axios.put(`/api/cart_items/inc/${cart_itemId}`);
    dispatch(incrementedCartItemQty(cart_item))
    // history.push(`/cart/${userId}`)
  }
}

export const decrementCartItemQty = (cart_itemId, history, userId) => {
  return async (dispatch) => {
    const { data: cart_item } = await axios.put(`/api/cart_items/dec/${cart_itemId}`);
    dispatch(decrementedCartItemQty(cart_item))
    // history.push(`/cart/${userId}`)
  }
}

export const purchaseCart = (userId, history) => {
  return async (dispatch) => {
    const { data: cart_items } = await axios.put(`/api/cart_items/purchase/${userId}`);
    dispatch(purchasedCart(cart_items));
    // history.push(`/cart/${userId}`)
  }
}

export const saveForLater = (cart_itemId, history, userId) => {
  return async (dispatch) => {
    const { data: cart_item } = await axios.put(`/api/cart_items/later/${cart_itemId}`);
    dispatch(savedForLater(cart_item));
    // history.push(`/cart/${userId}`)
  }
}

export const moveSavedToCart = (cart_itemId, history, userId) => {
  return async (dispatch) => {
    const { data: cart_item } = await axios.put(`/api/cart_items/saved/${cart_itemId}`);
    dispatch(movedSavedToCart(cart_item));
    // history.push(`/cart/${userId}`)
  }
}

export const createLaterCartItem = (plantId, userId, history) => {
  return async (dispatch) => {
    const { data: cart_item } = axios.post(`/api/cart_items/later/${userId}/${plantId}`);
    dispatch(createdLaterCartItem(cart_item));
    // history.push(`/cart/${userId}`)
  }
}


// export const decrementCartItemQty = (cart_itemId) => {
//   return async (dispatch) => {
//     const { data } = await axios.put(`/cart_items/inc/${cart_itemId}`);
//     dispatch(decrementedCartItemQty(cart_itemId))
//   }
// }

//REDUCER

const cartItemsReducer = (state = [], action) => {
  switch (action.type) {
    case GOT_ALL_CART_ITEMS:
      return action.cart_items;
    case CREATED_CART_ITEM:
      return [...state, action.cart_item];
    case DELETED_CART_ITEM:
      return state.filter((cart_item) => cart_item.id !== action.cart_item.id);
    case PURCHASED_CART:
      return action.cart_items
    case INCREMENTED_CART_ITEM_QTY:
      return action.cart_item;
    case DECREMENTED_CART_ITEM_QTY:
      return action.cart_item;
    case SAVED_FOR_LATER:
      return action.cart_item;
    case MOVED_SAVED_TO_CART:
      return action.cart_item
    case CREATED_LATER_CART_ITEM:
      return [...state, action.cart_item]

    default:
      return state;
  }
}


export default cartItemsReducer

