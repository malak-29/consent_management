'use strict';
var crypto = require('crypto');

module.exports = function(app) {    
    app.get("/queryproview", (req, res) => {
        var patID = req.param("patID");
        var Category = req.param("category");
        var CatID = req.param("categoryID");
        console.log('dbconnect');
        const mysql = require('mysql');
        const connection = mysql.createConnection({
            host     : '130.147.175.221',
            user     : 'root',
            password : '#welcome123',
            database : 'phrdemo'
        });
        var CategoryID='';
        var id= '' ;
        if(Category == 'Medication'){
             CategoryID = 'MedID';
             id = CatID.substring(3,(CatID).length+1);
        } else if (Category == 'History'){
             CategoryID = 'HistID';
             id = CatID.substring(4,(CatID).length+1);

        } else if (Category == 'Lifestyle'){
             CategoryID = 'LifeID';
             id = CatID.substring(4,(CatID).length+1);

        }
        console.log(req.body);
        connection.connect();
        connection.query("SELECT * from "+Category+" WHERE  PatientID = '"+patID+"'  ;" , function(err, rows) {
        if (!err) {
            console.log(rows);
            const result = rows.toString();
            var hash = crypto.createHash('sha256').update(result).digest('hex');
            console.log(hash);            
            var HashString = hash.toString();    
            console.log(HashString);
            var response = {
                data:rows,
                hash:HashString
            };       
            res.send(response);
        } else {
            console.log('Error while performing Query.');
        }        
        });


        connection.end(); 

    });
}