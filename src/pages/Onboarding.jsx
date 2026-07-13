import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

import "../styles/onboarding.css";
import "../styles/ready.css";

import ProgressBar from "../components/ProgressBar";
import StepName from "../components/StepName";
import StepAvatar from "../components/StepAvatar";
import StepReady from "../components/StepReady";

import { ArrowLeft } from "lucide-react";

import {
  getProfile,
  saveProfile,
} from "../utils/profileStorage";

export default function Onboarding() {
  const navigate = useNavigate();

  const savedProfile = getProfile();

  const [step, setStep] = useState(1);
  const [name, setName] = useState(savedProfile.name || "");
  const [avatar, setAvatar] = useState(
    savedProfile.avatar || "/assets/avatar-1.png"
  );

  useEffect(() => {
    if (savedProfile.onboardingCompleted) {
      navigate("/home", { replace: true });
    }
  }, [navigate, savedProfile.onboardingCompleted]);

  const goToAvatar = () => {
    const cleanName = name.trim();

    if (!cleanName) return;

    saveProfile({
      name: cleanName,
    });

    setName(cleanName);
    setStep(2);
  };

  const goToReady = () => {
    saveProfile({
      avatar,
    });

    setStep(3);
  };

  const finishOnboarding = () => {
    saveProfile({
      name: name.trim(),
      avatar,
      onboardingCompleted: true,
    });

    navigate("/home", { replace: true });
  };

  const goBack = () => {
    setStep((currentStep) => Math.max(1, currentStep - 1));
  };

  return (
    <main className="edu-screen">
      {step > 1 && (
        <button
          type="button"
          className="back-btn"
          onClick={goBack}
        >
          <ArrowLeft size={26} />
          Regresar
        </button>
      )}

      <img
        className="edu-logo"
        src="/assets/logo.png"
        alt="EduPlay"
      />

      <ProgressBar step={step} />

      <img
        className="edu-mascot"
        src="/assets/mascot.png"
        alt=""
      />

      <AnimatePresence mode="wait">
        {step === 1 && (
          <StepName
            key="name"
            name={name}
            setName={setName}
            next={goToAvatar}
          />
        )}

        {step === 2 && (
          <StepAvatar
            key="avatar"
            selectedAvatar={avatar}
            setSelectedAvatar={setAvatar}
            next={goToReady}
          />
        )}

        {step === 3 && (
          <StepReady
            key="ready"
            finish={finishOnboarding}
          />
        )}
      </AnimatePresence>
    </main>
  );
}