const express = require('express');
const Lessons = require('../models/dbHelpers');

const router = express.Router();

router.post('/', (req, res) => {
    Lessons.add(req.body)
    .then(lesson => {
        res.status(200).json(lesson);
    })
    .catch(error => {
        res.status(500).json({ message: `Cannot add lesson: ${error}` });
    });
});

router.get('/', (req, res) => {
    Lessons.find()
    .then(lessons => {
        res.status(200).json(lessons);
    })
    .catch(error => {
        res.status(500).json({ message: `Cannot find lessons: ${error}` });
    });
});

router.get('/:id', (req, res) => {
    Lessons.findById(req.params.id)
    .then(lesson => {
        if(lesson){
        res.status(200).json(lesson);
    } else {
        res.status(404).json({ message: `Cannot find lesson with id:  ${req.params.id}` });
    }
    })
    .catch(error => {
        res.status(500).json({ message: `Unable to perfom operation: ${error}` });
    });
});

router.delete('/:id', (req, res) => {
    Lessons.remove(req.params.id)
    .then(count => {
        if(count > 0){
        res.status(200).json({ message: `lesson with id:  ${req.params.id} deleted` });
    } else {
        res.status(404).json({ message: `Cannot find lesson with id:  ${req.params.id}` });
    }
    })
    .catch(error => {
        res.status(500).json({ message: `Unable to perfom operation: ${error}` });
    });
});

router.patch('/:id', (req, res) => {
    Lessons.update(req.params.id, req.body)
    .then(lesson => {
        if(lesson){
            res.status(200).json(lesson);
        } else {
            res.status(404).json({ message: `Lesson width id: ${id} not exist` });
        }
    })
    .catch(error => {
        res.status(500).json({ message: 'Unable to perfom operation' });
    });
});

// messages
router.post('/:id/messages', (req, res) => {
    const { id } = req.params;
    const msg = req.body;

    if(!msg.lesson_id){
        msg['lesson_id'] = parseInt(id, 10);
    }

    Lessons.findById(id)
    .then(lesson => {
        if(!lesson){
        res.status(404).json({ message: `Invalid id ${id}` });
    }
    // Check for all require fields
    if(!msg.sender || !msg.text){
        rest.status(400).json({ message: 'Sender and Text required!!!' });
    }

    Lessons.addMessage(msg, id)
    .then(message => {
        if(message){
            res.status(200).json(message);
        }
    })
    .catch(error => {
        res.status(500).json({ message: `Failed to add message. ${error}` });
    })
    })
    .catch(error => {
        res.status(500).json({ message: 'Error finding lesson'});
    });

});

router.get('/:id/messages', (req, res) => {
    const { id } = req.params;

    Lessons.findLessonMessages(id)
    .then(lessons => {
        res.status(200).json(lessons);
    })
    .catch(error => {
        res.status(500).json({ message: `Can get messages ${error}` });
    })
});

module.exports = router;
