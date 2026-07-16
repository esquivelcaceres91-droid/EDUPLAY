import { useEffect, useMemo, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

import "../styles/onboarding.css";
import "../styles/ready.css";

import ProgressBar from "../components/ProgressBar";
import StepName from "../components/StepName";
import StepGrade from "../components/StepGrade";
import StepLevelChoice from "../components/StepLevelChoice";
import StepAvatar from "../components/StepAvatar";
import StepReady from "../components/StepReady";

import { ArrowLeft } from "lucide-react";
import { getProfile, saveProfile } from "../utils/profileStorage";

export default function Onboarding() {
  const navigate = useNavigate();
  const savedProfile = useMemo(() => getProfile(), []);

  const [screen, setScreen] = useState("name");
  const [name, setName] = useState(savedProfile.name || "");
  const [grade, setGrade] = useState(savedProfile.grade || null);
  const [chosenLevel, setChosenLevel] = useState(
    savedProfile.chosenLevel || "beginner"
  );
  const [avatar, setAvatar] = useState(
    savedProfile.avatar || "/assets/avatar-1.png"
  );

  useEffect(() => {
    if (savedProfile.onboardingCompleted) {
      navigate("/home", { replace: true });
    }
  }, [navigate, savedProfile.onboardingCompleted]);

  const progressStep = {
    name: 1,
    grade: 2,
    levelChoice: 2,
    avatar: 3,
    ready: 4,
  }[screen];

  const saveNameAndContinue = () => {
    const cleanName = name.trim();
    if (!cleanName) return;

    setName(cleanName);
    saveProfile({ name: cleanName });
    setScreen("grade");
  };

  const saveGradeAndContinue = () => {
    if (!grade) return;

    const recommendedLevel = grade <= 2 ? "beginner" : "intermediate";

    saveProfile({
      grade,
      recommendedLevel,
    });

    if (grade <= 2) {
      setChosenLevel("beginner");
      saveProfile({ chosenLevel: "beginner" });
      setScreen("avatar");
      return;
    }

    setScreen("levelChoice");
  };

  const chooseLevel = (level) => {
    setChosenLevel(level);
    saveProfile({ chosenLevel: level });
    setScreen("avatar");
  };

  const saveAvatarAndContinue = () => {
    saveProfile({ avatar });
    setScreen("ready");
  };

  const finishOnboarding = () => {
    saveProfile({
      name: name.trim(),
      avatar,
      grade,
      recommendedLevel: grade <= 2 ? "beginner" : "intermediate",
      chosenLevel,
      onboardingCompleted: true,
    });

    navigate("/home", { replace: true });
  };

  const goBack = () => {
    if (screen === "grade") setScreen("name");
    if (screen === "levelChoice") setScreen("grade");
    if (screen === "avatar") {
      setScreen(grade >= 3 ? "levelChoice" : "grade");
    }
    if (screen === "ready") setScreen("avatar");
  };

  return (
    <main className="edu-screen">
      {screen !== "name" && (
        <button type="button" className="back-btn" onClick={goBack}>
          <ArrowLeft size={26} />
          Regresar
        </button>
      )}

      <img className="edu-logo" src="/assets/logo.png" alt="EduPlay" />
      <ProgressBar step={progressStep} />

      <img className="edu-mascot" src="/assets/mascot.png" alt="" />

      <AnimatePresence mode="wait">
        {screen === "name" && (
          <StepName
            key="name"
            name={name}
            setName={setName}
            next={saveNameAndContinue}
          />
        )}

        {screen === "grade" && (
          <StepGrade
            key="grade"
            grade={grade}
            setGrade={setGrade}
            next={saveGradeAndContinue}
          />
        )}

        {screen === "levelChoice" && (
          <StepLevelChoice
            key="level-choice"
            grade={grade}
            chooseLevel={chooseLevel}
          />
        )}

        {screen === "avatar" && (
          <StepAvatar
            key="avatar"
            selectedAvatar={avatar}
            setSelectedAvatar={setAvatar}
            next={saveAvatarAndContinue}
          />
        )}

        {screen === "ready" && (
          <StepReady key="ready" finish={finishOnboarding} />
        )}
      </AnimatePresence>
    </main>
  );
}
