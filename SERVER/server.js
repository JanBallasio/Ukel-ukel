import express from 'express';
import mysql from 'mysql';
import cors from 'cors';

const app = express();
app.use(cors());

const db= mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "burat"
})

app.get('/', (req, res) => { 
    const sqlSelect = "SELECT * FROM burat";
    db.query(sqlSelect, (err, result) => {
        if(err) return res.json({Message: "Error Inside Server"});
        return res.json(result);
    });
});

app.listen(8081, () => {    
    console.log('Listening');
})   