import express from 'express'
import ROOMCONTROLLER from '../controller/room.js'
let route = express.Router()

route.post("/createroom",ROOMCONTROLLER.createroom)
route.get("/getrooms",ROOMCONTROLLER.roomdetails)
route.post ("/bookroom",ROOMCONTROLLER.bookRoom)
route.get("/getcustomers",ROOMCONTROLLER.custDetails)
route.get("/getcusthistory",ROOMCONTROLLER.custRoomDetails)


export default route