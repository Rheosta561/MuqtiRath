const express = require('express');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const cors = require('cors');
const User = require('./Models/User');
const Message = require('./Models/Message');
const conn = require('./Connection/Connection');
const  Skills = require('./Models/Skills');
const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
conn();

app.get('/', (req, res) => {
  res.send('Chat application is running');
});

app.get('/search/:username', async (req, res) => {
  try {
    const username = req.params.username;
    const foundUser = await User.findOne({ username });
    if (!foundUser) {
      return res.status(404).json({ message: 'No such user exists' });
    }
    res.status(200).json({ foundUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error searching for user', error: error.message });
  }
});

app.post('/createUser', async (req, res) => {
  try {
    const { username, age, gender, health, education, story } = req.body;
    const newUser = await User.create({
      username,
      age,
      gender,
      health: health.split(','),
      education,
      story,
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

app.post('/sendMessage', async (req, res) => {
  try {
    const { sender, recipient, content } = req.body;
    const newMessage = await Message.create({ sender, recipient, content });
    res.status(201).json({ message: 'Message sent successfully', newMessage });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error sending message', error: error.message });
  }
});

app.get('/getMessages', async (req, res) => {
  const { sender, recipient, page = 1, limit = 20 } = req.query;
  try {
    const messages = await Message.find({
      $or: [
        { sender, recipient },
        { sender: recipient, recipient: sender },
      ],
    })
      .sort({ timestamp: 1 })
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    res.status(200).json({ message: 'Messages retrieved successfully', messages });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error retrieving messages', error: error.message });
  }
});


app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong', error: err.message });
});


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

app.get('/recommendations/:userId' , async(req,res)=>{
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const courses = await Skills.find({});
    if (courses.length === 0) {
      return res.status(404).json({ message: "No courses available" });
    }
    const prompt = `
      A user is looking for skill-building courses. Here are their details:
      - Name: ${user.username}
      - Age: ${user.age}
      - Gender: ${user.gender}
      - Education Level: ${user.education}
      - Health Concerns: ${user.health.join(", ")}
      - Life Story: ${user.story}

      Below are the available courses:
      ${courses.map(course => `- ${course.name}: ${course.desc}`).join("\n")}

      Based on the user's background, **return the names of the top 3-5 most suitable courses** from the list. 
      Format the response as a JSON array of course names like this:

      ["Course Name 1", "Course Name 2", "Course Name 3"]
    `;
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const response = await model.generateContent(prompt);
    const recommendedCourseNames = JSON.parse(response.response.text());
    const recommendedCourses = await Skills.find({ name: { $in: recommendedCourseNames } });

    res.status(200).json({ recommendations: recommendedCourses });

  } catch (error) {
    console.error("Error generating recommendations:", error);
    res.status(500).json({ message: "Something went wrong", error: error.message });
  }
  

});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is live and running on port ${PORT}`);
});
