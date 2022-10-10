const nodemailer = require("nodemailer");
const xoauth2 = require("xoauth2");
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const connection=require('./config/db')
const path=require('./routes/mailRoute')
const controller=require('./controller/controller');
const model=require('./models/mailModel');

require('dotenv').config();


const port=process.env.PORT||8000;
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin',process.env.YOUR_DOMAIN);
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,Accept, Authorization');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});
connection.once("open",()=>{
    console.log('connection established successfully');

})
app.use(bodyParser.json());
// app.use(bodyParser.json({limit: "50mb"}));
// app.use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}));




app.post('/sendFormData', (req, res) => {
  console.log(req.body, 'data of form');
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    secure: 'true',
    port: '465',
    auth: {
        user:"neha.potdar@mindbowser.com",
        pass:"jhrypjuasoxqvnnh"
    }
  });

  var mailOptions = {
    from: req.body.from,
    to: req.body.to, // must be Gmail
    cc:`${req.body.name} <${req.body.email}>`,
    subject: req.body.subject,
    text:req.body.text,
    
          
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
      res.status(200).json({
        message: 'successfuly sent!'
      })
    }
  });

});

app.listen(port, () => {
  console.log(`server running on port ${port}`);
});
