const express = require("express");
const db = require('./db');

const app= express();

//Middleware 
app.use(express.json());

const PORT = 3000;



//GET all users from demo database
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

    // get selective user from the demo databse
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

    // Delete a user
    .delete((req,res)=>{
        const id = req.params.id;
        const query = 'delete from demo where id=?';
        db.query(query,[id], (err, results) => {
            if (err) {
                console.error('Error executing query:', err);
                res.status(500).send('Internal Server Error');
                return;
            }
            if(results.affectedRows==0)
            {
                console.error('user already deleted',err);
                res.status(404).send('User already Deleted');
            }
            res.send('User deleted.');
        });
    })

    // Partially update a user    
    .patch((req,res)=>{
        const id = req.params.id;
        const fieldsToUpdate = req.body;
        console.log(fieldsToUpdate );
        if (!id) {
            return res.status(400).send('User ID is required');
        }
    
        // Construct the SQL query dynamically
        let query = 'UPDATE demo SET ';
        const queryParams = [];
        Object.keys(fieldsToUpdate).forEach((field, index) => {
            query += `${field} = ?`;
            if (index < Object.keys(fieldsToUpdate).length - 1) {
                query += ', ';
            }
            queryParams.push(fieldsToUpdate[field]);
        });
        query += ' WHERE ID = ?';
        queryParams.push(id);
    
        // Execute the query
        db.query(query, queryParams, (err, results) => {
            if (err) {
                console.error('Error executing query:', err);
                return res.status(500).send('Internal Server Error');
            }
            if (results.affectedRows === 0) {
                return res.status(404).send('User not found');
            }
            res.send('User updated successfully');
        });
    })

    

    // Update a city completely
    .put((req,res)=>{
        const id = req.params.id;
        const {name,gender,bloodgroup}=req.body;
        const query = 'UPDATE demo SET name = ?, gender=?,bloodgroup=? WHERE id = ?';
        db.query(query,[name,gender,bloodgroup,id], (err, results) => {
            if (err) {
                console.error('Error executing query:', err);
                res.status(500).send('Internal Server Error');
                return;
            }
            if(results.affectedRows==0)
            {
                console.error('user already deleted',err);
                res.status(404).send('User already Deleted');
            }
            res.send('User updated.');
        });
    })


// insert a user
app.post(('/api/user'),(req,res)=>{
        const {name,gender,bloodgroup}=req.body;
        const query = 'select count(*) as cnt from demo';
        
        db.query(query,(err,results) => {
            if (err) {
                console.error('Error executing query first:', err);
                res.status(500).send('Internal Server Error');
                return;
            }
            const firstrow = results[0].cnt; 
            const id1=firstrow+1;

            console.log(id1);
            console.log(name);
            console.log(gender);
            console.log(bloodgroup);
            const query1 = 'INSERT INTO demo (ID, name, gender, bloodgroup) VALUES (?, ?, ?, ?)';
            db.query(query1,[id1,name,gender,bloodgroup], (err,result) => {
                if (err) {
                    console.error('Error executing query:', err);
                    res.status(500).send('Internal Server Error');
                    return;
                }
                res.send('User Entered');
            });
        });
        // const [result]=db.execute('select count(*) as cnt from demo');
        
});

app.post('/test', (req, res) => {
    console.log('Test route body:', req.body);
    res.send('Test route');
});

app.get('/alluserscount',(req,res)=>{
        const query = 'select count(*) as cnt from demo';
        db.query(query, (err, results) => {
            if (err) {
                console.error('Error executing query:', err);
                res.status(500).send('Internal Server Error');
                return;
            }
            try {
                const firstrow=results[0].cnt;
                console.log(firstrow);
                res.send(`${firstrow}`);
            } catch (error) {
                console.error('Error parsing JSON:', error);
            }            
        });
        // const [result]=db.execute('select count(*) as cnt from demo');
        // console.log(result[0].cnt);
       
})

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})