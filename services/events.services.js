const db=require("../mongo");


const services={
    async insertEvent(req,res){
        try{
            await db.events.insertOne(req.body);
            res.send({msg:"Event Updated Sucessfully"});
        }catch (err){
            console.log("Error Inserting Data",err);
            res.sendStatus(500);
        }
    },

    async findEvent(req,res){
        try{
            console.log(req.body);
            await db.events.find({userId:req.body.userId,date:req.body.date}).toArray(function(err, result) {
                if (err) throw err;
                console.log(result);
                res.send(result);
              });
        }catch(err){
            console.log("Error Reading Data-",err);
            res.sendStatus(500);
        }
    }
}

module.exports=services;