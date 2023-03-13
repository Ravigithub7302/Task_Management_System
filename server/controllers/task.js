const Task = require("../model/taskModel.js");
const User = require("../model/userModel.js");

module.exports.createTask = async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email});
    if(user){
    const newTask = new Task({
        email: req.body.email,
        title: req.body.title,
        task: req.body.task,
        endDate: req.body.endDate,
        startDate: req.body.startDate
    });
    try {
        const savedTask = await newTask.save();
       return next(res.status(200).json(savedTask));
    } catch (err) {
        return next(err);
    }}
    else
    {
        return next(res.status(400).send(JSON.stringify({"message":"Please Enter valid user"})));
    }
}
module.exports.getUserTasks = async (req, res, next) => {
    try {
        console.log(req.data)
        const task = await Task.find();
        console.log(task);
        return res.status(200).json(task);
    }
    catch(err){
        return next(err);
    }
 }

 module.exports.updateStatus = async(req,res)=>{
    try{
        console.log(req.body)
        const userTask = await Task.findByIdAndUpdate(req.body.id,{status:req.body.status}).select('status');
        console.log(userTask,"userTask");
        return res.status(200).send({message:"status updated success"});
    }catch(err){console.log(err)}
 }

 module.exports.getAllTask = async(req,res)=>{
    try{
        const allTask = await Task.find({}).select('email status title startDate endDate task');
        return res.status(200).json(allTask);
        
    }catch(err){console.log(err)}
 }
 


  


