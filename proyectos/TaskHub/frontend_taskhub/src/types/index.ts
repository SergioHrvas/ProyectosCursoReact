import { z } from 'zod'

const ProjectSchema = z.object({
    _id: z.string(),
    name: z.string(),
    client: z.string(),
    description: z.string()
})

export type ProjectType = z.infer<typeof ProjectSchema>

export type ProjectFormType = Pick<ProjectType, 'name' | "client" | "description">