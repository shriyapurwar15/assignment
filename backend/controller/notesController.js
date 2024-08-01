const Group = require("../models/groupModel");
const Notes = require("../models/notesModel");

const createNote = async (req, res) => {
  try {
    const { groupId } = req.params;
    const group = await Group.findById(groupId);
    if (!group) {
      return res.status(404).json({ message: "Group not found ||Not A valid Group Id" });
    }
    const { text } = req.body;
    if (!text) {
      return res.status(400).send({ message: "Text is required" });
    }
    const note = await Notes.create({
      groupId,
      text,
    });
    if (note) {
      return res
        .status(200)
        .send({ message: "Note Created successfully", note });
    }
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send({ status: 500, message: "Something went Wrong [CREATE NOTE]" });
  }
};

const getAllNotesByGroupId = async (req, res) => {
  try {
    const { groupId } = req.params;
    const group = await Group.findById(groupId);
    if (!group) {
      return res.status(404).json({ message: "Group not found|| Not A valid Group Id" });
    }
    const notes = await Notes.find({groupId : groupId});
    return res.status(200).json(notes);
  } catch (error) {
    console.log(error);
    return res.status(500).send({status : 500, message : "Something went wrong [GET NOTEs BY GROUPID]"})
  }
};

module.exports = { createNote ,getAllNotesByGroupId };
