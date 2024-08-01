const mongoose = require("mongoose")

const groupModel = mongoose.Schema({
    groupName : {type : String, required : true},
    colorCode : {type : String, default :"#3523a9"}
},{
    timestamps : true
})

const Group = mongoose.model("Group",groupModel)

module.exports = Group;
