import { z } from 'zod'

const UserId = z.string().uuid()
export type UserId = z.infer<typeof UserId>

/* Auth & Users */
const AuthSchema = z.object({
    name: z.string(),
    email: z.string().email(),
    surname: z.string(),
    username: z.string(),
    password: z.string(),
    password_confirmation: z.string(),
    password_old: z.string(),
    user: z.string(),
    token: z.string()
})

type Auth = z.infer<typeof AuthSchema>

export type UserLoginForm = Pick<Auth, 'user' | 'password'>
export type UserRegistrationForm = Pick<Auth, 'name' | 'email' | 'surname' | 'username' | 'password' | 'password_confirmation'>
export type TokenConfirmation = Pick<Auth, 'token'>
export type RequestConfirmationCodeForm = Pick<Auth, 'user'>
export type ForgotPasswordForm = Pick<Auth, 'user'>
export type NewPasswordForm = Pick<Auth, 'password' | 'password_confirmation'>
export type ChangePasswordForm = Pick<Auth, 'password' | 'password_confirmation' | 'password_old'>
export type CheckPasswordForm = Pick<Auth, 'password'>
export type UserProfileForm = Pick<Auth, 'name' | 'email' | 'surname' | 'username'>

export const UserSchema = AuthSchema.pick({
    name: true,
    surname: true,
    username: true,
    email: true
}).extend({_id: z.string()})

export const UsersSchema = z.array(UserSchema)

export type User = z.infer<typeof UserSchema>
export type TeamMemberForm = Pick<Auth, 'user'>
export type Users = z.infer<typeof UsersSchema>


/* Notes */
export const NoteSchema = z.object({
    _id: z.string(),
    text: z.string(),
    author: UserSchema,
    task: z.string(),
    createdAt: z.string()
})

export const NoteSchemaReduced = NoteSchema.pick({
        author: true,
        text: true,
        _id: true,
        createdAt: true
})

export type Note = z.infer<typeof NoteSchema>
export type NoteFormData = Pick<Note, 'text'>
export type NoteReduced = Pick<Note, 'author' | 'text' | '_id' | 'createdAt'>

/* Tasks */
export const TaskStatusSchema = z.enum(
    ["pending", "onHold", "inProgress", "underReview", "completed"]
)

export const CompletedBySchema = z.array(
    z.object(
        {
            user: UserSchema,
            status: z.string(),
            date: z.string()
        }

    )
)
export type TaskStatus = z.infer<typeof TaskStatusSchema>

export const TaskSchema = z.object({
    _id: z.string(),
    name: z.string(),
    description: z.string(),
    project: z.string(),
    status: TaskStatusSchema,
    updatedAt: z.string(),
    createdAt: z.string(),
    completedBy: CompletedBySchema,
    notes: z.array(NoteSchema.pick({
        author: true,
        text: true,
        _id: true,
        createdAt: true
    }).extend({
        author: UserSchema
    }))
})

export const TaskDeletedSchema = z.object({
    deleted: z.boolean(),
    project: TaskSchema
})

const MinimalTaskSchema = TaskSchema.pick({
        _id: true,
        name: true,
        project: true,
        status: true,
        description: true
})

export type TaskType = z.infer<typeof TaskSchema>
export type TaskFormType = Pick<TaskType, 'name' | 'description'>
export type MinimalTaskType = z.infer<typeof MinimalTaskSchema>
/* Projects */
export const ProjectSchema = z.object({
    _id: z.string(),
    name: z.string(),
    client: z.string(),
    description: z.string(),
    tasks: z.array(MinimalTaskSchema),
    admin: z.string(),
})

export const ProjectsSchema = z.array(
    ProjectSchema.pick({
        _id: true,
        name: true,
        client: true,
        description: true,
        admin: true
    })
)

export const ProjectDeletedSchema = z.object({
    deleted: z.boolean(),
    project: ProjectSchema
})

export type ProjectType = z.infer<typeof ProjectSchema>

export type ProjectFormType = Pick<ProjectType, 'name' | "client" | "description">

