import { Router } from 'express'
import { ProjectController } from '../controllers/ProjectController'
import { body, param } from 'express-validator'
import { handleInputError } from '../middlewares/validation'
import { TaskController } from '../controllers/TaskController'
import { validateProjectExists } from '../middlewares/project'
import { taskStatusValues } from '../models/Task'
import { taskBelongsToProject, validateTaskExists } from '../middlewares/task'

const router = Router()

router.get('/', ProjectController.getAllProjects)

router.get('/:projectId', 
    param('projectId').isMongoId().withMessage("El id no es válido"),
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

router.put('/:projectId',
    param('projectId').isMongoId().withMessage("El id no es válido"),
    body('name').notEmpty().withMessage("El nombre del proyecto es obligatorio"),
    body('client').notEmpty().withMessage("El nombre del cliente es obligatorio"),
    body('description').notEmpty().withMessage("La descripción del proyecto es obligatoria"),
    handleInputError,
    ProjectController.updateProject
)


router.delete('/:projectId',
    param('projectId').isMongoId().withMessage("El id no es válido"),
    handleInputError,
    ProjectController.deleteProject
)


/** Tareas */

router.param('projectId', validateProjectExists)

router.get('/:projectId/tasks',
    param('projectId').isMongoId().withMessage("El id no es válido"),
    handleInputError,
    TaskController.getProjectTasks
)

router.post('/:projectId/tasks',
    param('projectId').isMongoId().withMessage("El id no es válido"),
    body('name').notEmpty().withMessage("El nombre del proyecto es obligatorio"),
    body('description').notEmpty().withMessage("El nombre del cliente es obligatorio"),
    handleInputError,
    TaskController.createTask
)

router.param('taskId', validateTaskExists)
router.param('taskId', taskBelongsToProject)

router.get('/:projectId/tasks/:taskId',
    param('projectId').isMongoId().withMessage("El id del proyecto no es válido"),
    param('taskId').isMongoId().withMessage("El id de la tarea no es válido"),
    handleInputError,
    TaskController.getTaskByID
)


router.put('/:projectId/tasks/:taskId',
    param('projectId').isMongoId().withMessage("El id del proyecto no es válido"),
    param('taskId').isMongoId().withMessage("El id de la tarea no es válido"),
    body('name').notEmpty().withMessage("El nombre del proyecto es obligatorio"),
    body('description').notEmpty().withMessage("El nombre del cliente es obligatorio"),
    handleInputError,
    TaskController.updateTask
)


router.delete('/:projectId/tasks/:taskId',
    param('projectId').isMongoId().withMessage("El id del proyecto no es válido"),
    param('taskId').isMongoId().withMessage("El id de la tarea no es válido"),
    handleInputError,
    TaskController.deleteTask
)

router.patch('/:projectId/tasks/:taskId',
    param('projectId').isMongoId().withMessage("El id del proyecto no es válido"),
    param('taskId').isMongoId().withMessage("El id de la tarea no es válido"),
    body('status')
        .notEmpty().withMessage("El estado es obligatorio").isIn(taskStatusValues).withMessage("Estado no válido"),
    handleInputError,
    TaskController.changeStatus
)


export default router