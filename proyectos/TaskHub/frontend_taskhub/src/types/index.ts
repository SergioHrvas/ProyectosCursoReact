import { z } from 'zod'


/* Tasks */
export const TaskStatusSchema = z.enum(
    ["pending", "onHold", "inProgress", "underReview", "completed"]
)

export const TaskSchema = z.object({
    _id: z.string(),
    name: z.string(),
    description: z.string(),
    project: z.string(),
    status: TaskStatusSchema
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
    tasks: z.array(TaskSchema)
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
