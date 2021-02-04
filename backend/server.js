const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();


app.get('/api',(req,res)=>{
    res.send('hello')
})

const db = require('./config/keys.js').MongoURI
mongoose.connect(db,{useNewUrlParser:true,useUnifiedTopology: true,useCreateIndex:true})
.then(()=>console.log('database connected')).catch((err)=>console.log(err))

app.use(express.json())
app.use(cors())

const userRouter = require('./routes/users.js')
const catRouter = require('./routes/categories.js')
const uploaditemRouter = require('./routes/uploaditem.js')


app.use('/api',userRouter)
app.use('/api',catRouter)
app.use('/api',uploaditemRouter)
// app.use()


app.listen(4000,()=>console.log('server listening on 4000'))