const form = document.getElementById('project-form')
const projectDiv = document.getElementById('project-div');
const pagination = document.getElementById('pagination');
const perpage = document.getElementById('perpage');
var filter = document.getElementById('filter'); 
filter.addEventListener('keyup',filterItems);

let projectsPerPage = Number(localStorage.getItem('projectsperpage')) ;

let token = localStorage.getItem('token');
window.addEventListener('DOMContentLoaded' , loadScreen);

async function loadScreen(e){
    e.preventDefault();
    let page = 1  ;
    projectsPerPage = 2;
           
    getLoadProjects(page,projectsPerPage) ;
            
}

async function getLoadProjects(page,projectsPerPage){
    try {
        console.log(page)
        let response = await axios.post(`http://localhost:3000/project/${page}` , {projectsPerPage:projectsPerPage},{headers:{"Authorization" : token}})
        console.log(response.data)
        showProjectOnScreen(response.data.data)
        showPagination(response.data.info)
        } catch (error) {
            console.log(error);
        }
}

perpage.addEventListener('submit' , (e)=>{
    e.preventDefault();
    localStorage.setItem('projectsperpage' , +e.target.projectsPerPage.value )
    projectsPerPage = localStorage.getItem('projectsperpage')
    getLoadProjects(1 , +e.target.projectsPerPage.value);
})

function showProjectOnScreen(data){

    projectDiv.innerHTML =''
                
    data.map(data=>{ 
        const child = `<li class="list" id=${data._id}>
                        <span class="project-info" onclick="openProjectTasks('${data._id}')"> ${data.projectname} -${data.description} - ${data.status}</span>
                      </li>`
                
        projectDiv.innerHTML += child
    })
}

function openProjectTasks(data){
    localStorage.setItem('clickedProject' , data)
    window.location.href = '../tasks/tasks.html'
}

function showPagination({currentPage,hasNextPage,hasPreviousPage,nextPage,previousPage,lastPage}){
    
    pagination.innerHTML ='';
    
    if(hasPreviousPage){
        const button1 = document.createElement('button');
        button1.innerHTML = previousPage ;
        button1.addEventListener('click' , ()=>getLoadProjects(previousPage,projectsPerPage))
        pagination.appendChild(button1)
    }
    
    const button2 = document.createElement('button');
    button2.classList.add('active')
    button2.innerHTML = currentPage ;
    button2.addEventListener('click' , ()=>getLoadProjects(currentPage,projectsPerPage))
    pagination.appendChild(button2)

    if(hasNextPage){
        const button3 = document.createElement('button');
        button3.innerHTML = nextPage ;
        button3.addEventListener('click' , ()=>getLoadProjects(nextPage,projectsPerPage))
        pagination.appendChild(button3)
    }
}

form.addEventListener('submit' , addProject)

async function addProject(e){
    try{
        e.preventDefault()
        const obj = {
            projectname: e.target.projectname.value,
            description: e.target.description.value,
            status: e.target.status.value
        }
        console.log(obj)
        const response  = await axios.post("http://localhost:3000/project/add-project",obj,{headers: {"Authorization": token}})
        console.log(response.data)
        if(response.status===201){
            addProjectOnscreen(response.data.data)
        }
    }
    catch(err){
        document.body.innerHTML += `<div style="color:red;">${err.message}</div>`
    } 
}

function addProjectOnscreen(data){
    console.log('data',data)
    const child = `<li class="list" id=${data._id}>
                        <span class="project-info" onclick="openProjectTasks(${data._id})"> ${data.projectname} -${data.description} - ${data.status}</span>
                      </li>`
                
    projectDiv.innerHTML += child
}


function filterItems(e) {
    const text= e.target.value.toLowerCase();
    const projects =projectDiv.getElementsByTagName('li');
    // Convert to an array
    Array.from(projects).forEach(function(project){
        const projectName = project.textContent;
        if(projectName.toLowerCase().indexOf(text) != -1){
            project.style.display = 'block';
        }
        else {
            project.style.display = 'none';
        }
    });
}


document.getElementById('logout').onclick = function(e){
    window.location.href = '../login/login.html'
}