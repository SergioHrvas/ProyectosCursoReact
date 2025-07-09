import type { Recipe } from "../types"

type DrinkProps = {
    recipe: Recipe
}

export const Drink = ({recipe} : DrinkProps) => {
  return (
    <div className="border text-center shadow-2xl">
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
