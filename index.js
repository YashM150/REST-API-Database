const express = require("express");
const db = require('./db');

const app= express();

//Middleware 
app.use(express.json());

const PORT = 3000;



//GET all cities from world database
app.get('/user', (req, res) => {
    const query = 'SELECT * FROM demo';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error executing query:', err);
            res.status(500).send('Internal Server Error');
            return;
        }
        let userList = '<ul>';
        results.forEach(results => {
            userList += `<li>${results.name}</li>`;
        });
        userList += '</ul>';
        res.send(userList);
    });
});


//use of dynamic apis
app.route('/api/user/:id')

    // get selective city from the world databse
    .get((req,res)=>{
        const id = req.params.id;
        const query = 'select * from demo where id=?';
        db.query(query,[id], (err, results) => {
            if (err) {
                console.error('Error executing query:', err);
                res.status(500).send('Internal Server Error');
                return;
            }
            if(results.length==0)
            {
                console.error('User not Found',err);
                res.status(404).send('User not found');
            }
            res.json(results[0]);
        });
    })

    // Delete a city
    .delete((req,res)=>{
        const id = req.params.id;
        const query = 'delete from demo where ID=?';
        db.query(query,[id], (err, results) => {
            if (err) {
                console.error('Error executing query:', err);
                res.status(500).send('Internal Server Error');
                return;
            }
            if(results.affectedRows==0)
            {
                console.error('City already deleted',err);
                res.status(404).send('User already Deleted');
            }
            res.send('User deleted');
        });
    })

    // Update a city partially     
    // .patch((res,req)=>{
    //     const id = req.params.id;
    //     const query= 'UPDATE city SET Name = "Nagpur" WHERE ID = ?';
    // })

    // Update a city completely
    // .put


// insert a city
app.post(('/api/user'),(req,res)=>{
        const {name,gender,bloodgroup}=req.body;
        console.log('Name:', name); // Access each key
        console.log('Email:', gender);
        console.log('Age:', bloodgroup);
        const query = 'select count(*) from demo';
        let id1=0;
        db.query(query, (err, results) => {
            if (err) {
                console.error('Error executing query:', err);
                res.status(500).send('Internal Server Error');
                return;
            }
            id1=results;
        });
        const query1 = 'INSERT INTO `apim`.`demo` (`ID`, `name`, `gender`, `bloodgroup`) VALUES (?, "?", "?", "?")';
        db.query(query1,(id1+1),[name,gender,bloodgroup], (err,result) => {
            if (err) {
                console.error('Error executing query:', err);
                res.status(500).send('Internal Server Error');
                return;
            }
            res.send('User Entered');
        });

});

app.post('/test', (req, res) => {
    console.log('Test route body:', req.body);
    res.send('Test route');
});


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})