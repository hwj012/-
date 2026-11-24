import type { PartId } from "./data";

type Props = { power: boolean; exploded?: boolean; active?: PartId | null; onPick?: (p: PartId) => void; temp?: number; showSmoke?: boolean };
const OFF: Record<PartId, number> = { lid: -120, filter: -80, chamber: -42, body: 0, ptc: 48, mcu: 88, base: 128 };

export function Censer({ power, exploded = false, active = null, onPick, temp = 90, showSmoke = true }: Props) {
  const g = (id: PartId) => ({
    className: `censer-part ${active === id ? "is-active" : ""} ${onPick ? "cursor-pointer" : ""}`,
    style: { transform: `translateY(${exploded ? OFF[id] : 0}px)` },
    onClick: onPick ? () => onPick(id) : undefined,
    onKeyDown: onPick ? (e: React.KeyboardEvent) => (e.key === "Enter" || e.key === " ") && (e.preventDefault(), onPick(id)) : undefined,
    tabIndex: onPick ? 0 : undefined,
    role: onPick ? "button" : undefined,
    "aria-label": onPick ? id : undefined,
  });
  const inner = exploded || !!active;
  return (
    <svg viewBox="0 0 400 560" className="h-full w-full overflow-visible" aria-hidden={!onPick}>
      <defs>
        <radialGradient id="glaze" cx="38%" cy="35%" r="70%">
          <stop offset="0" stopColor="var(--porcelain-hi)" />
          <stop offset=".6" stopColor="var(--porcelain)" />
          <stop offset="1" stopColor="var(--porcelain-lo)" />
        </radialGradient>
        <linearGradient id="walnut" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="var(--walnut-hi)" />
          <stop offset="1" stopColor="var(--walnut)" />
        </linearGradient>
        <radialGradient id="heat"><stop offset="0" stopColor="var(--mode)" stopOpacity="1" /><stop offset="1" stopColor="var(--mode)" stopOpacity="0" /></radialGradient>
        <pattern id="woodgrain" width="40" height="8" patternUnits="userSpaceOnUse"><path d="M0 4 Q10 1 20 4 T40 4" fill="none" stroke="var(--walnut-lo)" strokeWidth=".8" opacity=".6" /></pattern>
      </defs>

      {showSmoke && (
        <g className={`smoke ${power ? "is-on" : ""}`} style={{ transform: `translateY(${exploded ? -120 : 0}px)` }}>
          {[0, 1, 2, 3].map((i) => (
            <path key={i} className="smoke-line" style={{ animationDelay: `${i * 1.1}s` }}
              d={`M${190 + i * 7} 150 C ${150 + i * 20} 110, ${240 - i * 10} 80, ${195 + i * 4} 40 S ${160 + i * 15} -20, ${205} -70`} />
          ))}
        </g>
      )}

      {/* base */}
      <g {...g("base")}>
        <ellipse cx="200" cy="470" rx="150" ry="22" fill="var(--walnut-lo)" />
        <path d="M50 430 h300 v40 a150 22 0 0 1 -300 0z" fill="url(#walnut)" />
        <path d="M50 430 h300 v40 a150 22 0 0 1 -300 0z" fill="url(#woodgrain)" />
        <ellipse cx="200" cy="430" rx="150" ry="22" fill="var(--walnut-hi)" />
        <rect x="160" y="448" width="80" height="22" rx="2" fill="var(--display-bg)" />
        <text x="200" y="464" textAnchor="middle" className="font-mono" fontSize="13" fill={power ? "var(--display)" : "var(--display-off)"}>{power ? `${temp}°C` : "--:--"}</text>
        <circle cx="270" cy="459" r="5" fill="none" stroke="var(--display)" opacity={power ? 1 : .3} />
      </g>
      {/* mcu */}
      <g {...g("mcu")} opacity={inner ? 1 : 0}>
        <rect x="150" y="400" width="100" height="22" fill="var(--pcb)" />
        <rect x="185" y="404" width="30" height="14" fill="var(--ink)" />
        {[0,1,2,3,4,5].map(i => <rect key={i} x={160 + i * 14} y="398" width="3" height="4" fill="var(--gold)" />)}
      </g>
      {/* body */}
      <g {...g("body")}>
        <ellipse cx="200" cy="420" rx="70" ry="10" fill="var(--porcelain-lo)" />
        <path d="M130 420 C 60 380, 60 250, 140 205 L 260 205 C 340 250, 340 380, 270 420 Z" fill="url(#glaze)" opacity={inner ? .55 : 1} />
        <path d="M110 300 C 150 320, 250 320, 290 300" fill="none" stroke="var(--vermilion)" strokeWidth="1.2" opacity=".8" />
        <path d="M118 315 l8 -6 l8 6 l8 -6 l8 6 l8 -6 l8 6 l8 -6 l8 6 l8 -6 l8 6 l8 -6 l8 6 l8 -6 l8 6 l8 -6 l8 6 l8 -6 l8 6 l8 -6 l8 6" fill="none" stroke="var(--vermilion)" strokeWidth="1" opacity=".7" />
        <ellipse cx="200" cy="205" rx="60" ry="10" fill="var(--porcelain-lo)" />
        <path d="M150 240 C 130 260, 125 300, 135 340" stroke="var(--porcelain-hi)" strokeWidth="6" fill="none" opacity=".7" strokeLinecap="round" />
      </g>
      {/* ptc */}
      <g {...g("ptc")} opacity={inner || power ? 1 : 0}>
        <ellipse cx="200" cy="385" rx="80" ry="22" fill="url(#heat)" className={`heat-glow ${power ? "is-on" : ""}`} />
        <ellipse cx="200" cy="385" rx="52" ry="9" fill="var(--ptc)" opacity={inner ? 1 : 0} />
        <ellipse cx="200" cy="385" rx="36" ry="5" fill="none" stroke="var(--mode)" opacity={power ? 1 : .3} />
      </g>
      {/* chamber */}
      <g {...g("chamber")} opacity={inner ? 1 : 0}>
        <path d="M150 205 h100 l-10 36 h-80z" fill="var(--porcelain-lo)" stroke="var(--grid-line)" />
        <circle cx="185" cy="222" r="4" fill="var(--walnut-hi)" /><circle cx="205" cy="226" r="3" fill="var(--walnut-hi)" /><circle cx="218" cy="219" r="3.5" fill="var(--walnut-hi)" />
      </g>
      {/* filter */}
      <g {...g("filter")} opacity={inner ? 1 : 0}>
        <ellipse cx="200" cy="196" rx="62" ry="9" fill="var(--steel)" />
        {Array.from({ length: 13 }).map((_, i) => <line key={i} x1={146 + i * 9} y1="190" x2={146 + i * 9} y2="202" stroke="var(--ink)" strokeWidth=".6" opacity=".5" />)}
      </g>
      {/* lid */}
      <g {...g("lid")}>
        <path d="M136 195 C 140 140, 260 140, 264 195 Z" fill="url(#glaze)" />
        <ellipse cx="200" cy="195" rx="64" ry="8" fill="var(--porcelain-lo)" />
        <circle cx="200" cy="140" r="10" fill="url(#glaze)" />
        {[-2,-1,0,1,2].map(i => <path key={i} d={`M${200 + i * 20 - 5} 172 h10 v-8 h-6 v4`} fill="none" stroke="var(--ink)" strokeWidth="1.5" opacity=".55" />)}
      </g>
    </svg>
  );
}