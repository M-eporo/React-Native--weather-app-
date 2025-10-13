// New Moon	新月（見えない）
//<MaterialCommunityIcons name="moon-new" size={24} color="black" />

// Waxing Crescent	三日月（満ちていく）
//<MaterialCommunityIcons name="moon-waxing-crescent" size={24} color="black" />

// First Quarter	上弦の月（半分）
//<MaterialCommunityIcons name="moon-first-quarter" size={24} color="black" />

// Waxing Gibbous	満月に近い（満ちていく途中）
//<MaterialCommunityIcons name="moon-waxing-gibbous" size={24} color="black" />

// Full Moon	満月
//<MaterialCommunityIcons name="moon-full" size={24} color="black" />

// Waning Gibbous	満月の後（欠け始め）
// <MaterialCommunityIcons name="moon-waning-gibbous" size={24} color="black" />

// Last Quarter	下弦の月（半分）
//<MaterialCommunityIcons name="moon-last-quarter" size={24} color="black" />

// Waning Crescent	かけていく三日月（新月に近い）
//<MaterialCommunityIcons name="moon-waning-crescent" size={24} color="black" />
import { MaterialCommunityIcons } from "@expo/vector-icons";

type MCName = React.ComponentProps<typeof MaterialCommunityIcons>["name"];


    type Moon = { name: string; type: MCName 

};

export const moons: Moon[] = [
    {name: "New Moon", type: "moon-new"},
    {name: "Waxing Crescent", type: "moon-waxing-crescent"},
    {name: "First Quarter", type: "moon-first-quarter"},
    {name: "Waxing Gibbous", type: "moon-waxing-gibbous"},
    {name: "Full Moon", type: "moon-full"},
    {name: "Waning Gibbous", type: "moon-waning-gibbous"},
    {name: "Last Quarter", type: "moon-last-quarter"},
    {name: "Waning Crescent", type: "moon-waning-crescent"}
];