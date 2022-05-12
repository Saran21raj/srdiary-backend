const db=require("../mongo");
const jwt=require("jsonwebtoken");
const bcrypt=require("bcrypt");

const JWT_KEY=process.env.JWT_SECRET_KEY;

const services={
    async register(req,res)
    {
        try
        {
            // Checking wheather user exists or not
            console.log(req.body);
            const user=await db.users.findOne({username: req.body.userName});

            if(user){
                return res.status(400).send({error:"User Already Exits"});
            }
            else
                    {
                        const salt=await bcrypt.genSalt(10)
                        req.body.password=await bcrypt.hash(req.body.password,salt);
                        //  inserting new data
                        const count= await db.users.count();
                        const userId=`userId${count+1}`;
                        const details={
                            name:req.body.name,
                            username:req.body.userName,
                            password:req.body.password,
                            userId:userId
                        }
                        await db.users.insertOne(details);
                        console.log("User Registered Successfully");
                        res.send({mes:"User Registered Successfully"})
                    }
        }
        catch(err)
        {
            console.log("Error  Data",err);
            res.sendStatus(500);
        }
    },
    async login(req,res)
    {
        try
        {
            // Checking wheather user exists or not
            const user=await db.users.findOne({username: req.body.userName});
            if(!user){
                return res.status(400).send({error:"User Doesn't Exits"});
            }
            const isValid= await bcrypt.compare(req.body.password,user.password);
            if(!isValid)
                return res.status(403).send({error:"Email & Password Doesnt match"})
                const token=jwt.sign({userId: user._id},JWT_KEY);
                // console.log(token);
                // const details=jwt.verify(token,process.env.JWT_SECRET_KEY);
                const name=user.name;
                const userId=user.userId;
                res.send({token,name,userId});
                console.log("loggedin");
            
        }
        catch(err)
        {
            console.log("Error Inserting Data",err);
            res.sendStatus(500);
        }
    }
}

module.exports=services;