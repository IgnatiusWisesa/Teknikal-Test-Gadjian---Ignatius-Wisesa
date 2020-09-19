// Import Global Modules
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
// Dotenv
require('dotenv').config();

// Set App
const app = express();

// Set Cors
app.use(cors())

// Set Body Parser
app.use(bodyParser.json())

// Set Routes
const {
    employeeRoutes
} = require('./routes');
app.get('/', (req, res) => {
    res.status(200).send('Server Test Teknikal Gadjian - Ignatius Wisesa is running...')
});
app.use('/api', employeeRoutes);

// Parse application / x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended : false }));

// Set Static File`
app.use(express.static('public'));

// Check database connection
const db = require('./database/db');
db.connect(err => {
    if(err) throw err;
    console.log('MySQL connected...')
})

// Set PORT
const PORT = process.env.PORT || 2000
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})