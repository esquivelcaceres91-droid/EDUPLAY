import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Check,
  ChevronDown,
  Pencil,
  Plus,
  Sparkles,
  Trash2,
  UserRound,
  X,
} from "lucide-react";
import {
  activateProfile,
  createStudentProfile,
  deleteStudentProfile,
  getProfiles,
  updateStudentProfile,
} from "../utils/accountStorage";
import "../styles/access.css";

const avatars = [1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 12].map(
  (number) => `/assets/avatar-${number}.png`,
);
const colors = ["blue", "pink", "green"];

const createEmptyProfile = (index) => ({
  id: null,
  name: "",
  age: "",
  grade: "",
  avatar: avatars[index % avatars.length],
  color: colors[index % colors.length],
  isNew: true,
});

const normalizeProfile = (profile, index) => ({
  ...profile,
  name: profile.name || "",
  age: profile.age ? String(profile.age) : "",
  grade: profile.grade ? String(profile.grade) : "",
  avatar: profile.avatar || avatars[index % avatars.length],
  color: profile.color || colors[index % colors.length],
  isNew: false,
});

export default function CreateProfilesPage() {
  const navigate = useNavigate();
  const [cards, setCards] = useState([createEmptyProfile(0)]);
  const [loading, setLoading] = useState(true);
  const [avatarPickerIndex, setAvatarPickerIndex] = useState(null);
  const [error, setError] = useState("");
  const [savedMessage, setSavedMessage] = useState("");

  useEffect(() => {
    let active = true;
    import("../utils/accountStorage").then(({ migrateLegacyProfile }) => migrateLegacyProfile()).then((profiles) => {
      if (!active) return;
      const saved = profiles.slice(0, 3).map(normalizeProfile);
      setCards(saved.length ? saved : [createEmptyProfile(0)]);
      setLoading(false);
    }).catch((loadError) => {
      if (!active) return;
      setError(loadError.message || "No se pudieron cargar los perfiles.");
      setLoading(false);
    });
    return () => { active = false; };
  }, []);

  useEffect(() => {
    if (!savedMessage) return undefined;
    const timeout = window.setTimeout(() => setSavedMessage(""), 2200);
    return () => window.clearTimeout(timeout);
  }, [savedMessage]);

  const updateCard = (index, key, value) => {
    setCards((current) =>
      current.map((card, cardIndex) =>
        cardIndex === index ? { ...card, [key]: value } : card,
      ),
    );
    setError("");
  };

  const addProfileCard = () => {
    if (cards.length >= 3) return;
    setCards((current) => [...current, createEmptyProfile(current.length)]);
  };

  const removeProfileCard = async (index) => {
    const card = cards[index];
    if (card?.id) await deleteStudentProfile(card.id);
    setCards((current) => current.filter((_, cardIndex) => cardIndex !== index));
    setAvatarPickerIndex(null);
  };

  const validateCards = () => {
    if (!cards.length) throw new Error("Crea al menos un perfil para continuar.");

    cards.forEach((card, index) => {
      if (!card.name.trim()) {
        throw new Error(`Escribe el nombre del estudiante ${index + 1}.`);
      }
      if (!card.age) {
        throw new Error(`Selecciona la edad de ${card.name.trim()}.`);
      }
      if (!card.grade) {
        throw new Error(`Selecciona el grado de ${card.name.trim()}.`);
      }
      if (!card.avatar) {
        throw new Error(`Selecciona un avatar para ${card.name.trim()}.`);
      }
    });
  };

  const saveProfiles = async () => {
    setError("");
    try {
      validateCards();

      const saved = await Promise.all(cards.map((card) => {
        const payload = {
          name: card.name.trim(),
          age: Number(card.age),
          grade: Number(card.grade),
          avatar: card.avatar,
          color: card.color,
        };

        return card.id
          ? updateStudentProfile(card.id, payload)
          : createStudentProfile(payload);
      }));

      const firstProfile = saved[0] || getProfiles()[0];
      if (firstProfile) await activateProfile(firstProfile.id);
      setSavedMessage("¡Perfiles guardados correctamente!");
      window.setTimeout(() => navigate("/profiles"), 450);
    } catch (saveError) {
      setError(saveError.message || "No se pudieron guardar los perfiles.");
    }
  };

  return (
    <main className="access-screen profiles-create-screen profiles-premium-screen">
      <aside className="profiles-side profiles-premium-side" aria-hidden="true" />

      <section className="profiles-panel profiles-premium-panel">
        <div className="stepper wide profiles-stepper">
          <b className="done"><Check /><span>Cuenta</span></b>
          <b className="done"><Check /><span>Licencia</span></b>
          <b className="active">3<span>Crea perfiles</span></b>
          <b>4<span>¡Comienza!</span></b>
        </div>

        <header className="profiles-heading">
          <span className="profiles-eyebrow"><Sparkles size={16} /> PASO 3 DE 4</span>
          <h1>Crea los perfiles de tus estudiantes</h1>
          <p>Puedes agregar hasta <b>3 estudiantes</b>. Cada uno tendrá progreso independiente.</p>
        </header>

        <div className="profile-editor-grid premium-profile-grid">
          {cards.map((card, index) => (
            <article className={`profile-editor premium-profile-card ${card.color}`} key={card.id || `new-${index}`}>
              <div className="profile-card-glow" />
              <div className="profile-number">PERFIL {index + 1}</div>
              <button
                type="button"
                className="delete-profile premium-delete-profile"
                onClick={() => removeProfileCard(index)}
                aria-label={`Eliminar perfil ${index + 1}`}
              >
                <Trash2 />
              </button>

              <button
                type="button"
                className="premium-avatar-button"
                onClick={() => setAvatarPickerIndex(index)}
                aria-label="Elegir avatar"
              >
                <span className="premium-avatar-ring">
                  <img src={card.avatar} alt="Avatar seleccionado" />
                </span>
                <span className="avatar-edit-badge"><Pencil size={15} /> Cambiar</span>
              </button>

              <label className="premium-profile-field profile-name-field">
                <span><UserRound size={15} /> Nombre del estudiante</span>
                <input
                  value={card.name}
                  onChange={(event) => updateCard(index, "name", event.target.value)}
                  placeholder="Escribe su nombre"
                  maxLength={30}
                  autoComplete="off"
                />
              </label>

              <div className="premium-profile-fields">
                <label className="premium-profile-field">
                  <span>Edad</span>
                  <div className="premium-select-wrap">
                    <select
                      value={card.age}
                      onChange={(event) => updateCard(index, "age", event.target.value)}
                    >
                      <option value="">Elegir</option>
                      {Array.from({ length: 10 }, (_, ageIndex) => ageIndex + 5).map((age) => (
                        <option key={age} value={age}>{age} años</option>
                      ))}
                    </select>
                    <ChevronDown />
                  </div>
                </label>

                <label className="premium-profile-field">
                  <span>Grado</span>
                  <div className="premium-select-wrap">
                    <select
                      value={card.grade}
                      onChange={(event) => updateCard(index, "grade", event.target.value)}
                    >
                      <option value="">Elegir</option>
                      {[1, 2, 3, 4, 5, 6].map((grade) => (
                        <option key={grade} value={grade}>{grade}.º primaria</option>
                      ))}
                    </select>
                    <ChevronDown />
                  </div>
                </label>
              </div>

              <button
                type="button"
                className="open-avatar-gallery"
                onClick={() => setAvatarPickerIndex(index)}
              >
                <Sparkles size={17} /> Elegir otro avatar
              </button>
            </article>
          ))}

          {cards.length < 3 && (
            <button type="button" className="add-profile-card premium-add-profile" onClick={addProfileCard}>
              <span className="premium-add-orbit"><Plus /></span>
              <b>Agregar estudiante</b>
              <span>{cards.length} de 3 perfiles creados</span>
              <small>Cada estudiante tendrá su propio avance.</small>
            </button>
          )}
        </div>

        {error && <div className="form-error premium-form-error">{error}</div>}
        {savedMessage && <div className="profile-save-success"><Check /> {savedMessage}</div>}

        <footer className="profiles-footer-card">
          <div>
            <strong>{cards.length} de 3 perfiles</strong>
            <span>Podrás editarlos posteriormente desde Ajustes.</span>
          </div>
          <div className="profiles-actions premium-profiles-actions">
            <button className="outline-access-button" onClick={() => navigate("/choose-license")}>Atrás</button>
            <button className="primary-access-button" onClick={saveProfiles} disabled={loading}>Guardar y continuar</button>
          </div>
        </footer>
      </section>

      {avatarPickerIndex !== null && cards[avatarPickerIndex] && (
        <div className="avatar-picker-backdrop" role="dialog" aria-modal="true">
          <section className="avatar-picker-modal">
            <button
              type="button"
              className="avatar-picker-close"
              onClick={() => setAvatarPickerIndex(null)}
              aria-label="Cerrar"
            >
              <X />
            </button>
            <span className="profiles-eyebrow"><Sparkles size={16} /> GALERÍA DE AVATARES</span>
            <h2>Elige tu compañero de aventura</h2>
            <p>Selecciona el avatar que mejor represente a {cards[avatarPickerIndex].name || "este estudiante"}.</p>
            <div className="avatar-picker-grid">
              {avatars.map((avatar, avatarIndex) => (
                <button
                  type="button"
                  key={avatar}
                  className={cards[avatarPickerIndex].avatar === avatar ? "selected" : ""}
                  onClick={() => {
                    updateCard(avatarPickerIndex, "avatar", avatar);
                    setAvatarPickerIndex(null);
                  }}
                >
                  <img src={avatar} alt={`Avatar ${avatarIndex + 1}`} />
                  {cards[avatarPickerIndex].avatar === avatar && <span><Check /></span>}
                </button>
              ))}
            </div>
          </section>
        </div>
      )}
    </main>
  );
}
