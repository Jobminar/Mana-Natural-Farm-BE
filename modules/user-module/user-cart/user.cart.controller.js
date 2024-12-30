import Cart from '../user-cart/user.cart.model.js';

const createCart = async (req, res) => {
  try {
    const { userId, items } = req.body;

    if (!userId || !items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: 'Missing required fields or items array is empty' });
    }

    const cart = await Cart.findOneAndUpdate(
      { userId },
      {
        $setOnInsert: { userId },
        $push: { items: { $each: items } }, 
      },
      { new: true, upsert: true }
    );

    res.status(201).json({ message: 'Items successfully added to cart', cart });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error', err: error.message });
  }
};

const getCartItemByUserId = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({ message: 'User ID is required' });
    }

    const cart = await Cart.findOne({ userId });
    if (!cart || cart.items.length === 0) {
      return res.status(404).json({ message: 'No cart items found for this user' });
    }

    res.status(200).json({ cartItems: cart.items });
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve cart data', err: error.message });
  }
};


const deleteCartItems = async (req, res) => {
  try {
    const { userId, id } = req.params;

    const cart = await Cart.findOneAndUpdate(
      { userId },
      { $pull: { items: { _id: id } } },
      { new: true }
    );

    if (!cart || cart.items.length === 0) {
      return res.status(404).json({ message: 'Cart or item not found' });
    }

    res.status(200).json({ message: 'Item removed from cart', cartItems: cart.items });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete cart item', err: error.message });
  }
};

// Delete all items from the cart
const deleteAllCartItems = async (req, res) => {
  try {
    const { userId } = req.params;

    const cart = await Cart.findOneAndDelete({ userId });
    if (!cart) {
      return res.status(404).json({ message: 'No cart found for this user' });
    }

    res.status(200).json({ message: 'All items removed from cart', cart });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete all cart items', err: error.message });
  }
};

export default { createCart, getCartItemByUserId, deleteCartItems, deleteAllCartItems };
