require("dotenv").config();
const mongoose = require("mongoose");
const mailer=require('../models/mailModel')

const saveMailDetails = async (mailDetails) => {
  try {
    const mailDetail = await mailer.create({
      from:mailDetails.from,
      to:mailDetails.to,
      subject:mailDetails.subject,
      text:mailDetails.text
    });
    await mailDetail.save();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
module.exports = {
  createMail(req, res) {
    const mail = new mailer({
      from:mailer.from,
      to:mailer.to,
      subject:mailer.subject,
      text:mailer.text
      
    });
    
    return mail
      .save()
      .then((newMail) => {
        return res.status(201).json({
          success: true,
          message: "New mail saved successfully",
          mailer: newMail,
        });
      })
      .catch((err) => {
        res.status(500).json({
          success: false,
          message: "Server error. Please try again.",
          error: error.message,
        });
      });
  },
  getMailDetails: async (req, res, next) => {
    try {
      const mails = await mailer.find({});
      if (mails) {
        res.status(200).send(mails);
      } else {
        throw error;
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  
};
