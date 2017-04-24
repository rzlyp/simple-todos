import React , { Component, PropTypes } from 'react';
import { render } from 'react-dom';
import  axios  from 'axios';

console.clear();
const Header = () => {
	return (
			<nav className="navbar navbar-default">
			 <div className="navbar-header">
		      <a className="navbar-brand" href="#">Simple Todo App</a>
		    </div>
		    </nav>
		);
}
const Title = ({todoCount}) => {
	return (
			<div>
				<div>	
					<h2> Todo ({todoCount}) </h2>
				</div>
			</div>
		);
}

const TodoForm = ({addTodo}) => {
	let input;

	return (
			<form onSubmit={(e)=>{
				e.preventDefault();
				addTodo(input.value);
				input.value= '';
			}}>
			<input className="form-control col-md-12" ref={node=>{
				input = node;
			}} />
			<br />
			</form>
		);
};

const Todo = ({todo, remove}) => {
	return (<a href="/public/#" className="list-group-item" onClick={()=>{remove(todo._id)}}>
		{todo.text}
	</a>);
};

const TodoList = ({todos, remove}) => {
	const todoNode = todos.map((todo)=>{
		return (<Todo todo={todo} key={todo._id} remove={remove} />);
	});

	return (<div className="list-group" style={{marginTop : '30px'}}>
			{todoNode}
			</div>
			);
};

window._id = 0;

class TodoApp extends React.Component{
	constructor(props){
		super(props);

		this.state = {
			data : []
		}
		this.apiUrl = 'http://localhost:3000/api/todo';
	}

	componentDidMount(){
		axios.get(this.apiUrl).then((res)=>{
			console.log(res.data);
			this.setState({data:res.data});

		});
	}

	addTodo(val){
		const todo = {text : val}

		axios.post(this.apiUrl, todo).then((res)=>{
			this.state.data.push(res.data);
			this.setState({data:this.state.data});
		});
	}

	handleRemove(id){
		console.log(id);
		const reminder = this.state.data.filter((todo) => {
			if(todo._id !== id) return todo;
		});

		axios.delete(this.apiUrl+'/'+id).then((res) => {
			console.log(res);
			this.setState({data:reminder});
		});
	}

	render(){
		return (
				<div>
					<Header />
					<Title todoCount={this.state.data.length} />
					<TodoForm addTodo={this.addTodo.bind(this)} />
					<TodoList 
						todos={this.state.data}
						remove = {this.handleRemove.bind(this)}
					/>
				</div>	
			);
	}
}
render(<TodoApp />, document.getElementById('container'));