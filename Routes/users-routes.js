const express = require('express');
const Lessons = require('../models/dbHelpers');

const router = express.Router();

// for all endpoints beginning with /api/users

router.get('/', (req, res) => {
    Lessons.findAllUsers()
    .then(users => {
        res.status(200).json(users);
    })
    .catch(error => {
        res.status(500).json({ message: `Cannot find users: ${error}` });
    });
});

router.get('/:username', (req, res) => {
    Lessons.findUserByUsername(req.params.username)
    .then(user => {
        if(user){
        res.status(200).json(user);
    } else {
        res.status(404).json({ message: `Cannot find user with username:  ${req.params.username}` });
    }
    })
    .catch(error => {
        res.status(500).json({ message: `Unable to perfom operation: ${error}` });
    });
});

module.exports = router;
