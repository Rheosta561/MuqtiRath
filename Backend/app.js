const express = require('express');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const cors = require('cors');
const User = require('./Models/User');
const Message = require('./Models/Message');
const conn = require('./Connection/Connection');
const  Skills = require('./Models/Skills');
const xlsx = require('xlsx');
const Ngos= require('./Models/Ngo'); 
const Admin = require('./Models/Admin');
const Orgs = require('./Models/Org');
const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
conn();

app.get('/', (req, res) => {
  res.send('working');
});



app.post('/createUser', async (req, res) => {
  try {
    const { username, age, gender, health, education, story,phone } = req.body;
    const newUser = await User.create({
      username,
      age,
      gender,
      health: health.split(','),
      education,
      story,
      phone
    });
    res.status(201).json({ newUser });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: 'Error creating user', error: error.message });
  }
});

app.post('/createPass/:userId', async (req, res) => {
  try {
    const { password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const updatedUser = await User.findByIdAndUpdate(
      req.params.userId,
      { password: hashedPassword },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'Password updated successfully', updatedUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating password', error: error.message });
  }
});

app.post('/verify', async (req, res) => {
  const { password, username } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(404).json({ message: 'User not found' });

    if (await bcrypt.compare(password, user.password)) {
      res.status(200).json({ message: 'Access Granted', user });
    } else {
      res.status(403).json({ message: 'Invalid username or password' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error verifying credentials', error: error.message });
  }
});

app.get('/users' , async(req,res)=>{
  try {
    const users = await User.find();
    res.status(200).json({users});
    
  } catch (error) {
    res.status(404).json({message:"Something went wrong",
      error:error.message
    });
    
  }
})




// adding courses to database;
app.post('/skills', async(req,res)=>{
  try {
    const {name , desc, link , price , image }= req.body;
  const skill = await Skills.findOneAndUpdate({name:name},{name,desc,link, price,image},{new:true , upsert:true});
  res.status(200).json(skill);
    
  } catch (error) {
    res.status(404).send("Something went wrong ",error.message);
    
  }
  


});


// recommending the skills
const genAI = new GoogleGenerativeAI(process.env.API);




// api to add ngos in the database 
const filePath = 'ngos.xlsx';
app.get('/addNgos' , async(req,res)=>{
  try {
    const workbook = xlsx.readFile(filePath);
    const sheetName = workbook.SheetNames[0]; 
    const sheetData = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);

    if (sheetData.length === 0) {
      return res.status(400).json({ message: "Excel file is empty" });
    }
    const ngos = sheetData.map(row => ({
      name: row.name,
      description: row.description,
      link: row.link,
      phone: row.phone,
      address: row.address,
      jobs: row.jobs ? row.jobs.split(',').map(job => job.trim()) : [] 
    }));

    await Ngos.insertMany(ngos);

    res.status(200).json({ message: "NGOs added successfully", ngos });



    
  } catch (error) {
    res.status(404).json({
      message:"something went wrong",
      error:error.message
    });
    
  }
})

app.get('/recommendJobs/:userId', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const orgs = await Orgs.find();
    const ngos = await Ngos.find();

    if (orgs.length === 0 && ngos.length === 0) {
      return res.status(404).json({ message: "No job opportunities available" });
    }

    const prompt = `
    A user is looking for skill-building jobs in NGOs and organizations. Here are their details:
    - Name: ${user.username}
    - Age: ${user.age}
    - Gender: ${user.gender}
    - Education Level: ${user.education}
    - Health Concerns: ${user.health.join(", ")}
    - Life Story: ${user.story}
    
    Below are the available NGOs and Organizations, along with the jobs they offer:
    
    NGOs:
    ${ngos.map(ngo => `- ${ngo.name}: Jobs - ${ngo.jobs.join(", ")}`).join("\n")}
    
    Organizations:
    ${orgs.map(org => `- ${org.name}: Jobs - ${org.jobs.join(", ")}`).join("\n")}
    
    ### **Strict Instructions**:
    1. **Analyze** the user's background.
    2. **Identify** the top 3-5 most suitable NGOs and Organizations.
    3. **Return only their names, separated by commas** (e.g., NGO1, NGO2, Org1, Org2).
    4. **Do not** include any extra text, explanations, or formatting.

    ### **Response Format Example**:
    CRY, Sankalp Foundation, Smile Foundation, Asha, Red Cross
    `;

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const response = await model.generateContent(prompt);

    const recommendedNames = response.response.text().split(",").map(name => name.trim());

    const recommendedNgos = await Ngos.find({ name: { $in: recommendedNames.filter(name => ngos.some(ngo => ngo.name === name)) } });
    const recommendedOrgs = await Orgs.find({ name: { $in: recommendedNames.filter(name => orgs.some(org => org.name === name)) } });

    res.status(200).json({ recommendations: { ngos: recommendedNgos, orgs: recommendedOrgs } });

  } catch (error) {
    console.error("Error generating recommendations:", error);
    res.status(500).json({ message: "Something went wrong", error: error.message });
  }
});




app.post('/createAdmin' , async(req,res)=>{
  try {
    const {email,password}= req.body;
  const hashedPassword = await bcrypt.hash(password,10);
  const createdUser= await Admin.create({
    email,
    password:hashedPassword
  });
  res.status(200).json({createdUser});
    
  } catch (error) {
    res.status(404).json({message:"Something went wrong ",
      error:error.message
    });
    
  }
  


});
app.post('/verifyAdmin' , async(req,res)=>{
  try {
    const {email,password}= req.body;
    const foundUser = await Admin.findOne({email:email});
    if(!foundUser){
      res.status(404).json({message:'User Not Found'})
    }
    if(await bcrypt.compare(password, foundUser.password)){
      res.status(200).json({message:'Access Granted',
        user:foundUser
      });

    }else{
      res.status(404).json({message:'Access Denied'});
    }
    
  } catch (error) {
    res.status(404).json({message:'Something went wrong',
      error:error.message
    });
    
  }
})


// Onboarding the organisations

app.post('/register' , async(req,res)=>{
  try {
    console.log('api endpoint accessed');
    const{name , address, description, jobs , city , phone , orgId}= req.body;
  const Org = await Orgs.findOneAndUpdate({name:name} , {name,address,description,
    jobs:jobs.split(',') ,
    city,
    phone,
    orgId
  } , {new:true , upsert:true});
  res.status(200).json({Org});
    
  } catch (error) {
    res.status(404).json({message:'Something went wrong' ,
      error:error.message
    });

    
  }
  
})


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is live and running on port ${PORT}`);
});
