import React from 'react';
import ReactDOM from 'react-dom';

var todoId = 0;

const EntryField = (props) =>
(
	<div id="todo_entry">
		<form onSubmit={props.addTodo}>
			<input type="text" ref={props.entryfieldref} id="entry_field" name="entry_field" placeholder="Enter new todo"/>
			<input type="submit" value="Add"/>
		</form>
	</div>
);

const EditModal = (props) => 
{
	if(!props.show)
		return null;

	return(
		<div id="modal_container">
			<div id="edit_modal">
				<h3>Edit Todo</h3>
				<input type="text" ref={props.editfieldref} name="edit_text" defaultValue={props.reqItem.text} />
				<button id="edit_finish_btn" onClick={props.changeHandler}>Done</button>
			</div>
		</div>
		);
}

class App extends React.Component
{
	constructor(props)
	{
		super(props);
		this.state = {
			todos: [],
			modalShow: false,
			modalObject: {}
		};

		this.processTodos = this.processTodos.bind(this);
		this.editTodo = this.editTodo.bind(this);
		
	}

	addTodo(event)
	{
		event.preventDefault();
		let newTodo = {
			id: todoId++,
			text: this.entryField.value
		};

		this.entryField.value = "";
		this.setState((prevState) => (
			{
				todos: [...prevState.todos, newTodo]
			}
		));

	}

	processTodos({id, text}, index)
	{
		return(

				<li key={id}>
					<input type="checkbox" name="checkbox" id={id} onChange={this.checkTodo.bind(this, id)}/>
					<span>{text}</span>
					<button id="edit_pencil" onClick={this.showEditModal.bind(this, {id, text}, index)}>&#xe3c9;</button>
				</li>	

			);
	}

	checkTodo(id)
	{
		this.setState((prevState) => ({
			todos: prevState.todos.filter((element) => (element.id !== id))
		}));
	}

	editTodo()
	{

		//Get the changed object
		//Get the current object
		//Replace current with changed object

		let newTodoArray = this.state.todos.concat();
		let editedIndex = this.modalObjectIndex;
		let updatedTodo = {
			id: this.state.modalObject.id,
			text: this.editField.value
		};

		newTodoArray[editedIndex] = updatedTodo;
		this.setState((prevState) =>({
			todos: newTodoArray,
			modalShow: !prevState.modalShow
		}));
	}

	showEditModal(todoObject, modalObjectIndex)
	{
		this.setState((prevState) => (
			{
				modalShow: !prevState.modalShow,
				modalObject: todoObject
			}
		));

		this.modalObjectIndex = modalObjectIndex;

	}

	render()
	{
		return (

			<div>
				<div id="container">
					<EntryField addTodo={this.addTodo.bind(this)} entryfieldref={(el) => (this.entryField = el)}/>
					<ul>
						{  
							this.state.todos.length? this.state.todos.map(this.processTodos): <p>Nothing left to do</p>
						}
					</ul>
				</div>

				<EditModal show={this.state.modalShow} changeHandler={this.editTodo} reqItem={this.state.modalObject} editfieldref={(el)=>(this.editField = el)}/>
			</div>
		);
	}
}



ReactDOM.render(<App/>, document.getElementById('app'));