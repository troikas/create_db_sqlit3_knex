const express = require('express');
const lessonsRouter = require('../Routes/lessons-routes');
const messagesRouter = require('../Routes/messages-routes');
const Lessons = require('../models/dbHelpers');

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.json({ message : 'Welkome TROiKAS' });
});

app.use('/api/lessons', lessonsRouter);
app.use('/api/messages', messagesRouter);

module.exports = app;
