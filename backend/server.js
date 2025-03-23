const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

//Middleware
app.use(express.json());
app.use(cors());

//mongo connection
mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => console.log('Mongodb connected'))
.catch(err => console.log(err));

//routes
app.use('/api/upload', require('./routes/uploadRoutes'));
app.use('/api/search', require('./routes/searchRoutes'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));