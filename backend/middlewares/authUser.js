import jwt from "jsonwebtoken"

//user authentication

const authUser=async(req,res,next)=>{
    try{
         const {token}=req.headers
         console.log("Token received:", token);
         console.log("JWT_SECRET:", process.env.JWT_SECRET);
         

         if(!token){
            return res.json({success:false,message:"Not authorized"})
         }
         const token_decode=jwt.verify(token,process.env.JWT_SECRET)
         
         req.body.userId = token_decode.id
         next();
    }catch(error){
        console.log(error)
        res.json({success:false,message:error.message})
    }
}
export default authUser