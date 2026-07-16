import { useState } from "react";
import {
  ArrowLeft,
  Settings,
  Save,
  Volume2,
  Music,
  RotateCcw,
  UserRound,
  LogOut,
  Users,
  Info,
  MapPin,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import DashboardNav from "../components/DashboardNav";
import { getProfile, saveProfile } from "../utils/profileStorage";
import { getEngagement, updateAppSettings } from "../utils/engagementStorage";
import { signOutFamily } from "../utils/accountStorage";
import "../styles/dashboard-hub.css";

export default function SettingsPage() {
  const navigate = useNavigate();
  const profile = getProfile();
  const app = getEngagement().settings;

  const [form, setForm] = useState({
    name: profile.name || "",
    age: profile.age || "",
    email: profile.email || "",
    grade: profile.grade || "",
    avatar: profile.avatar || "/assets/avatar-1.png",
    sound: app.sound,
    music: app.music,
    volume: app.volume,
  });

  const [saved, setSaved] = useState(false);

  const set = (key, value) => {
    setForm((current) => ({ ...current, [key]: value }));
  };

  const submit = (event) => {
    event.preventDefault();

    saveProfile({
      name: form.name,
      age: form.age,
      email: form.email,
      grade: form.grade,
      avatar: form.avatar,
    });

    updateAppSettings({
      sound: form.sound,
      music: form.music,
      volume: Number(form.volume),
    });

    setSaved(true);
    setTimeout(() => setSaved(false), 1800);
  };

  return (
    <main className="dashboard-screen settings-screen">
      <header className="dashboard-header">
        <button onClick={() => navigate("/home")}>
          <ArrowLeft /> Volver
        </button>

        <div>
          <span>MI PERFIL</span>
          <h1>
            <Settings /> Ajustes
          </h1>
          <p>Personaliza la experiencia del estudiante.</p>
        </div>
      </header>

      <form className="settings-shell" onSubmit={submit}>
        <section className="profile-editor">
          <div className="avatar-preview">
            <img
              src={form.avatar}
              alt="Avatar del estudiante"
              onError={(event) => {
                event.currentTarget.src = "/assets/avatar-1.png";
              }}
            />
            <UserRound />
          </div>

          <div className="avatar-options">
            {[1, 2, 3, 4, 5].map((number) => (
              <button
                type="button"
                className={form.avatar.includes(`avatar-${number}`) ? "selected" : ""}
                onClick={() => set("avatar", `/assets/avatar-${number}.png`)}
                key={number}
              >
                <img src={`/assets/avatar-${number}.png`} alt={`Avatar ${number}`} />
              </button>
            ))}
          </div>
        </section>

        <section className="form-grid">
          <label>
            Nombre
            <input
              value={form.name}
              onChange={(event) => set("name", event.target.value)}
              placeholder="Nombre del estudiante"
            />
          </label>

          <label>
            Edad
            <input
              type="number"
              min="4"
              max="18"
              value={form.age}
              onChange={(event) => set("age", event.target.value)}
            />
          </label>

          <label>
            Grado
            <select
              value={form.grade}
              onChange={(event) => set("grade", event.target.value)}
            >
              <option value="">Seleccionar</option>
              {[1, 2, 3, 4, 5, 6].map((number) => (
                <option key={number} value={number}>
                  {number}.º primaria
                </option>
              ))}
            </select>
          </label>

          <label>
            Correo opcional
            <input
              type="email"
              value={form.email}
              onChange={(event) => set("email", event.target.value)}
              placeholder="familia@correo.com"
            />
          </label>
        </section>

        <section className="sound-panel">
          <label>
            <Volume2 />
            <span>Sonidos</span>
            <input
              type="checkbox"
              checked={form.sound}
              onChange={(event) => set("sound", event.target.checked)}
            />
          </label>

          <label>
            <Music />
            <span>Música</span>
            <input
              type="checkbox"
              checked={form.music}
              onChange={(event) => set("music", event.target.checked)}
            />
          </label>

          <label className="volume-range">
            <span>Volumen {form.volume}%</span>
            <input
              type="range"
              min="0"
              max="100"
              value={form.volume}
              onChange={(event) => set("volume", event.target.value)}
            />
          </label>
        </section>

        <section className="account-settings-panel">
          <div>
            <UserRound />
            <span>
              <b>Cuenta familiar</b>
              <small>Cambia de estudiante o cierra la sesión en este dispositivo.</small>
            </span>
          </div>

          <div className="account-settings-buttons">
            <button type="button" onClick={() => navigate("/profiles")}>
              <Users /> Cambiar perfil
            </button>

            <button
              type="button"
              className="logout-settings"
              onClick={async () => {
                await signOutFamily();
                navigate("/create-account");
              }}
            >
              <LogOut /> Cerrar sesión
            </button>
          </div>
        </section>

        <section className="about-eduplay-panel" aria-label="Acerca de EduPlay">
          <div className="about-eduplay-icon">
            <Info />
          </div>

          <div className="about-eduplay-copy">
            <span>ACERCA DE</span>
            <h2>
              EduPlay <small>Versión 1.0</small>
            </h2>
            <p>
              EduPlay es una plataforma educativa diseñada para fortalecer el
              aprendizaje de niños de primaria mediante experiencias interactivas
              de inglés y computación.
            </p>
            <strong>Desarrollado por José Esteban Esquivel</strong>
            <em>
              <MapPin /> Guatemala
            </em>
          </div>
        </section>

        <div className="settings-actions">
          <button className="save-settings">
            <Save /> {saved ? "¡Guardado!" : "Guardar cambios"}
          </button>

          <button
            type="button"
            className="secondary"
            onClick={() => {
              if (confirm("¿Restablecer únicamente nombre, edad y correo?")) {
                setForm((current) => ({
                  ...current,
                  name: "",
                  age: "",
                  email: "",
                }));
              }
            }}
          >
            <RotateCcw /> Limpiar datos
          </button>
        </div>
      </form>

      <DashboardNav active="/settings" />
    </main>
  );
}
