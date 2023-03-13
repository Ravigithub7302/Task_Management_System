const mongoose = require("mongoose");
const taskSchema = new mongoose.Schema({
    email:{
        type:String,
        require:true,
    },
    title:{
        type:String,
        require:true,
    },
    task:{
        type:String,
        require:true,
    },
    startDate:{
        type:String,
        require:true
    },
    endDate:{
        type:String,
        require:true
    },
    status:{
        type:String,
        default:"Pending"
    }
})
module.exports = mongoose.model("Task",taskSchema);