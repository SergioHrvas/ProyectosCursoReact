import { Router } from 'express'
import { ProjectController } from '../controllers/ProjectController'
import { body, param } from 'express-validator'
import { handleInputError } from '../middlewares/validation'
import { TaskController } from '../controllers/TaskController'
import { validateProjectExists } from '../middlewares/project'

const router = Router()

router.get('/', ProjectController.getAllProjects)

router.get('/:id', 
    param('id').isMongoId().withMessage("El id no es válido"),
    handleInputError,
    ProjectController.getProjectById
)

router.post('/',
    body('name').notEmpty().withMessage("El nombre del proyecto es obligatorio"),
    body('client').notEmpty().withMessage("El nombre del cliente es obligatorio"),
    body('description').notEmpty().withMessage("La descripción del proyecto es obligatoria"),
    handleInputError,
    ProjectController.createProject
)

router.put('/:id',
    param('id').isMongoId().withMessage("El id no es válido"),
    body('name').notEmpty().withMessage("El nombre del proyecto es obligatorio"),
    body('client').notEmpty().withMessage("El nombre del cliente es obligatorio"),
    body('description').notEmpty().withMessage("La descripción del proyecto es obligatoria"),
    handleInputError,
    ProjectController.updateProject
)


router.delete('/:id',
    param('id').isMongoId().withMessage("El id no es válido"),
    handleInputError,
    ProjectController.deleteProject
)


/** Tareas */


router.get('/:projectId/tasks',
    param('projectId').isMongoId().withMessage("El id no es válido"),
    handleInputError,
    validateProjectExists,
    TaskController.getProjectTasks
)


router.post('/:projectId/tasks',
    param('projectId').isMongoId().withMessage("El id no es válido"),
    validateProjectExists,
    body('name').notEmpty().withMessage("El nombre del proyecto es obligatorio"),
    body('description').notEmpty().withMessage("El nombre del cliente es obligatorio"),
    handleInputError,
    TaskController.createTask
)


export default router