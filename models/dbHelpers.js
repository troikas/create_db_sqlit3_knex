const db = require('../dbConfig');

async function add(lesson){
    return await db('lessons').insert(lesson, ['id', 'name']);
}

function find(){
    return db('lessons');
}

function findById(id){
    return db('lessons').where({ id }).first();
}

function remove(id, col){
    return db('lessons').where({ id }).del();
}

function update(id, changes){
    return (
        db('lessons')
        .where({ id })
        .update(changes)
        .then(() => {
            return findById(id);
        })
    );
}

// messages
function findMessageById(id){
    return db('messages').where({ id }).first();
}

async function addMessage(message, lesson_id){
    return await db('messages')
    .where({ lesson_id })
    .insert(message, ['id']);
}

function findLessonMessages(lesson_id){
    return db('lessons as l')
    .join('messages as m', 'l.id', 'm.lesson_id')
    .select(
        'l.id as LessonID',
        'l.name as LessonName',
        'm.id as MessageID',
        'm.sender',
        'm.text'
    )
    .where({ lesson_id });
}

function findAllMessages(){
    return db('messages as m')
    .join('lessons as l', 'l.id', 'm.lesson_id')
    .select(
        'l.id as LessonID',
        'l.name as LessonName',
        'm.id as MessageID',
        'm.sender',
        'm.text'
    );
}

function removeMessage(id){
    return db('messages')
    .where({ id })
    .del();
}

async function addUser(user){
    return await db('users').insert(user, ['id', 'username']);
}

function findAllUsers(){
    return db('users');
}

function findUserByUsername(username){
return db('users').where({ username }).first();
}

module.exports = {
    add,
    find,
    findById,
    remove,
    update,
    addMessage,
    findLessonMessages,
    findAllMessages,
    removeMessage,
    addUser,
    findAllUsers,
    findUserByUsername
}
