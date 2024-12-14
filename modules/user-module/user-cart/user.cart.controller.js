import Cart from '../user-cart/user.cart.model.js'

const createCart=async(req,res) =>{
    try{
     const {productName,productImage,productSubTitle,productDescription}=req.body
     
     if(!productName || productImage || !productSubTitle){
        return res.status(400).json({message:'Missing required fields'})
     }
     const cart=new Cart({
        productName,
        productImage,
        productSubTitle,
        productDescription
     })

     await cart.save()
     res.status(201).json({message:'successfully added items in cart',cartItems:cart})

    }
    catch(error){
        res.status(500).json({error:"Internal server error",err:error.message})
    }
}

const getCartItemByUserId=async(req,res) => {
    try{
       const {userId}=req.params
       const cart=await Cart.findOne({userId})
       if(!cart){
        return res.status(400).json({message:"No cart items in this user"})
       }
       res.status(200).json(cart)
    }
    catch(error){
        res.status(500).json({error:"Faield to get cart  data"})
    }
}
export default {createCart,getCartItemByUserId}