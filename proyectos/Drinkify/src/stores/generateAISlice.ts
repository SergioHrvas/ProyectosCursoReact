import type { StateCreator } from "zustand";
import { generateAIRecipeAPI } from "../services/GenerateAIService";

export type GenerateAISliceType = {
    recipe: string,
    isGenerating: boolean,
    generateAIRecipe: (prompt: string) => Promise<void>
}

export const createGenerateAISlice: StateCreator<GenerateAISliceType> = (set, get) => ({
    recipe: "",
    isGenerating: false,

    generateAIRecipe: async (prompt: string) => {

        set({
            recipe: "",
            isGenerating: true
        })
        const data = await generateAIRecipeAPI(prompt)

        for await (const textPart of data) {
            set({
                recipe: get().recipe + textPart
            })
        }
        
        set({
            isGenerating: false
        })
    }
    
})
