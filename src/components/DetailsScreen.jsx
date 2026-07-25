import { useEffect, useState } from 'react';
import { Footer } from './Footer';
import { Header } from './Header';
import { RevealOnScroll } from './RevealOnScroll';

const GalleryImage = ({ imageName, sizes, className = '' }) => (
  <div className={`relative overflow-hidden ${className}`}>
    <img
      src={`/images/${imageName}-1600.jpg`}
      srcSet={`/images/${imageName}-800.jpg 800w, /images/${imageName}-1600.jpg 1600w`}
      sizes={sizes}
      alt="Wedding moment"
      loading="lazy"
      decoding="async"
      className="h-full w-full object-cover grayscale transition-transform duration-1000 hover:scale-105"
    />
    <div className="pointer-events-none absolute inset-0 border-8 border-white/10" />
  </div>
);

const SectionHeading = ({ children }) => (
  <div className="section-heading">
    <span className="label text-secondary">{children}</span>
    <div className="divider-diamond mt-4 h-px w-24 bg-outline-variant" />
  </div>
);

const navigationSections = [
  { id: 'story', label: 'Почеток' },
  { id: 'gallery', label: 'Галерија' },
  { id: 'location', label: 'Локација' },
  { id: 'rsvp', label: 'Потврди' },
];

const FloatingNavigation = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [showStoryPrompt, setShowStoryPrompt] = useState(true);

  useEffect(() => {
    const sections = navigationSections
      .map(({ id }, index) => ({ element: document.getElementById(id), index }))
      .filter(({ element }) => element);

    const updateActiveSection = () => {
      const scrollMarker = window.scrollY + window.innerHeight * 0.5;
      setShowStoryPrompt(window.scrollY < 24);
      const activeSection = sections.reduce(
        (currentIndex, { element, index }) => {
          const sectionTop = element.getBoundingClientRect().top + window.scrollY;
          return sectionTop <= scrollMarker ? index : currentIndex;
        },
        0,
      );

      setActiveIndex(activeSection);
    };

    updateActiveSection();
    window.addEventListener('scroll', updateActiveSection, { passive: true });
    window.addEventListener('resize', updateActiveSection);

    return () => {
      window.removeEventListener('scroll', updateActiveSection);
      window.removeEventListener('resize', updateActiveSection);
    };
  }, []);

  return (
    <>
      {activeIndex === 0 && showStoryPrompt && (
        <button
          type="button"
          aria-label="Продолжи до галеријата"
          onClick={() => {
            const gallery = document.getElementById('gallery');
            if (!gallery) return;

            const galleryTop = gallery.getBoundingClientRect().top + window.scrollY;
            window.scrollTo({
              top: Math.max(0, galleryTop),
              behavior: 'smooth',
            });
          }}
          className="fixed bottom-5 left-1/2 z-50 hidden -translate-x-1/2 flex-col items-center text-primary/70 animate-bounce transition-colors hover:text-primary md:flex md:bottom-8"
        >
          <span className="material-symbols-outlined -mb-4 text-2xl">keyboard_arrow_down</span>
          <span className="material-symbols-outlined text-2xl">keyboard_arrow_down</span>
        </button>
      )}
      {activeIndex < navigationSections.length - 1 && (
        <div
          aria-hidden="true"
          className="fixed bottom-4 left-1/2 z-50 flex -translate-x-1/2 flex-col items-center text-primary/70 transition-colors active:text-primary md:hidden"
        >
          <span className="material-symbols-outlined -mb-4 text-xl animate-bounce">keyboard_arrow_down</span>
          <span className="material-symbols-outlined text-xl animate-bounce">keyboard_arrow_down</span>
        </div>
      )}
      {activeIndex > 0 && (
        <nav aria-label="Навигација низ поканата" className="fixed right-4 top-1/2 z-50 hidden -translate-y-1/2 md:block md:right-6">
          <ol className="flex flex-col gap-3">
            {navigationSections.map(({ id, label }, index) => (
              <li key={id}>
                <button
                  type="button"
                  aria-label={label}
                  aria-current={activeIndex === index ? 'step' : undefined}
                  onClick={() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })}
                  className={`block h-2.5 w-2.5 rounded-full border border-primary transition-all duration-300 ${activeIndex === index ? 'scale-125 bg-primary' : 'bg-background/80 hover:bg-primary/50'}`}
                />
              </li>
            ))}
          </ol>
        </nav>
      )}
    </>
  );
};

export const DetailsScreen = () => {
  useEffect(() => window.scrollTo(0, 0), []);

  return (
    <div className="bg-background">
      <Header />
      <FloatingNavigation />

      <main id="story">
        <section className="phone-screen phone-hero page-container flex min-h-screen flex-col justify-center py-20 pt-28 sm:py-24 sm:pt-32 md:py-32">
          <div className="grid items-center gap-10 sm:gap-12 md:grid-cols-12 md:gap-8">
            <div className="hero-content order-2 flex flex-col gap-5 text-center md:order-1 md:col-span-5 md:text-left">
              <p className="label text-primary">Добредојдовте на нашиот ден</p>
              <h1 className="font-headline text-5xl leading-[0.95] text-primary sm:text-6xl md:text-7xl">
                <span className="block">Благица</span>
                <span className="block">&amp;</span>
                <span className="block">Иван</span>
              </h1>
              <div className="h-px w-16 self-center bg-outline-variant md:self-start" />
              <p className="text-lg italic leading-relaxed text-secondary">
                Придружете ни се на нашата најголема авантура заедно.
              </p>
            </div>

            <div className="hero-photo order-1 relative mx-auto w-full max-w-[18rem] md:order-2 md:col-start-7 md:col-span-6 md:max-w-none">
              <div className="hero-frame absolute -inset-3 border border-outline-variant md:-inset-4" />
              <div className="relative aspect-[3/4] overflow-hidden bg-surface-container">
                <img
                  src="/images/IMG_9250-1600.jpg"
                  srcSet="/images/IMG_9250-800.jpg 800w, /images/IMG_9250-1600.jpg 1600w"
                  sizes="(min-width: 768px) 40vw, 18rem"
                  alt="Благица и Иван"
                  fetchPriority="high"
                  decoding="async"
                  className="h-full w-full object-cover grayscale brightness-95 contrast-105 transition-transform duration-[2s] hover:scale-105"
                />
              </div>
            </div>
          </div>

          <div className="hero-families mt-12 pt-8 md:mt-16 md:pt-10">
            <div className="mt-6 flex items-center justify-between gap-6">
              <p className="label font-bold text-primary">Стоичкови</p>
              <p className="label font-bold text-primary">Томоски</p>
            </div>
          </div>
        </section>

        <RevealOnScroll>
          <section
            id="gallery"
            className="phone-screen phone-gallery content-section page-container flex flex-col md:min-h-screen md:justify-center md:pt-20 md:pb-36"
          >
            <SectionHeading>Галерија</SectionHeading>

            <div className="grid gap-5 md:h-[26rem] md:grid-cols-12 md:gap-8">
              <GalleryImage imageName="IMG_9250" sizes="(min-width: 768px) 64vw, 100vw" className="aspect-[4/3] md:col-span-8 md:aspect-auto" />

              <div className="grid grid-cols-2 gap-5 md:col-span-4 md:grid-cols-1 md:grid-rows-2 md:gap-8">
                <GalleryImage imageName="IMG_9261" sizes="(min-width: 768px) 32vw, 50vw" className="aspect-square md:aspect-auto" />
                <GalleryImage imageName="IMG_9339" sizes="(min-width: 768px) 32vw, 50vw" className="aspect-square md:aspect-auto" />
              </div>
            </div>
          </section>
        </RevealOnScroll>

        <RevealOnScroll>
          <section id="location" className="phone-screen phone-location relative flex min-h-[34rem] items-center overflow-hidden py-16 sm:min-h-[36rem] sm:py-20 md:min-h-screen md:py-0">
            <img
              src="/images/IMG_9339-1600.jpg"
              srcSet="/images/IMG_9339-800.jpg 800w, /images/IMG_9339-1600.jpg 1600w"
              sizes="100vw"
              alt="New Place, Тетово"
              loading="lazy"
              decoding="async"
              className="absolute inset-0 h-full w-full object-cover grayscale opacity-40"
            />
            <div className="relative z-10 w-full">

              <div className="page-container">
                <div className="phone-location-grid grid items-center gap-6 sm:gap-10 md:grid-cols-2 md:gap-16">
                  <div className="phone-event-card border border-outline-variant bg-white/80 p-6 text-center backdrop-blur-sm sm:p-8 md:p-10">
                    <div className="phone-event-content flex flex-col gap-8">
                      <div>
                        <span className="label text-secondary">Обележи го датумот</span>
                        <h2 className="my-4 border-y border-outline-variant py-5 font-headline text-2xl tracking-wide text-primary sm:text-3xl">
                          22 АВГУСТ | 2026
                        </h2>
                      </div>
                      <div className="space-y-6">
                        <div className="event-item">
                          <span className="material-symbols-outlined text-3xl text-primary">schedule</span>
                          <h3 className="label text-primary">Церемонија</h3>
                          <p className="font-headline text-xl">19:00 – 19:30</p>
                        </div>
                        <div className="mx-auto h-px w-12 bg-outline-variant" />
                        <div className="event-item">
                          
                          <a href="https://maps.app.goo.gl/8Zu1RtpS6ZbecngC6" target="_blank" rel="noopener noreferrer" className="max-w-md border border-primary bg-white/90 p-6 text-center shadow-xl backdrop-blur-sm transition-colors hover:bg-white sm:p-8">
                            <span className="material-symbols-outlined mb-2 block text-3xl text-primary">location_on</span>
                            <p className="label text-primary">Локација</p>
                            <p className="mt-2 text-sm text-secondary">New Place (Weddings &amp; Events), Тетово, Фалише</p>
                            <p className="label mt-3 text-primary/70">Отвори ја локацијата</p>
                          </a>

                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="phone-message-card border border-outline-variant bg-white/80 p-6 text-center backdrop-blur-sm sm:p-8 md:p-10">
                    <p className="text-lg leading-relaxed text-on-surface-variant">
                      Нашето патување е исполнето со заеднички соништа, љубов и безброј убави спомени. Неизмерно сме благодарни што сте дел од нашите животи и со радост очекуваме да го споделиме овој посебен ден со вас.
                    </p>
                  </div>

                </div>
              </div>
            </div>
          </section>
        </RevealOnScroll>

        <RevealOnScroll>
          <section
            id="rsvp"
            className="phone-screen phone-rsvp bg-surface-container-highest px-6 py-24 text-center sm:py-28 md:py-28"
          >
            <div className="mx-auto max-w-4xl px-6">
              <span
                className="material-symbols-outlined mb-6 text-4xl text-primary"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                favorite
              </span>

              <h2 className="text-2xl leading-relaxed text-primary md:text-4xl">
                Со нетрпение го очекуваме денот кога ќе ја споделиме нашата среќа и
                љубов со вас.
              </h2>

              <p className="my-6 text-base italic leading-relaxed text-on-surface-variant md:text-lg">
                До тогаш, ви благодариме што ја чувате нашата љубов во вашите срца.
              </p>
            </div>
          </section>
        </RevealOnScroll>
      </main>

      <Footer />
    </div>
  );
};
