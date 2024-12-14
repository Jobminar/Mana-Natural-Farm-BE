import Subscribe from '../user-subscribe/user.subscribe.model.js'
import nodemailer from 'nodemailer'

const transporter=nodemailer.createTransport({
    service:'email',
    auth:{
        user:process.env.EMAIL,
        pass:process.env.EMAIL_PASSWORD
    }
})

const createSubscription=async(req,res)=>{
  try{
     console.log(req.body, ': reqbody');
    const {email} =req.body

   if(!email){
    return res.status(400).json({message:"Email field is missing !"})
   }

   const existingUser=await Subscribe.findOne({email})
   if(existingUser){
    return res.status(400).json({message:"Email already subscribed"})
   }
   const subscribe=new Subscribe({email})
   await subscribe.save()
   res.status(201).json({message:"user subscribe successfully"})
}
catch(error){
    res.status(500).json({error:"Failed to create subscription",err:error.message})
}
}

const getAllSubscribers=async(req,res) => {
    try{
     const subscribe=await Subscribe.find()
     if(subscribe.length===0){
        return res.status(400).json({message:"users not found in database!"})
     }
     res.status(200).json(subscribe)
    }
    catch(error){
        res.status(500).json({error:"Failed to get subscribes",err:error.message})
    }
}

const sendNotificationToAllSubscribers=async(req,res) => {
    try{
      const {title,subject}=req.body
      if(!title || !subject){
        return res.status(400).json({message:"title and subject field is missing !"})
      }
      const subscribers=await Subscribe.find()
      const emailList=subscribers.map(sub=>sub.email)

      console.log(emailList,'emaillll')

      if (emailList.length === 0) {
        return res.status(400).json({ message: "No subscribers to notify." });
      }

      const mailOptions = {
        from: process.env.EMAIL,
        to: emailList.join(', '), // Join all emails into a comma-separated list
        subject: subject,
        text: title, // You can also use HTML if needed
      };
      await transporter.sendMail(mailOptions);
      res.status(200).json({ message: "Notifications sent successfully!" });
    }
    catch(error){
        res.status(500).json({error:"Failed to sent notification",err:error.message})
    }
}


export default {createSubscription,getAllSubscribers,sendNotificationToAllSubscribers}