const express = require('express');
const dotenv = require('dotenv').config();
const { errorHandler } = require('./middlewares/error.middleware');
const connectDB = require('./config/database');

const port = process.env.PORT || 5000;

connectDB();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/tasks', require('./routes/task.routes'));
app.use('/api/users', require('./routes/user.routes'));

app.use(errorHandler);

app.listen(port, () => console.log(`Server listening on ${port}`));
