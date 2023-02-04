const mysql = require('mysql2');
const db = mysql.createConnection({
    host:'localhost',
    database:'Employee_tracker',
    user:'root',
    password: '123741q'
})
db.connect(function(err){
    if (err){
        console.log(err)
        throw err;
    } 
    console.log('DB connect')
})