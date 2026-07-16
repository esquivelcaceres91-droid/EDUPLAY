import { useParams } from "react-router-dom";
import ComputerAdvancedRoboticsReward from "./ComputerAdvancedRoboticsReward";
import ComputerAdvancedAIReward from "./ComputerAdvancedAIReward";
import ComputerAdvancedNetworkReward from "./ComputerAdvancedNetworkReward";
export default function ComputerAdvancedReward(){const {unitId}=useParams();const id=Number(unitId||1);if(id===3)return <ComputerAdvancedNetworkReward/>;if(id===2)return <ComputerAdvancedAIReward/>;return <ComputerAdvancedRoboticsReward/>;}
