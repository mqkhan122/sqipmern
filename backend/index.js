let express = require('express')
let app = express()
let web = require('./router/routes')
let mongoose = require('mongoose')
let cors = require('cors')
const { createDefaultAdmin } = require('./controllers/adminController');


app.use(express.json())
app.use(express.urlencoded())

app.use(cors())


mongoose.connect('mongodb://127.0.0.1:27017/airbnb').then(()=>console.log("Connected database"))
createDefaultAdmin()
app.use('/api',web)

app.listen(3333,()=>{console.log("working on 3333")})