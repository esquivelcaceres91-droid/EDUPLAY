import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

import { AnimatePresence, motion } from "framer-motion";

import Onboarding from "./pages/Onboarding";
import HomePage from "./pages/HomePage";
import EnglishLevels from "./pages/EnglishLevels";
import ComputerLevels from "./pages/ComputerLevels";

import EnglishBeginner from "./pages/EnglishBeginner";
import EnglishIntermediate from "./pages/EnglishIntermediate";
import EnglishAdvanced from "./pages/EnglishAdvanced";

import ComputerBeginner from "./pages/ComputerBeginner";
import ComputerIntermediate from "./pages/ComputerIntermediate";
import ComputerIntermediateLesson from "./pages/ComputerIntermediateLesson";
import ComputerIntermediateActivity from "./pages/ComputerIntermediateActivity";
import ComputerIntermediateGame from "./pages/ComputerIntermediateGame";
import ComputerIntermediateQuiz from "./pages/ComputerIntermediateQuiz";
import ComputerIntermediateReward from "./pages/ComputerIntermediateReward";

import ComputerAdvanced from "./pages/ComputerAdvanced";
import ComputerAdvancedLesson from "./pages/ComputerAdvancedLesson";
import ComputerAdvancedActivity from "./pages/ComputerAdvancedActivity";
import ComputerAdvancedGame from "./pages/ComputerAdvancedGame";
import ComputerAdvancedQuiz from "./pages/ComputerAdvancedQuiz";
import ComputerAdvancedReward from "./pages/ComputerAdvancedReward";
import ComputerUnit from "./pages/ComputerUnit";
import ComputerLesson from "./pages/ComputerLesson";
import ComputerActivity from "./pages/ComputerActivity";
import ComputerGame from "./pages/ComputerGame";
import ComputerQuiz from "./pages/ComputerQuiz";
import ComputerReward from "./pages/ComputerReward";

const pageTransition = {
  duration: 0.6,
  ease: [0.22, 1, 0.36, 1],
};

function RoutePage({ children, direction = "right" }) {
  return (
    <motion.div
      className="app-route-page"
      initial={{
        x: direction === "right" ? "100%" : "-100%",
      }}
      animate={{
        x: 0,
      }}
      exit={{
        x: "-100%",
      }}
      transition={pageTransition}
    >
      {children}
    </motion.div>
  );
}

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <div className="app-routes-shell">
      <AnimatePresence mode="sync">
        <Routes
          location={location}
          key={location.pathname}
        >
          <Route path="/" element={<RoutePage direction="left"><Onboarding /></RoutePage>} />
          <Route path="/home" element={<RoutePage><HomePage /></RoutePage>} />
          <Route path="/english" element={<RoutePage><EnglishLevels /></RoutePage>} />
          <Route path="/computer" element={<RoutePage><ComputerLevels /></RoutePage>} />

          <Route path="/english/beginner" element={<RoutePage><EnglishBeginner /></RoutePage>} />
          <Route path="/english/intermediate" element={<RoutePage><EnglishIntermediate /></RoutePage>} />
          <Route path="/english/advanced" element={<RoutePage><EnglishAdvanced /></RoutePage>} />

          <Route path="/computer/beginner" element={<RoutePage><ComputerBeginner /></RoutePage>} />
          <Route path="/computer/intermediate" element={<RoutePage><ComputerIntermediate /></RoutePage>} />
          <Route path="/computer/advanced" element={<RoutePage><ComputerAdvanced /></RoutePage>} />

          <Route path="/computer/intermediate/unit/:unitId/lesson" element={<RoutePage><ComputerIntermediateLesson /></RoutePage>} />
          <Route path="/computer/intermediate/unit/:unitId/activity" element={<RoutePage><ComputerIntermediateActivity /></RoutePage>} />
          <Route path="/computer/intermediate/unit/:unitId/game" element={<RoutePage><ComputerIntermediateGame /></RoutePage>} />
          <Route path="/computer/intermediate/unit/:unitId/quiz" element={<RoutePage><ComputerIntermediateQuiz /></RoutePage>} />
          <Route path="/computer/intermediate/unit/:unitId/reward" element={<RoutePage><ComputerIntermediateReward /></RoutePage>} />

          <Route path="/computer/advanced/unit/:unitId/lesson" element={<RoutePage><ComputerAdvancedLesson /></RoutePage>} />
          <Route path="/computer/advanced/unit/:unitId/activity" element={<RoutePage><ComputerAdvancedActivity /></RoutePage>} />
          <Route path="/computer/advanced/unit/:unitId/game" element={<RoutePage><ComputerAdvancedGame /></RoutePage>} />
          <Route path="/computer/advanced/unit/:unitId/quiz" element={<RoutePage><ComputerAdvancedQuiz /></RoutePage>} />
          <Route path="/computer/advanced/unit/:unitId/reward" element={<RoutePage><ComputerAdvancedReward /></RoutePage>} />

          <Route path="/computer/beginner/unit/:unitId" element={<RoutePage><ComputerUnit /></RoutePage>} />
          <Route path="/computer/beginner/unit/:unitId/lesson" element={<RoutePage><ComputerLesson /></RoutePage>} />
          <Route path="/computer/beginner/unit/:unitId/activity" element={<RoutePage><ComputerActivity /></RoutePage>} />
          <Route path="/computer/beginner/unit/:unitId/game" element={<RoutePage><ComputerGame /></RoutePage>} />
          <Route path="/computer/beginner/unit/:unitId/quiz" element={<RoutePage><ComputerQuiz /></RoutePage>} />
          <Route path="/computer/beginner/unit/:unitId/reward" element={<RoutePage><ComputerReward /></RoutePage>} />
        </Routes>
      </AnimatePresence>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AnimatedRoutes />
    </BrowserRouter>
  );
}
