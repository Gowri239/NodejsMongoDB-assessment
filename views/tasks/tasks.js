
const form = document.getElementById('task-form')
const taskDiv = document.getElementById('task-div');
const pagination = document.getElementById('pagination');
const perpage = document.getElementById('perpage');
var filter = document.getElementById('filter'); 
filter.addEventListener('keyup',filterItems);

let tasksPerPage = Number(localStorage.getItem('tasksperpage'));
const projectId = localStorage.getItem('clickedProject')

let token = localStorage.getItem('token');
window.addEventListener('DOMContentLoaded' , loadScreen);

async function loadScreen(e){
    e.preventDefault();
    let page = 1  ;
    tasksPerPage = 2;
           
    getLoadTasks(page,tasksPerPage) ;           
}

async function getLoadTasks(page,tasksPerPage){
    try {
        console.log(page)
        let response = await axios.post(`http://localhost:3000/task/${page}` ,{tasksPerPage:tasksPerPage,projectId:projectId},{headers:{"Authorization" : token}})
        console.log(response.data)
        showTaskOnScreen(response.data.data)
        showPagination(response.data.info)
        } catch (error) {
            console.log(error);
        }
}

perpage.addEventListener('submit' , (e)=>{
    e.preventDefault();
    localStorage.setItem('tasksperpage' , +e.target.tasksPerPage.value )
    tasksPerPage = localStorage.getItem('tasksperpage')
    getLoadTasks(1 , +e.target.tasksPerPage.value);
})

function showTaskOnScreen(data){

    taskDiv.innerHTML =''
                
    data.map(data=>{ 
        const child = `<li class="list" id=${data._id}>
                        <span class="task-info"> ${data.taskname} -${data.description} -${data.priority} -${data.status}</span>
                      </li>`
                
        taskDiv.innerHTML += child
    })
}

function showPagination({currentPage,hasNextPage,hasPreviousPage,nextPage,previousPage,lastPage}){
    
    pagination.innerHTML ='';
    
    if(hasPreviousPage){
        const button1 = document.createElement('button');
        button1.innerHTML = previousPage ;
        button1.addEventListener('click' , ()=>getLoadTasks(previousPage,tasksPerPage))
        pagination.appendChild(button1)
    }
    
    const button2 = document.createElement('button');
    button2.classList.add('active')
    button2.innerHTML = currentPage ;
    button2.addEventListener('click' , ()=>getLoadTasks(currentPage,tasksPerPage))
    pagination.appendChild(button2)

    if(hasNextPage){
        const button3 = document.createElement('button');
        button3.innerHTML = nextPage ;
        button3.addEventListener('click' , ()=>getLoadTasks(nextPage,tasksPerPage))
        pagination.appendChild(button3)
    }

    if( currentPage!=lastPage && nextPage!=lastPage && lastPage != 0){
        const button3 = document.createElement('button');
        button3.innerHTML = lastPage ;
        button3.addEventListener('click' , ()=>getLoadTasks(lastPage,tasksPerPage))
        pagination.appendChild(button3)
    }
}

form.addEventListener('submit' , addTask)

async function addTask(e){
    try{
        e.preventDefault()
        const obj = {
            projectname: e.target.taskname.value,
            description: e.target.description.value,
            priority: e.target.priority.value,
            status: e.target.status.value
        }
        console.log(obj)
        const response  = await axios.post(`http://localhost:3000/task/add-task/${projectId}`,obj,{headers: {"Authorization": token}})
        console.log(response.data)
        if(response.status===201){
            addTaskOnscreen(response.data.data)
        }
    }
    catch(err){
        document.body.innerHTML += `<div style="color:red;">${err.message}</div>`
    } 
}

function addTaskOnscreen(data){
    console.log('data',data)
    const child = `<li class="list" id=${data._id}>
                        <span class="task-info"> ${data.taskname} -${data.description} -${data.priority} -${data.status}</span>
                      </li>`
                
    taskDiv.innerHTML += child
}


function filterItems(e) {
    const text= e.target.value.toLowerCase();
    const tasks =taskDiv.getElementsByTagName('li');
    // Convert to an array
    Array.from(tasks).forEach(function(task){
        const taskName = task.textContent;
        if(taskName.toLowerCase().indexOf(text) != -1){
            task.style.display = 'block';
        }
        else {
            task.style.display = 'none';
        }
    });
}


document.getElementById('home').onclick = function(e){
    e.preventDefault()
    window.location.href = '../projects/projects.html'
    localStorage.removeItem('clickedProject')
}



