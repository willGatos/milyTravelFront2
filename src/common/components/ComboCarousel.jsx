import {useState, useEffect, useContext} from "react"
import { LazyLoadImage } from 'react-lazy-load-image-component';
import ReactSimplyCarousel from 'react-simply-carousel';
import ArrowLeft from "../../public/LeftArrow.svg"
import ArrowRight from "../../public/ArrowRight.svg"
import axios from "axios";
import UserContext from "../helpers/userContext";

function ComboCarousel({OpenDialogAndCheckCombo}) {
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const {newCombos,setNewCombos}=useContext(UserContext)
  useEffect(()=>{
    axios.get("/buys/getComboToUsers")
    .then((response)=> {
      const visibleCombos = response.data
      setNewCombos(visibleCombos)
    })
  },[])
  return (
    <ReactSimplyCarousel
    activeSlideIndex={activeSlideIndex}
    onRequestChange={setActiveSlideIndex}
    itemsToShow={1}
    itemsToScroll={1}
    forwardBtnProps={{
      //here you can also pass className, or any other button element attributes
      style: {
        alignSelf: 'center',
        background: '#18465E',
        border: 'none',
        borderRadius: '50%',
        color: 'white',
        cursor: 'pointer',
        fontSize: '20px',
        height: 30,
        lineHeight: 1,
        textAlign: 'center',
        width: 30,
        position: "absolute",
        zIndex: "5",
        right: "0"
      },
      children: <span><img src={ArrowRight} alt={`>`}/></span>,
    }}
    backwardBtnProps={{
      //here you can also pass className, or any other button element attributes
      style: {
        alignSelf: 'center',
        background: '#18465E',
        border: 'none',
        borderRadius: '50%',
        color: 'white',
        cursor: 'pointer',
        fontSize: '20px',
        height: 30,
        lineHeight: 1,
        textAlign: 'center',
        width: 30,
        position: "absolute",
        zIndex: "5",
        left: "0"
      },
      children: <span><img src={ArrowLeft} alt="<"/></span>,
    }}
    responsiveProps={[
      {
        itemsToShow: 2,
        itemsToScroll: 2,
        minWidth: 768,
      },
    ]}
    speed={400}
    easing="linear"
  >
    {newCombos.map((combo, key)=>{
    return(
      <LazyLoadImage
      onClick={()=> OpenDialogAndCheckCombo(combo)}
      key={key}
      alt={combo.name}
      width={"320px"}
      src={combo.image} /> 
    )
  })
    }
    </ReactSimplyCarousel>
)
}

export default ComboCarousel