const mongoose = require("mongoose")

const notesModel = mongoose.Schema({
    text :{type : String, required : true},
    groupId : {
        type : mongoose.Schema.Types.ObjectId,
        ref :"Group"
    }
},{
    timestamps : true
})

const Notes = mongoose.model("Notes",notesModel);
module.exports = Notes;