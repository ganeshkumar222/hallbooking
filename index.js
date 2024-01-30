import express from 'express'
import APPROUTES from "./src/routes/index.js"
const app = express()
const PORT = process.env.PORT || 8000
app.use(express.json())
app.use("/",APPROUTES)

app.listen(PORT,()=>{console.log(`app is listening to ${PORT}`)})