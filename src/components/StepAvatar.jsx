import { ArrowRight, Check } from "lucide-react";
import { motion } from "framer-motion";

export default function StepAvatar({ next }) {

  const avatars = Array.from({ length: 10 });

  return (

    <motion.section
      className="avatar-card-pro"
      initial={{ x: 350, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -350, opacity: 0 }}
      transition={{
        duration: .45,
        ease: "easeInOut"
      }}
    >

      <div className="avatar-title">
        <span>⭐</span>
        <h1>Elige tu avatar</h1>
        <span>⭐</span>
      </div>

      <p>
        Selecciona el avatar que más te guste.
      </p>

      <div className="avatar-grid-pro">

        {avatars.map((_, index) => (

          <button
            key={index}
            className={
              index === 0
                ? "avatar-box selected"
                : "avatar-box"
            }
          >

            {index === 0 && (

              <div className="avatar-check">
                <Check size={34}/>
              </div>

            )}

            <img
              src={`/assets/avatar-${index+1}.png`}
              alt=""
              onError={(e)=>{
                e.currentTarget.src="/assets/mascot.png";
              }}
            />

          </button>

        ))}

      </div>

      <button
        className="avatar-ready-btn"
        onClick={next}
      >

        Listo

        <ArrowRight size={42}/>

      </button>

      <small>

        🛡️ Puedes cambiar tu avatar después.

      </small>

    </motion.section>

  );

}