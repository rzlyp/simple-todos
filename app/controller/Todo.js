const Todo = require('../model/Todo');

function TodoController(){
	this.getTodo = (req, res, next) =>{
		Todo.find({},(err,data)=>{
			if(err)
				console.log(err);

			res.json(data);
		});
	}

	this.addTodo = (req, res, next) => {
		const data = {
			text : req.body.text
		}

		const todo = new Todo(data);
		todo.save((err, data)=>{
			res.json(data);
		});

	}

	this.removeTodo = (req, res, next) => {
		Todo.findOneAndRemove({_id : req.params.id},(err) => {
			if(err)
				console.log(err);

			res.json({message : 'Success'});
		})
	}
}

module.exports = new TodoController();