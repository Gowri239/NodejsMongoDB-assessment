const express = require('express')
var cors = require('cors')
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const dotenv = require('dotenv')
dotenv.config()

const userRoutes = require('./routes/users')
const resetPasswordRoutes = require('./routes/resetpassword')
const projectRoutes = require('./routes/projects')
const taskRoutes = require('./routes/tasks')

const app = express()
app.use(cors())
app.use(bodyParser.json())

app.use('/user',userRoutes)
app.use('/password',resetPasswordRoutes)
app.use('/project',projectRoutes)
app.use('/task',taskRoutes)

mongoose.connect('mongodb+srv://gowrimopuru:KKkg2329@cluster0.fepeojp.mongodb.net/projects')
.then(()=>{
    app.listen(3000 , ()=>{
        console.log('running')
    })
})
