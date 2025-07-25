import { Dialog, Transition } from '@headlessui/react';
import { Fragment, type JSX } from 'react';
import { useAppStore } from '../stores/useAppStore';
import type { RecipeInfo } from '../types';

export default function Modal() {

    const { modal, closeModal, selectedRecipe, manageOnFavourites, isFavouriteRecipe } = useAppStore()

    const showIngredients = () => {
        const ingredients: JSX.Element[] = []
        for (let i = 1; i <= 6; i++){
            let ingredient = selectedRecipe[`strIngredient${i}` as keyof RecipeInfo]
            let measure = selectedRecipe[`strMeasure${i}` as keyof RecipeInfo]

            if(ingredient && measure){
                ingredients.push(<li key={i} className='text-lg font-normal ml-5'>{ingredient} - {measure}</li>)
            }
        }

        return ingredients
        
    }

    return (
        <>
            <Transition appear show={modal} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={closeModal}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-70" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-2xl sm:p-6" >
                                    <Dialog.Title as="h3" className="text-gray-900 text-4xl font-extrabold my-5 text-center">
                                        {selectedRecipe.strDrink}
                                    </Dialog.Title>

                                    <img
                                        src={selectedRecipe.strDrinkThumb}
                                        alt={`Imagen de ${selectedRecipe.strDrink}`}
                                        className='mx-auto w-96'
                                    />

                                    <Dialog.Title as="h3" className="text-gray-900 text-2xl font-extrabold my-5">
                                        Ingredientes y cantidades
                                    </Dialog.Title>
                                    {showIngredients()}
                                    <Dialog.Title as="h3" className="text-gray-900 text-2xl font-extrabold my-5">
                                        Instrucciones
                                    </Dialog.Title>
                                    <p className='text-lg'>
                                        {selectedRecipe.strInstructions}
                                    </p>


                                    <div className='flex gap-3 justify-between mt-5'>
                                        <button
                                            type="button"
                                            className='w-full shadow rounded bg-slate-600 text-white font-bold uppercase p-2'
                                            onClick={closeModal}
                                        >
                                            Cerrar
                                        </button>
                                        <button
                                            type="button"
                                            className='w-full rounded shadow bg-orange-600 text-white font-bold uppercase p-2'
                                            onClick={() => manageOnFavourites(selectedRecipe)}
                                        >
                                            {isFavouriteRecipe(selectedRecipe.idDrink) ? "Eliminar de favoritos" : "Añadir a favoritos"}
                                        </button>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}