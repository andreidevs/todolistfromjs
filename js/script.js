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
let counterComplite=0, counterImportant=0;
let eventt, changetItem=null;





//////////////////////////////////////////////////CONTEXT MENU
todo.addEventListener("contextmenu", (e)=>{
onContextMenu(e);
eventt = e;
});


//////////////////////////////////////////////////NEW ITEM
butAdd.addEventListener("click", ()=>{
	if(edit.value!==""){
	let newToDo ={
		todo: edit.value,
		checked: false,
		important: false,
		id: null
	};
toDoList.push(newToDo);
addnewMessage();
saveLS();
editClear();
}
});

 addnewMessage = () =>{
	let message ="";
	toDoList.forEach((item, i)=> {
		toDoList[i].id = i+1;
 message += ` 
<li class="collection-item itemlist"> 
<label>
<input type="checkbox" ${item.checked ? "checked" : ""} class="Yellow " id ="item_${toDoList[i].id}">
<span></span>
</label>
<p class ="flow-text  ${item.important ? "teal accent-3" : "" }" id="item__${toDoList[i].id}">${item.todo}</p>
</li>

`;
todo.innerHTML = message;
});

};
////////////////////////////////////////////////CHECKED
todo.addEventListener("change", (event)=>{

	toDoList.forEach((item, i)=>{
		if(("item_"+item.id) === event.target.id ){
			
			item.checked = !item.checked;
			saveLS();
			if(item.checked){
				counterComplite++;
			} else {
				counterComplite--;
			}
			
			setCounter();

		}
	});

});


////////////////////////////////////////////////////////DELETE
butDelete.addEventListener("click",	()=>{
toDoList.forEach((item, i)=>{
if(("item__"+item.id) === eventt.target.id){

	if(item.important){
		counterImportant--;
	}
	if(counterComplite){

		counterComplite--;
	}
	setCounter();
toDoList.splice(i, 1);
addnewMessage();
	saveLS();

if(toDoList.length===0){
	todo.innerHTML = "";
}

}

});

});


///////////////////////////////////////////////////////IMPORTANT


butImportant.addEventListener("click", ()=>{
toDoList.forEach((item, i)=>{

if(("item__"+item.id) === eventt.target.id){
item.important = !item.important;
addnewMessage();
	saveLS();
	if(item.important){
		counterImportant++;
	} else{
		counterImportant--;
	}
	
	setCounter();

}
});


});

/////////////////////////////////////////////////EDIT ITEM

butEdit.addEventListener("click", ()=>{

edit.focus();
butAdd.style.display = "none";
butChange.style.display="block";
toDoList.forEach((item, i)=>{

if(("item__"+item.id) === eventt.target.id){
	edit.value = item.todo;

	changetItem = item.id;

}


});
});


butChange.addEventListener("click", ()=>{

butAdd.style.display = "block";
butChange.style.display="none";
  todo.querySelector("#item__"+changetItem ).innerHTML = edit.value;
let checked0, important0;


toDoList.forEach((item, i)=>{

if((item.id) == changetItem){

checked0 = item.checked;
important0 = item.important;	

}

});
let newToDo0 ={
		todo: edit.value,
		checked: checked0,
		important: important0,
		id: changetItem
	};

toDoList.forEach((item, i)=>{
	if((item.id) == changetItem){

toDoList.splice(i, 1, newToDo0);

}
});

saveLS();
editClear();

});
//////////////////////////////////////////////////////////DELETE ALL
butDeleteAll.addEventListener("click", ()=>{
	let isYes = confirm("Вы действительно хотите удалить все?");
if(isYes){
toDoList = [];
saveLS();
todo.innerHTML = "";
clearCounter();
deleteName();
setName();

}
});




///////////////////////////////////////////////////////////////SYSTEM
editClear = () =>{
edit.value = "";	
};

setName = () =>{
	let name;
	while(name =="" || name == null){
 name = prompt("Введите название списка");
document.querySelector("h1").innerHTML = name;
localStorage.setItem("name", name);
}
};

loadLocal = () =>{
if(localStorage.getItem("todo")){
	toDoList = JSON.parse(localStorage.getItem("todo"));
	addnewMessage();
}
document.querySelector("h1").innerHTML = localStorage.getItem("name");


};

deleteName =() =>{
if(localStorage.getItem("name")){
localStorage.removeItem("name");
}

};

mainLoad = () =>{
	if(localStorage.getItem("name") === "null"){
		setName();
	} else {
		loadLocal();
		loadCounter();
	}
};

saveLS = () =>{
	localStorage.setItem("todo", JSON.stringify(toDoList));
	

};
loadCounter = () =>{
	if(localStorage.getItem('counterComplite') || localStorage.getItem('counterImportant')){
	document.querySelector('.counterComplite').innerHTML = localStorage.getItem('counterComplite');
document.querySelector('.counterImportant').innerHTML = localStorage.getItem('counterImportant');
counterImportant = localStorage.getItem('counterImportant');
counterComplite = localStorage.getItem('counterComplite');
} else {
		document.querySelector('.counterComplite').innerHTML = counterComplite;
		document.querySelector('.counterImportant').innerHTML = counterImportant;

}
};
setCounter = () =>{
	document.querySelector('.counterComplite').innerHTML = counterComplite;
	document.querySelector('.counterImportant').innerHTML = counterImportant;
	localStorage.setItem('counterComplite', counterComplite);
	localStorage.setItem('counterImportant', counterImportant);
};

clearCounter = () =>{
	counterComplite=0;
	counterImportant=0;
	setCounter();
};
showMenu =(x, y) =>{
menu.style.left = x + 'px';
menu.style.top = y + 'px';
menu.classList.add('show-menu');
};

 hideMenu =()=>{
menu.classList.remove('show-menu');
};

 onContextMenu =(e) =>{
e.preventDefault();
showMenu(e.pageX, e.pageY);

document.addEventListener('mouseup', onMouseDown, false);
};
 onMouseDown = (e) =>{
hideMenu();

document.removeEventListener('mouseup', onMouseDown);
};




//////////////////////////////////////////////////////EXECUTION
mainLoad();



