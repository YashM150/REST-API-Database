const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authroutes');
require('.env').config();

const app = express();
app.use(bodyParser.json());

app.use('/api', authRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
