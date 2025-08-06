import { z } from 'zod'

/* Auth & Users */
const AuthSchema = z.object({
    name: z.string(),
    email: z.string().email(),
    surname: z.string(),
    username: z.string(),
    password: z.string(),
    password_confirmation: z.string(),
    user: z.string()
})

type Auth = z.infer<typeof AuthSchema>

export type UserLoginForm = Pick<Auth, 'user' | 'password'>
export type UserRegistrationForm = Pick<Auth, 'name' | 'email' | 'surname' | 'username' | 'password' | 'password_confirmation'>

/* Tasks */
export const TaskStatusSchema = z.enum(
    ["pending", "onHold", "inProgress", "underReview", "completed"]
)
export type TaskStatus = z.infer<typeof TaskStatusSchema>

export const TaskSchema = z.object({
    _id: z.string(),
    name: z.string(),
    description: z.string(),
    project: z.string(),
    status: TaskStatusSchema,
    updatedAt: z.string(),
    createdAt: z.string()
})

export const TaskDeletedSchema = z.object({
    deleted: z.boolean(),
    project: TaskSchema
})

export type TaskType = z.infer<typeof TaskSchema>
export type TaskFormType = Pick<TaskType, 'name' | 'description'>

/* Projects */
export const ProjectSchema = z.object({
    _id: z.string(),
    name: z.string(),
    client: z.string(),
    description: z.string(),
    tasks: z.array(TaskSchema),

})

export const ProjectsSchema = z.array(
    ProjectSchema.pick({
        _id: true,
        name: true,
        client: true,
        description: true
    })
)

export const ProjectDeletedSchema = z.object({
    deleted: z.boolean(),
    project: ProjectSchema
})

export type ProjectType = z.infer<typeof ProjectSchema>

export type ProjectFormType = Pick<ProjectType, 'name' | "client" | "description">
