/*------------------------Ansulalu L-------------------------*/

let form = document.getElementById("exampleModal1")
let tasktitle = document.getElementById("title-text")
let taskdesc = document.getElementById("message-text")
let taskdate = document.getElementById("due-date")
let tasks = document.getElementById("tasks")
let completed = document.getElementById("completed")
let add = document.getElementById("add")
let dlt , edt
let task = []
let all_counter = document.getElementById("all-counter")
let active_counter = document.getElementById("active-counter")
let completed_counter = document.getElementById("completed-counter")

getLocalStorage()
//form submission
form.addEventListener("submit",(e)=>{
    e.preventDefault()      //prevent page refreshing
    formValidation()        
})
//validating form
function formValidation(){
    if(tasktitle.value === ""){     //check whether the task title is empty or not
        console.log('failure') 
    }
    else{
        console.log('success')
        acceptData()
        add.setAttribute("data-bs-dismiss","modal")
        clk()
    }
}
//dismiss add after submission
function clk(){
    add.click()
    add.setAttribute("data-bs-dismiss","")
}
//pushing datas to array
let acceptData = () => {
    task.push({
        Title: tasktitle.value,
        Description: taskdesc.value,
        Date: taskdate.value,
        Check: "active"
    })
    console.log(task) 
    createTask()
    setLocalStorage()
}

function setLocalStorage(){
    localStorage.setItem("task", JSON.stringify(task))
}

function getLocalStorage(){
    task = JSON.parse(localStorage.getItem("task")) || []
}

createTask()
completedTask()
//creating div for active task
function createTask(){
    tasks.innerHTML = ""
    for(i=0;i<task.length;i++){   
        if(task[i].Check == "active"){                   
        tasks.innerHTML += `
            <div class="d-flex justify-content-between align-items-center border border-1 py-4 my-4 rounded-2 shadow">
                <div class="d-flex align-items-center flex-col px-4 gap-4">
                    <div class="form-check ">
                        <input class="form-check-input rounded-circle check" onclick="checkingBox(${i});" style="width: 42px; height:42px" type="checkbox" value="" id="${i}">
                        <label class="form-check-label" for="flexCheckDefault"></label>
                    </div>
                    <div class="row">
                        <p>${task[i].Title} <img  src="Ellipse 1.png"></p>
                        <p id="date${i}"><i class="bi bi-calendar3 text-secondary"></i> by ${task[i].Date}</p>
                    </div>
                </div>
                <div class="px-3 d-flex gap-4">
                    <i data-bs-toggle="modal" data-bs-target="#exampleModal2" onclick="editTask(${i})" class="bi bi-pencil-fill text-secondary"></i>
                    <i data-bs-toggle="modal" data-bs-target="#exampleModal3" onclick="deleteTask(${i})" class="bi bi-trash text-danger"></i>
                </div>
            </div>  
        `
        overDue(i)
        }  
    }
    resetForm()
    countTask()
}

function deleteTask(e){
    dlt = e
}

function delete1(){
    task.splice(dlt, 1)
    createTask()
    completedTask()
    setLocalStorage()
    countTask()
    console.log(task)
}
 
function editTask(e){
    edt = e
    document.querySelector("#title-text1").value = task[e].Title
    document.querySelector("#message-text1").value = task[e].Description
    document.querySelector("#due-date1").value = task[e].Date
}

function edit(){
    task[edt].Title = document.getElementById("title-text1").value
    task[edt].Description = document.getElementById("message-text1").value
    task[edt].Date = document.getElementById("due-date1").value
    createTask()
    completedTask()
    console.log(task)
    setLocalStorage()
}
//clear the inputs after submission
function resetForm(){
    tasktitle.value = ""
    taskdesc.value = ""
    taskdate.value = ""
}
//checking which type of sorting is to done
document.querySelector(".form-select").addEventListener("change",function(){
    if(this.value == 1){
        titleSort()
        createTask()
        console.log(task)
        setLocalStorage()
    }
    else{
        dateSort()
        createTask()
        console.log(task)
        setLocalStorage()
    }
})
//title sorting
function titleSort(){
    return task.sort(function (a,b){
        if(a.Title.toLowerCase()<b.Title.toLowerCase()){
            return -1
        }
        if(a.Title.toLowerCase()>b.Title.toLowerCase()){
            return 1
        }
        return 0
    })
}
//date sorting
function dateSort(){
    return task.sort(function (a,b){
        if(a.Date < b.Date){
          return -1
        }
        if(a.Date > b.Date){
            return 1
        }
        return 0  
    })
}
//checking the task is active or completed
function checkingBox(e){
    var index = document.getElementById(e)
    if(index.checked == true){
        task[e].Check = "completed"
    }
    else{
        task[e].Check = "active"
    }
    createTask()
    completedTask()
    setLocalStorage()
    countTask()
    console.log(task)
}
//creating div for completed task
function completedTask(){
    completed.innerHTML = ""
    for(i=0;i<task.length;i++){   
        if(task[i].Check == "completed"){                   
        completed.innerHTML += `
            <div class="d-flex justify-content-between align-items-center border border-1 py-4 my-4 rounded-2 shadow">
                <div class="d-flex align-items-center flex-col px-4 gap-4">
                    <div class="form-check ">
                        <input class="form-check-input rounded-circle check" onclick="checkingBox(${i})" style="width: 42px; height:42px" type="checkbox" value="" id="${i}" checked>
                        <label class="form-check-label" for="flexCheckDefault"></label>
                    </div>
                    <div class="row">
                        <p>${task[i].Title} <img src="Ellipse 12.png"></p>
                        <p><i class="bi bi-calendar3 text-secondary"></i> by ${task[i].Date}</p>
                    </div>
                </div>
                <div class="px-3 d-flex gap-4">
                    <i data-bs-toggle="modal" data-bs-target="#exampleModal2" onclick="editTask(${i})" class="bi bi-pencil-fill text-secondary"></i>
                    <i data-bs-toggle="modal" data-bs-target="#exampleModal3" onclick="deleteTask(${i})" class="bi bi-trash text-danger"></i>
                </div>
            </div> 
        `}
    }
    resetForm()
    countTask()
}
//clearing completed task
function clearCompletedTask(){
    for(k=0;k<task.length;k++ ){
        if(task[k].Check == "completed"){        //checking the task is completed or not
            task.splice(k,1)
            k--
            console.log(task)
            setLocalStorage()
        }
    }
    createTask()
    completedTask()
    countTask()
}
//displaying all tab
function displayAll(){
    document.querySelector('#tasks').style.display = "block";
    document.querySelector('#completed').style.display = "block";
    document.querySelector('#active').style.display = "block";
    document.querySelector('#comp').style.display = "block";
}
//displaying active tab
function displayActive(){
    document.querySelector('#tasks').style.display = "block";
    document.querySelector('#completed').style.display = "none";
    document.querySelector('#active').style.display = "block";
    document.querySelector('#comp').style.display = "none";
}
//displaying completed tab
function displayCompleted(){
    document.querySelector('#tasks').style.display = "none";
    document.querySelector('#completed').style.display = "block";
    document.querySelector('#active').style.display = "none";
    document.querySelector('#comp').style.display = "block";
}
//highlighting overdue
function overDue(index) {
    let currentDate = new Date();
    let todoDate = new Date(task[index].Date);
    if(currentDate > todoDate){ 
        document.getElementById(`date${index}`).style.color = " #C03503";
        document.getElementById(`date${index}`).style.backgroundColor = "rgba(192, 53, 3, 0.06)";
    }
}
//displaying counts of each task
function countTask(){
    all_counter.innerHTML = ""
    active_counter.innerHTML = ""
    completed_counter.innerHTML = ""
    for(i=0;i<task.length;i++){
        all_counter.innerHTML++
        if(task[i].Check == "active"){
            active_counter.innerHTML++
        }
        if(task[i].Check == "completed"){
            completed_counter.innerHTML++
        }
    }
}
//search
let filteredArray = []
function searchTask(){
    let searchtitle = document.querySelector(".form-control").value
    result = task.filter(function(x,index){
        ind = (x.Title.toLowerCase().includes(searchtitle))
        if(ind){
            filteredArray.push(index)
           
        }
    })
    tasks.innerHTML = ""
    completed.innerHTML = ""
    for(i=0;i<filteredArray.length;i++){
        activeSearch()
        completedSearch()
    }
    filteredArray = []
}
//searched active 
function activeSearch(){
    if(task[filteredArray[i]].Check == "active"){
        tasks.innerHTML += `
            <div class="d-flex justify-content-between align-items-center border border-1 py-4 my-4 rounded-2 shadow">
                <div class="d-flex align-items-center flex-col px-4 gap-4">
                    <div class="form-check ">
                        <input class="form-check-input rounded-circle check" onclick="checkingBox(${filteredArray[i]})" style="width: 42px; height:42px" type="checkbox" value="" id="${filteredArray[i]}">
                        <label class="form-check-label" for="flexCheckDefault"></label>
                    </div>
                    <div class="row">
                        <p>${task[filteredArray[i]].Title} <img src="Ellipse 1.png"></p>
                        <p id="date${i}"><i class="bi bi-calendar3 text-secondary"></i> by ${task[filteredArray[i]].Date}</p>
                    </div>
                </div>
                <div class="px-3 d-flex gap-4">
                    <i data-bs-toggle="modal" data-bs-target="#exampleModal2" onclick="editTask(${filteredArray[i]})" class="bi bi-pencil-fill text-secondary"></i>
                    <i data-bs-toggle="modal" data-bs-target="#exampleModal3" onclick="deleteTask(${filteredArray[i]})" class="bi bi-trash text-danger"></i>
                </div>
            </div>                
        `
        overDue(filteredArray[i])
    }
}
//searched completed
function completedSearch(){
    if(task[filteredArray[i]].Check == "completed"){
        completed.innerHTML += `
            <div class="d-flex justify-content-between align-items-center border border-1 py-4 my-4 rounded-2 shadow">
                <div class="d-flex align-items-center flex-col px-4 gap-4">
                    <div class="form-check ">
                        <input class="form-check-input rounded-circle check" onclick="checkingBox(${filteredArray[i]})" style="width: 42px; height:42px" type="checkbox" value="" id="${filteredArray[i]}" checked>
                        <label class="form-check-label" for="flexCheckDefault"></label>
                    </div>
                    <div class="row">
                        <p>${task[filteredArray[i]].Title} <img src="Ellipse 12.png"></p>
                        <p><i class="bi bi-calendar3 text-secondary"></i> by ${task[filteredArray[i]].Date}</p>
                    </div>
                </div>
                <div class="px-3 d-flex gap-4">
                    <i data-bs-toggle="modal" data-bs-target="#exampleModal2" onclick="editTask(${filteredArray[i]})" class="bi bi-pencil-fill text-secondary"></i>
                    <i data-bs-toggle="modal" data-bs-target="#exampleModal3" onclick="deleteTask(${filteredArray[i]})" class="bi bi-trash text-danger"></i>
                </div>
            </div>     
        `
    }
}
