import { useParams } from "react-router-dom";
import ComputerAdvancedRoboticsActivity from "./ComputerAdvancedRoboticsActivity";
import ComputerAdvancedAIActivity from "./ComputerAdvancedAIActivity";
import ComputerAdvancedNetworkActivity from "./ComputerAdvancedNetworkActivity";
export default function ComputerAdvancedActivity(){const {unitId}=useParams();const id=Number(unitId||1);if(id===3)return <ComputerAdvancedNetworkActivity/>;if(id===2)return <ComputerAdvancedAIActivity/>;return <ComputerAdvancedRoboticsActivity/>;}
