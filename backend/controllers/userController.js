import Users from '../models/userSchema.js'



async function pushUser(req,res){
    try{
        const userid = req.body.userId;
        const mail=req.body.email;
        console.log(userId);
        const dbUser = await Users.findOne({id:userid});
        if(!dbUser){
            const user = await Users.create({id : userid,email:mail});
            await user.save();
            return res.json({success : true, msg : "New User registered"});
        }
        else{
           return res.json({msg : "already registerd"})
        }
        
    }catch(e){
        console.log(e);
        res.json({success : false , msg : "Unable to parse the body parameters."});
    }
}

export default pushUser;