const Admin = require('../models/adminModel')

const defaultAdmin = async () => {
    const defaultemail = "admin@gmail.com"
    const defaultpassword = "admin@123"

    let exadmin =await Admin.findOne({email:defaultemail})

    if(!exadmin){
       let newAdmin = new Admin({
        email:defaultemail,
        password:defaultpassword
       })

       newAdmin.save();
    }
    else{
        console.log("Default admin already exist");
        
    }
}
defaultAdmin();

const adminLogin = async (req,res) => {
     const {email,password} = req.body

     const admin = await Admin.findOne({email})
     if(!email){
        res.json({message:"Admin not found"})
     }
     const passmatch = await Admin.comparePassword(password)
     if(!passmatch){
        res.json({message:"Invalid password"})
     }
}

module.exports = {
    adminLogin
}