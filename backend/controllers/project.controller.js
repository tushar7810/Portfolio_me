import { v2 as cloudinary } from 'cloudinary'
import { Project } from '../models/project.model.js'
import { catchAsyncErrors } from '../middleware/catchAsyncError.js'
import ErrorHandler from '../middleware/error.js'

export const addProject = catchAsyncErrors(async (req, res, next) => {
    if (!req.files || Object.keys(req.files).length === 0) {
        return next(new ErrorHandler("Project Banner Image required", 400))
    }

    const {
        title,
        description,
        gitRepoLink,
        projectLink,
        technologies,
        stack,
        deployed
    } = req.body

    const { projectBanner } = req.files

    if (!title) {
        return next(new ErrorHandler("Project title required!", 400))
    } else if (!description) {
        return next(new ErrorHandler("Project description required!", 400))
    } else if (!gitRepoLink) {
        return next(new ErrorHandler("GitHub repository link required!", 400))
    }


    const cloudinaryResForProject = await cloudinary.uploader.upload(
        projectBanner.tempFilePath,
        {
            folder: "Project-Banner"
        }
    )

    if (!cloudinaryResForProject || cloudinaryResForProject.error) {
        console.error(
            "cloudinaryResForProject error",
            cloudinaryResForProject.error || "Unknown cloudinary error"
        );
    }

    const project = await Project.create({
        title,
        description,
        gitRepoLink,
        projectLink,
        technologies,
        stack,
        deployed,
        projectBanner: {
            public_id: cloudinaryResForProject.public_id,
            url: cloudinaryResForProject.secure_url
        }
    })

    return res.status(200).json({
        success: true,
        message: "Project added successfully",
        project
    })
})
export const updateProject = catchAsyncErrors(async (req, res, next) => {
    try {
        const { id } = req.params
        const project = await Project.findById(id)
        const {
            title,
            description,
            gitRepoLink,
            projectLink,
            technologies,
            stack,
            deployed
        } = req.body

        if (title) project.title = title
        if (description) project.description = description
        if (gitRepoLink) project.gitRepoLink = gitRepoLink
        if (projectLink) project.projectLink = projectLink
        if (technologies) project.technologies = technologies
        if (stack) project.stack = stack
        if (deployed) project.deployed = deployed

        if (req.files && req.files.projectBanner) {

            const projectBanner = req.files.projectBanner
            const projectBannerId = project.projectBanner.public_id

            await cloudinary.uploader.destroy(projectBannerId)

            const newProjectBanner = await cloudinary.uploader.upload(
                projectBanner.tempFilePath,
                {
                    folder: "Project-Banner"
                }
            )

            project.projectBanner = {
                public_id: newProjectBanner.public_id,
                url: newProjectBanner.secure_url
            }
        }

        await project.save()

        return res.status(200).json({
            success: true,
            message: "Project updated successfully",
            project
        })

    } catch (error) {
        console.log("Error occured in Update Projec Control", error);
    }

})

export const deleteProject = catchAsyncErrors(async (req, res, next) => {
    try {
        const id = req.params._id
        const project = await Project.findOne(id)

        if (!project) {
            return next(new ErrorHandler("Project not found!", 404))
        }

        await project.deleteOne()

        return res.status(200).json({
            success: true,
            message: "Project deleted successfully",
            project
        })
    } catch (error) {
        console.log("Error occured in delete project control", error);
    }
})
export const getAllProject = catchAsyncErrors(async (req, res, next) => {
    const projects = await Project.find()
    res.status(200).json({
        success: true,
        message: "All projects fetched",
        projects
    })
})

export const getSingleProject = catchAsyncErrors(async(req,res,next) => {
    const id = req.params.id
    const project = await Project.findById(id)

    return res.status(200).json({
        success: true,
        message: "Project found successfully",
        project
    })
})