const express = require('express');
const cors = require('cors');
require('dotenv').config();
const noteRoutes = require('./routes/noteRoutes');
const errorHandler = require('./middlewares/errorMiddleware');
const logger = require('./middlewares/loggerMiddleware');
const connectDB = require('./config/db');

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.use(logger);

app.use('/', noteRoutes);
app.use(errorHandler);

const PORT = process.env.PORT;

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
});