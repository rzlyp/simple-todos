const express = require('express');
const router = express.Router();

const Todo = require('../controller/Todo');

router.get('/todo',Todo.getTodo);
router.post('/todo',Todo.addTodo);
router.delete('/todo/:id',Todo.removeTodo);

module.exports = router;