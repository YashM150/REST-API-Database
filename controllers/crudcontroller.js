const AuthUser=require('../models/crudmodel');

const crudController = {
    users: (req, res) => {
        AuthUser.findAll((err, results) => {
          if (err) {
            return res.status(500).send('Error finding user');
          }
            res.status(200).json(results);
        });
    }
  };
  
  module.exports = crudController;
  