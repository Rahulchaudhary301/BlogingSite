const jwt=require('jsonwebtoken')

const user=require('../Model/UserModel')
const PostModel=require('../Model/postModel')


//________________________________________Authentication_______________________________________________________________

const authenticate = (req, res, next) => {
    try{
          let token = req.body.token || req.headers.token

          if (!token) return res.status(400).send({ status: false, msg: "token must be present" });

          jwt.verify(token, "RahulBloging", function (err, decode) {
          if (err) { return res.status(401).send({ status: false, msg: "Authentication failed" }) }
          req.decode = decode;
          return  next();
         
      })

    }
          catch (error) {
          res.status(500).send({ staus: false, msg: error.message });
    }
}


//______________________________________________Authorization______________________________________________________________

const authorize= async function ( req, res, next) {
    try{
          let userId= req.params.userId || req.headers.userid
         // console.log(req.decode)
         // console.log(userId)

          let gettingUserId= await PostModel.findOne({_id:userId})


          if(!gettingUserId) return res.status(400).send({ status: false, msg: "Post Id Is not correct " });

          let UserId= gettingUserId.userID.toString()
          
          if (UserId  == req.decode.userId || req.body.userId  == req.decode.userId  ) return next();
          else return res.status(403).send({ status: false, msg: "you are not authorised to Delete Other Post" });

    }
          catch(error){
          return res.status(500).send({msg: error.message})
    }
  }






module.exports={authenticate ,authorize}