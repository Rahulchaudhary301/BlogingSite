const postModel = require('../Model/postModel')
const { isValidRequestBody } = require('../util/util')
const multer = require('multer')







const UserPosts = async (req, res) => {

    try {
        const Data = req.body
        console.log("rahul Rahul Chaudhary")
       // const userID = req.params.userId || req.body.userID
        const {userID, title, description, Post_status ,like } = Data
           
         if(!title && !description && !Post_status) return res.status(400).send({ status: false, msg: "All field is Require" })
          
        const image = new postModel({

             userID: userID,
             title: title,
             description: description,
             Post_status: Post_status,
             imageUrl:req.file.path,
             like:like,
             likeData:[]

           
        })

        console.log(req.file.path)

        const data = await image.save()

        res.status(200).send({ status: true, msg: "image Upload Succesfully" })
    }
    catch (err) {
        res.status(500).send({ status: false, msg: err.message })
    }




}


const GetPost = async (req, res) => {

    try {
        const x=req.headers.postid
        
        const data = await postModel.find({ $and:[{userID:x},{isDeleted: false}] }).sort({_id:-1})

        res.status(200).send({ status: true, data: data })
    }
    catch (err) {
        res.status(500).send({ status: false, msg: err.message })
    }

}













const GetAllPost = async (req, res) => {

    try {
       
       // const x=req.headers.userid
        const data = await postModel.find({$and:[{isDeleted: false},{Post_status:"Public"}]}).sort({_id:-1})

        res.status(200).send({ status: true, data: data })
    }
    catch (err) {
        res.status(500).send({ status: false, msg: err.message })
    }

}





const Delete_post = async (req, res) => {

    try {


        
        const postId=req.params.postId || req.headers.userid

        

        const isId= await postModel.findOne({_id:postId})
        
        if(isId== null) return res.status(404).send({status:false, msg:" Post is not correct "})
    
       
        let Postdata = await postModel.find({_id:postId , isDeleted:false})

        if(Postdata.length==0) return res.status(404).send({status:false, msg:"your request is not correct, Post is already deleted"})

        let t1=Date.now()

        let updateBooksData= await postModel.findOneAndUpdate({_id:postId},{$set:{isDeleted:true,deletedAt:t1}},{new:true}) 

        res.status(200).send({status:true, msg:"deleted successfully"})


    }
    catch (err) {
        res.status(500).send({ status: false, msg: err.message })
    }




}


const Postlike = async (req, res) => {

    try {
        const userId=req.body. headers.UserId
        const postId=req.body. headers.PostId
       
        if(userId==null) return   res.status(404).send({status:false, msg:" Please Login First"})
        
        const isPost= await postModel.findOne({_id:postId})

        const isUser=isPost.likeData
        
        if(isUser.includes(userId)) return  res.status(404).send({status:false, msg:" You already Like This Post"})
        
        const data = await postModel.findByIdAndUpdate({_id:postId },{$push:{likeData:userId},$inc:{like:1}})
        
      //  res.status(200).send({ status: true, msg:"Like is done" })
    }
    catch (err) {
        res.status(500).send({ status: false, msg: err.message })
    }

}



const UnLikePost = async (req, res) => {

    try {
        const userId=req.body. headers.UserId
        const postId=req.body. headers.PostId
       
        if(userId==null) return   res.status(404).send({status:false, msg:" Please Login First"})
        
        const isPost= await postModel.findOne({_id:postId})

        const isUser=isPost.likeData
        
        if(!isUser.includes(userId)) return  res.status(404).send({status:false, msg:" You alredy unLike Theis Post"})
        
        const data = await postModel.findByIdAndUpdate({_id:postId },{$pull:{likeData:userId},$inc:{like:-1}})
        
      //  res.status(200).send({ status: true, msg:" UnLikePost" })
    }
    catch (err) {
        res.status(500).send({ status: false, msg: err.message })
    }

}









module.exports = { UserPosts, GetPost , Delete_post, GetAllPost,Postlike,UnLikePost}