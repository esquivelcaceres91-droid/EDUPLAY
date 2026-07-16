import { useParams } from "react-router-dom";
import ComputerAdvancedRoboticsGame from "./ComputerAdvancedRoboticsGame";
import ComputerAdvancedAIGame from "./ComputerAdvancedAIGame";
import ComputerAdvancedNetworkGame from "./ComputerAdvancedNetworkGame";
export default function ComputerAdvancedGame(){const {unitId}=useParams();const id=Number(unitId||1);if(id===3)return <ComputerAdvancedNetworkGame/>;if(id===2)return <ComputerAdvancedAIGame/>;return <ComputerAdvancedRoboticsGame/>;}
