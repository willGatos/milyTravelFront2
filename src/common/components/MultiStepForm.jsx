import React,{useState} from 'react'
import Step2 from './Step2';
import Buttons from './Buttons';

function MultiStepForm({DTO, setDTO, route, children}) {

    const [actualStep, setActualStep] = useState(0)

    const formSteps = ()=>{
        switch(actualStep){
          case 0:
            return (children);
          case 1:
            return (<Step2 DTO={DTO} setDTO={setDTO}/>);
          default:
            return (
            <div>
              <p>Error en los Pasos a seguir</p>
            </div>)
      }
    }

  return (
    <div className='shopFormContainer flex flex-column justify-center align-center'>
        {formSteps()}
        <Buttons 
          DTO={DTO}
          route={route} 
          actualStep={actualStep}
          setActualStep={setActualStep}/>
    </div>
  )
}

export default MultiStepForm;