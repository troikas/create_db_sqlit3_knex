const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const lessonsRouter = require('../Routes/lessons-routes');
const messagesRouter = require('../Routes/messages-routes');
const authRouter = require('../auth/auth-routes');
const usersRouter = require('../Routes/users-routes');
const restricted = require('../auth/restricted-middleware');

const app = express();

app.use(helmet());
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
// app.use(session(sessionConfig));

app.get('/', (req, res) => {
    res.json({ message : 'Welkome TROiKAS' });
});

app.use('/api/auth', authRouter);
app.use('/api/lessons', restricted, lessonsRouter);
app.use('/api/messages', restricted, messagesRouter);
app.use('/api/users', restricted, usersRouter);

module.exports = app;
