const mongoose=require('mongoose')


const UserShema= new mongoose.Schema({
       name:{
        type:String,
        trim:true
       },
      User_name:{
        type:String,
        trim:true
       },
       user_id:{
        type:String,
        trim:true
       },
       email:{
        type:String,
        trim:true,
        unique:true
       },
       password:{
        type:String,
        trim:true
       },
       gender:{
        type:String,
        enum:["Male","Female","Other"]
        
       },
       mobile:{
        type:Number,
        trim:true
       },
       profile_status:{
        type:String,
        trim:true,
        enum:['public','private']
       },


},{timestamps:true})


module.exports=mongoose.model('User',UserShema)