const cors = require('cors');
const express = require('express');
const app = express();
require('../database/db');
const authRoutes = require('./routes/authRoutes');
const taskRouter = require('./routes/taskRoutes');
const morgan = require('morgan');

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use('/auth', authRoutes);
app.use('/task', taskRouter);
app.use((req, res, next) => {
	res.setHeader('Cache-Control', 'public, max-age=3600'); // Cache for 1 hour
	next();
  });


const port = 4000;

app.listen(port, () => {
	console.log(`server is running on port`, port);
});
