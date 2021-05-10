const lists = document.querySelectorAll('.list');
let list_items = document.querySelectorAll('.list-item');

function drag(event) {
    event.dataTransfer.setData("div", event.target.id);
}

function allowDrop(event) {
    event.preventDefault();
}

function drop(event) {
	event.preventDefault();
	const data = event.dataTransfer.getData("div");
	event.target.appendChild(document.getElementById(data))
}


function addTask() {
	const todoList = lists[0]
	const title = document.getElementById('task-title').value 
	const description = document.getElementById('task-description').value

	if(title == "") { return }


	const id = window.crypto.getRandomValues(new Uint32Array(2)).join("")


	let task = document.createElement('DIV')
	task.setAttribute('id', id)
	task.setAttribute('class', 'list-item')
	task.setAttribute('draggable', "true")
	task.setAttribute('ondragstart', 'drag(event)')
	task.innerHTML = title
	let desc = document.createElement('P')
	desc.innerHTML = description
	task.appendChild(desc)
	todoList.appendChild(task)
}
