export function GlobalStyles() {
  return (
    <style>{`
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500&family=DM+Sans:wght@300;400;500&display=swap');
        .font-mono { font-family: 'JetBrains Mono', monospace; }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        @keyframes flowing { to { stroke-dashoffset: -20; } }
        .flowing { stroke-dasharray: 4 4; animation: flowing 1s linear infinite; }
        .leader-line { stroke-dasharray: 2 2; }
        @keyframes pop { 0% { transform: scale(0.9); opacity: 0; } 100% { transform: scale(1); opacity: 1; } }
        .token-pop { animation: pop 0.2s ease-out both; }
        .hide-scroll::-webkit-scrollbar { display: none; }
      `}</style>
  );
}
