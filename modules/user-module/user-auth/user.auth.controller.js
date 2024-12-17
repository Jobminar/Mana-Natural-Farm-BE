import User from '../user-auth/user.auth.model.js'

const generateOtp=()=>{
    return Math.floor(1000 * Math.random() +9000)
}

const sendOtp=async(req,res) => {
    try{
      const {mobile}=req.body
      if(!mobile){
        return res.status(400).json({message:"Required mobile not found !"})
      }
    let user=await User.findOne({mobile})
    if(!user){
       user=new User({mobile})
       await user.save()
    }
    const otp=generateOtp()
    user.otp=otp
    user.otpCreatedAt=new Date()
    await user.save()
    res.status(200).json({ message: "OTP sent to mobile", otp})
    }
    
    catch(error){
        res.status(500).json({error:"Failed to send otp",err:error.message})
    }
}

const verifyOtp = async (req, res) => {
  try {
    const { mobile, otp } = req.body;

    if (!mobile || !otp) {
      return res.status(400).json({ success: false, message: "Mobile number and OTP are required!" });
    }

    const user = await User.findOne({ mobile });

    if (!user || user.otp !== parseInt(otp, 10)) {
      return res.status(400).json({ success: false, message: "Invalid mobile number or OTP!" });
    }

    const currentTime = new Date();
    const otpCreatedAt = user.otpCreatedAt;

    if (currentTime - otpCreatedAt > 5 * 60 * 1000) {
      return res.status(400).json({ success: false, message: "OTP has expired!" });
    }

    // Clear OTP and mark user as verified
    user.otp = null;
    user.otpCreatedAt = null;
    await user.save();

    res.status(200).json({
      success: true,
      message: "OTP verified successfully.",
      userId: user._id,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error.", error: error.message });
  }
};

const getByUserId=async(req,res) => {

  try{
    const {id}=req.params
    
    const user=await User.findById(id)

    if(!user){
      return res.status(400).json({message:"User not found !"})
    }
    res.status(200).json(user)
  }
  catch(error){
    res.status(500).json({error:"Failed to get user details",err:error.message})
  }
}
const getAllUsers=async(req,res) => {
  try{
   const users=await User.find()
   if(!users){
    return res.status(400).json({message:"users not found !"})
   }
   res.status(200).json(users)
  }
  catch(error){
    res.status(500).json({error:"Failed to get data !"})
  }
}
export default {sendOtp,verifyOtp,getByUserId,getAllUsers}