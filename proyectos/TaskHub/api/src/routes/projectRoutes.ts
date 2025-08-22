import { Router } from 'express'
import { ProjectController } from '../controllers/ProjectController'
import { body, param } from 'express-validator'
import { handleInputError } from '../middlewares/validation'
import { TaskController } from '../controllers/TaskController'
import { validateProjectExists } from '../middlewares/project'
import { taskStatusValues } from '../models/Task'
import { hasAuthorization, taskBelongsToProject, validateTaskExists } from '../middlewares/task'
import { authenticate } from '../middlewares/auth'
import { TeamController } from '../controllers/TeamController'
import { NoteController } from '../controllers/NoteController'
import { noteBelongsToTask, validateNoteExists } from '../middlewares/note'

const router = Router()

router.use(authenticate)
router.get('/', 
        ProjectController.getAllProjects
)

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


router.param('projectId', validateProjectExists)

router.put('/:projectId',
    hasAuthorization,
    param('projectId').isMongoId().withMessage("El id no es válido"),
    body('name').notEmpty().withMessage("El nombre del proyecto es obligatorio"),
    body('client').notEmpty().withMessage("El nombre del cliente es obligatorio"),
    body('description').notEmpty().withMessage("La descripción del proyecto es obligatoria"),
    handleInputError,
    ProjectController.updateProject
)


router.delete('/:projectId',
    hasAuthorization,
    param('projectId').isMongoId().withMessage("El id no es válido"),
    handleInputError,
    ProjectController.deleteProject
)


/** Tareas */


router.get('/:projectId/tasks',
    param('projectId').isMongoId().withMessage("El id no es válido"),
    handleInputError,
    TaskController.getProjectTasks
)

router.post('/:projectId/tasks',
    hasAuthorization,
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
    hasAuthorization,
    param('projectId').isMongoId().withMessage("El id del proyecto no es válido"),
    param('taskId').isMongoId().withMessage("El id de la tarea no es válido"),
    body('name').notEmpty().withMessage("El nombre del proyecto es obligatorio"),
    body('description').notEmpty().withMessage("El nombre del cliente es obligatorio"),
    handleInputError,
    TaskController.updateTask
)


router.delete('/:projectId/tasks/:taskId',
    hasAuthorization,
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

/** Teams */
router.post('/:projectId/team/find',
    body('user').notEmpty().withMessage('El usuario a buscar es obligatorio'),
    param('projectId').isMongoId().withMessage("El id del proyecto no es válido"),
    handleInputError,
    TeamController.getMemberTeam
)

router.post('/:projectId/team/',
    body('id').isMongoId().withMessage('El id del usuario no es válido'),
    param('projectId').isMongoId().withMessage("El id del proyecto no es válido"),
    handleInputError,
    TeamController.addMemberToTeam
)

router.post('/:projectId/team/deleteMember',
    body('id').isMongoId().withMessage('El id del usuario no es válido'),
    param('projectId').isMongoId().withMessage("El id del proyecto no es válido"),
    handleInputError,
    TeamController.deleteMemberFromTeam
)

router.get('/:projectId/team',
    param('projectId').isMongoId().withMessage("El id del proyecto no es válido"),
    handleInputError,
    TeamController.getTeamMembers
)

/** Notas */
router.post('/:projectId/tasks/:taskId/notes',
    body('text').notEmpty().withMessage("El texto de la nota es obligatorio"),
    param('projectId').isMongoId().withMessage("El id del proyecto no es válido"),
    param('taskId').isMongoId().withMessage("El id de la tarea no es válido"),
    handleInputError,
    NoteController.createNote
)


router.get('/:projectId/tasks/:taskId/notes',
    param('projectId').isMongoId().withMessage("El id del proyecto no es válido"),
    param('taskId').isMongoId().withMessage("El id de la tarea no es válido"),
    handleInputError,
    NoteController.getNotes
)

router.param('noteId', validateNoteExists)
router.param('noteId', noteBelongsToTask)


router.delete('/:projectId/tasks/:taskId/notes/:noteId',
    param('projectId').isMongoId().withMessage("El id del proyecto no es válido"),
    param('taskId').isMongoId().withMessage("El id de la tarea no es válido"),
    param('noteId').isMongoId().withMessage("El id de la nota no es válido"),
    handleInputError,
    NoteController.deleteNote
)

export default router