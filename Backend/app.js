const express = require('express');
const app = express();
const bcrypt = require('bcrypt');
const conn = require("./Connection/Connection");
const User = require("./Models/User");
const cors = require('cors');
app.use(cors());
conn();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.get("/" , (req,res)=>{
    res.send("Working");
});

app.post("/createUser" , async(req,res)=>{
    try {
        const {username,age,gender,health,education,story} =req.body;
    const newUser = await User.create({username , age,gender , health:health.split(','), education, story });
    res.status(200).json({newUser});

        
    } catch (error) {
        res.status(400).json({message: "Something went wrong ",
            error:error.message
        });

        
    }
    

})
app.post("/createPass/:userId", async (req, res) => {
    try {
      const { password } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);
      const updatedUser = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { password: hashedPassword },
        { new: true }
      );
  
      if (!updatedUser) {
        return res.status(404).json({ message: "User not found" });
      }
  
      res.status(200).json({
        message: "Password updated successfully",
        updatedUser,
      });
    } catch (error) {
      res.status(500).json({
        message: "Something went wrong",
        error: error.message,
      });
    }
  });
  app.post("/verify" , async (req,res)=>{
    const {password,username} = req.body;
    try {
        const user = await User.findOne({username:username});
        if(!user) return res.status(400).json({message:"User not found"});

        if(await bcrypt.compare(password,user.password)){
            return res.status(200).json({message:"Access Granted" , user});
        }else{
            return res.status(404).json({message:"Wrong username/password"});
        }
        
    } catch (error) {
        res.status(404).json({message:"Something went wrong"});
        
    }
  })
  



app.listen(3000, ()=>{
    console.log("Server is live and running");
})
