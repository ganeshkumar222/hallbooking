const homepage = (req,res)=>{ 
    let  Endpoint=`/room/createroom`
       res.status(200).send({
        message:`Welcome to Hall Booking System`,
        Endpoint
    })
}


export default {
    homepage
}