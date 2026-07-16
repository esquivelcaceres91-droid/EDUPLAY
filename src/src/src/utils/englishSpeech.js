let pendingVoiceTimer = null;

function getEnglishVoice() {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return null;

  const voices = window.speechSynthesis.getVoices();
  if (!voices.length) return null;

  const preferredNames = [
    "Microsoft Aria Online",
    "Microsoft Jenny Online",
    "Microsoft Zira",
    "Google US English",
    "Samantha",
    "Daniel",
  ];

  return (
    voices.find((voice) => preferredNames.some((name) => voice.name.includes(name))) ||
    voices.find((voice) => /^en-US/i.test(voice.lang)) ||
    voices.find((voice) => /^en-GB/i.test(voice.lang)) ||
    voices.find((voice) => /^en/i.test(voice.lang)) ||
    null
  );
}

export function speakEnglish(text) {
  if (!text || typeof window === "undefined" || !("speechSynthesis" in window)) {
    return false;
  }

  const synth = window.speechSynthesis;
  window.clearTimeout(pendingVoiceTimer);
  synth.cancel();

  const play = () => {
    const utterance = new SpeechSynthesisUtterance(String(text));
    utterance.lang = "en-US";
    utterance.rate = 0.82;
    utterance.pitch = 1.03;
    utterance.volume = 1;

    const voice = getEnglishVoice();
    if (voice) utterance.voice = voice;

    synth.resume();
    synth.speak(utterance);
  };

  if (synth.getVoices().length) {
    play();
  } else {
    const onVoicesChanged = () => {
      synth.removeEventListener("voiceschanged", onVoicesChanged);
      play();
    };

    synth.addEventListener("voiceschanged", onVoicesChanged, { once: true });
    pendingVoiceTimer = window.setTimeout(() => {
      synth.removeEventListener("voiceschanged", onVoicesChanged);
      play();
    }, 500);
  }

  return true;
}
