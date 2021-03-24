const express = require('express');
const Lessons = require('../models/dbHelpers');

const router = express.Router();

router.get('/', (req, res) => {
    Lessons.findAllMessages()
    .then(messages => {
        res.status(200).json(messages);
    })
    .catch(error => {
        res.status(500).json({ message: `Cannot find messages: ${error}` });
    });
});

router.delete('/:id', (req, res) => {
    const { id } = req.params;

    Lessons.removeMessage(id)
    .then(count => {
        if(count > 0) {
            res.status(200).json({ message: `Message with id ${id} Deleted`})
        } else {
            req.status(404).json({ message: `There is no message with ${id}!!`})
        }
    })
    .catch(error => {
        res.status(500).json({ message: `Can find message ${error}` })
    });
});

module.exports = router;
