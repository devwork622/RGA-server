var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/', function (req, res, next) {  
  const detectedData = req.body;
  console.log("alert-data========================>", req.body);
  //section for getting all emails from database
  var mysql = require('mysql');
  var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "ryan_db"
  });

  var alertData;

  con.connect(function (err) {
    if (err) console.log(err);
    con.query("SELECT * FROM alerts", function (err, result, fields) {
      if (err) console.log(err);
      alertData = result;
    });

    con.query("SELECT email FROM emails", function (err, result, fields) {
      if (err) console.log(err);
      let email = result.map(val => `${val.email}`)
      let str_email = "";
      str_email = email.toString();
      console.log(str_email);
      // console.log("alertData-----------", alertData);
      var transporter = require("nodemailer").createTransport({
        host: 'mail.privateemail.com',
        port: 587,
        secureConnection: true,
        auth: {
          user: "support@topwebdev.pro",
          pass: "wonderful@0201"
        }
      });
      var str = "";
      let alertType;
      let fDate = alertData[0].first_date.toString();
      let sDate = alertData[0].second_date.toString();
      if(fDate == sDate)  sDate = "";
      else  sDate = " : " + sDate;
      detectedData.map((e, i) => {
        if (alertData[0].type == 1) {
          alertType = "PPU";
          str += alertData[0].name + " - " + fDate + sDate + "\n" + alertType + " - " + e[3] + " - " + e[2] + " - " + e[1] + " -" + e[0] + "\n\n";
        }
        else {
          alertType = "DROP";
          str += alertData[0].name + " - " + fDate + sDate + "\n" + alertType + " - " + e[3] + " - " + e[2] + " - " + e[1] + " -" + e[0] + "\nScheduled Trip:" + alertData[0].scheduled_trip + "\n\n";
        }
      })

      var mailOptions = {
        from: "support@topwebdev.pro",
        to: str_email,
        subject: 'Mail from FLICA',
        text: str

      };
      transporter.sendMail(mailOptions, function (err) {
        if (err) { return res.status(500).send({ msg: err.message }); }
        res.status(200).send('Message sent to your account successfully ' + email + '.');
      });
      res.send('Hi');

    });
  });
});

module.exports = router;
