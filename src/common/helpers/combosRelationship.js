import Combo1 from "../../public/combos/Combo Mixto 1.jpeg"
import Combo2 from "../../public/combos/Combo Mixto 2.jpeg"
import Combo3 from "../../public/combos/Combo Mixto 3.jpeg"
import Combo4 from "../../public/combos/Combo Mixto 4.jpeg"
import Combo5 from "../../public/combos/Combo Mixto 5.jpeg"
import Combo6 from "../../public/combos/Combo Mixto 6.jpeg"
import Combo7 from "../../public/combos/Combo Mixto 7.jpeg"
import Combo8 from "../../public/combos/Combo Mixto 8.jpeg"
import Combo9 from "../../public/combos/Combo Mixto 9.jpeg"
import ComboFrito from "../../public/combos/Combo Pollo Frito.jpeg"
import PolloAceitePolloRes from "../../public/combos/Combo Aceite Pollo Res.jpeg"

import ComboCerdo from "../../public/combos/Combo Básico Cerdo.jpeg"
import ComboRes from "../../public/combos/Combo Básico Res.jpeg"
import ComboPollo from "../../public/combos/Combo Básico Pollo.jpeg"

const combos = [
    {
        name: "Combo Mixto 1",
        price: "105",
        image: Combo1,
        contains: ["Mixto","Pollo"]
    },{
        name: "Combo Mixto 2",
        price: "115",
        image: Combo2,
        contains: ["Mixto","Pollo", "Cerdo"]
    },{
        name: "Combo Mixto 3",
        price: "129",
        image: Combo3,
        contains: ["Mixto","Cerdo", "Pollo", "Res"]
    },{
        name: "Combo Mixto 4",
        price: "145",
        image: Combo4,
        contains: ["Mixto","Pollo", "Cerdo", "Res"]
    },{
        name: "Combo Mixto 5",
        price: "175",
        image: Combo5,
        contains: ["Mixto","Pollo", "Res"]
    },{
        name: "Combo Mixto 6",
        price: "195",
        image: Combo6,
        contains: ["Mixto","Cerdo", "Pollo", "Res"]
    },{
        name: "Combo Mixto 7",
        price: "205",
        image: Combo7,
        contains: ["Mixto","Cerdo", "Pollo", "Res"]
    },{
        name: "Combo Mixto 8",
        price: "240",
        image: Combo8,
        contains: ["Mixto","Pollo", "Res", "Cerdo" ]
    },{
        name: "Combo Mixto 9",
        price: "260",
        image: Combo9,
        contains: ["Mixto","Res", "Cerdo"]
    },{
        name: "Combo Básico Pollo",
        price: "115",
        image: ComboPollo,
        contains: ["Pollo"]
    },{
        name: "Combo Básico Cerdo",
        price: "115",
        image: ComboCerdo,
        contains: ["Cerdo"]
    },{
        name: "Combo Básico Res",
        price: "125",
        image: ComboRes,
        contains: ["Res"]
    },{
        name: "Combo Pollo Frito",
        price: "129",
        image: ComboFrito,
        contains: ["Pollo"]
    },{
        name: "Combo Aceite Pollo Res",
        price: "190",
        image: PolloAceitePolloRes,
        contains: ["Pollo", "Res"]
    },
]
export default combos;