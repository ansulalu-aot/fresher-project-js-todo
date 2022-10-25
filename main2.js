let form = document.getElementById("exampleModal1")
let tasktitle = document.getElementById("title-text")
let taskdesc = document.getElementById("message-text")
let taskdate = document.getElementById("due-date")
let tasks = document.getElementById("tasks")
let add = document.getElementById("add")
let dlt , edt
let count = document.getElementById("counter")

form.addEventListener("submit",(e)=>{
    e.preventDefault()
    formValidation()
})

function formValidation(){
    if(tasktitle.value === ""){
        console.log('failure') 
    }
    else{
        console.log('success')
        acceptData()
        add.setAttribute("data-bs-dismiss","modal")
        clk()
    }
}

 function clk(){
    add.click()
    add.setAttribute("data-bs-dismiss","")
}

let task = []

let acceptData = () => {
    task.push({
        Title: tasktitle.value,
        Description: taskdesc.value,
        Date: taskdate.value,
        Check: "active"
    })
    console.log(task) 
    count.innerHTML++
    createTask()
    localStorage.setItem("task", JSON.stringify(task))
}

function createTask(){
    tasks.innerHTML = ""
    let size = task.length
    for(i=0;i<size;i++){   
        if(task[i].Check == "active"){                   
        tasks.innerHTML += `
            <div class="d-flex justify-content-between align-items-center border border-1 py-4 my-4">
                <div class="d-flex align-items-center flex-col px-4 gap-4">
                    <div class="form-check ">
                        <input class="form-check-input rounded-circle check" onclick="checkingBox(${i});" style="width: 42px; height:42px" type="checkbox" value="" id="${i}">
                        <label class="form-check-label" for="flexCheckDefault"></label>
                    </div>
                    <div class="row">
                        <p>${task[i].Title} <img  src="Ellipse 1.png"></p>
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
}

function deleteTask(e){
    dlt = e
}

function delete1(){
    task.splice(dlt, 1)
    localStorage.setItem("task", JSON.stringify(task))
    console.log(task)
    count.innerHTML--
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
    localStorage.setItem("task", JSON.stringify(task))
    console.log(task)
}

function resetForm(){
    tasktitle.value = ""
    taskdesc.value = ""
    taskdate.value = ""
}

(() => {
    task = JSON.parse(localStorage.getItem("task"))
    createTask()
    console.log(task)
})()

document.querySelector(".form-select").addEventListener("change",function(){
    if(this.value == 1){
        titlesort()
        localStorage.setItem("task", JSON.stringify(task))
        createTask()
        console.log(task)
    }
    else{
        datesort()
        localStorage.setItem("task", JSON.stringify(task))
        createTask()
        console.log(task)
    }
})

function titlesort(){
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

function datesort(){
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

// let searchtitle = document.querySelector(".form-control").value
// document.querySelector(".btn").addEventListener("onkeyup",function(){
//     searchTask()
//     console.log(task)
// })

// function searchTask(){
//     return task.includes(searchtitle)
//     // if(searchtitle in task){
//         // console.log(task)
//     // }
// }

function checkingBox(e){
    var index = document.getElementById(e)
    if(index.checked == true){
        task[e].Check = "completed"
        localStorage.setItem("task", JSON.stringify(task))
    }
    else{
        task[e].Check = "active"
        localStorage.setItem("task", JSON.stringify(task))
    }
    createTask()
    completedTask()
    console.log(task)
}

function completedTask(){
    completed.innerHTML = ""
    let size = task.length
    for(i=0;i<size;i++){   
        if(task[i].Check == "completed"){                   
        completed.innerHTML += `
            <div class="d-flex justify-content-between align-items-center border border-1 py-4 my-4">
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
}

function clearCompletedTask(){
    let size = task.length
    for(k=0;k<size;k++ ){
        if(task[k].Check == "completed")
        {
            task.splice(k,1)
            i--
            console.log(task)
        }
    }
}

function displayAll(){
    document.querySelector('#tasks').style.display = "block";
    document.querySelector('#completed').style.display = "block";
    document.querySelector('#active').style.display = "block";
    document.querySelector('#comp').style.display = "block";
}

function displayActive(){
    document.querySelector('#tasks').style.display = "block";
    document.querySelector('#completed').style.display = "none";
    document.querySelector('#active').style.display = "block";
    document.querySelector('#comp').style.display = "none";
}

function displayCompleted(){
    document.querySelector('#tasks').style.display = "none";
    document.querySelector('#completed').style.display = "block";
    document.querySelector('#active').style.display = "none";
    document.querySelector('#comp').style.display = "block";
}