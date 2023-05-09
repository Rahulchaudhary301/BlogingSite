const mongoose=require('mongoose')
const objectId = mongoose.Schema.Types.ObjectId;

const UserPost= new mongoose.Schema({
      
       title:String,

       description:String,

       userID:{
        type:objectId,
            required:true,
            ref:"User"
       },
       isDeleted:{
        type:Boolean,
            default:false
       },

       like:{
        type:Number,
       },

       likeData:{
        type:Array
       },

       Post_status:{
        type:String,
        enum:['Public','Private']
       },

    //    name:String,
    //    image:{
    //     data:Buffer,
    //     contentType:String
    //    },

    imageUrl:{
        type:String
    }


},{timestamps:true})


module.exports=mongoose.model('UserPost',UserPost)