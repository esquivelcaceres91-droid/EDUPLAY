import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  Navigate,
} from "react-router-dom";

import { AnimatePresence, motion } from "framer-motion";

import Onboarding from "./pages/Onboarding";
import HomePage from "./pages/HomePage";
import DashboardHub from "./pages/DashboardHub";
import CalendarPage from "./pages/CalendarPage";
import SettingsPage from "./pages/SettingsPage";
import ActivityTracker from "./components/ActivityTracker";
import LessonCooldownGuard from "./components/LessonCooldownGuard";
import LicenseAccessGuard from "./components/LicenseAccessGuard";
import CreateAccountPage from "./pages/CreateAccountPage";
import SessionEntryPage from "./pages/SessionEntryPage";
import LoginPage from "./pages/LoginPage";
import ChooseLicensePage from "./pages/ChooseLicensePage";
import ActivateLicensePage from "./pages/ActivateLicensePage";
import PaymentSuccessPage from "./pages/PaymentSuccessPage";
import FamilyPlansPage from "./pages/FamilyPlansPage";
import CreateProfilesPage from "./pages/CreateProfilesPage";
import ProfileSelectorPage from "./pages/ProfileSelectorPage";
import InstitutionInfoPage from "./pages/InstitutionInfoPage";
import InstitutionAccessPage from "./pages/InstitutionAccessPage";
import InstitutionRegisterPage from "./pages/InstitutionRegisterPage";
import InstitutionLoginPage from "./pages/InstitutionLoginPage";
import AdminPage from "./pages/AdminPage";
import AdminGuard from "./components/AdminGuard";
import EnglishLevels from "./pages/EnglishLevels";
import ComputerLevels from "./pages/ComputerLevels";
import LandingPage from "./pages/LandingPage";
import { PublicExploreFrame, PublicLessonPreview, PublicLockedPage } from "./components/PublicExplore";
import PublicExploreScreen from "./components/PublicExploreScreens";
import { isPublicExplorePath } from "./utils/publicExplore";

import EnglishBeginner from "./pages/EnglishBeginner";
import EnglishIntermediate from "./pages/EnglishIntermediate";
import EnglishIntermediateUnit from "./pages/EnglishIntermediateUnit";
import EnglishIntermediateLesson from "./pages/EnglishIntermediateLesson";
import EnglishIntermediateGame from "./pages/EnglishIntermediateGame";
import EnglishIntermediateQuiz from "./pages/EnglishIntermediateQuiz";
import EnglishIntermediateReward from "./pages/EnglishIntermediateReward";
import EnglishAdvanced from "./pages/EnglishAdvanced";
import EnglishAdvancedUnit from "./pages/EnglishAdvancedUnit";
import EnglishAdvancedLesson from "./pages/EnglishAdvancedLesson";
import EnglishAdvancedGame from "./pages/EnglishAdvancedGame";
import EnglishAdvancedQuiz from "./pages/EnglishAdvancedQuiz";
import EnglishAdvancedReward from "./pages/EnglishAdvancedReward";
import EnglishBeginnerUnit from "./pages/EnglishBeginnerUnit";
import EnglishColorsLesson from "./pages/EnglishColorsLesson";
import EnglishColorsGame from "./pages/EnglishColorsGame";
import EnglishColorsQuiz from "./pages/EnglishColorsQuiz";
import EnglishColorsReward from "./pages/EnglishColorsReward";
import EnglishNumbersLesson from "./pages/EnglishNumbersLesson";
import EnglishNumbersGame from "./pages/EnglishNumbersGame";
import EnglishNumbersQuiz from "./pages/EnglishNumbersQuiz";
import EnglishNumbersReward from "./pages/EnglishNumbersReward";
import EnglishFamilyUnit from "./pages/EnglishFamilyUnit";
import EnglishFamilyLesson from "./pages/EnglishFamilyLesson";
import EnglishFamilyGame from "./pages/EnglishFamilyGame";
import EnglishFamilyQuiz from "./pages/EnglishFamilyQuiz";
import EnglishFamilyReward from "./pages/EnglishFamilyReward";
import EnglishAnimalsUnit from "./pages/EnglishAnimalsUnit";
import EnglishAnimalsLesson from "./pages/EnglishAnimalsLesson";
import EnglishAnimalsGame from "./pages/EnglishAnimalsGame";
import EnglishAnimalsQuiz from "./pages/EnglishAnimalsQuiz";
import EnglishAnimalsReward from "./pages/EnglishAnimalsReward";
import EnglishSchoolUnit from "./pages/EnglishSchoolUnit";
import EnglishSchoolLesson from "./pages/EnglishSchoolLesson";
import EnglishSchoolGame from "./pages/EnglishSchoolGame";
import EnglishSchoolQuiz from "./pages/EnglishSchoolQuiz";
import EnglishSchoolReward from "./pages/EnglishSchoolReward";
import EnglishFoodUnit from "./pages/EnglishFoodUnit";
import EnglishFoodLesson from "./pages/EnglishFoodLesson";
import EnglishFoodGame from "./pages/EnglishFoodGame";
import EnglishFoodQuiz from "./pages/EnglishFoodQuiz";
import EnglishFoodReward from "./pages/EnglishFoodReward";
import EnglishFinalChestUnit from "./pages/EnglishFinalChestUnit";
import EnglishFinalChestChallenge from "./pages/EnglishFinalChestChallenge";
import EnglishFinalChestReward from "./pages/EnglishFinalChestReward";

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
          <Route path="/" element={<LandingPage />} />
          <Route path="/session" element={<SessionEntryPage />} />
          <Route path="/create-account" element={<RoutePage><CreateAccountPage /></RoutePage>} />
          <Route path="/login" element={<RoutePage><LoginPage /></RoutePage>} />
          <Route path="/choose-license" element={<RoutePage><ChooseLicensePage /></RoutePage>} />
          <Route path="/family-plans" element={<RoutePage><FamilyPlansPage /></RoutePage>} />
          <Route path="/activate-license" element={<RoutePage><ActivateLicensePage /></RoutePage>} />
          <Route path="/payment-success" element={<RoutePage><PaymentSuccessPage /></RoutePage>} />
          <Route path="/institution-info" element={<RoutePage><InstitutionInfoPage /></RoutePage>} />
          <Route path="/institution-access" element={<RoutePage><InstitutionAccessPage /></RoutePage>} />
          <Route path="/institution-register" element={<RoutePage><InstitutionRegisterPage /></RoutePage>} />
          <Route path="/institution-login" element={<RoutePage><InstitutionLoginPage /></RoutePage>} />
          <Route path="/admin" element={<RoutePage><AdminGuard><AdminPage /></AdminGuard></RoutePage>} />
          <Route path="/create-profiles" element={<RoutePage><CreateProfilesPage /></RoutePage>} />
          <Route path="/profiles" element={<RoutePage><ProfileSelectorPage /></RoutePage>} />
          <Route path="/onboarding" element={<RoutePage><Onboarding /></RoutePage>} />
          <Route path="/home" element={<RoutePage><HomePage /></RoutePage>} />
          <Route path="/lessons" element={<RoutePage><DashboardHub type="lessons" /></RoutePage>} />
          <Route path="/games" element={<RoutePage><DashboardHub type="games" /></RoutePage>} />
          <Route path="/achievements" element={<RoutePage><DashboardHub type="achievements" /></RoutePage>} />
          <Route path="/calendar" element={<RoutePage><CalendarPage /></RoutePage>} />
          <Route path="/settings" element={<RoutePage><SettingsPage /></RoutePage>} />
          <Route path="/english" element={<RoutePage><EnglishLevels /></RoutePage>} />
          <Route path="/computer" element={<RoutePage><ComputerLevels /></RoutePage>} />
          <Route path="/explore" element={<Navigate to="/explore/home" replace />} />
          <Route path="/explore/home" element={<RoutePage><PublicExploreFrame><PublicExploreScreen view="home" /></PublicExploreFrame></RoutePage>} />
          <Route path="/explore/english" element={<RoutePage><PublicExploreFrame><PublicExploreScreen view="levels" world="english" /></PublicExploreFrame></RoutePage>} />
          <Route path="/explore/computer" element={<RoutePage><PublicExploreFrame><PublicExploreScreen view="levels" world="computer" /></PublicExploreFrame></RoutePage>} />
          <Route path="/explore/english/beginner" element={<RoutePage><PublicExploreFrame><PublicExploreScreen view="map" world="english" /></PublicExploreFrame></RoutePage>} />
          <Route path="/explore/computer/beginner" element={<RoutePage><PublicExploreFrame><PublicExploreScreen view="map" world="computer" /></PublicExploreFrame></RoutePage>} />
          <Route path="/explore/preview/english" element={<RoutePage><PublicLessonPreview world="english" /></RoutePage>} />
          <Route path="/explore/preview/computer" element={<RoutePage><PublicLessonPreview world="computer" /></RoutePage>} />
          <Route path="/explore/locked" element={<RoutePage><PublicLockedPage /></RoutePage>} />

          <Route path="/english/beginner" element={<RoutePage><EnglishBeginner /></RoutePage>} />
          <Route path="/english/intermediate" element={<RoutePage><EnglishIntermediate /></RoutePage>} />
          <Route path="/english/intermediate/unit/:unitId" element={<RoutePage><EnglishIntermediateUnit /></RoutePage>} />
          <Route path="/english/intermediate/unit/:unitId/lesson" element={<RoutePage><EnglishIntermediateLesson /></RoutePage>} />
          <Route path="/english/intermediate/unit/:unitId/game" element={<RoutePage><EnglishIntermediateGame /></RoutePage>} />
          <Route path="/english/intermediate/unit/:unitId/quiz" element={<RoutePage><EnglishIntermediateQuiz /></RoutePage>} />
          <Route path="/english/intermediate/unit/:unitId/reward" element={<RoutePage><EnglishIntermediateReward /></RoutePage>} />
          <Route path="/english/advanced" element={<RoutePage><EnglishAdvanced /></RoutePage>} />
          <Route path="/english/advanced/unit/:unitId" element={<RoutePage><EnglishAdvancedUnit /></RoutePage>} />
          <Route path="/english/advanced/unit/:unitId/lesson" element={<RoutePage><EnglishAdvancedLesson /></RoutePage>} />
          <Route path="/english/advanced/unit/:unitId/game" element={<RoutePage><EnglishAdvancedGame /></RoutePage>} />
          <Route path="/english/advanced/unit/:unitId/quiz" element={<RoutePage><EnglishAdvancedQuiz /></RoutePage>} />
          <Route path="/english/advanced/unit/:unitId/reward" element={<RoutePage><EnglishAdvancedReward /></RoutePage>} />

          <Route path="/english/beginner/unit/6" element={<RoutePage><EnglishFoodUnit /></RoutePage>} />
          <Route path="/english/beginner/unit/6/lesson" element={<RoutePage><EnglishFoodLesson /></RoutePage>} />
          <Route path="/english/beginner/unit/6/game" element={<RoutePage><EnglishFoodGame /></RoutePage>} />
          <Route path="/english/beginner/unit/6/quiz" element={<RoutePage><EnglishFoodQuiz /></RoutePage>} />
          <Route path="/english/beginner/unit/6/reward" element={<RoutePage><EnglishFoodReward /></RoutePage>} />
          <Route path="/english/beginner/unit/7" element={<RoutePage><EnglishFinalChestUnit /></RoutePage>} />
          <Route path="/english/beginner/unit/7/challenge" element={<RoutePage><EnglishFinalChestChallenge /></RoutePage>} />
          <Route path="/english/beginner/unit/7/reward" element={<RoutePage><EnglishFinalChestReward /></RoutePage>} />
          <Route path="/english/beginner/unit/5" element={<RoutePage><EnglishSchoolUnit /></RoutePage>} />
          <Route path="/english/beginner/unit/5/lesson" element={<RoutePage><EnglishSchoolLesson /></RoutePage>} />
          <Route path="/english/beginner/unit/5/game" element={<RoutePage><EnglishSchoolGame /></RoutePage>} />
          <Route path="/english/beginner/unit/5/quiz" element={<RoutePage><EnglishSchoolQuiz /></RoutePage>} />
          <Route path="/english/beginner/unit/5/reward" element={<RoutePage><EnglishSchoolReward /></RoutePage>} />
          <Route path="/english/beginner/unit/4" element={<RoutePage><EnglishAnimalsUnit /></RoutePage>} />
          <Route path="/english/beginner/unit/4/lesson" element={<RoutePage><EnglishAnimalsLesson /></RoutePage>} />
          <Route path="/english/beginner/unit/4/game" element={<RoutePage><EnglishAnimalsGame /></RoutePage>} />
          <Route path="/english/beginner/unit/4/quiz" element={<RoutePage><EnglishAnimalsQuiz /></RoutePage>} />
          <Route path="/english/beginner/unit/4/reward" element={<RoutePage><EnglishAnimalsReward /></RoutePage>} />
          <Route path="/english/beginner/unit/3" element={<RoutePage><EnglishFamilyUnit /></RoutePage>} />
          <Route path="/english/beginner/unit/3/lesson" element={<RoutePage><EnglishFamilyLesson /></RoutePage>} />
          <Route path="/english/beginner/unit/3/game" element={<RoutePage><EnglishFamilyGame /></RoutePage>} />
          <Route path="/english/beginner/unit/3/quiz" element={<RoutePage><EnglishFamilyQuiz /></RoutePage>} />
          <Route path="/english/beginner/unit/3/reward" element={<RoutePage><EnglishFamilyReward /></RoutePage>} />
          <Route path="/english/beginner/unit/:unitId" element={<RoutePage><EnglishBeginnerUnit /></RoutePage>} />
          <Route path="/english/beginner/unit/2/lesson" element={<RoutePage><EnglishNumbersLesson /></RoutePage>} />
          <Route path="/english/beginner/unit/2/game" element={<RoutePage><EnglishNumbersGame /></RoutePage>} />
          <Route path="/english/beginner/unit/2/quiz" element={<RoutePage><EnglishNumbersQuiz /></RoutePage>} />
          <Route path="/english/beginner/unit/2/reward" element={<RoutePage><EnglishNumbersReward /></RoutePage>} />
          <Route path="/english/beginner/unit/:unitId/lesson" element={<RoutePage><EnglishColorsLesson /></RoutePage>} />
          <Route path="/english/beginner/unit/:unitId/game" element={<RoutePage><EnglishColorsGame /></RoutePage>} />
          <Route path="/english/beginner/unit/:unitId/quiz" element={<RoutePage><EnglishColorsQuiz /></RoutePage>} />
          <Route path="/english/beginner/unit/:unitId/reward" element={<RoutePage><EnglishColorsReward /></RoutePage>} />

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
      <AppRuntime />
    </BrowserRouter>
  );
}

function AppRuntime() {
  const location = useLocation();
  const publicExplore = isPublicExplorePath(location.pathname);
  if (publicExplore) return <AnimatedRoutes />;
  return <><ActivityTracker /><LicenseAccessGuard /><LessonCooldownGuard><AnimatedRoutes /></LessonCooldownGuard></>;
}
