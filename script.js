const inputBox = document.querySelector('#input-box');
const listContainer = document.querySelector('#list-container');
const editBtn = document.querySelector('#edit-btn');
let selectedTask = null;


function addTask(){
   if (inputBox===''){
    alert('You must write something!');
   } else{
    let li= document.createElement('li');
    li.innerHTML = inputBox.value;
    listContainer.appendChild(li);
    let span = document.createElement('span');
    span.innerHTML = "\u00d7";
    li.appendChild(span);
   }
   inputBox.value = '';
   saveData();
}

listContainer.addEventListener('click', function(e){
    e.preventDefault();
    if(e.target.tagName==="LI"){
        e.target.classList.toggle('checked');
        if (selectedTask) {
            selectedTask.classList.remove('selected'); 
        }
        selectedTask = e.target;
        selectedTask.classList.add('selected');
        inputBox.value = selectedTask.firstChild.textContent;
        editBtn.disabled = false;
        saveData();
    }
    else if(e.target.tagName==="SPAN"){
         e.target.parentElement.remove();
         saveData();
    }
},false);


editBtn.addEventListener('click',(e)=>{
    if (selectedTask && inputBox.value !== '') {
        
        selectedTask.firstChild.textContent = inputBox.value;

       
        inputBox.value = '';

       
        editBtn.disabled = true;

        
        selectedTask.classList.remove('selected');
        selectedTask = null;

        saveData(); 
    }
})

function saveData(){
    localStorage.setItem('data',listContainer.innerHTML);
}
function showTask(){
    listContainer.innerHTML = localStorage.getItem('data');
    editBtn.disabled = true;
}

showTask();