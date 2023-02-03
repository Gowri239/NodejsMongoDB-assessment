const Task = require('../models/tasks')

const addTask = async(req,res) => {
    try{
        const {taskname,description,priority,status} = req.body
        const projectId = req.params.projectId
        console.log('Project Id:',projectId)
        if(taskname === undefined || description === undefined || priority === undefined || status === undefined){
            return res.status(400).json({message:"Enter all details",success:false})
        }
        const task = await Task.create({taskname,description,priority,status,projectId:projectId})
        console.log(task)
        res.status(201).json({data:task,message:"Expense added successfully",success:true})
    }
    catch(err){
        res.status(500).json({error:err,success:false})
    }
}

const getTasks = async (req,res) => {
    let page = req.params.pageno || 1

    let limit_items = +(req.body.tasksPerPage) || 2;

    let projectId = req.body.projectId
    console.log(projectId)

    console.log(page,limit_items)

    let totalItems 

    try {
        let count = await Task.count({where:{projectId:projectId}})
        totalItems = count ; 
        console.log('count',totalItems)
        console.log(req.user.id)

        let data = await Task.find({projectId: projectId}).skip((page-1)*limit_items).limit(limit_items)
        console.log(data)
        res.status(200).json({data ,
            info: {
              currentPage: page,
              hasNextPage: totalItems > page * limit_items,
              hasPreviousPage: page > 1,
              nextPage: +page + 1,
              previousPage: +page - 1,
              lastPage: Math.ceil(totalItems / limit_items),
            }})
    } catch (error) {
        res.status(500).json({message:'unable to get projects'})
    }


}

module.exports = {addTask,getTasks}
