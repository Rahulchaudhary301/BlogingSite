const express=require('express')
const Router=express.Router()
const UserRegistration=require('../controller/userController')
const post=require('../controller/postController')
const middlieWhere=require('../middleWhaere/middleWhere')
const multer=require('multer')


let upload = multer({
  // storage: multer.memoryStorage(),
  limits: {
      fileSize: 1024 * 1024 * 5,
  },
  fileFilter: function (req, file, done) {
      if (
          file.mimetype === "image/jpeg" ||
          file.mimetype === "image/png" ||
          file.mimetype === "image/jpg"
      ) {
          done(null, true);
      } else {
          //prevent the upload
          var newError = new Error("File type is incorrect");
          newError.name = "MulterError";
          done(newError, false);
      }
  },
});





// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, './upload')
//     },
//     filename: function (req, file, cb) {
      
//       cb(null, file.fieldname + '-' + file.originalname)
//     }
//   })

  // const upload = multer({ storage: storage })





// const upload = multer({
//     storage: storage,
//     limits: { fileSize: 5000000 } // set the maximum file size to 5MB
//   })





Router.get('/ass' ,(req,res)=>res.send({smg:'Rahul AVi Jinda'}))

Router.post('/createUser',UserRegistration.UserRegistration)

Router.post('/loginUser',UserRegistration.UserLogin)



Router.post('/postCreate', upload.single('image'), post.UserPosts)



Router.get('/getpost',post.GetPost)

Router.get('/getAllPost',post.GetAllPost)

Router.post('/like',post.Postlike)

Router.post('/UnLike',post.UnLikePost)

Router.delete('/deletPost',middlieWhere.authenticate,middlieWhere.authorize, post.Delete_post)









module.exports=Router