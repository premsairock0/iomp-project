const express=require('express');
const app=express();
require("./connect/connect");
const admin_router = require("./routes/admin")
const warden_router = require("./routes/warden")
const chef_router = require("./routes/chef")
const student_router = require("./routes/student")
const menu_router = require("./routes/menu")
const dashchef_router = require("./routes/dashchef")


//added

app.use(express.json());

// console.log('admin_router is:', typeof admin_router);
// console.log('warden_router is:', typeof warden_router);
// console.log('chef_router is:', typeof chef_router);
// console.log('student_router is:', typeof student_router);
// console.log('menu_router is:', typeof menu_router);

app.use("/api/admin",admin_router);
app.use("/api/warden",warden_router);
app.use("/api/chef",chef_router);
app.use("/api/student",student_router);
app.use("/api/menu",menu_router);
app.use("/api/dashchef",dashchef_router);



// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4MjgwYzAzZTNmZmU5YjBkYzU3YzM2YSIsImNoZWZfbmFtZSI6ImNoZWZtYXJ5IiwiaWF0IjoxNzQ3NDU1MDA0LCJleHAiOjE3NDc0NTg2MDR9.4iYC_KdY84AsWa8AZyIIFljFVWaf3sXfTWUshA_M-mg






app.get("/",(req,res)=>{
    res.send("Iam working")
})

app.listen(3000,()=>{
    console.log("server is working");
})