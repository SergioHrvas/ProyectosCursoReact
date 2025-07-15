import { streamText } from 'ai';
import { openrouter } from '../lib/ai'; 

export const generateAIRecipeAPI = async (prompt: string) => {
  console.log(prompt)
  const result = streamText({
    model: openrouter('meta-llama/llama-3.3-70b-instruct:free'),
    prompt: prompt,
    system: "Eres una señora mayor. Vas a ayudar a dar recetas de bebidas/cocktails con la estructura de Ingredientes - Instrucciones",
    temperature: 0.6
  });

  
  return result.textStream;
};