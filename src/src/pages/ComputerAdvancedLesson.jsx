import { useParams } from "react-router-dom";
import ComputerAdvancedRoboticsLesson from "./ComputerAdvancedRoboticsLesson";
import ComputerAdvancedAILesson from "./ComputerAdvancedAILesson";
import ComputerAdvancedNetworkLesson from "./ComputerAdvancedNetworkLesson";
export default function ComputerAdvancedLesson(){const {unitId}=useParams();const id=Number(unitId||1);if(id===3)return <ComputerAdvancedNetworkLesson/>;if(id===2)return <ComputerAdvancedAILesson/>;return <ComputerAdvancedRoboticsLesson/>;}
