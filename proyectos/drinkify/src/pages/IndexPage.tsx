
import { useMemo } from "react"
import { useAppStore } from "../stores/useAppStore"
import { Drink } from "../components/Drink"

const IndexPage = () => {
  const {recipes} = useAppStore()
  // o tambien:
  // const categories = useAppStore((state) => state.categories)

  const hasRecipes = useMemo(() => recipes.length, [recipes])
  return (
    <>
      <h1 className="font-extrabold text-5xl text-center"> Recetas </h1>
      {
        hasRecipes ? 
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 my-8 gap-6">
            {recipes.map(recipe => (
              <Drink key={recipe.idDrink} recipe={recipe}/>
            ))}

          </div>
        : (
          <p className="mt-10 text-center text-lg">No se han encontrado resultados.</p>
        )
      }
    </>
  )
}

export default IndexPage
