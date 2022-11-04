import {useContext} from 'react'
import UserContext from '../helpers/userContext'
function BackButton() {
  const {actualStep, setActualStep} = useContext(UserContext);

  return (
    <button style={{width: "100px", marginTop: "50px"}}
      className='hero-section-button bg-blue font-color-w text-center flex justify-center align-center'
      onClick={()=> setActualStep(actualStep-1)}
        >
            Anterior
        </button>
  )
}

export default BackButton