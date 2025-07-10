import type { Recipe } from "../types"
import { useAppStore } from "../stores/useAppStore"

type DrinkProps = {
    recipe: Recipe
}

export const Drink = ({recipe} : DrinkProps) => {
  const {fetchRecipe} = useAppStore()

  return (
    <div className="border text-center shadow-2xl cursor-pointer" onClick={() => fetchRecipe(recipe.idDrink)}>
        <div className="overflow-hidden">
            <img
                src={recipe.strDrinkThumb}
                alt={`Imagen de ${recipe.strDrink}`}
                className="hover:scale-125 transition-transform hover:rotate-2"/>
        </div>
        <div className="p-5">
            <h2 className="truncate text-2xl font-black">{recipe.strDrink}</h2>
        </div>
    </div>
  )
}
