const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
	text : String
});

const todo = mongoose.model('Todos',todoSchema);

module.exports = todo;