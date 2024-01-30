let room = [
    {
      "id":1,
      "name":"R1",
      "seatsAvailable":50,
      "amenities":["Ac","wifi","Aquafilter"],
      "price":100,
      "bookingStatus":false,
      "bookingdetails":[]
    }
]
let customers = {}

let generateticket = ()=>{
    let a = Math.floor(Math.random()*10)
    let b  =Math.floor(Math.random()*(26-11)+11)
    let c = "abcdefghijklmnopqrstuvwxyz"
    let ticket = c.substring(a,b)
    return ticket
}
const createroom = (req,res)=>{
    try {
        console.log(req.body)
        let id = room.length?room[room.length-1].id+1:1
        // console.log("inside create")
        // console.log(req.body,id)
        req.body.id = id
        req.body.name = `R${id}`
        req.body.bookingStatus = false
        req.body.bookingdetails=[]
        room.push(req.body)
        res.status(200).send({
            message:"room created successfully"
        })
        
    } catch (error) {
        res.status(500).send({
            message:"internal server error"
        })
    }
    
}
const roomdetails = (req,res) =>{
  try {
    res.status(200).send({
        message:"Room details are as follows",
        room
    })
  } catch (error) {
    res.status(500).send({
        message:"internal server error"
    })
  }
}
const bookRoom = (req,res) =>{
    try { 
        let startdate = new Date(req.body.startdate)
        let enddate = new Date(req.body.enddate)
        let takebooking = false
        let bookedstatus = false
        for(let i =0;i<room.length;i++){
           if(req.body.roomID===room[i].roomname)
           {
             if(room[i].bookingStatus===true)
             {
                for(let j=0;j<room[i].bookingdetails.length;j++){
                    console.log(startdate,enddate,new Date(room[i].bookingdetails[j].startdate),new Date(room[i].bookingdetails[j].enddate))
                    if(startdate>=new Date(room[i].bookingdetails[j].startdate) && startdate<= new Date(room[i].bookingdetails[j].enddate)){
                        takebooking = false
                    }
                     if(startdate< new Date(room[i].bookingdetails[j].startdate) && enddate< new Date(room[i].bookingdetails[j].startdate)){
                        takebooking = true
      
                    }
                    else if(startdate>new Date(room[i].bookingdetails[j].startdate) && enddate>new Date(room[i].bookingdetails[j].enddate)){
                        takebooking = true
                    }
                    else{
                        takebooking = false
                    }
                }
                if(takebooking===true){
                    room[i].bookingStatus=true
                    let bookingid = generateticket()
                    req.body.bookingid = bookingid
                    req.body.bookingStatus = "success"
                    room[i].bookingdetails.push(req.body)
                    bookedstatus = true
                }
             }
             else{
                room[i].bookingStatus=true
                let bookingid = generateticket()
                req.body.bookingid = bookingid
                req.body.bookingStatus = "success"
                room[i].bookingdetails.push(req.body)
                bookedstatus = true
                break
             }
                 
           }
           
          
        }
        if(bookedstatus){
            res.status(200).send({
                message:"room booked successfully"
            })
            let cust= {...req.body}
            if(cust.customerName in customers)
            {
    
                  customers[cust.customerName].push(cust)
            }
            else{
                customers[cust.customerName] = [cust]
            }
        }
        else{
            res.status(400).send({
                message:"room booking failed-try with different room id or with differnt dates"
            })
        }
        
    } catch (error) {
        res.status(500).send({
            message:"internal server error"
        })
        
    }
}
const custDetails = (req,res) => {
    try {
        res.status(200).send({
            message:"customer details as follows",
            customers
        })
    } catch (error) {
        res.status(500).send({
            message:"internal server error"
        })
    }
}
const custRoomDetails = (req,res) => {
    try {
     
        if(Object.keys(customers).length!=0){
            console.log("inside")
            let details = {}
        for (let i in customers) {
            console.log(customers[i])
            let length = customers[i].length
            // let roomdetails = customers[i]
            // console.log(roomdetails)
            let string = `${i} has booked room  for ${length} times room details as follows:`
            details[string] = customers[i]
            // details.push(string)
        }
        res.status(200).send({
            message:"customer details as follows",
            details
        })
        }
        else{
            console.log("inside else")
            res.status(400).send({
                message:"currently no customers",
                
            }) 
        }
       
    } catch (error) {
        res.status(500).send({
            message:"internal server error"
        })
    }
}
export default {
    createroom,
    roomdetails,
    bookRoom,
    custDetails,
    custRoomDetails
}