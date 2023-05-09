
require('dotenv').config()

const express =require('express')
const cors=require('cors')
const app=express()
const {default:mongoose}=require('mongoose')
const router=require('./route/Router')
const bodyParser=require('body-parser')
const ejs=require('ejs')


// const name=process.env.REACT_APP_PATH
// const password=process.env.REACT_APP_PA


// console.log(name,password)



app.use('/upload',express.static('upload'))
app.use(express.json())
app.use(cors())
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended:true}))
app.set('view engine',ejs);
//app.use(upload.array())
mongoose.connect('mongodb+srv://RahulChaudhary:Rahul321@cluster1.42h1ws9.mongodb.net/Assinment_Blog',{
    useUnifiedTopology: true,
    useNewUrlParser: true
})
.then(()=>console.log('mongoDb connect successfully'))
.catch((err)=>console.log(err.message))


app.use('/',router)

app.listen(process.env.PORT || 8000, ()=>console.log('App is listen on 8000 PORT'))