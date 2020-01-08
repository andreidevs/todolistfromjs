let butAdd = document.querySelector(".add"),
	edit = document.querySelector(".message"),
	todo = document.querySelector(".todo"),
	menu = document.querySelector(".menu"),
	butDelete = document.getElementById("btn-delete"),
	butImportant = document.getElementById("btn-important"),
	butEdit = document.getElementById("btn-edit"),
	butChange = document.querySelector(".edit"),
	butDeleteAll = document.querySelector(".deleteAll");

let toDoList = [];
let eventt, changetItem=0;
edit.value = "";

butAdd.addEventListener("click", ()=>{
	let newToDo ={
		todo: edit.value,
		checked: false,
		important: false,
		id: null
	};

toDoList.push(newToDo);
addnewMessage();
saveLS();
edit.value = "";
});


function addnewMessage(){
	let message ="";
	toDoList.forEach( function(item, i) {
		toDoList[i].id = getRandom(0,25)+i;
 message += ` 
<li class="collection-item itemlist"> 
<label class="">
<input type="checkbox" class="Yellow" id ="item_${toDoList[i].id}" ${item.checked ? "checked" : ""}>
<span></span>
</label>
<p class ="flow-text  ${item.important ? "important" : "" } id="item__${toDoList[i].id}">${item.todo}</p>
</li>

`;
// console.log(toDoList[i].id);
todo.innerHTML = message;
});

}

function saveLS(){
	localStorage.setItem("todo", JSON.stringify(toDoList));
}


function setName(){
if(localStorage.getItem("name") ){
document.querySelector("h1").innerHTML = localStorage.getItem("name");

} else {
let name = prompt("Введите название списка");
document.querySelector("h1").innerHTML = name;
localStorage.setItem("name", name);
}
}


function deleteName(){
if(localStorage.getItem("name")){
localStorage.removeItem("name");
}

}















