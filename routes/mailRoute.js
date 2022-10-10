const router = require("express").Router();
const express = require("express");
const mail=require('../controller/controller')





router.get("/getMailDetails", mail.getMailDetails);



module.exports = router;