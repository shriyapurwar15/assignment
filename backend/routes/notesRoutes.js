const express = require("express");
const { createNote, getAllNotesByGroupId } = require("../controller/notesController");

const router = express.Router()

router.get(`/:groupId`,getAllNotesByGroupId)
router.post(`/:groupId/create`,createNote)


module.exports = router;