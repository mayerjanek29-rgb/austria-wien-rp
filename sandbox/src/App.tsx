import { useEffect, useState } from "react";

export default function FiveMWebsite() {
  const [page, setPage] = useState("home");

  // TRUE = Wartungsarbeiten / Team Only
  // FALSE = Öffentlicher Server
  const maintenanceMode = true;
  const [serverData, setServerData] = useState({
    online: true,
    players: 0,
    maxPlayers: 64,
    uptime: "Live",
  });

  const [rulesAccepted, setRulesAccepted] = useState({
    rule1: false,
    rule2: false,
    rule3: false,
    rule4: false,
  });

  const [quizAnswers, setQuizAnswers] = useState({
    q1: "",
    q2: "",
    q3: "",
    q4: "",
    q5: "",
    q6: "",
  });

  const allRulesAccepted = Object.values(rulesAccepted).every(Boolean);
  const quizPassed =
    quizAnswers.q1 === "nein" &&
    quizAnswers.q2 === "nein" &&
    quizAnswers.q3 === "ja" &&
    quizAnswers.q4 === "nein" &&
    quizAnswers.q5 === "ja" &&
    quizAnswers.q6 === "nein" &&
    allRulesAccepted;

  useEffect(() => {
    async function loadServerStatus() {
      try {
        // Wenn ihr eine richtige FiveM Status API habt, hier die URL einfügen.
        // Beispiel: https://deine-api.de/status
        const res = await fetch(
          "https://api.allorigins.win/raw?url=https://servers-frontend.fivem.net/api/servers/single/GMXDKQ"
        );
        const data = await res.json();

        setServerData({
          online: true,
          players: data?.Data?.clients ?? 0,
          maxPlayers: data?.Data?.sv_maxclients ?? 64,
          uptime: "Live",
        });
      } catch (error) {
        setServerData({
          online: false,
          players: 0,
          maxPlayers: 64,
          uptime: "Live",
        });
      }
    }

    loadServerStatus();
    const interval = setInterval(loadServerStatus, 60000);
    return () => clearInterval(interval);
  }, []);

  if (page === "rules") {
    return (
      <div className="min-h-screen bg-black text-white font-sans px-8 py-8">
        <button
          type="button"
          onClick={() => setPage("home")}
          className="mb-8 px-6 py-3 rounded-2xl border border-zinc-700 hover:border-red-500 transition"
        >
          ← Zurück zur Startseite
        </button>

        <h1 className="text-5xl font-black text-center mb-10 text-red-500">
          Austria Wien Regelwerk
        </h1>

        <div className="max-w-7xl mx-auto grid grid-cols-1 xl:grid-cols-2 gap-8">
          <div className="bg-white rounded-3xl p-4 shadow-2xl">
            <iframe
              src="https://docs.google.com/document/d/1zl9yzGHjrTk73QA1lX1sO6CKxV94fduVCB8GKWFn55E/preview"
              title="Austria Wien Regelwerk"
              className="w-full h-[850px] rounded-2xl bg-white"
            ></iframe>
          </div>

          <div className="bg-zinc-900 rounded-3xl p-8 shadow-2xl border border-zinc-800 h-fit">
            <h2 className="text-3xl font-bold mb-4 text-center">
              Einreise-Check
            </h2>
            <p className="text-zinc-400 mb-8 text-center">
              Lies zuerst das Regelwerk und beantworte danach die Fragen.
            </p>

            <div className="space-y-4 mb-8">
              {[
                ["rule1", "Ich habe das Regelwerk gelesen."],
                ["rule2", "Ich akzeptiere die Serverregeln."],
                ["rule3", "Ich weiß, dass Trolling bestraft wird."],
                ["rule4", "Ich spiele ernsthaftes Roleplay."],
              ].map(([key, text]) => (
                <label
                  key={key}
                  className="flex items-center gap-4 bg-black/40 border border-zinc-800 rounded-2xl p-4 cursor-pointer hover:border-red-500 transition"
                >
                  <input
                    type="checkbox"
                    checked={rulesAccepted[key]}
                    onChange={() =>
                      setRulesAccepted({
                        ...rulesAccepted,
                        [key]: !rulesAccepted[key],
                      })
                    }
                    className="w-5 h-5 accent-red-600"
                  />
                  <span className="text-zinc-300">{text}</span>
                </label>
              ))}
            </div>

            <div className="space-y-6">
              <div>
                <p className="font-semibold mb-3">
                  1. Darfst du ohne RP-Grund jemanden töten?
                </p>
                <select
                  value={quizAnswers.q1}
                  onChange={(e) =>
                    setQuizAnswers({ ...quizAnswers, q1: e.target.value })
                  }
                  className="w-full bg-black border border-zinc-700 rounded-2xl p-4 text-white"
                >
                  <option value="">Antwort auswählen</option>
                  <option value="ja">Ja</option>
                  <option value="nein">Nein</option>
                </select>
              </div>

              <div>
                <p className="font-semibold mb-3">
                  2. Darfst du Infos aus Discord IC benutzen?
                </p>
                <select
                  value={quizAnswers.q2}
                  onChange={(e) =>
                    setQuizAnswers({ ...quizAnswers, q2: e.target.value })
                  }
                  className="w-full bg-black border border-zinc-700 rounded-2xl p-4 text-white"
                >
                  <option value="">Antwort auswählen</option>
                  <option value="ja">Ja</option>
                  <option value="nein">Nein</option>
                </select>
              </div>

              <div>
                <p className="font-semibold mb-3">
                  3. Musst du respektvoll mit anderen Spielern umgehen?
                </p>
                <select
                  value={quizAnswers.q3}
                  onChange={(e) =>
                    setQuizAnswers({ ...quizAnswers, q3: e.target.value })
                  }
                  className="w-full bg-black border border-zinc-700 rounded-2xl p-4 text-white"
                >
                  <option value="">Antwort auswählen</option>
                  <option value="ja">Ja</option>
                  <option value="nein">Nein</option>
                </select>
              </div>

              <div>
                <p className="font-semibold mb-3">
                  4. Darfst du absichtlich trollen?
                </p>
                <select
                  value={quizAnswers.q4}
                  onChange={(e) =>
                    setQuizAnswers({ ...quizAnswers, q4: e.target.value })
                  }
                  className="w-full bg-black border border-zinc-700 rounded-2xl p-4 text-white"
                >
                  <option value="">Antwort auswählen</option>
                  <option value="ja">Ja</option>
                  <option value="nein">Nein</option>
                </select>
              </div>

              <div>
                <p className="font-semibold mb-3">
                  5. Solltest du realistisches RP spielen?
                </p>
                <select
                  value={quizAnswers.q5}
                  onChange={(e) =>
                    setQuizAnswers({ ...quizAnswers, q5: e.target.value })
                  }
                  className="w-full bg-black border border-zinc-700 rounded-2xl p-4 text-white"
                >
                  <option value="">Antwort auswählen</option>
                  <option value="ja">Ja</option>
                  <option value="nein">Nein</option>
                </select>
              </div>

              <div>
                <p className="font-semibold mb-3">
                  6. Darfst du ohne Grund Leute beleidigen?
                </p>
                <select
                  value={quizAnswers.q6}
                  onChange={(e) =>
                    setQuizAnswers({ ...quizAnswers, q6: e.target.value })
                  }
                  className="w-full bg-black border border-zinc-700 rounded-2xl p-4 text-white"
                >
                  <option value="">Antwort auswählen</option>
                  <option value="ja">Ja</option>
                  <option value="nein">Nein</option>
                </select>
              </div>
            </div>

            <div className="mt-8 text-center">
              <button
                disabled={!quizPassed}
                className={`px-10 py-4 rounded-2xl font-bold transition-all duration-300 ${
                  quizPassed
                    ? "bg-gradient-to-r from-red-600 to-red-500 hover:scale-105 shadow-[0_0_30px_rgba(255,0,0,0.6)]"
                    : "bg-zinc-700 text-zinc-400 cursor-not-allowed"
                }`}
              >
                {quizPassed ? "REGELWERK BESTÄTIGT" : "FRAGEBOGEN ABSCHLIESSEN"}
              </button>

              {quizPassed && (
                <p className="text-green-400 mt-4 font-semibold">
                  Erfolgreich bestanden. Willkommen auf Austria Wien Roleplay!
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white font-sans">
      {/* Navbar */}
      <nav className="flex items-center justify-between p-6 border-b border-zinc-800 bg-zinc-950 sticky top-0 z-50">
        <h1 className="text-2xl font-bold text-red-500">Austria Wien</h1>
        <div className="flex gap-6 text-sm">
          <a href="#home" className="hover:text-red-500 transition">
            Home
          </a>
          <button
            type="button"
            onClick={() => setPage("rules")}
            className="hover:text-red-500 transition"
          >
            Regelwerk
          </button>
          <a href="#leaks" className="hover:text-red-500 transition">
            Leaks
          </a>
          <a href="#team" className="hover:text-red-500 transition">
            Team
          </a>
          <a href="#discord" className="hover:text-red-500 transition">
            Discord
          </a>
        </div>
      </nav>

      {page === "home" && (
        <>
          {/* Hero */}
          <section
            id="home"
            className="relative h-screen flex flex-col items-center justify-center text-center overflow-hidden"
          >
            <div
              className="absolute inset-0 bg-cover bg-center scale-110"
              style={{
                backgroundImage:
                  "linear-gradient(to bottom, rgba(0,0,0,0.5), rgba(0,0,0,0.95)), url('https://cdn.discordapp.com/attachments/1442206768355741776/1499851389713645588/MOSHED-2026-5-1-21-13-26.gif?ex=69fd8d35&is=69fc3bb5&hm=e47a0632052144f85bb716d9dd718097486d81a38a515634e9a19d41bb995b79&')",
              }}
            ></div>

            <div className="absolute inset-0 backdrop-blur-[2px]"></div>

            <div className="relative z-10 px-6">
              <div className="mb-10 flex justify-center">
                <img
                  src="https://cdn.discordapp.com/attachments/1442206768355741776/1500892825493966969/OUTLINE_AW_New_Chapter.png?ex=69fd629e&is=69fc111e&hm=add8d0f6beb55b93fd6ace543230cd79027408e1a30013e1794b2fe158c21108&"
                  alt="Austria Wien Logo"
                  className="w-[420px] max-w-full drop-shadow-[0_0_45px_rgba(255,0,0,0.8)]"
                />
              </div>

              <div className="mb-6 flex justify-center">
                <div className="px-6 py-2 rounded-full border border-red-500/40 bg-red-500/10 text-red-400 text-sm tracking-[4px] uppercase shadow-[0_0_30px_rgba(255,0,0,0.4)]">
                  New Chapter • Austria Wien
                </div>
              </div>

              <h3 className="text-5xl md:text-6xl font-black text-white mb-6 tracking-[8px] drop-shadow-[0_0_20px_rgba(255,0,0,0.7)]">
                AUSTRIA WIEN • NEW CHAPTER
              </h3>

              <p className="max-w-3xl mx-auto text-zinc-300 text-xl mb-10 leading-relaxed">
                Tauche ein in realistisches FiveM Roleplay mit einer starken
                Community, einzigartigen Fraktionen und einem modernen
                Spielerlebnis direkt aus Wien.
              </p>

              <div className="flex flex-wrap justify-center gap-5">
                <a
                  href="fivem://connect/fivem.austriawien.eu"
                  className="inline-block px-10 py-4 rounded-2xl bg-gradient-to-r from-red-600 to-red-500 hover:scale-105 transition-all duration-300 font-bold shadow-[0_0_30px_rgba(255,0,0,0.6)]"
                >
                  F8 CONNECT
                </a>

                <a
                  href="https://discord.gg/austriawien"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-10 py-4 rounded-2xl border border-zinc-500 bg-black/40 backdrop-blur-md hover:border-red-500 hover:scale-105 transition-all duration-300"
                >
                  DISCORD JOINEN
                </a>

                <a
                  href="#leaks"
                  className="inline-block px-10 py-4 rounded-2xl border border-red-500/50 bg-red-500/10 backdrop-blur-md hover:bg-red-500/20 hover:scale-105 transition-all duration-300"
                >
                  LEAKS ANSEHEN
                </a>
              </div>
            </div>
          </section>

          {/* Server Status */}
          <section className="px-8 py-20 bg-zinc-950 relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,0,0,0.18),transparent_55%)]"></div>

            <div className="relative z-10 max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-4xl md:text-5xl font-black text-red-500 mb-3 drop-shadow-[0_0_25px_rgba(255,0,0,0.6)]">
                  Server Status
                </h2>
                <p className="text-zinc-400">
                  Live Übersicht zu Austria Wien Roleplay
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-black/50 border border-zinc-800 rounded-3xl p-6 shadow-2xl backdrop-blur-md">
                  <p className="text-zinc-500 text-sm uppercase tracking-[3px] mb-3">
                    Status
                  </p>
                  <h3
                    className={`text-2xl font-bold ${
                      maintenanceMode ? "text-orange-400" : "text-green-400"
                    }`}
                  >
                    {maintenanceMode ? "🟠 Developer Mode" : "🟢 Online"}
                  </h3>

                  <p className="text-zinc-400 mt-3 text-sm">
                    {maintenanceMode
                      ? "Server aktuell in Wartungsarbeiten"
                      : "Server für alle Spieler erreichbar"}
                    <br />
                    {maintenanceMode
                      ? "Nur für Teammitglieder erreichbar"
                      : "Roleplay Server ist öffentlich online"}
                  </p>
                </div>

                <div className="bg-black/50 border border-zinc-800 rounded-3xl p-6 shadow-2xl backdrop-blur-md">
                  <p className="text-zinc-500 text-sm uppercase tracking-[3px] mb-3">
                    Spieler
                  </p>
                  <h3 className="text-2xl font-bold text-white">
                    {serverData.players} / {serverData.maxPlayers}
                  </h3>
                  <div className="mt-4 h-2 bg-zinc-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-red-600 to-orange-400"
                      style={{
                        width: `${Math.min(
                          (serverData.players / serverData.maxPlayers) * 100,
                          100
                        )}%`,
                      }}
                    ></div>
                  </div>
                </div>

                <div className="bg-black/50 border border-zinc-800 rounded-3xl p-6 shadow-2xl backdrop-blur-md">
                  <p className="text-zinc-500 text-sm uppercase tracking-[3px] mb-3">
                    Connect
                  </p>
                  <h3 className="text-lg font-bold text-white break-all">
                    fivem.austriawien.eu
                  </h3>
                </div>

                <div className="bg-black/50 border border-zinc-800 rounded-3xl p-6 shadow-2xl backdrop-blur-md">
                  <p className="text-zinc-500 text-sm uppercase tracking-[3px] mb-3">
                    Slots
                  </p>
                  <h3 className="text-2xl font-bold text-white">64 Spieler</h3>
                </div>
              </div>
            </div>
          </section>

          {/* Rules */}
          {page === "rules" && (
            <section id="rules" className="min-h-screen px-8 py-20 bg-black">
              <button
                onClick={() => setPage("home")}
                className="mb-8 px-6 py-3 rounded-2xl border border-zinc-700 hover:border-red-500 transition"
              >
                ← Zurück zur Startseite
              </button>

              <h2 className="text-5xl font-black text-center mb-12 text-red-500">
                Regelwerk & Einreise-Check
              </h2>

              <div className="max-w-7xl mx-auto grid grid-cols-1 xl:grid-cols-2 gap-8">
                <div className="bg-white rounded-3xl p-4 shadow-2xl min-h-[850px]">
                  <iframe
                    src="https://docs.google.com/document/d/1zl9yzGHjrTk73QA1lX1sO6CKxV94fduVCB8GKWFn55E/preview"
                    title="Austria Wien Regelwerk"
                    className="w-full h-[850px] rounded-2xl bg-white"
                  ></iframe>
                </div>

                <div className="bg-zinc-900 rounded-3xl p-8 shadow-2xl border border-zinc-800 h-fit sticky top-28">
                  <h3 className="text-3xl font-bold mb-4 text-center">
                    Einreise-Check
                  </h3>
                  <p className="text-zinc-400 mb-8 text-center">
                    Lies zuerst das Regelwerk und beantworte danach die Fragen.
                  </p>

                  <div className="space-y-4 mb-8">
                    {[
                      ["rule1", "Ich habe das Regelwerk gelesen."],
                      ["rule2", "Ich akzeptiere die Serverregeln."],
                      ["rule3", "Ich weiß, dass Trolling bestraft wird."],
                      ["rule4", "Ich spiele ernsthaftes Roleplay."],
                    ].map(([key, text]) => (
                      <label
                        key={key}
                        className="flex items-center gap-4 bg-black/40 border border-zinc-800 rounded-2xl p-4 cursor-pointer hover:border-red-500 transition"
                      >
                        <input
                          type="checkbox"
                          checked={rulesAccepted[key]}
                          onChange={() =>
                            setRulesAccepted({
                              ...rulesAccepted,
                              [key]: !rulesAccepted[key],
                            })
                          }
                          className="w-5 h-5 accent-red-600"
                        />
                        <span className="text-zinc-300">{text}</span>
                      </label>
                    ))}
                  </div>

                  <div className="space-y-6">
                    <div>
                      <p className="font-semibold mb-3">
                        1. Darfst du ohne RP-Grund jemanden töten?
                      </p>
                      <select
                        value={quizAnswers.q1}
                        onChange={(e) =>
                          setQuizAnswers({ ...quizAnswers, q1: e.target.value })
                        }
                        className="w-full bg-black border border-zinc-700 rounded-2xl p-4 text-white"
                      >
                        <option value="">Antwort auswählen</option>
                        <option value="ja">Ja</option>
                        <option value="nein">Nein</option>
                      </select>
                    </div>

                    <div>
                      <p className="font-semibold mb-3">
                        2. Darfst du Infos aus Discord IC benutzen?
                      </p>
                      <select
                        value={quizAnswers.q2}
                        onChange={(e) =>
                          setQuizAnswers({ ...quizAnswers, q2: e.target.value })
                        }
                        className="w-full bg-black border border-zinc-700 rounded-2xl p-4 text-white"
                      >
                        <option value="">Antwort auswählen</option>
                        <option value="ja">Ja</option>
                        <option value="nein">Nein</option>
                      </select>
                    </div>

                    <div>
                      <p className="font-semibold mb-3">
                        3. Musst du respektvoll mit anderen Spielern umgehen?
                      </p>
                      <select
                        value={quizAnswers.q3}
                        onChange={(e) =>
                          setQuizAnswers({ ...quizAnswers, q3: e.target.value })
                        }
                        className="w-full bg-black border border-zinc-700 rounded-2xl p-4 text-white"
                      >
                        <option value="">Antwort auswählen</option>
                        <option value="ja">Ja</option>
                        <option value="nein">Nein</option>
                      </select>
                    </div>
                  </div>

                  <div className="mt-8 text-center">
                    <button
                      disabled={!quizPassed}
                      className={`px-10 py-4 rounded-2xl font-bold transition-all duration-300 ${
                        quizPassed
                          ? "bg-gradient-to-r from-red-600 to-red-500 hover:scale-105 shadow-[0_0_30px_rgba(255,0,0,0.6)]"
                          : "bg-zinc-700 text-zinc-400 cursor-not-allowed"
                      }`}
                    >
                      {quizPassed
                        ? "REGELWERK BESTÄTIGT"
                        : "FRAGEBOGEN ABSCHLIESSEN"}
                    </button>

                    {quizPassed && (
                      <p className="text-green-400 mt-4 font-semibold">
                        Erfolgreich bestanden. Willkommen auf Austria Wien
                        Roleplay!
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* Leaks */}
          <section id="leaks" className="px-8 py-20 bg-zinc-950">
            <h2 className="text-4xl font-bold text-center mb-4 text-red-500">
              Server Leaks
            </h2>
            <p className="text-center text-zinc-400 mb-12 max-w-2xl mx-auto">
              Hier findet ihr kommende Updates, Sneak Peeks und exklusive
              Einblicke.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  title: "🔥 Caught in 4K",
                  text: "Unser neues mobiles Radar-System wurde geleakt.",
                  image:
                    "https://cdn.discordapp.com/attachments/1308779755767726183/1501996523376869530/SPOILER_Screenshot_2026-05-07_191207.png?ex=69fe1ac4&is=69fcc944&hm=aab560d50c220b82be8d691ea82bad31daf20557c8efec1578f8b0ffefef07b6&",
                },
                {
                  title: "Neues HUD Setting",
                  text: "Ein komplett neues HUD-System mit modernen Einstellungen wurde geleakt.",
                  image:
                    "https://cdn.discordapp.com/attachments/1308779755767726183/1500579090824953866/SPOILER_hud_leak.jpg?ex=69fd8fee&is=69fc3e6e&hm=c7e173782790802b97a19695cd428afa0385421bf0ce70b60e7f967d42737cdf&",
                },
                {
                  title: "Neues Crafting System",
                  text: "Ein komplett neues Crafting-System mit modernem UI wurde geleakt.",
                  image:
                    "https://cdn.discordapp.com/attachments/1308779755767726183/1501139765934686272/SPOILER_image.png?ex=69fd9fda&is=69fc4e5a&hm=b34d7f144fdb0c3dd664935b0a73258a4c572177bd3dce09048a6c58dbc2aec9&",
                },
              ].map((item, i) => (
                <div
                  key={item}
                  className="bg-zinc-900 rounded-3xl overflow-hidden shadow-xl hover:scale-105 transition"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-48 w-full object-cover"
                  />
                  <div className="p-6">
                    <h3 className="text-2xl font-bold mb-2">{item.title}</h3>
                    <p className="text-zinc-400">{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Team */}
          <section id="team" className="px-8 py-20 bg-black">
            <h2 className="text-4xl font-bold text-center mb-12 text-red-500">
              Unser Team
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[
                {
                  rank: "Projektinhaber",
                  name: "AW | Timo",
                  image:
                    "https://cdn.discordapp.com/attachments/1437026774851649637/1502017678372507859/Unbenannt.png?ex=69fe2e78&is=69fcdcf8&hm=db305ec33390f26a3239f530147e6814da5456488e53db80d779fe2681081b08&",
                },
                {
                  rank: "Projektleitung",
                  name: "AW | Martin W.",
                  image:
                    "https://api.dicebear.com/8.x/bottts-neutral/svg?seed=Martin",
                },
                {
                  rank: "STV Projektleitung",
                  name: "AW | Dom",
                  image:
                    "https://api.dicebear.com/8.x/bottts-neutral/svg?seed=Dom",
                },
                {
                  rank: "Teamleitung",
                  name: "AW | Tauro",
                  image:
                    "https://api.dicebear.com/8.x/bottts-neutral/svg?seed=Tauro",
                },
                {
                  rank: "Fraktionsverwaltung",
                  name: "AW | Janek",
                  image:
                    "https://cdn.discordapp.com/attachments/1455709433567903892/1502018504474235020/DC_Picture.png?ex=69fe2f3d&is=69fcddbd&hm=0d1b2f5c96bd7d2c33ff854d5f44b974752ac7fb71fa54eaa0fd47d0d15244d3&",
                },
                {
                  rank: "STV Fraktionsverwaltung",
                  name: "AW | Steffi",
                  image:
                    "https://api.dicebear.com/8.x/bottts-neutral/svg?seed=Steffi",
                },
                {
                  rank: "Developer",
                  name: "AW | Chris",
                  image:
                    "https://api.dicebear.com/8.x/bottts-neutral/svg?seed=Chris",
                },
                {
                  rank: "Developer",
                  name: "AW | Wolfi",
                  image:
                    "https://api.dicebear.com/8.x/bottts-neutral/svg?seed=Wolfi",
                },
                {
                  rank: "Developer",
                  name: "AW | Leon",
                  image:
                    "https://api.dicebear.com/8.x/bottts-neutral/svg?seed=Leon",
                },
                {
                  rank: "Developer",
                  name: "AW | Rene",
                  image:
                    "https://api.dicebear.com/8.x/bottts-neutral/svg?seed=Rene",
                },
                {
                  rank: "Administrator",
                  name: "AW | Mimi",
                  image:
                    "https://api.dicebear.com/8.x/bottts-neutral/svg?seed=Mimi",
                },
                {
                  rank: "Moderator",
                  name: "AW | Elias",
                  image:
                    "https://api.dicebear.com/8.x/bottts-neutral/svg?seed=Elias",
                },
                {
                  rank: "Test Moderator",
                  name: "AW | Yasin",
                  image:
                    "https://api.dicebear.com/8.x/bottts-neutral/svg?seed=Yasin",
                },
              ].map((member, i) => (
                <div
                  key={i}
                  className="bg-zinc-900 p-6 rounded-3xl text-center hover:scale-105 transition"
                >
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-24 h-24 mx-auto rounded-full object-cover mb-4 border-2 border-red-500 bg-zinc-800 shadow-[0_0_25px_rgba(255,0,0,0.45)]"
                  />
                  <h3 className="text-2xl font-bold">{member.name}</h3>
                  <p className="text-red-400 mt-2 font-semibold">
                    {member.rank}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Discord */}
          <section id="discord" className="px-8 py-20 bg-zinc-950 text-center">
            <h2 className="text-4xl font-bold text-red-500 mb-6">
              Tritt unserem Discord bei
            </h2>
            <p className="text-zinc-400 mb-8">
              Bleibe immer auf dem neuesten Stand und werde Teil unserer
              Community.
            </p>

            <a
              href="https://discord.gg/austriawien"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-8 py-4 rounded-2xl bg-red-600 hover:bg-red-700 hover:scale-105 transition-all duration-300 font-bold shadow-[0_0_25px_rgba(255,0,0,0.6)]"
            >
              Discord Joinen
            </a>
          </section>

          {/* Footer */}
          <footer className="border-t border-zinc-800 py-6 text-center text-zinc-500 bg-black">
            © 2026 Austria Wien • FiveM Community Austria
          </footer>
        </>
      )}
    </div>
  );
}
