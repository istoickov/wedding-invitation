import { useEffect, useState } from 'react';
import { Footer } from './Footer';
import { Header } from './Header';
import { RevealOnScroll } from './RevealOnScroll';

const GalleryImage = ({ imageName, className = '' }) => (
  <div className={`relative overflow-hidden ${className}`}>
    <img
      src={`/${imageName}`}
      alt="Wedding moment"
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

  useEffect(() => {
    const sections = navigationSections
      .map(({ id }, index) => ({ element: document.getElementById(id), index }))
      .filter(({ element }) => element);

    const updateActiveSection = () => {
      const scrollMarker = window.scrollY + window.innerHeight * 0.5;
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
      {activeIndex === 0 && (
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
          className="fixed bottom-5 left-1/2 z-50 flex -translate-x-1/2 flex-col items-center text-primary/70 animate-bounce transition-colors hover:text-primary sm:bottom-8"
        >
          <span className="material-symbols-outlined -mb-4 text-2xl">keyboard_arrow_down</span>
          <span className="material-symbols-outlined text-2xl">keyboard_arrow_down</span>
        </button>
      )}
      {activeIndex > 0 && (
        <nav aria-label="Навигација низ поканата" className="fixed right-4 top-1/2 z-50 -translate-y-1/2 sm:right-6">
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
        <section className="page-container flex min-h-screen flex-col justify-center py-28 md:py-32">
          <div className="grid items-center gap-12 md:grid-cols-12 md:gap-8">
            <div className="order-2 flex flex-col gap-5 text-center md:order-1 md:col-span-5 md:text-left">
              <p className="label text-primary">Добредојде на нашиот ден</p>
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

            <div className="order-1 relative md:order-2 md:col-start-7 md:col-span-6">
              <div className="absolute -inset-3 border border-outline-variant md:-inset-4" />
              <div className="relative aspect-[3/4] overflow-hidden bg-surface-container">
                <img
                  src="/IMG_9250.jpg"
                  alt="Благица и Иван"
                  className="h-full w-full object-cover grayscale brightness-95 contrast-105 transition-transform duration-[2s] hover:scale-105"
                />
              </div>
            </div>
          </div>

          <div className="mt-12 pt-8 md:mt-16 md:pt-10">
            <div className="mt-6 grid gap-4 text-center sm:grid-cols-2 sm:gap-8">
              <p className="label font-bold text-primary text-left">Стоичкови</p>
              <p className="label font-bold text-primary text-right">Томоски</p>
            </div>
          </div>
        </section>

        <RevealOnScroll>
          <section
            id="gallery"
            className="content-section page-container flex min-h-screen flex-col"
          >
            <SectionHeading>Галерија</SectionHeading>

            <div className="grid gap-5 md:h-[26rem] md:grid-cols-12 md:gap-8">
              <GalleryImage imageName="IMG_9250.jpg" className="aspect-[4/3] md:col-span-8 md:aspect-auto" />

              <div className="grid grid-cols-2 gap-5 md:col-span-4 md:grid-cols-1 md:grid-rows-2 md:gap-8">
                <GalleryImage imageName="IMG_9261.jpg" className="aspect-square md:aspect-auto" />
                <GalleryImage imageName="IMG_9339.jpg" className="aspect-square md:aspect-auto" />
              </div>
            </div>
          </section>
        </RevealOnScroll>

        <RevealOnScroll>
          <section id="location" className="relative min-h-screen overflow-hidden sm:h-96">
            <img src="/IMG_9339.jpg" alt="New Place, Тетово" className="h-full w-full object-cover grayscale opacity-40" />
            <div className="absolute inset-0 grid place-items-center p-6">

              <div className="page-container">
                <div className="grid items-center gap-10 md:grid-cols-2 md:gap-16">
                  <div className="border border-outline-variant bg-white/80 p-8 text-center backdrop-blur-sm sm:p-10">
                    <div className="flex flex-col gap-8">
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
                          <p className="font-headline text-xl">19:00</p>
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

                  <div className="border border-outline-variant bg-white/80 p-80 text-center backdrop-blur-sm sm:p-10">
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
            className="content-section bg-surface-container-highest text-center"
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
