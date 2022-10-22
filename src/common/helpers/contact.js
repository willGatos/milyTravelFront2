import phoneIcon from "../../public/contactIcons/Phone.png"
import emailIcon from "../../public/contactIcons/Email.png"
import locationIcon from "../../public/contactIcons/Location.png"

const contactItems = [
    {
        href: "https://wa.me/+18138775340",
        iconRef:phoneIcon,
        text: "+1 813 877 5340",
        height: "23px"
    },
    {
        href: "mailto:soporte@militravel.com", 
        iconRef:emailIcon,
        text: "soporte@militravel.com",
        height: "15px"
    },
    {
        href: "https://www.google.com/maps/place/MILY+TRAVEL+AGENCIA/@27.9963378,-82.4783005,15z/data=!4m2!3m1!1s0x0:0xf612325c3a5640d7?sa=X&ved=2ahUKEwjq69bX4rj6AhXRlosKHe30DOgQ_BJ6BAhCEAU",
        iconRef:locationIcon,
        text: "1761 W Hillsborough Ave Tampa, Fl 33603",
        height: "25px"
    }
]
export default contactItems;