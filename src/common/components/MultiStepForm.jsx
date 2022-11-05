import {useContext} from 'react'
import Step2 from './Step2';
import Step3 from './Step3'
import LastStep from './LastStep';
import UserContext from '../helpers/userContext';

function MultiStepForm({
  DTO,
  setDTO, 
  usableCurrency,
  route,
  children
}) {

    const {actualStep} = useContext(UserContext)

    const formSteps = ()=>{
        switch(actualStep){
          case 0:
            return (children);
          case 1:
            return <Step2 DTO={DTO} setDTO={setDTO} usableCurrency={usableCurrency}/>;
          case 2:
            return <Step3 DTO={DTO} setDTO={setDTO} />;
          case 3:
            return <LastStep DTO={DTO} setDTO={setDTO} usableCurrency={usableCurrency}/>;
          default:
            return <div> <p>Error en los Pasos a seguir</p> </div>
      }
    }

  return (
    <div className='shopFormContainer flex flex-column justify-center align-center'>
        {formSteps()}
    </div>
  )
}

export default MultiStepForm;