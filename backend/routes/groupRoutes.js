const express  = require("express")
const { createGroup, getAllGroup } = require("../controller/groupControllers")
const router = express.Router()

router.post('/create',createGroup)
router.get('/',getAllGroup)

module.exports = router