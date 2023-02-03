const Project = require('../models/projects')

const addProject = async(req,res) => {
    try{
        const {projectname,description,status} = req.body
        console.log(projectname)
        if(projectname === undefined || description === undefined || status === undefined){
            console.log(projectname)
            return res.status(400).json({message:"Enter all details",success:false})
        }
        const project = await Project.create({projectname,description,status,userId:req.user._id})
        console.log(project)
        res.status(201).json({data:project,message:"Expense added successfully",success:true})

    }
    catch(err){
        res.status(500).json({error:err,success:false})
    }
}

const getProjects = async (req,res) => {
    let page = req.params.pageno || 1

    let limit_items = +(req.body.projectsPerPage) || 2;

    console.log(page,limit_items)

    let totalItems 

    try {
        let count = await Project.count({where:{userId:req.user.id}})
        totalItems = count ; 
        console.log('count',totalItems)
        console.log(req.user.id)

        let data = await Project.find({userId: req.user.id}).skip((page-1)*limit_items).limit(limit_items)
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

module.exports = {addProject,getProjects}