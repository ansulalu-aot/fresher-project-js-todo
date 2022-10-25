/*------------------------Ansulalu L-------------------------*/

let form = document.getElementById("exampleModal1")
let tasktitle = document.getElementById("title-text")
let taskdesc = document.getElementById("message-text")
let taskdate = document.getElementById("due-date")
let tasks = document.getElementById("tasks")
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
    // localStorage.setItem("task", JSON.stringify(task))
}

function setLocalStorage(){
    localStorage.setItem("task", JSON.stringify(task))
}

function getLocalStorage(){
    task = JSON.parse(localStorage.getItem("task")) || []
}

createTask()
completedTask()

function createTask(){
    tasks.innerHTML = ""
    for(i=0;i<task.length;i++){   
        if(task[i].Check == "active"){                   
        tasks.innerHTML += `
            <div class="d-flex justify-content-between align-items-center border border-1 py-4 my-4" id="product">
                <div class="d-flex align-items-center flex-col px-4 gap-4">
                    <div class="form-check ">
                        <input class="form-check-input rounded-circle check" onclick="checkingBox(${i});" style="width: 42px; height:42px" type="checkbox" value="" id="${i}">
                        <label class="form-check-label" for="flexCheckDefault"></label>
                    </div>
                    <div class="row">
                        <p id="pn">${task[i].Title} <img  src="Ellipse 1.png"></p>
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

function deleteTask(e){
    dlt = e
}

function delete1(){
    task.splice(dlt, 1)
    createTask()
    completedTask()
    setLocalStorage()
    countTask()
    // localStorage.setItem("task", JSON.stringify(task))
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
    // localStorage.setItem("task", JSON.stringify(task))
    console.log(task)
    setLocalStorage()
}

function resetForm(){
    tasktitle.value = ""
    taskdesc.value = ""
    taskdate.value = ""
}

document.querySelector(".form-select").addEventListener("change",function(){
    if(this.value == 1){
        titlesort()
        // localStorage.setItem("task", JSON.stringify(task))
        createTask()
        console.log(task)
        setLocalStorage()
    }
    else{
        datesort()
        // localStorage.setItem("task", JSON.stringify(task))
        createTask()
        console.log(task)
        setlocalStorage()
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

// let searchTask = () => {
//     let searchtitle = document.querySelector(".form-control").value
//     let storeitems = document.getElementById("tasks")
//     let product = document.querySelectorAll("#product")
//     let pname = storeitems.getElementById("pn")
//     for(i=0;i<pname.length;i++){
//         let match = product[i].getElementById('pn')[0]
//         if(match){
//             let textvalue = match.textContent || match.innerHTML
//             if(textvalue.indexOf(searchtitle)> -1){
//                 product[i].style.display = ""
//             }
//             else{
//                 product[i].style.display = "none"
//             }
//         }
//     }
// }

// let searchtitle = document.querySelector(".form-control").value
// searchtitle.addEventListener("onkeyup",function(){
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
        // localStorage.setItem("task", JSON.stringify(task))
    }
    else{
        task[e].Check = "active"
        // localStorage.setItem("task", JSON.stringify(task))
    }
    createTask()
    completedTask()
    setLocalStorage()
    countTask()
    console.log(task)
}

function completedTask(){
    completed.innerHTML = ""
    for(i=0;i<task.length;i++){   
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
    countTask()
}

function clearCompletedTask(){
    for(k=0;k<task.length;k++ ){
        if(task[k].Check == "completed")
        {
            task.splice(k,1)
            k--
            console.log(task)
            setLocalStorage()
            // localStorage.setItem("task", JSON.stringify(task))
        }
    }
    createTask()
    completedTask()
    countTask()
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

// function overDue(){
//     const date = new Date()
//     if(task[i].Date >= date){
        
//     }
//     console.log(date)
// }

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