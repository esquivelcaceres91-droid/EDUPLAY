import { ArrowRight, Check } from "lucide-react";
import { motion } from "framer-motion";

export default function StepAvatar({
  selectedAvatar,
  setSelectedAvatar,
  next,
}) {
  const avatars = Array.from(
    { length: 10 },
    (_, index) => `/assets/avatar-${index + 1}.png`
  );

  return (
    <motion.section
      className="avatar-card-pro"
      initial={{ x: 350, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -350, opacity: 0 }}
      transition={{
        duration: 0.45,
        ease: "easeInOut",
      }}
    >
      <div className="avatar-title">
        <span>⭐</span>
        <h1>Elige tu avatar</h1>
        <span>⭐</span>
      </div>

      <p>Selecciona el avatar que más te guste.</p>

      <div className="avatar-grid-pro">
        {avatars.map((avatar, index) => {
          const isSelected = selectedAvatar === avatar;

          return (
            <motion.button
              type="button"
              key={avatar}
              className={`avatar-box ${isSelected ? "selected" : ""}`}
              onClick={() => setSelectedAvatar(avatar)}
              whileHover={{
                scale: 1.06,
                y: -4,
              }}
              whileTap={{
                scale: 0.94,
              }}
            >
              {isSelected && (
                <motion.div
                  className="avatar-check"
                  initial={{
                    scale: 0,
                    opacity: 0,
                  }}
                  animate={{
                    scale: 1,
                    opacity: 1,
                  }}
                >
                  <Check size={34} />
                </motion.div>
              )}

              <img
                src={avatar}
                alt={`Avatar ${index + 1}`}
                onError={(event) => {
                  event.currentTarget.src = "/assets/mascot.png";
                }}
              />
            </motion.button>
          );
        })}
      </div>

      <button
        type="button"
        className="avatar-ready-btn"
        onClick={next}
      >
        Listo
        <ArrowRight size={42} />
      </button>

      <small>
        🛡️ Puedes cambiar tu avatar después.
      </small>
    </motion.section>
  );
}