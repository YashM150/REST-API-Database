const AuthUser=require('../models/crudmodel');
const User = require('../models/usermodels');

const crudController = {
    users: (req, res) => {
        AuthUser.findAll((err, results) => {
          if (err) {
            return res.status(500).send('Error finding user');
          }
            res.status(200).json(results);
        });
    },
    find:(req,res)=>{
        const {id}=req.params;
        AuthUser.findUser(id,(err,result)=>{
            if (err) {
                return res.status(500).send('Error finding particular user!');
              }
                res.status(200).json(result);
        })
    },
    delete:(req,res)=>{
        const {username}=req.params;
        AuthUser.deleteUser(username,(err,result)=>{
            if (err) {
                return res.status(500).send('Error finding particular user!');
              }
              res.status(200).send('User deleted!!');    
        })
    },
    AddInfo:(req,res)=>{
        const {name,gender,bloodgroup,username}=req.body;
        console.log(name);
        console.log(gender);
        console.log(bloodgroup);
        console.log(username);
        AuthUser.AddUser([name,gender,bloodgroup,username],(err,result)=>{
            if (err) {
                return res.status(500).send('Error Adding a particular user!');
              }
              res.status(200).json('User added!');    
        })
    },
    PatchInfo:(req,res)=>{
        const{id}=req.params;
        const fields = req.body;
        AuthUser.UpdatePartiall(id, fields, (err, result) => {
        if (err) {
            console.error('Error updating user:', err);
            return res.status(500).send('Error updating user');
        }
        if (result.affectedRows === 0) {
            return res.status(404).send('User not found');
        }
        res.status(200).send('User updated');
        });
    },
    PutInfo:(req,res)=>{
        const {id}=req.params;
        const fields =req.body;
        AuthUser.UpdatePartiall(id, fields, (err, result) => {
            if (err) {
                console.error('Error updating user:', err);
                return res.status(500).send('Error updating user');
            }
            if (result.affectedRows === 0) {
                const { username, password } = req.body;
                if (!username|| !password) {
                return res.status(400).send('All fields are required');
                }
                bcrypt.hash(password, 10, (err, hashedPassword) => {
                if (err) {
                    return res.status(500).send('Error hashing password');
                }
                console.log(`username :${username}`);
                console.log(`password :${password}`);
                User.create({ username:username, password: hashedPassword }, (err, result) => {
                    if (err) {
                    return res.status(500).send('Error creating user');
                    }
                    res.status(201).send('User registered');
                });
                });
                const {name,gender,bloodgroup}=req.body;
                AuthUser.AddUser([name,gender,bloodgroup,username],(err,result)=>{
                    if (err) {
                        return res.status(500).send('Error Adding a particular user!');
                      }
                      res.status(200).json('User added!');    
                });
                return res.status(404).send('User not found.User Added!');
            }
            res.status(200).send('User updated');
        });
    }

  };
  
  module.exports = crudController;
  