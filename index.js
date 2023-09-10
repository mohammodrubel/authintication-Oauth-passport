const express = require('express');
const mongoose = require('mongoose')
const app = express()
const cors = require('cors')
require('dotenv').config()
// const MongoDbConnection = process.env.DATABASE_ACCESS
const port = process.env.PORT || 9000

// router 
const registerRouter = require('./Router/registerRouter')

app.use(cors())
app.use(express.json())
// connect 
mongoose.connect(process.env.DATABASE_ACCESS) 
.then(()=>{
    console.log('mongodb is connected...')
})
.catch((error)=>{
    console.log(error)
    process.exit(1)
})

app.get('/', (req, res) => {res.send('Authintication')})
app.use('/users',registerRouter)


app.use((req,res,next)=>{
    res.status(404).json({
        message:'Route Not Found'
    })
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})