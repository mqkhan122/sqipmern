let  express = require('express')
let app = express()
let web = require('./router/routes')
let mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/airbnb').then(()=>console.log("Connected database"))
app.use('/api',web)

app.listen(3333,()=>{console.log("working on 3333")})