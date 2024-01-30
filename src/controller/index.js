const homepage = (req,res)=>{ 
       res.status(200).send({
        message:`Welcome to Hall Booking System: Kindly refer documentation link/readme for the workflow`, 
    })
}


export default {
    homepage
}