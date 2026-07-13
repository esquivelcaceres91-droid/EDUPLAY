const PROFILE_KEY = "eduplay_profile";

const defaultProfile = {
  name: "",
  avatar: "/assets/avatar-1.png",
  onboardingCompleted: false,
  points: 0,
  streak: 0,
  level: 1,
};

export function getProfile() {
  try {
    const savedProfile = localStorage.getItem(PROFILE_KEY);

    if (!savedProfile) {
      return defaultProfile;
    }

    return {
      ...defaultProfile,
      ...JSON.parse(savedProfile),
    };
  } catch (error) {
    console.error("No se pudo leer el perfil:", error);
    return defaultProfile;
  }
}

export function saveProfile(profile) {
  try {
    const currentProfile = getProfile();

    const updatedProfile = {
      ...currentProfile,
      ...profile,
    };

    localStorage.setItem(
      PROFILE_KEY,
      JSON.stringify(updatedProfile)
    );

    return updatedProfile;
  } catch (error) {
    console.error("No se pudo guardar el perfil:", error);
    return null;
  }
}

export function resetProfile() {
  localStorage.removeItem(PROFILE_KEY);
}