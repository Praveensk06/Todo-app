'use Strict'


// get elements

const todoEl = document.getElementById('todo');
const quantityEl = document.getElementById('quantity');

const formEl = document.getElementById('submit-form');
const todoLiEl = document.getElementById('todo-list');
const btnEl= document.getElementById('btn-submit');

let tasks = [];
let isEditing = false;
let editId = null;


// function 
function init(){
  
  isEditing = false;
  editId = null;
  btnEl.innerText = 'submit';
}
init();


// update ui 
const updateUi = function(){
  todoLiEl.innerHTML= null;
   tasks.forEach((task)=>{
    const taskEl = document.createElement('li');
    taskEl.innerHTML= `${task.taskName}<button class="btn-update"onclick = updateItem(${task.id}) ><i class="fa-solid fa-pen-to-square update"></i></button>
     <button class="btn-delete" onclick = deleteItem(${task.id})><i class="fa-solid fa-trash delete"></i></button>`;
    todoLiEl.appendChild(taskEl);
    
  })
};

// delete function
const deleteItem = function(id){
  tasks =tasks.filter(task =>{
    return task.id !== id ;
  });
  updateUi();

};
const updateItem = function(id){
  isEditing = true;
  btnEl.innerText='update';

  // find the element to update 
  const itemToEdit = tasks.find((task)=>{
    return task.id === id;
  });
  
  todoEl.value = itemToEdit.taskName;
  editId = itemToEdit.id;

};




// event listeners form

formEl.addEventListener('submit' , function(event){
  event.preventDefault();

  
  const title = todoEl.value;

  if(isEditing){
    tasks = tasks.map((task)=>{
      if(task.id === editId){
        return{
          id:editId,
          taskName:title,
        };
      }else{
        return task ;
      }
    });

    // initial setting
    init();
    // update ui 
    updateUi()

  }else{
    
    // create task object
    const task = {
      // create random id's
      id:Date.now(),
      taskName:title,
    };

    // add task obj to array
    tasks.push(task);

   

  }
   // display item to ui 
   updateUi();
    
   // clean todo input 
   todoEl.value = null;
  

});
