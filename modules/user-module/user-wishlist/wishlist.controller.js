import Wishlist from "./wishlist.model.js";
const createWishlist = async (req, res) => {
    try {
      const { userId, productName, productImage, productSubTitle, productDescription } = req.body;
  
      // Validate required fields
      if (!userId || !productName || !productImage || !productSubTitle) {
        return res.status(400).json({ message: "All required fields must be provided." });
      }
  
      // Create a new wishlist entry
      const newWishlistItem = new Wishlist({
        userId,
        productName,
        productImage,
        productSubTitle,
        productDescription,
      });
  
      // Save the item to the database
      await newWishlistItem.save();
  
      res.status(201).json({ message: "Wishlist item added successfully.", wishlist: newWishlistItem });
    } catch (error) {
      res.status(500).json({ error: "Internal server error", err: error.message });
    }
  };

  const getWishlist = async (req, res) => {
    try {
      const { userId } = req.params;
  
      // Fetch wishlist items for the user
      const wishlist = await Wishlist.find({ userId });
  
      if (!wishlist.length) {
        return res.status(404).json({ message: "No wishlist items found for this user." });
      }
  
      res.status(200).json(wishlist);
    } catch (error) {
      res.status(500).json({ error: "Internal server error", err: error.message });
    }
  };
  const deleteWishlist = async (req, res) => {
    try {
      const { id } = req.params;
  
      // Find and delete the wishlist item
      const deletedItem = await Wishlist.findByIdAndDelete(id);
  
      if (!deletedItem) {
        return res.status(404).json({ message: "Wishlist item not found." });
      }
  
      res.status(200).json({ message: "Wishlist item deleted successfully.", deletedItem });
    } catch (error) {
      res.status(500).json({ error: "Internal server error", err: error.message });
    }
  };
    
  
  export default { createWishlist,getWishlist,deleteWishlist };
  