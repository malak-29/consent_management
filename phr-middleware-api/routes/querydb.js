'use strict';

module.exports = function(app) {    
    app.get("/querydb", (req, res) => {
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
        connection.query('SELECT PatientID, LifeID from Lifestyle', function(err, rows) {
            if (!err) {
                let obj = {
                    category:"Lifestyle",
                    data:rows
                }
                queryRows.push(obj);
            } else {
                console.log('Error while performing Query.');
            }        
        });
        connection.query('SELECT PatientID, MedID from Medication', function(err, rows) {
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
        connection.query('SELECT PatientID, HistID from History', function(err, rows) {
            if (!err) {
                let obj = {
                    category:"History",
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