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
        if (err) throw err;
        con.query(`INSERT INTO emails (email) VALUES ("${req.body.email}")`, function (err, result, fields) {
            if (err) throw err;
            console.log(result);
            con.query("SELECT * FROM emails", function (err, result, fields) {
                if (err) throw err;
                console.log(result);
                res.send(result);
            });
        });
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
        if (err) throw err;
        con.query("SELECT * FROM emails", function (err, result, fields) {
            if (err) throw err;
            console.log(result);
            res.send(result);
        });
    });

});


router.delete('/delete-email:id', function (req, res, next) {
    var mysql = require('mysql');
    var con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "",
        database: "ryan_db"
    });
    console.log(typeof(req.params.id));
    
    con.connect(function (err) {
        if (err) throw err;
        con.query(`DELETE FROM emails where id=${req.params.id}`, function (err, result, fields) {
            if (err) throw err;
            console.log(result);
            console.log("one email deleted successfully");
            con.query("SELECT * FROM emails", function (err, result, fields) {
                if (err) throw err;
                console.log(result);
                res.send(result);
            });
        });
    });

});
module.exports = router;
