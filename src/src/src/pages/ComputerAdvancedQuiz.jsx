import { useParams } from "react-router-dom";
import ComputerAdvancedRoboticsQuiz from "./ComputerAdvancedRoboticsQuiz";
import ComputerAdvancedAIQuiz from "./ComputerAdvancedAIQuiz";
import ComputerAdvancedNetworkQuiz from "./ComputerAdvancedNetworkQuiz";
export default function ComputerAdvancedQuiz(){const {unitId}=useParams();const id=Number(unitId||1);if(id===3)return <ComputerAdvancedNetworkQuiz/>;if(id===2)return <ComputerAdvancedAIQuiz/>;return <ComputerAdvancedRoboticsQuiz/>;}
