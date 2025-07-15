import type { FormEvent } from "react"
import { useAppStore } from "../stores/useAppStore"

const GenAIPage = () => {

    const {showNotification, generateAIRecipe, recipe, isGenerating} = useAppStore()

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const form = new FormData(e.currentTarget)

        const prompt = form.get('prompt') as string

        if(prompt.trim() === ""){
            showNotification({
                text: "Debe rellenar el prompt",
                error: true
            })
        }
        else
            await generateAIRecipe(prompt)
        
    }

    
    return (
        <>
            <h1 className="font-extrabold text-5xl text-center"> Generador de recetas por IA </h1>
            <div className="max-w-4xl mx-auto">
                <form
                    onSubmit={handleSubmit}
                    className='flex flex-col space-y-3 py-10'
                >
                    <div className="relative">
                        <input
                            name="prompt"
                            id="prompt"
                            className="border bg-white p-4 rounded-lg w-full border-slate-800"
                            placeholder="Genera una receta con ingredientes. Ej. Bebida con vodka y naranja"
                        />
                        <button
                            type="submit"
                            disabled={isGenerating}
                            aria-label="Enviar"
                            className={`cursor-pointer absolute top-1/2 right-5 transform -translate-x-1/2 -translate-y-1/2 disabled:opacity-60 disabled:cursor-default`}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                                stroke="currentColor" className="w-10 h-10">
                                <path strokeLinecap="round" strokeLinejoin="round"
                                    d="m15 11.25-3-3m0 0-3 3m3-3v7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                            </svg>
                        </button>
                    </div>
                </form>

                <div className="py-10 whitespace-pre-wrap">
                    {recipe}
                </div>
            </div>
        </>
    )
}

export default GenAIPage