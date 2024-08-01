const Group = require("../models/groupModel");

const createGroup = async (req, res) => {
  try {
    const { groupName, colorCode } = req.body;
    if (!groupName) {
      console.log("Group name is required");
      return res.status(400).send({status : 400,message : "GroupName is required"})
    }
    const group  = await Group.create({
        groupName,
        colorCode : colorCode?colorCode :"#1b1127"
    })

    if(group){
        return res.status(201).json({message : "Group created successfully", group})
    }

  } catch (error) {
    console.log(error);
    return res.status(500).send({status : 500, message :"Something went Wrong [GROUP CREATE]"})
  }
};

const getAllGroup = async (req,res) =>{
    try {
        const groups = await Group.find({});
        return res.status(200).json(groups);
    } catch (error) {
        console.log(error);
        return res.status(500).send({status : 500, message :"Something went Wrong [GET GROUPS]"})
    }
}

module.exports = {createGroup,getAllGroup}