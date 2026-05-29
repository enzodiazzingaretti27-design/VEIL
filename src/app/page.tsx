"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Lenis from "lenis";
import { useEffect, useState } from "react";

const images = {
  hero:
    "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=2400&q=85",
  industrial:
    "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1800&q=80&sat=-100",
  portrait:
    "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1800&q=85&sat=-100",
  shadow:
    "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=1800&q=85&sat=-100",
  texture:
    "https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=1800&q=85&sat=-100",
  night:
    "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=1800&q=85&sat=-100",
  concrete:
    "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1800&q=85&sat=-100",
  metal:
    "https://images.unsplash.com/photo-1511818966892-d7d671e672a2?auto=format&fit=crop&w=1800&q=85&sat=-100",
};

const collections = [
  {
    code: "VOID_01",
    text: "Severe silhouettes, dense cotton, architectural volume.",
    image: images.portrait,
  },
  {
    code: "AFTERHOURS",
    text: "Garments designed for movement after the city becomes anonymous.",
    image: images.night,
  },
  {
    code: "SILENCE SERIES",
    text: "Matte black layers, hidden closures, quiet utility.",
    image: images.shadow,
  },
  {
    code: "MONOCHROME SYSTEM",
    text: "A modular uniform built from absence, texture, and repetition.",
    image: images.texture,
  },
];

const campaign = [
  { image: images.hero, label: "LOOK 001 / SHADOW COAT" },
  { image: images.portrait, label: "LOOK 002 / VOID TROUSER" },
  { image: images.metal, label: "LOOK 003 / METAL KNIT" },
  { image: images.night, label: "LOOK 004 / AFTERHOURS SHELL" },
  { image: images.shadow, label: "LOOK 005 / SILENCE LAYER" },
];

const pieces = [
  ["SHADOW COAT", "Heavy structured outer shell / black"],
  ["VOID TROUSER", "Wide silhouette / concealed pleats"],
  ["NOISE KNIT", "Open weave texture / graphite"],
  ["AFTERHOURS BAG", "Soft technical carry object"],
];

function BackgroundImage({
  src,
  className = "",
}: {
  src: string;
  className?: string;
}) {
  return (
    <div
      className={`image-cover grayscale ${className}`}
      style={{ backgroundImage: `url(${src})` }}
    />
  );
}

function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 38 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-12%" }}
      transition={{ duration: 1.05, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function Kicker({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-5 text-[10px] uppercase tracking-[0.42em] text-[color:var(--silver)]/60">
      {children}
    </p>
  );
}

export default function Home() {
  const [loading, setLoading] = useState(true);
  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 0.35], ["0%", "16%"]);
  const heroScale = useTransform(scrollYProgress, [0, 0.35], [1.06, 1.18]);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.25,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    let frame = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };

    frame = requestAnimationFrame(raf);
    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    const timeout = window.setTimeout(() => setLoading(false), 1800);
    return () => window.clearTimeout(timeout);
  }, []);

  return (
    <main className="noise bg-[color:var(--void)] text-[color:var(--bone)]">
      {loading ? (
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 1, delay: 0.65, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black"
        >
          <div className="text-center">
            <p className="mb-5 text-[10px] uppercase tracking-[0.6em] text-white/35">
              System loading
            </p>
            <h1 className="text-7xl font-black tracking-[-0.08em] md:text-[9rem]">
              VEIL
            </h1>
          </div>
        </motion.div>
      ) : null}

      <nav className="fixed left-0 top-0 z-50 grid w-full grid-cols-3 items-center px-5 py-5 text-[10px] uppercase tracking-[0.32em] text-white/65 md:px-9">
        <a href="#top" className="font-black text-white">
          VEIL
        </a>
        <div className="hidden justify-center gap-8 md:flex">
          <a href="#collections" className="transition hover:text-white">
            Collections
          </a>
          <a href="#campaign" className="transition hover:text-white">
            Campaign
          </a>
          <a href="#archive" className="transition hover:text-white">
            Archive
          </a>
        </div>
        <a href="#enter" className="justify-self-end border border-white/20 px-4 py-2 transition hover:bg-white hover:text-black">
          Enter
        </a>
      </nav>

      <section id="top" className="relative min-h-screen overflow-hidden bg-black">
        <motion.div style={{ y: heroY, scale: heroScale }} className="absolute inset-0">
          <BackgroundImage src={images.hero} className="h-full w-full opacity-70" />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-black/10 to-black" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,.72)_78%)]" />
        <div className="relative z-10 flex min-h-screen flex-col justify-end px-5 pb-10 md:px-9 md:pb-14">
          <Reveal>
            <p className="mb-5 text-[10px] uppercase tracking-[0.48em] text-white/45">
              Objects for the unseen / Designed for after hours
            </p>
            <h1 className="blend-title text-[28vw] font-black leading-[0.72] tracking-[-0.12em] text-white md:text-[22vw]">
              VEIL
            </h1>
          </Reveal>
          <Reveal delay={0.15} className="mt-8 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <p className="max-w-xl text-xl font-light uppercase leading-relaxed tracking-[0.12em] text-white/65">
              A monochrome uniform between nightlife, architecture and modern isolation.
            </p>
            <a href="#collections" className="group flex w-fit items-center gap-4 text-[10px] uppercase tracking-[0.34em] text-white/50">
              Scroll
              <span className="h-px w-20 bg-white/35 transition group-hover:w-32" />
            </a>
          </Reveal>
        </div>
      </section>

      <section id="collections" className="px-5 py-24 md:px-9 md:py-36">
        <Reveal className="mx-auto mb-20 max-w-7xl">
          <Kicker>Collections</Kicker>
          <h2 className="max-w-5xl text-balance text-6xl font-black uppercase leading-[0.84] tracking-[-0.08em] md:text-8xl">
            Garments as objects. Clothing as atmosphere.
          </h2>
        </Reveal>
        <div className="mx-auto grid max-w-7xl gap-6">
          {collections.map((item, index) => (
            <motion.article
              key={item.code}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 1, delay: index * 0.06 }}
              className={`group grid min-h-[440px] gap-5 border-t border-white/10 py-6 md:grid-cols-2 ${
                index % 2 ? "md:[&>*:first-child]:order-2" : ""
              }`}
            >
              <div className="relative overflow-hidden bg-[color:var(--carbon)]">
                <BackgroundImage
                  src={item.image}
                  className="h-[58vh] min-h-[360px] w-full scale-105 opacity-80 transition duration-[1800ms] group-hover:scale-110 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              </div>
              <div className="flex flex-col justify-between p-1 md:p-8">
                <p className="text-[10px] uppercase tracking-[0.42em] text-white/35">
                  0{index + 1} / Editorial system
                </p>
                <div>
                  <h3 className="text-5xl font-black uppercase leading-none tracking-[-0.08em] md:text-8xl">
                    {item.code}
                  </h3>
                  <p className="mt-6 max-w-md text-lg font-light leading-relaxed text-white/55">
                    {item.text}
                  </p>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      <section id="campaign" className="overflow-hidden bg-[color:var(--bone)] py-24 text-black md:py-36">
        <div className="px-5 md:px-9">
          <Reveal className="mb-14 flex flex-col justify-between gap-8 md:flex-row md:items-end">
            <div>
              <Kicker>Lookbook / Campaign</Kicker>
              <h2 className="text-6xl font-black uppercase leading-[0.82] tracking-[-0.09em] md:text-9xl">
                After dark silhouettes.
              </h2>
            </div>
            <p className="max-w-sm text-[11px] uppercase leading-loose tracking-[0.24em] text-black/45">
              Flash fragments, industrial spaces, motion blur and oversized forms.
            </p>
          </Reveal>
        </div>
        <div className="flex gap-4 overflow-x-auto px-5 pb-4 md:px-9">
          {campaign.map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, x: 80 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: index * 0.08 }}
              className="group relative h-[72vh] min-w-[82vw] overflow-hidden bg-black md:min-w-[42vw]"
            >
              <BackgroundImage
                src={item.image}
                className="h-full w-full scale-105 opacity-85 transition duration-[1600ms] group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent" />
              <p className="absolute bottom-5 left-5 text-[10px] uppercase tracking-[0.32em] text-white/70">
                {item.label}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="px-5 py-28 md:px-9 md:py-44">
        <Reveal className="mx-auto grid max-w-7xl gap-12 md:grid-cols-[0.25fr_1fr]">
          <p className="vertical-type text-[10px] uppercase tracking-[0.42em] text-white/35">
            Manifesto
          </p>
          <p className="text-balance text-5xl font-black uppercase leading-[0.94] tracking-[-0.07em] text-white md:text-8xl">
            VEIL exists between fashion, architecture and sound. Designed for
            movement, silence and identity.
          </p>
        </Reveal>
      </section>

      <section id="archive" className="border-y border-white/10 bg-[color:var(--carbon)] px-5 py-24 md:px-9 md:py-36">
        <div className="mx-auto max-w-7xl">
          <Reveal className="mb-14">
            <Kicker>Featured pieces</Kicker>
            <h2 className="text-6xl font-black uppercase leading-none tracking-[-0.08em] md:text-8xl">
              Selected objects.
            </h2>
          </Reveal>
          <div className="grid gap-1">
            {pieces.map(([name, detail], index) => (
              <motion.div
                key={name}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.75, delay: index * 0.05 }}
                className="group grid border-t border-white/10 py-6 transition hover:bg-white hover:px-5 hover:text-black md:grid-cols-[1fr_0.8fr_0.2fr]"
              >
                <h3 className="text-3xl font-black uppercase tracking-[-0.05em] md:text-6xl">
                  {name}
                </h3>
                <p className="self-center text-sm uppercase tracking-[0.22em] text-white/45 transition group-hover:text-black/55">
                  {detail}
                </p>
                <p className="hidden self-center justify-self-end text-xs uppercase tracking-[0.24em] md:block">
                  00{index + 1}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-24 md:px-9 md:py-36">
        <div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-[0.9fr_1.1fr] md:items-center">
          <Reveal>
            <BackgroundImage src={images.concrete} className="h-[620px] w-full opacity-75" />
          </Reveal>
          <Reveal delay={0.12}>
            <Kicker>About VEIL</Kicker>
            <h2 className="text-5xl font-black uppercase leading-[0.9] tracking-[-0.07em] md:text-7xl">
              Independent clothing for form, texture and coded identity.
            </h2>
            <p className="mt-8 max-w-xl text-lg font-light leading-[1.9] text-white/55">
              VEIL is shaped by underground rooms, modern isolation, concrete
              surfaces and the strange intimacy of night. Each piece is a quiet
              object: functional, severe, and intentionally ambiguous.
            </p>
          </Reveal>
        </div>
      </section>

      <section id="enter" className="relative min-h-screen overflow-hidden bg-black">
        <BackgroundImage src={images.industrial} className="absolute inset-0 h-full w-full opacity-35" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/65 to-black" />
        <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-5 text-center">
          <Reveal>
            <p className="mb-7 text-[10px] uppercase tracking-[0.48em] text-white/35">
              Private access / Campaign notes
            </p>
            <h2 className="text-balance text-7xl font-black uppercase leading-[0.82] tracking-[-0.1em] md:text-[11rem]">
              Enter the archive.
            </h2>
            <form className="mx-auto mt-12 flex max-w-xl flex-col gap-3 border-b border-white/30 pb-3 md:flex-row">
              <input
                type="email"
                placeholder="EMAIL"
                className="min-w-0 flex-1 bg-transparent text-sm uppercase tracking-[0.24em] text-white outline-none placeholder:text-white/30"
              />
              <button
                type="submit"
                className="text-[10px] uppercase tracking-[0.32em] text-white/60 transition hover:text-white"
              >
                Submit
              </button>
            </form>
          </Reveal>
        </div>
        <footer className="absolute bottom-0 left-0 z-20 flex w-full flex-col gap-3 px-5 py-7 text-[10px] uppercase tracking-[0.28em] text-white/35 md:flex-row md:items-center md:justify-between md:px-9">
          <p>VEIL / Objects for the unseen</p>
          <p>Monochrome system — after hours</p>
        </footer>
      </section>
    </main>
  );
}
