import { Request, Response } from 'express'
import User from '../models/User'

export class TeamController {
    static getMemberTeam = async(req: Request, res: Response) => {
        const {user} = req.body
        try {
            const userObject = await User.findOne({$or: [ {email: user}, {username: user}]})

            if(!userObject) {
                const error = new Error('El usuario no existe')
                return res.status(404).send({error: error.message})
            }
            
            // Return only changes the user object
            const userData = {
                _id: userObject.id,
                name: userObject.name,
                surname: userObject.surname,
                username: userObject.username,
                email: userObject.email
            }
            
            return res.status(200).send({user: userData})
            
        } catch (error) {
            res.status(500).send({error: "Error interno."})
        }
    }

    static addMemberToTeam = async (req: Request, res: Response) => {
        const {id} = req.body
        try {
            const userObject = await User.findById(id)

            if(!userObject) {
                const error = new Error('El usuario no existe')
                return res.status(404).send({error: error.message})
            }

            if(req.project.team.some(member => member._id.toString() === userObject.id.toString())){
                const error = new Error('El usuario ya está en el proyecto')
                return res.status(404).send({error: error.message})
            }

            req.project.team.push(userObject.id)
            await req.project.save()

            res.send("Usuario agregado correctamente al proyecto")
            
        } catch (error) {
            res.status(500).send({error: "Error interno."})
        }
    }

    static deleteMemberFromTeam = async (req: Request, res: Response) => {
        const {id} = req.body
        try {
            const userObject = await User.findById(id)

            if(!userObject) {
                const error = new Error('El usuario no existe')
                return res.status(404).send({error: error.message})
            }
            
            const userExists = req.project.team.some(member => member._id.toString() === userObject.id.toString())

            if(!userExists){
                const error = new Error('El usuario no está en el proyecto')
                return res.status(404).send({error: error.message})
            }

            req.project.team = req.project.team.filter(member => member._id.toString() !== userObject.id.toString())
            await req.project.save()

            res.send("Usuario eliminado correctamente del proyecto")
            
        } catch (error) {
            res.status(500).send({error: "Error interno."})
        }
    }

    static getTeamMembers = async (req: Request, res: Response) => {
        try {
            const {team} = await req.project.populate('team', 'id name surname username email')
           return res.send({team: team})
        } catch (error) {
            
        }
    }
}