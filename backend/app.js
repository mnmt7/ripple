const express = require('express');
const cors = require('cors');

const globalErrorHandler = require('./controllers/errorController');
const userRouter = require('./routes/userRoutes');
const campaignRouter = require('./routes/campaignRoutes');

const app = express();

app.use(express.json());

app.use(cors());

app.use('/api/v1/users', userRouter);
app.use('/api/v1/campaigns', campaignRouter);

app.use(globalErrorHandler);

module.exports = app;
