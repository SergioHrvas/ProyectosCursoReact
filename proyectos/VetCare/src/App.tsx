import { Form } from "./components/Form"
import { PatientsList } from "./components/PatientsList"
import { ToastContainer } from "react-toastify"
function App() {

  return (
    <>
      <div className="container mx-auto mt-20">
        <h1 className="font-black uppercase text-5xl text-center md:w-2/3 md:mx-auto">Seguimiento de pacientes {''}
          <span className="text-indigo-900">VetCare</span>
        </h1>
        
        <div className="mt-12 md:flex ">
            <Form/>
            <PatientsList/>
        </div>
      </div>

      <ToastContainer/>
    </>
  )
}

export default App
