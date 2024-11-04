const express = require('express')
const moviesRouter = require('./Routes/moviesroutes')
const app = express()

app.use(express.json())
app.use('/movies',moviesRouter)

app.get('/',(req,res)=>{
    res.send('Hello world')
})

app.listen(3021,()=>{
    console.log("Server Started..!")

})


