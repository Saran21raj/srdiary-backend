const db=require("../mongo");
const {ObjectId} = require("mongodb");

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
    },

    async updateEvent(req,res){
        try{
            console.log(req.body);
            await db.events.findOneAndUpdate({_id:ObjectId(req.body._id)},
                {$set:{ title: req.body.eventDetails.title, description: req.body.eventDetails.description, time:req.body.eventDetails.time}},
                );
            res.send({msg:"done Updated"});
        }catch(err){
            console.log("Error Reading Data-",err);
            res.sendStatus(500);
        }
    },
    async deleteEvent(req,res){
        try{
            await db.events.remove({_id: ObjectId(req.body._id) });
            res.send({msg:"deleted"});
        }
        catch(err){
            console.log(err);
        }
    }
}

module.exports=services;