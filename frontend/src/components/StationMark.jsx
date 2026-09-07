const stationStyles = {
  suspension: { symbol: 'cross', colors: ['#38bdf8', '#075985'] },
  engine: { symbol: 'bolt', colors: ['#fb923c', '#9a3412'] },
  paint: { symbol: 'drop', colors: ['#f472b6', '#9d174d'] },
  tires: { symbol: 'wheel', colors: ['#a78bfa', '#5b21b6'] },
  diagnostics: { symbol: 'pulse', colors: ['#2dd4bf', '#115e59'] },
  electrics: { symbol: 'plug', colors: ['#818cf8', '#3730a3'] },
};

const symbols = {
  cross: <path d="M22 11v8h8v6h-8v8h-6v-8H8v-6h8v-8z" fill="white" />,
  bolt: <path d="m23 7-11 16h8l-2 11 11-17h-8z" fill="white" />,
  drop: <path d="M25 8C20 16 15 20 15 27a10 10 0 0 0 20 0c0-7-5-11-10-19Zm0 24a5 5 0 0 1-5-5c0-2 1-4 3-6-1 5 6 4 6 8a4 4 0 0 1-4 3Z" fill="white" />,
  wheel: <><circle cx="25" cy="25" r="13" fill="none" stroke="white" strokeWidth="5" /><circle cx="25" cy="25" r="3" fill="white" /><path d="M25 12v26M12 25h26" stroke="white" strokeWidth="3" /></>,
  pulse: <path d="M7 26h7l4-11 6 20 4-12h15" fill="none" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" />,
  plug: <path d="M18 9v11m14-11v11M14 18h22v5a11 11 0 0 1-22 0zm11 16v5" fill="none" stroke="white" strokeLinecap="round" strokeWidth="4" />,
};

export function stationStyle(station) {
  const base = stationStyles[station.specialization] || stationStyles.diagnostics;
  const symbolsByStation = ['cross', 'bolt', 'drop', 'wheel', 'pulse', 'plug'];
  return { ...base, symbol: symbolsByStation[(station.id - 1) % symbolsByStation.length], colors: [station.accent || base.colors[0], base.colors[1]] };
}

export function StationMark({ station, compact = false }) {
  const style = stationStyle(station);
  const size = compact ? 40 : 44;
  return <span className="relative inline-grid shrink-0 place-items-center" title={station.name}>
    <svg viewBox="0 0 50 58" width={size} height={size + 4} aria-hidden="true" className="drop-shadow-[0_5px_8px_rgba(2,8,23,.35)]"><defs><linearGradient id={`station-${station.id}`} x1="0" y1="0" x2="1" y2="1"><stop stopColor={style.colors[0]} /><stop offset="1" stopColor={style.colors[1]} /></linearGradient></defs><path d="M25 56S5 36 5 22a20 20 0 1 1 40 0c0 14-20 34-20 34Z" fill={`url(#station-${station.id})`} stroke="white" strokeOpacity=".75" strokeWidth="2" /><g transform="translate(0 -1)">{symbols[style.symbol]}</g></svg>
    <span className="absolute -right-1 top-0 grid h-4 min-w-4 place-items-center rounded-full border border-white bg-emerald-500 px-1 text-[9px] font-bold text-white">{station.freeSlots}</span>
  </span>;
}

export function stationMarkerHtml(station) {
  const style = stationStyle(station);
  const symbol = { cross: '<path d="M22 11v8h8v6h-8v8h-6v-8H8v-6h8v-8z" fill="white"/>', bolt: '<path d="m23 7-11 16h8l-2 11 11-17h-8z" fill="white"/>', drop: '<path d="M25 8C20 16 15 20 15 27a10 10 0 0 0 20 0c0-7-5-11-10-19Z" fill="white"/>', wheel: '<circle cx="25" cy="25" r="12" fill="none" stroke="white" stroke-width="5"/><circle cx="25" cy="25" r="3" fill="white"/>', pulse: '<path d="M7 26h7l4-11 6 20 4-12h15" fill="none" stroke="white" stroke-linecap="round" stroke-width="4"/>', plug: '<path d="M18 9v11m14-11v11M14 18h22v5a11 11 0 0 1-22 0" fill="none" stroke="white" stroke-linecap="round" stroke-width="4"/>' }[style.symbol];
  return `<div class="station-pin" style="--pin-a:${style.colors[0]};--pin-b:${style.colors[1]}"><svg viewBox="0 0 50 58" aria-hidden="true"><defs><linearGradient id="pin-${station.id}" x1="0" y1="0" x2="1" y2="1"><stop stop-color="${style.colors[0]}"/><stop offset="1" stop-color="${style.colors[1]}"/></linearGradient></defs><path d="M25 56S5 36 5 22a20 20 0 1 1 40 0c0 14-20 34-20 34Z" fill="url(#pin-${station.id})" stroke="white" stroke-opacity=".8" stroke-width="2"/>${symbol}</svg><b>${station.freeSlots}</b></div>`;
}
