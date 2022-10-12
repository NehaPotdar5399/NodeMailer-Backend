const router = require("express").Router();
const express = require("express");
const mail=require('../controller/controller');
const bodyParser=require('body-parser');
router.use(bodyParser.urlencoded({ extended: false }));


router.get("/getMailDetails", mail.getMailDetails);
router.post("/sendFormData",mail.main)



module.exports = router;