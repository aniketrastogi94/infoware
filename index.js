const express = require('express');
const app = express();
const connectDB = require('./config/db');

connectDB();
app.use(express.json({extended : false}));

app.use('/api/owner',require('./routes/owner'));
app.use('/api/customers',require('./routes/customers'));

const PORT  = 5000;

app.listen(PORT,()=>console.log(`Server started on port ${PORT}`));
