 const taskInput = document.querySelector(".task-input input");
 const filters = document.querySelectorAll(".filter span"),
 clearAll = document.querySelector(".clear-btn"),
 taskbox = document.querySelector(".task-box");

 let editId;
 let isedittable =false;
 let todos = JSON.parse(localStorage.getItem("todo-list"));


//step7 

filters.forEach(btn=>{
    btn.addEventListener("click",()=>{
        document.querySelector("span.active").classList.remove("active");
        btn.classList.add("active");
        showToDoList(btn.id)
    })
})


 //step2

 function showToDoList(filter){
    let li="";
        if(todos){
            todos.forEach((todo, id)=>{
                let isCompleted = todo.status == "completed" ? "checked" : "";
                if(filter == todo.status || filter == "all"){

                    li +=`
                    <li class="task">
                            <label for="${id}">
                            <input onclick ="updateStatus(this)" type="checkbox" id="${id}"${isCompleted} }>
                            <p class="${isCompleted}">${todo.name}</p>
                        </label>
                        <div class="settings">
                       
                            <ul class="task-menu">
                                <li onclick='editTask(${id},"${todo.name}")' class="edit">Edit</li>
                                <li onclick='deleteTask(${id})' class="delete">Delete</li>
                            </ul>
                        </div>
                    </li> 
                    `;
                }
               
            });
        }
    taskbox.innerHTML = li|| `<span>You Don't have any task here</span>`;
 }
 showToDoList(all);

 clearAll.addEventListener("click",()=>{
    todos.splice(0, todos.length);
    localStorage.setItem("todo-list", JSON.stringify(todos));
    showToDoList("all");
 })
//step 5
function deleteTask(deletedId){
    todos.splice(deletedId,1);
    localStorage.setItem("todo-list", JSON.stringify(todos));
    showToDoList("all");
}

function editTask(taskId , taskName){
    editId=taskId;
    isedittable = true;
    taskInput.value =taskName;

      
}
 //step3

 function updateStatus(selectedTask){

    let taskName = selectedTask.parentElement.lastElementChild;
    if(selectedTask.checked){
        taskName.classList.add("checked");
        todos[selectedTask.id].status ="completed";
    }else{
        taskName.classList.remove("checked");
        todos[selectedTask.id].status= "pending";
    }
    localStorage.setItem("todo-list", JSON.stringify(todos));
   
    
 }

 //step1

 taskInput.addEventListener("keyup",e=>{
    let userTask = taskInput.value.trim();
    

    if(e.key == "Enter" && userTask){
        if(!isedittable){
            if(!todos){
                todos=[];
    
            }
            let taskInfo ={name:userTask, status:"pending"};
            todos.push(taskInfo);
        }else{
            todos[editId].name=userTask;
        }
       
       
        taskInput.value ="";
        localStorage.setItem("todo-list", JSON.stringify(todos));

        showToDoList("all");
    }
    
 })