const UserModel=require('../Model/UserModel')
const {isValidString,isValidPassword,isValidEmail, mobileValidation}=require('../util/util')
const jwt=require('jsonwebtoken')










const UserRegistration= async(req,res)=>{
      
       try{

        const data=req.body;
        const {name,email,password,mobile,profile_status ,User_name}=data

        if( !name && !email && !password && !mobile && !profile_status && !User_name)   return res.status(400).send({status:false,msg:"All field is required"})

        if(!name) return res.status(400).send({status:false,msg:"name is required"})
        if(!User_name) return res.status(400).send({status:false,msg:"User_nmae is required"})
        if(!email) return res.status(400).send({status:false,msg:"email is required"})
        if(!password) return res.status(400).send({status:false,msg:"password is required"})
        if(!mobile) return res.status(400).send({status:false,msg:"mobile is required"})
        if(!profile_status) return res.status(400).send({status:false,msg:"profile_status is required"})

        if (!isValidString(name)) return res.status(400).send({ status: false, msg: "Invalid name" })
        if (!isValidString(User_name)) return res.status(400).send({ status: false, msg: "Invalid User_Name" })
        if (!isValidString(profile_status)) res.status(400).send({ status: false, msg: "Please select either one of them ['public','private']" })
        if (!isValidEmail(email)) return res.status(400).send({ status: false, msg: "Invalid E-MAIlID" })
        if (!isValidPassword(password)) return res.status(400).send({ status: false, msg: "Invalid Password Formate" })
        if(! mobileValidation(mobile)) return res.status(400).send({ status: false, msg: "Invalid Mobile number" })
       
        const num=await UserModel.find()
        data.user_id=( num.length +1)
         
        const exitEmail=await UserModel.findOne({email:email})
        if(exitEmail) return res.status(400).send({status:false , msg:"This email is already exit on Data_Base"})

        const result=await UserModel.create(data)

        res.status(201).send({status:true, msg:result})
        




       }
    catch(err){
        res.status(500).send({status:false, msg:err.message})
    }



}



const UserLogin= async(req,res)=>{
      
    try{
         const data=req.body;

         const {email,password}=data
         if(!email && !password)  return res.status(400).send({status:false,msg:"All field is required"})
     
         if(!email) return res.status(400).send({status:false,msg:"email is required"})
        if(!password) return res.status(400).send({status:false,msg:"password is required"})

        const IsEmail = await UserModel.findOne({email:email})
        if(!IsEmail) return res.status(400).send({status:false,msg:"THis email is not exist on DataBase"})
        if(IsEmail.password !==data.password) return res.status(400).send({status:false,msg:"Wrong PassWord"})

        const token=jwt.sign({userId: IsEmail._id},'RahulBloging')
        res.status(201).send({status:true, token:token ,userId:IsEmail._id})

    }
 catch(err){
     res.status(500).send({status:false, msg:err.message})
 }



}








module.exports={UserRegistration ,UserLogin}