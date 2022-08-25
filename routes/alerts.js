var express = require('express');
var router = express.Router();

router.post('/', function (req, res, next) {
    var mysql = require('mysql');
    var con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "",
        database: "ryan_db"
    });

    con.connect(function (err) {
        if (err) console.log("alert error----", err);

        var first_sql = `SELECT COUNT(ID) AS row_ct FROM alerts`;
        con.query(first_sql, function (err, result) {
            if (result[0].row_ct == 0) {
                con.query(`INSERT INTO alerts (name, first_date, second_date, type, scheduled_trip) VALUES ("${req.body.alertName}", "${req.body.firstDate}", "${req.body.secondDate}", "${req.body.alertType}", "${req.body.scheduledTrip}")`, function (err, result, fields) {
                    if (err) console.log("alert error----", err);
                    console.log(result);
                    con.query("SELECT * FROM refresh", function (err, result, fields) {
                        if (err) console.log("alert error----", err);
                        console.log(result);
                        res.send(result);
                    });
                });
            }
            else {
                var getID_sql = `SELECT id FROM alerts`;
                con.query(getID_sql, function (err, result) {
                    var updatedId = result[0].id;
                    var sql = `UPDATE alerts SET name='${req.body.alertName}', first_date='${req.body.firstDate}', second_date='${req.body.secondDate}', type='${req.body.alertType}', scheduled_trip='${req.body.scheduledTrip}' WHERE id='${updatedId}'`;
                    con.query(sql, function (err, result) {
                        if (err) console.log("alert error----", err);
                        console.log("1 record updated in users table");
                        con.query("SELECT * FROM alerts", function (err, result, fields) {
                            if (err) console.log("alert error----", err);
                            console.log(result);
                            res.send(result);
                        });
                    });
                });
            }
        })

    });
});


router.get('/', function (req, res, next) {
    var mysql = require('mysql');
    var con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "",
        database: "ryan_db"
    });

    con.connect(function (err) {
        if (err) console.log("alert error----", err);
        con.query("SELECT * FROM alerts", function (err, result, fields) {
            if (err) console.log("alert error----", err);
            res.send(result);
        });
    });

});

module.exports = router;