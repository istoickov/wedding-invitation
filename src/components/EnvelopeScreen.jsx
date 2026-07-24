import { useState } from 'react';

export const EnvelopeScreen = ({ onStartOpen, onOpen }) => {
  const [opening, setOpening] = useState(false);

  const handleOpen = () => {
    setOpening(true);
    onStartOpen();
    setTimeout(() => {
      onOpen();
    }, 1300);
  };

  return (
    <main className={`fixed inset-0 z-[100] flex min-h-screen w-full flex-col items-center justify-center overflow-hidden px-6 py-12 transition-opacity duration-[1300ms] ${opening ? 'envelope-opening opacity-0' : 'opacity-100'}`}>
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute inset-4 border-[20px] border-surface-container-high sm:border-[40px]"></div>
      </div>
      
      <div className="z-10 mb-10 text-center sm:mb-12">
        <p className="label mb-4 text-tertiary">Ве повикуваме да ни се придружите</p>
        <h1 className="font-headline text-4xl text-primary sm:text-5xl md:text-7xl">Покана за свадба</h1>
      </div>

      <button
        type="button"
        onClick={handleOpen}
        disabled={opening}
        aria-label="Отвори ја поканата"
        className="relative aspect-[16/10] w-full max-w-xl border border-white/70 bg-[#f0e6e1] shadow-2xl transition-transform duration-500 hover:scale-[1.01] active:scale-[0.98] [perspective:1200px] sm:max-w-2xl"
      >
        <div className="absolute inset-0 bg-[#f5e5de]" />

        {/* Envelope folds */}
        <div className="absolute inset-x-0 bottom-0 z-10 h-[62%] bg-[#f5e5de] [clip-path:polygon(0_100%,50%_0,100%_100%)]" />
        <div className="absolute inset-y-0 left-0 z-20 w-1/2 bg-[#e8d1c7] [clip-path:polygon(0_0,100%_55%,0_100%)]" />
        <div className="absolute inset-y-0 right-0 z-20 w-1/2 bg-[#e8d1c7] [clip-path:polygon(100%_0,0_55%,100%_100%)]" />
        <svg className="pointer-events-none absolute inset-0 z-[25] h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
          <path d="M0 100 L50 55 L100 100" fill="none" stroke="#d6b8ad" strokeWidth="0.45" />
          <path d="M0 0 L50 55 L100 0" fill="none" stroke="#dec4ba" strokeWidth="0.35" />
        </svg>
        <div className="envelope-flap absolute inset-x-0 top-0 z-30 h-[58%]">
          <svg className="h-full w-full" viewBox="0 0 100 58" preserveAspectRatio="none" aria-hidden="true">
            <path d="M0 0 H100 L52 53 Q50 57 48 53 Z" fill="#f5e5de" stroke="#d6b8ad" strokeWidth="0.45" vectorEffect="non-scaling-stroke" />
          </svg>
        </div>

        <div className="envelope-letter absolute inset-x-4 bottom-[13%] z-40 text-center sm:inset-x-8">
          <p className="font-headline text-xl italic text-primary sm:text-3xl">Благица и Иван</p>
        </div>

        <div className="envelope-seal absolute left-1/2 top-[57%] z-50 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-[#ffb4a8]/40 bg-primary text-white shadow-lg ring-4 ring-primary/10 sm:h-16 sm:w-16">
          <span className="font-headline text-2xl">Б</span>
        </div>
      </button>

      <div className="mt-8 animate-pulse text-center">
        <p className="label text-secondary">КЛИКНИ ЗА ОТКРИВАЊЕ НА ПАТУВАЊЕТО</p>
      </div>

    </main>
  );
};
