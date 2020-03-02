'use strict';

module.exports = function(app) {    
    app.get("/querypatdb", (req, res) => {
        var patID = req.param("patID");
        console.log('dbconnect');
        const mysql = require('mysql');
        const queryRows = [];
        const connection = mysql.createConnection({
            host     : '130.147.175.221',
            user     : 'root',
            password : '#welcome123',
            database : 'phrdemo'
        });
        connection.connect();
        connection.query("SELECT MedID, MedName, Dosage, Frequency from Medication where PatientID ='"+patID+"';", function(err, rows) {
        if (!err) {
            let obj = {
                category:"Medication",
                data:rows
            }
            queryRows.push(obj);
        } else {
            console.log('Error while performing Query.');
        }        
        });
        connection.query("SELECT HistID, SessionDate, ProviderID, Comments from History where PatientID ='"+patID+"';", function(err, rows) {
            if (!err) {
                let obj = {
                    category:"History",
                    data:rows
                }
                queryRows.push(obj);
            } else {
                console.log('Error while performing Query.');
            }        
        });
        connection.query("SELECT LifeID, Steps, Sleep, Calories from Lifestyle where PatientID ='"+patID+"';", function(err, rows) {
            if (!err) {
                let obj = {
                    category:"Lifestyle",
                    data:rows
                }
                queryRows.push(obj);
                res.send(queryRows);
            } else {
                console.log('Error while performing Query.');
            }        
        });
        
        connection.end(); 

    });
}