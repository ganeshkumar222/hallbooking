import express from 'express'
import IndexController from '../controller/index.js'
import ROOMROUTES from './room.js'
const route = express.Router()
route.get("/",IndexController.homepage)
route.use("/room",ROOMROUTES)

export default route

