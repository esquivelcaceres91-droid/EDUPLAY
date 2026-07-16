import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LogOut, Pencil, Plus, Users } from "lucide-react";
import { activateProfile, getAccount, migrateLegacyProfile, signOutFamily } from "../utils/accountStorage";
import "../styles/access.css";

export default function ProfileSelectorPage() {
  const nav = useNavigate();
  const [profiles, setProfiles] = useState([]);
  const [account, setAccount] = useState(null);

  useEffect(() => {
    let active = true;
    getAccount().then((currentAccount) => {
      if (!active) return;
      if (!currentAccount) {
        nav("/login", { replace: true });
        return;
      }
      setAccount(currentAccount);
      migrateLegacyProfile().then((loadedProfiles) => {
        if (active) setProfiles(loadedProfiles);
      }).catch(() => {
        if (active) setProfiles([]);
      });
    }).catch(() => nav("/login", { replace: true }));
    return () => { active = false; };
  }, [nav]);

  const enter = async (id) => {
    await activateProfile(id);
    nav("/home");
  };

  const logout = async () => {
    await signOutFamily();
    nav("/", { replace: true });
  };

  return <main className="access-screen selector-screen"><header><img src="/assets/logo.png" alt="EduPlay"/><div><Users/><span>Familia de {account?.ownerName||'EduPlay'}</span><button onClick={logout}><LogOut/> Salir</button></div></header><section><small>¿QUIÉN VA A APRENDER?</small><h1>Elige tu perfil</h1><p>Cada estudiante conserva su propio progreso, recompensas y diplomas.</p><div className="selector-grid">{profiles.map((profile)=><article key={profile.id} className={`selector-profile ${profile.color||'blue'}`}><button className="edit-mini" onClick={()=>nav('/create-profiles')}><Pencil/></button><button className="profile-main" onClick={()=>enter(profile.id)}><div className="profile-avatar-ring"><img src={profile.avatar}/></div><h2>{profile.name}</h2><span>{profile.grade?`${profile.grade}.º primaria`:'Listo para aprender'}</span><b>Entrar a EduPlay</b></button></article>)}{profiles.length<3&&<button className="selector-add" onClick={()=>nav('/create-profiles')}><Plus/><b>Agregar estudiante</b><span>{profiles.length}/3 perfiles</span></button>}</div></section></main>;
}
