require("dotenv").config();
const mongoose = require("mongoose");
const mailer=require('../models/mailModel')
const nodemailer=require('nodemailer');

const saveMailDetails = async (req,res,mailDetails) => {
  console.log(req.body);
  try {
    const mailDetail = await mailer.create({
      from:'neharpotdar68@gmail.com',
      to:req.body.email,
      subject:req.body.subject,
      text:req.body.text
    });
    console.log(mailDetails);
    await mailDetail.save();
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  main:async(req,res,next) =>{
    // Generate SMTP service account from ethereal.email
    let account = await nodemailer.createTestAccount();

    console.log('Credentials obtained, sending message...');

    // NB! Store the account object values somewhere if you want
    // to re-use the same account for future mail deliveries

    // Create a SMTP transporter object
    let transporter = nodemailer.createTransport(
        {
          service: 'gmail',
          host: 'smtp.gmail.com',
          secure: 'true',
          port: '465',
          auth: {
              user:"neharpotdar68@gmail.com",
              pass:"wjovcrvzojjpadkt"
          }
            // include SMTP traffic in the logs
        }
    );

    // Message object
    var mailOptions = {
      from: req.body.from,
      to: req.body.to, // must be Gmail
      cc:`${req.body.name} <${req.body.email}>`,
      subject: req.body.subject,
      text:req.body.text,
      
            
    };
    let info = await  transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
        res.status(200).json({
          message: 'successfuly sent!'
        })
        saveMailDetails(req);
      }
    });
  }
  



  ,

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
  

}
