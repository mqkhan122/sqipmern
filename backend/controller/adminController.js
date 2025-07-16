const Admin = require('../models/adminModel')
const bcrypt = require('bcrypt');

const defaultAdmin = async () => {
    const defaultemail = "admin@gmail.com"
    const defaultpassword = "admin@123"

    let exadmin =await Admin.findOne({email:defaultemail})

    if(!exadmin){
        const hashedPassword = await bcrypt.hash(defaultpassword, 10);
       let newAdmin = new Admin({
        email:defaultemail,
        password:hashedPassword
       })

       await newAdmin.save();
       console.log("Default admin created.");
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
     const passmatch = await bcrypt.compare(password, admin.password);
     if(!passmatch){
        res.json({message:"Invalid password"})
     }
     res.json({ message: "Login successful", email: admin.email });
}

module.exports = {
    adminLogin
}