import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

import "../styles/onboarding.css";
import "../styles/ready.css";

import ProgressBar from "../components/ProgressBar";
import StepName from "../components/StepName";
import StepAvatar from "../components/StepAvatar";
import StepReady from "../components/StepReady";

import { ArrowLeft } from "lucide-react";

export default function Onboarding() {

  const [step, setStep] = useState(1);

  const navigate = useNavigate();

  return (

    <main className="edu-screen">

      {step > 1 && (

        <button
          className="back-btn"
          onClick={() => setStep(step - 1)}
        >

          <ArrowLeft size={26}/>

          Regresar

        </button>

      )}

      <img
        className="edu-logo"
        src="/assets/logo.png"
        alt=""
      />

      <ProgressBar step={step}/>

      <img
        className="edu-mascot"
        src="/assets/mascot.png"
        alt=""
      />

      <AnimatePresence mode="wait">

        {step === 1 && (

          <StepName
            key="name"
            next={() => setStep(2)}
          />

        )}

        {step === 2 && (

          <StepAvatar
            key="avatar"
            next={() => setStep(3)}
          />

        )}

        {step === 3 && (

          <StepReady
            key="ready"
            finish={() => navigate("/home")}
          />

        )}

      </AnimatePresence>

    </main>

  );

}