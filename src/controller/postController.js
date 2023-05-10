const postModel = require('../Model/postModel')
const { isValidRequestBody } = require('../util/util')
const multer = require('multer')



const AWS=require('@aws-sdk/client-s3')

//const upload=multer({dest:'upload/'})


// const AWS_BUCKET_NAME = 'classroom-training-bucket';
// const AWS_ACCESS_KEY_ID = 'AKIAY3L35MCRZNIRGT6N';
// const AWS_SECRET_ACCESS_KEY = '9f+YFBVcSjZWM6DG9R4TUN8k8TGe4X+lXmO4jPiU';
// const AWS_REGION = 'ap-south-1'; // Update this to the appropriate region for your S3 bucket




// const bucketName = AWS_BUCKET_NAME;

// const awsConfig = {
//     accessKeyId: AWS_ACCESS_KEY_ID,
//     secretAccessKey: AWS_SECRET_ACCESS_KEY,
//     region: AWS_REGION,
// };


// const S3 = new AWS.S3(awsConfig);


// //upload to s3
// const uploadToS3 = (fileData) => {
//     return new Promise((resolve, reject) => {
//         const params = {
//             Bucket: bucketName,
//             Key: `${Date.now().toString()}.jpg`,
//             Body: fileData,
//         };
        
//         S3.upload(params, (err, data) => {
//             if (err) {
//                 console.log(err);
//                 return reject(err);
//             }
//             console.log('file uploaded succesfully');
//             return resolve(data.Location);
//         });
//     });
//   };
  
  

const aws= require("aws-sdk")



const uploadFile= async ( file) =>{
aws.config.update({
    accessKeyId: "AKIAY3L35MCRZNIRGT6N",
    secretAccessKey: "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",
    region: "ap-south-1"
})

   return new Promise( function(resolve, reject) {
    let s3= new aws.S3({apiVersion: '2006-03-01'}); 

    var uploadParams= {
        ACL: "public-read",
        Bucket: "classroom-training-bucket",  
        Key: "abc/" + file.originalname, 
        Body: file.buffer
    }

    s3.upload( uploadParams, function (err, data ){
        if(err) {
            return reject({"error": err})
        }
        console.log("file uploaded succesfully")
        return resolve(data.Location)
    })
   })
}















const UserPosts = async (req, res) => {

    try {
        const Data = req.body
        

       // const userID = req.params.userId || req.body.userID
        const {userID, title, description, Post_status ,like } = Data
           
         if(!title && !description && !Post_status) return res.status(400).send({ status: false, msg: "All field is Require" })
          
       
           
             const url =  await uploadFile(req.file)
                .then((result)=>{
                    
                   return result
                })
                .catch((err)=>{
                    console.log("wrong")
                    console.log(err.message)
                })
            

        const image = new postModel({

             userID: userID,
             title: title,
             description: description,
             Post_status: Post_status,
             imageUrl:url,
             like:like,
             likeData:[]

           
        })


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