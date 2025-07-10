import { useMemo } from "react"
import { useAppStore } from "../stores/useAppStore"
import { Drink } from "../components/Drink"

const FavPages = () => {
  const { favRecipes } = useAppStore()
  const hasRecipes = useMemo(() => favRecipes.length > 0, [favRecipes])
  
  return (
    <>
      <h1 className="font-extrabold text-5xl text-center"> Favoritos </h1>
      {
        hasRecipes ? 
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 my-8 gap-6">
            {favRecipes.map(recipe => (
              <Drink key={recipe.idDrink} recipe={recipe}/>
            ))}

          </div>
        : (
          <p className="mt-10 text-center text-lg">No tiene favoritos agregados.</p>
        )
      }

    </>
  )
}


export default FavPages