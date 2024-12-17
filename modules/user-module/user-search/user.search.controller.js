import Search from '../user-search/user.search.model.js'

const createSearch=async(req,res) => {
    try{
     const {userId,title}=req.body
     const search=new Search({
        userId,
        title
     })
     await search.save()
     res.status(201).json({message:"Successfully search data post",search})
    }
    catch(error){
        res.status(500).json({error:"Internal server error",err:error.message})
    }
}
const getAllSearch=async(req,res) =>{
    try{
      const search=await Search.find()
      if(search.length===0){
        return res.status(400).json({message:"search data not found database"})
      }
      res.status(200).json(search)
    }
    catch(error){
        res.status(500).json({error:"Failed to get data",err:error.message})
    }
}

const getByUserIdSearch=async(req,res) =>{
  try{
    const {userId}=req.params

   const search=await Search.find({userId})

   if(!search){
    return res.status(400).json({message:"search not found !"})
   }
   res.status(200).json(search)
  } 
  catch(error){
    res.status(500).json({error:"Failed to get data !"})
  }
}
export default {createSearch,getAllSearch,getByUserIdSearch}