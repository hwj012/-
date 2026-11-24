import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { Censer } from "@/components/censer/Censer";
import { MODES, TIMERS, SPECIMENS, PARTS, STEPS, type ModeId, type SpecimenId, type PartId } from "@/components/censer/data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "一炉三享 · 香，正在被重新编译" },
      { name: "description", content: "奶白陶瓷多功能电子香炉的沉浸式数字互动装置：熏香、煮茶、温茶，一炉三享。" },
      { property: "og:title", content: "一炉三享 · A NEW RITUAL, RECODED." },
      { property: "og:description", content: "熏香、煮茶、温茶——一件陶瓷器物的三种时间，数字展览装置。" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const NAV = [
  { id: "experience", label: "EXPERIENCE" },
  { id: "botanical", label: "BOTANICAL INDEX" },
  { id: "anatomy", label: "ANATOMY" },
  { id: "ritual", label: "RITUAL" },
];
const clamp = (v: number) => Math.min(120, Math.max(50, v));

function Index() {
  const [mode, setMode] = useState<ModeId>("incense");
  const [temp, setTemp] = useState(MODES.incense.def);
  const [timer, setTimer] = useState(2);
  const [power, setPower] = useState(false);
  const [spec, setSpec] = useState<SpecimenId>("wood");
  const [part, setPart] = useState<PartId>("body");
  const [exploded, setExploded] = useState(false);
  const [step, setStep] = useState(0);
  const [section, setSection] = useState("hero");
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const io = new IntersectionObserver((es) => es.forEach((e) => e.isIntersecting && setSection(e.target.id)), { rootMargin: "-45% 0px -50% 0px" });
    ["hero", ...NAV.map((n) => n.id)].forEach((id) => { const el = document.getElementById(id); if (el) io.observe(el); });
    return () => io.disconnect();
  }, []);

  const pickMode = (m: ModeId) => { setMode(m); setTemp(MODES[m].def); };
  const reset = () => { setMode("incense"); setTemp(90); setTimer(2); setPower(false); setSpec("wood"); setPart("body"); setExploded(false); setStep(0); };
  const resetAll = () => { reset(); document.getElementById("hero")?.scrollIntoView({ behavior: "smooth" }); };
  const go = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  const onMove = (e: React.MouseEvent) => {
    const r = heroRef.current?.getBoundingClientRect(); if (!r) return;
    heroRef.current!.style.setProperty("--mx", String((e.clientX - r.left) / r.width - .5));
    heroRef.current!.style.setProperty("--my", String((e.clientY - r.top) / r.height - .5));
  };
  const M = MODES[mode];
  const inRange = temp >= M.min && temp <= M.max;
  const vars = { "--mode": `var(--mode-${mode})`, "--spec": `var(--spec-${spec})` } as CSSProperties;
  const P = PARTS.find((p) => p.id === part)!;

  return (
    <main style={vars} className="grain relative bg-background text-foreground">
      {/* NAV */}
      <nav className="fixed inset-x-0 top-0 z-40 flex items-center justify-between gap-4 border-b border-border bg-background/70 px-4 py-3 backdrop-blur md:px-8">
        <button onClick={() => go("hero")} className="font-mono text-xs tracking-widest focus-ring">香/RECODED<span className="text-primary">_</span></button>
        <ul className="flex gap-1 overflow-x-auto font-mono text-[10px] tracking-widest md:gap-2 md:text-xs">
          {NAV.map((n) => (
            <li key={n.id}><button onClick={() => go(n.id)} aria-current={section === n.id} className={`nav-link focus-ring ${section === n.id ? "is-active" : ""}`}>{n.label}</button></li>
          ))}
        </ul>
        <span className={`hidden font-mono text-xs md:inline ${power ? "text-display" : "text-muted-foreground"}`}>● {power ? "ACTIVE" : "STANDBY"}</span>
      </nav>

      {/* HERO */}
      <section id="hero" ref={heroRef} onMouseMove={onMove} className="relative flex min-h-screen items-center justify-center overflow-hidden pt-16">
        <div className="topo parallax-1 absolute -inset-20 opacity-50" />
        <div className="eng-grid parallax-2 absolute -inset-10" />
        <div className="slice slice-blue parallax-3" /><div className="slice slice-red parallax-4" />
        <div className="scanline" />
        <Crosshair className="left-[12%] top-[22%]" label="X:-0.382 Y:0.618" />
        <Crosshair className="right-[10%] bottom-[18%]" label="X:0.500 Y:-0.250" />
        <span className="tag absolute left-4 top-24 md:left-8">EXHIBIT Nº 0721 / CERAMIC CENSER</span>
        <span className="tag absolute right-4 top-24 md:right-8">数字装置 · DIGITAL INSTALLATION</span>

        <div className="relative z-10 grid w-full max-w-6xl items-center gap-6 px-6 md:grid-cols-[1.3fr_auto_1fr]">
          <div className="order-2 md:order-1">
            <p className="font-mono text-xs tracking-[0.3em] text-secondary">A NEW RITUAL, RECODED.</p>
            <h1 className="glitch mt-4 w-max max-w-[calc(100vw-2rem)] whitespace-pre-line font-display text-[clamp(2.5rem,5.2vw,4.6rem)] font-black leading-[1.2]" data-text={"香，正在被\n重新编译。"}>{"香，正在被\n重新编译。"}</h1>
          </div>
          <div className="order-1 mx-auto h-[46vh] w-[min(80vw,340px)] md:order-2 md:h-[64vh] md:w-[360px] parallax-5">
            <Censer power temp={temp} />
          </div>
          <div className="order-3 space-y-4 md:text-right">
            <p className="text-sm leading-relaxed text-muted-foreground">一炉三享：熏香、煮茶、温茶。<br />奶白釉陶 × 胡桃木 × PTC 恒温。</p>
            <button onClick={() => go("experience")} className="btn-primary focus-ring">进入体验 → ENTER</button>
          </div>
        </div>
        <span className="tag absolute bottom-6 left-1/2 -translate-x-1/2 animate-pulse">SCROLL ↓ 001/005</span>
      </section>

      {/* EXPERIENCE */}
      <section id="experience" className="section relative">
        <SectionHead no="01" title="互动控制台" en="EXPERIENCE CONSOLE" />
        <p className="sim-badge mb-8">⚠ 数字模拟 / 非真实加热 · SIMULATION ONLY</p>
        <div className="grid gap-px bg-border lg:grid-cols-[1.1fr_1fr]">
          <div className="mode-stage relative flex min-h-[460px] items-center justify-center overflow-hidden bg-card">
            <div className="eng-grid absolute inset-0 opacity-60" />
            <div className="mode-aura absolute inset-0" data-on={power} />
            <span className="tag absolute left-4 top-4">MODE / {M.en}</span>
            <span className="tag absolute right-4 top-4">{power ? "ACTIVE" : "STANDBY"}</span>
            <div className="relative h-[420px] w-[300px]"><Censer power={power} temp={temp} /></div>
            <span className="tag absolute bottom-4 left-4">{M.mood}</span>
          </div>

          <div className="space-y-6 bg-background p-6 md:p-8">
            <div role="radiogroup" aria-label="模式" className="grid grid-cols-3 gap-2">
              {(Object.keys(MODES) as ModeId[]).map((k) => (
                <button key={k} role="radio" aria-checked={mode === k} onClick={() => pickMode(k)} className={`mode-btn focus-ring ${mode === k ? "is-active" : ""}`} style={{ "--c": `var(--mode-${k})` } as CSSProperties}>
                  <span className="font-display text-2xl">{MODES[k].name}</span>
                  <span className="font-mono text-[10px] tracking-widest opacity-70">{MODES[k].min}–{MODES[k].max}°C</span>
                </button>
              ))}
            </div>
            <p className="min-h-[3rem] text-sm leading-relaxed text-muted-foreground">{M.desc}</p>

            <div className="lcd">
              <div className="flex items-end justify-between">
                <span className="font-mono text-[10px] tracking-widest opacity-70">TEMP / 温度</span>
                <span className="font-mono text-[10px] tracking-widest opacity-70">TIMER {timer}H</span>
              </div>
              <div className="flex items-baseline gap-2 font-mono">
                <span className="text-6xl tabular-nums md:text-7xl" aria-live="polite">{power ? temp : "--"}</span><span className="text-2xl">°C</span>
                <span className="ml-auto text-xs">{power ? (inRange ? "IN RANGE" : "OUT OF RANGE") : "OFF"}</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button aria-label="降低温度" onClick={() => setTemp((t) => clamp(t - 1))} className="step-btn focus-ring">−</button>
              <input aria-label="温度" type="range" min={50} max={120} value={temp} onChange={(e) => setTemp(+e.target.value)} className="range flex-1" />
              <button aria-label="提高温度" onClick={() => setTemp((t) => clamp(t + 1))} className="step-btn focus-ring">+</button>
            </div>
            <div className="flex justify-between font-mono text-[10px] text-muted-foreground"><span>50°C</span><span>推荐 {M.min}–{M.max}°C</span><span>120°C</span></div>

            <div>
              <p className="mb-2 font-mono text-[10px] tracking-widest text-muted-foreground">TIMER / 定时</p>
              <div className="grid grid-cols-6 gap-1">
                {TIMERS.map((t) => <button key={t} onClick={() => setTimer(t)} aria-pressed={timer === t} className={`chip focus-ring ${timer === t ? "is-active" : ""}`}>{t}h</button>)}
              </div>
            </div>

            <div className="flex gap-2">
              <button onClick={() => setPower((p) => !p)} aria-pressed={power} className={`power-btn focus-ring flex-1 ${power ? "is-on" : ""}`}>⏻ {power ? "ACTIVE · 关闭" : "STANDBY · 启动"}</button>
              <button onClick={reset} className="chip focus-ring px-4">重置</button>
            </div>
          </div>
        </div>
      </section>

      {/* BOTANICAL */}
      <section id="botanical" className="section relative overflow-hidden">
        <div className="particles" aria-hidden>{Array.from({ length: 24 }).map((_, i) => <i key={i} style={{ left: `${(i * 37) % 100}%`, animationDelay: `${(i % 8) * .7}s`, animationDuration: `${8 + (i % 5)}s` }} />)}</div>
        <SectionHead no="02" title="植物标本实验室" en="BOTANICAL INDEX" />
        <div className="relative grid gap-6 md:grid-cols-3">
          {(Object.keys(SPECIMENS) as SpecimenId[]).map((k) => {
            const s = SPECIMENS[k];
            return (
              <button key={k} onClick={() => setSpec(k)} aria-pressed={spec === k} className={`specimen focus-ring ${spec === k ? "is-active" : ""}`} style={{ "--c": `var(--spec-${k})` } as CSSProperties}>
                <span className="tape" /><span className="tag">{s.no}</span>
                <Specimen kind={k} />
                <span className="block font-display text-2xl">{s.name}</span>
                <span className="block font-mono text-xs italic text-muted-foreground">{s.descriptor}</span>
              </button>
            );
          })}
        </div>
        <div className="relative mt-8 grid gap-4 border border-border bg-card/70 p-6 md:grid-cols-[1fr_auto] md:items-center">
          <p className="leading-relaxed">{SPECIMENS[spec].text}</p>
          <button onClick={() => { pickMode(SPECIMENS[spec].mode); go("experience"); }} className="btn-primary focus-ring">建议模式：{MODES[SPECIMENS[spec].mode].name} →</button>
        </div>
      </section>

      {/* ANATOMY */}
      <section id="anatomy" className="section">
        <SectionHead no="03" title="结构拆解" en="ANATOMY / EXPLODED VIEW" />
        <div className="grid gap-px bg-border lg:grid-cols-[1fr_1fr]">
          <div className="relative flex min-h-[560px] items-center justify-center overflow-hidden bg-card">
            <div className="eng-grid absolute inset-0" />
            <span className="tag absolute left-4 top-4">FIG. 03-{PARTS.findIndex((p) => p.id === part) + 1}</span>
            <button onClick={() => setExploded((x) => !x)} className="chip focus-ring absolute right-4 top-4 z-10 is-active">{exploded ? "合拢 ASSEMBLE" : "拆解 EXPLODE"}</button>
            <div className="relative h-[480px] w-[300px]"><Censer power={false} exploded={exploded} active={part} onPick={setPart} showSmoke={false} /></div>
          </div>
          <div className="bg-background p-6 md:p-8">
            <ol className="grid grid-cols-2 gap-1 sm:grid-cols-4 lg:grid-cols-2">
              {PARTS.map((p, i) => (
                <li key={p.id}><button onClick={() => setPart(p.id)} aria-pressed={part === p.id} className={`chip focus-ring w-full text-left ${part === p.id ? "is-active" : ""}`}><span className="opacity-60">{String(i + 1).padStart(2, "0")}</span> {p.name}</button></li>
              ))}
            </ol>
            <div className="mt-8 border-l-2 border-primary pl-5" aria-live="polite">
              <p className="font-mono text-xs tracking-widest text-secondary">{P.en}</p>
              <h3 className="mt-2 font-display text-4xl">{P.name}</h3>
              <p className="mt-2 font-mono text-xs text-display">{P.spec}</p>
              <p className="mt-4 leading-relaxed text-muted-foreground">{P.text}</p>
            </div>
          </div>
        </div>
      </section>

      {/* RITUAL */}
      <section id="ritual" className="section">
        <SectionHead no="04" title="使用流程" en="RITUAL / 放料 > 触控 > 享受" />
        <div role="tablist" className="grid grid-cols-3 gap-px bg-border">
          {STEPS.map((s, i) => (
            <button key={s.no} role="tab" aria-selected={step === i} onClick={() => setStep(i)} className={`ritual-tab focus-ring ${step === i ? "is-active" : ""}`}>
              <span className="font-mono text-xs">{s.no} / {s.en}</span>
              <span className="font-display text-3xl md:text-5xl">{s.name}</span>
            </button>
          ))}
        </div>
        <div role="tabpanel" key={step} className="fade-in mt-px bg-card p-8 md:p-12">
          <p className="max-w-2xl text-lg leading-relaxed">{STEPS[step]!.text}</p>
          <div className="mt-6 h-px bg-border"><div className="h-px bg-primary transition-all duration-700" style={{ width: `${((step + 1) / 3) * 100}%` }} /></div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-border px-6 py-10 md:px-12">
        <div className="grid gap-6 font-mono text-xs md:grid-cols-4">
          <div><p className="text-muted-foreground">EXHIBIT</p><p className="mt-1">Nº 0721 — 一炉三享</p></div>
          <div><p className="text-muted-foreground">STATUS</p><p className={`mt-1 ${power ? "text-display" : ""}`}>{power ? "ACTIVE" : "STANDBY"} · {M.name} · {temp}°C · {timer}H</p></div>
          <div><p className="text-muted-foreground">NOTICE</p><p className="mt-1">数字模拟 / 非真实加热</p></div>
          <div className="md:text-right"><button onClick={resetAll} className="btn-primary focus-ring">↺ 重置体验 RESET</button></div>
        </div>
      </footer>
    </main>
  );
}

function SectionHead({ no, title, en }: { no: string; title: string; en: string }) {
  return (
    <header className="mb-8 flex flex-wrap items-end justify-between gap-4 border-b border-border pb-4">
      <div><p className="font-mono text-xs tracking-[0.3em] text-primary">[{no}]</p><h2 className="mt-2 font-display text-4xl font-bold md:text-5xl">{title}</h2></div>
      <span className="tag">{en}</span>
    </header>
  );
}

function Crosshair({ className, label }: { className: string; label: string }) {
  return <div className={`crosshair absolute ${className}`} aria-hidden><span className="tag absolute left-8 top-0 whitespace-nowrap">{label}</span></div>;
}

function Specimen({ kind }: { kind: SpecimenId }) {
  return (
    <svg viewBox="0 0 200 160" className="my-4 h-40 w-full" aria-hidden>
      <g stroke="var(--c)" fill="none" strokeWidth="1.2">
        {kind === "tea" && <>
          <path d="M100 150 C 100 110, 98 70, 100 20" />
          <path d="M100 60 C 60 50, 40 80, 50 110 C 80 105, 98 85, 100 60Z" fill="var(--c)" fillOpacity=".25" />
          <path d="M100 85 C 140 75, 165 100, 150 130 C 120 125, 102 108, 100 85Z" fill="var(--c)" fillOpacity=".25" />
          <path d="M100 20 C 90 35, 92 45, 100 50 C 108 45, 110 35, 100 20Z" fill="var(--c)" fillOpacity=".4" />
        </>}
        {kind === "petal" && <g transform="translate(100 80)">
          {[0, 72, 144, 216, 288].map((r) => <path key={r} transform={`rotate(${r})`} d="M0 0 C -18 -20, -14 -50, 0 -58 C 14 -50, 18 -20, 0 0Z" fill="var(--c)" fillOpacity=".3" />)}
          <circle r="6" fill="var(--c)" />
        </g>}
        {kind === "wood" && <>
          <path d="M40 120 L 70 40 L 160 30 L 170 110 Z" fill="var(--c)" fillOpacity=".2" />
          {[0, 1, 2, 3, 4].map((i) => <path key={i} d={`M${52 + i * 6} ${110 - i * 4} C 90 ${80 - i * 8}, 120 ${90 - i * 10}, ${162 - i * 2} ${45 + i * 12}`} />)}
        </>}
      </g>
      <line x1="10" y1="150" x2="60" y2="150" stroke="var(--foreground)" strokeWidth=".5" />
      <text x="10" y="145" fontSize="7" fill="var(--foreground)" className="font-mono">FORM STUDY</text>
    </svg>
  );
}