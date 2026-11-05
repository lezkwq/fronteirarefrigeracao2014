import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  Star,
  Globe2,
  MapPin,
  Wind,
  Instagram,
  Plus,
  Snowflake,
} from "lucide-react";
import { wa, MSG, WHATSAPP_DISPLAY } from "@/lib/whatsapp";
import logo from "@/assets/fronteira-logo.webp";
import { WhatsAppIcon } from "@/components/site/WhatsAppIcon";

const ADDRESS = "R. Luís da Silva, 799 - Cordeiros, Itajaí - SC, 88311-190";

/* ---------- primitives ---------- */

function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e?.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -10% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`reveal ${visible ? "is-visible" : ""} ${className}`}
    >
      {children}
    </div>
  );
}

function ServiceIllustration({
  src,
  mobileSrc,
  className,
}: {
  src: string;
  mobileSrc?: string;
  className: string;
}) {
  return (
    <figure className={"relative overflow-hidden bg-sky/60 " + className}>
      <picture>
        {mobileSrc && <source media="(max-width: 767px)" srcSet={mobileSrc} />}
        <img src={src} alt="" className="absolute inset-0 size-full object-cover" loading="lazy" />
      </picture>
      <figcaption className="absolute bottom-2 left-2 rounded bg-navy px-1.5 py-0.5 text-[10px] font-medium text-white">
        Ilustração
      </figcaption>
    </figure>
  );
}

function Eyebrow({
  n,
  children,
  light = false,
}: {
  n: string;
  children: ReactNode;
  light?: boolean;
}) {
  return (
    <p
      className={`flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.2em] ${light ? "text-navy-foreground/60" : "text-ink/50"}`}
    >
      <span className="font-mono">{n}</span>
      <span className={`h-px w-8 ${light ? "bg-navy-foreground/30" : "bg-ink/25"}`} />
      {children}
    </p>
  );
}

function H2({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <h2
      className={`font-display text-[2rem] font-semibold leading-[1.05] tracking-tight md:text-5xl ${className}`}
    >
      {children}
    </h2>
  );
}

function CtaButton({
  href,
  children,
  variant = "cta",
}: {
  href: string;
  children: ReactNode;
  variant?: "cta" | "outline" | "light";
}) {
  const styles = {
    cta: "bg-cta text-cta-foreground shadow-[var(--shadow-cta)] hover:brightness-105",
    outline: "border border-ink/20 text-ink hover:bg-ink hover:text-navy-foreground",
    light:
      "border border-navy-foreground/25 text-navy-foreground hover:bg-navy-foreground hover:text-navy",
  }[variant];
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`group inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink ${styles}`}
    >
      {children}
      {href.startsWith("https://wa.me/") ? (
        <WhatsAppIcon className="size-4 shrink-0" />
      ) : (
        <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
      )}
    </a>
  );
}

function TextLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group inline-flex items-center gap-1.5 text-sm font-semibold text-ink underline-offset-4 hover:underline"
    >
      {children}
      {href.startsWith("https://wa.me/") ? (
        <WhatsAppIcon className="size-4 shrink-0 text-whatsapp" />
      ) : (
        <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
      )}
    </a>
  );
}

const container = "mx-auto w-full max-w-7xl px-5 md:px-10";

/* ---------- 02 trust bar ---------- */

function TrustBar() {
  const items = [
    { icon: Star, title: "4,9 no Google", sub: "53 avaliações" },
    { icon: Globe2, title: "Orçamentos on-line", sub: "Pelo WhatsApp" },
    { icon: MapPin, title: "Atendimento no local", sub: "Itajaí" },
    { icon: Snowflake, title: "Climatização", sub: "e refrigeração" },
  ];
  return (
    <section aria-label="Diferenciais" className="border-b border-ink/10 bg-background">
      <ul className={`${container} grid grid-cols-2 md:grid-cols-4`}>
        {items.map(({ icon: Icon, title, sub }, i) => (
          <li
            key={title}
            className={`flex items-center gap-3 py-6 md:py-8 ${i % 2 ? "pl-4 md:pl-8" : ""} ${i > 1 ? "border-t border-ink/10 md:border-t-0" : ""} ${i > 0 ? "md:border-l md:border-ink/10 md:pl-8" : ""}`}
          >
            <Icon
              className={`size-5 shrink-0 ${i === 0 ? "fill-cta text-cta" : "text-ink/60"}`}
              strokeWidth={1.6}
            />
            <div className="leading-tight">
              <p className="text-sm font-semibold text-ink">{title}</p>
              <p className="text-xs text-ink/55">{sub}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

/* ---------- 03 climatização ---------- */

const CLIMA = [
  {
    t: "Instalação de ar-condicionado",
    d: "Instalação de aparelhos e preparação da infraestrutura necessária.",
    image: "/images/fd8424a8-3fd8-4b43-aa0e-b661f8dddc29.jpg",
    msg: MSG.instalacao,
  },
  {
    t: "Manutenção de ar-condicionado",
    d: "Manutenção de aparelhos e componentes para preservar seu funcionamento.",
    image: "/images/codex-clipboard-09c08d1d-8112-4259-8e85-115a021a28e1.jpg",
    msg: MSG.manutencao,
  },
  {
    t: "Higienização de ar-condicionado",
    d: "Limpeza completa do equipamento e dos filtros.",
    image: "/images/codex-clipboard-ae4714ba-275c-4c1d-a73d-1a3c0e276bde.jpg",
    msg: MSG.higienizacao,
  },
  {
    t: "Conserto de ar-condicionado",
    d: "Diagnóstico de problemas e reparos no equipamento.",
    image: "/images/c3eeba0f-bed9-4f8d-b0ab-f9a8ea94998c.jpg",
    msg: MSG.conserto,
  },
];

function Climatizacao() {
  const feat = CLIMA[0]!;
  const rest = CLIMA.slice(1);
  return (
    <section id="servicos" className="bg-background py-20 text-ink md:py-32">
      <div className={container}>
        <Reveal className="grid gap-6 md:grid-cols-12 md:items-end">
          <div className="md:col-span-7">
            <Eyebrow n="01">Climatização</Eyebrow>
            <H2 className="mt-5">Climatização completa para o seu conforto.</H2>
          </div>
          <p className="max-w-md text-ink/65 md:col-span-5 md:justify-self-end">
            Da instalação ao conserto, cuidamos do seu ar-condicionado em cada etapa. Escolha o
            serviço e solicite seu orçamento pelo WhatsApp.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-5 md:mt-16 md:grid-cols-12">
          {/* Featured */}
          <Reveal className="md:col-span-7 md:row-span-2">
            <article className="group flex h-full flex-col overflow-hidden rounded-3xl bg-mist">
              <ServiceIllustration
                src={feat.image}
                className="aspect-[4/3] rounded-none md:aspect-auto md:flex-1"
              />
              <div className="flex flex-col gap-4 p-7 md:flex-row md:items-end md:justify-between md:p-9">
                <div>
                  <h3 className="font-display text-2xl font-semibold md:text-3xl">{feat.t}</h3>
                  <p className="mt-2 max-w-sm text-ink/65">{feat.d}</p>
                </div>
                <CtaButton href={wa(feat.msg)}>Solicitar orçamento</CtaButton>
              </div>
            </article>
          </Reveal>

          {rest.slice(0, 2).map((s, i) => (
            <Reveal key={s.t} delay={i * 100} className="md:col-span-5">
              <article className="grid h-full grid-cols-[1fr_auto] gap-5 rounded-3xl border border-ink/10 p-6 md:grid-cols-[7.5rem_1fr]">
                <ServiceIllustration
                  src={s.image}
                  className="order-2 aspect-square w-24 md:order-none md:w-full"
                />
                <div className="flex flex-col">
                  <h3 className="font-display text-lg font-semibold">{s.t}</h3>
                  <p className="mt-1.5 text-sm text-ink/65">{s.d}</p>
                  <div className="mt-auto pt-4">
                    <TextLink href={wa(s.msg)}>Solicitar orçamento</TextLink>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}

          {rest.slice(2).map((s, i) => (
            <Reveal key={s.t} delay={i * 100} className="md:col-span-12">
              <article className="grid h-full gap-5 rounded-3xl border border-ink/10 p-6 md:grid-cols-[8rem_1fr_auto] md:items-center">
                <ServiceIllustration src={s.image} className="aspect-[16/10]" />
                <div>
                  <span className="font-mono text-xs text-ink/40">0{i + 4}</span>
                  <h3 className="mt-1 font-display text-lg font-semibold">{s.t}</h3>
                  <p className="mt-1.5 text-sm text-ink/65">{s.d}</p>
                </div>
                <div>
                  <TextLink href={wa(s.msg)}>Solicitar orçamento</TextLink>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- 04 refrigeração ---------- */

const REFRI = [
  {
    t: "Geladeiras",
    d: "Conserto de geladeiras",
    image: "/images/df4b5030-996a-4fe9-8e8c-e6341d8e4346.jpg",
    msg: MSG.geladeira,
  },
  {
    t: "Freezers",
    d: "Conserto de freezers",
    image: "/images/62ecefc0-25b8-4f53-bc82-51345ccfce2d.jpg",
    msg: MSG.freezer,
  },
  {
    t: "Máquinas de lavar",
    d: "Conserto de máquinas de lavar",
    image: "/images/codex-clipboard-04ee32fc-a7f1-4fed-b6ae-0d06face73c4.jpg",
    msg: MSG.lavar,
  },
  {
    t: "Expositores e balcões",
    d: "Manutenção de expositores e balcões refrigerados",
    image: "/images/09054cfc-dcdd-4918-b665-147d87863d27.jpg",
    msg: MSG.expositor,
  },
];

function Refrigeracao() {
  return (
    <section className="bg-navy py-20 text-navy-foreground md:py-32">
      <div className={container}>
        <div className="grid gap-12 md:grid-cols-12">
          <Reveal className="md:col-span-4 md:sticky md:top-12 md:self-start">
            <Eyebrow n="02" light>
              Refrigeração e linha branca
            </Eyebrow>
            <H2 className="mt-5">Assistência técnica para os equipamentos do seu dia a dia.</H2>
            <p className="mt-5 text-navy-foreground/70">
              Conserto de geladeiras, freezers e lavadoras e manutenção de expositores e balcões
              refrigerados, em casa ou no seu comércio.
            </p>
            <div className="mt-8">
              <CtaButton href={wa(MSG.linhaBranca)}>Solicitar orçamento</CtaButton>
            </div>
          </Reveal>

          <div className="grid grid-cols-2 gap-3 md:col-span-8 md:gap-5">
            {REFRI.map((r, i) => (
              <Reveal key={r.t} delay={i * 80} className={i % 2 ? "md:translate-y-16" : ""}>
                <a
                  href={wa(r.msg)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block overflow-hidden rounded-3xl bg-navy-foreground/5 ring-1 ring-navy-foreground/10 transition-colors hover:bg-navy-foreground/10"
                >
                  <ServiceIllustration
                    src={r.image}
                    className="aspect-[4/5] rounded-none opacity-90"
                  />
                  <div className="flex items-end justify-between gap-2 p-4 md:p-6">
                    <div>
                      <h3 className="font-display text-base font-semibold md:text-xl">{r.t}</h3>
                      <p className="mt-1 text-xs text-navy-foreground/60 md:text-sm">{r.d}</p>
                    </div>
                    <WhatsAppIcon className="size-5 shrink-0 text-whatsapp" />
                  </div>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- 05 sobre ---------- */

function Sobre() {
  return (
    <section id="sobre" className="bg-background py-20 text-ink md:py-36">
      <div className={`${container} grid items-center gap-12 md:grid-cols-12 md:gap-16`}>
        <Reveal className="md:col-span-5">
          <div className="relative">
            <img
              src="/images/tecnico-na-condensadora.webp"
              alt="Técnico da Fronteira com manômetros junto à condensadora de ar-condicionado"
              width={490}
              height={292}
              loading="lazy"
              className="w-full rounded-[2rem] shadow-[var(--shadow-soft)]"
            />
            <div className="absolute -bottom-6 -right-3 rounded-2xl bg-navy px-5 py-4 text-navy-foreground shadow-[var(--shadow-soft)] md:-right-8">
              <p className="text-xs uppercase tracking-[0.18em] text-navy-foreground/60">
                Localização
              </p>
              <p className="mt-1 font-display font-semibold">Itajaí · SC</p>
            </div>
          </div>
        </Reveal>
        <Reveal className="md:col-span-7" delay={120}>
          <Eyebrow n="03">Sobre a Fronteira</Eyebrow>
          <H2 className="mt-5">Compromisso com o seu conforto, do atendimento à solução.</H2>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink/70">
            A Fronteira Refrigeração atende residências e comércios em Itajaí. São mais de 10 anos
            de experiência em refrigeração e climatização, conforme informado no perfil da empresa.
          </p>
          <dl className="mt-10 grid max-w-xl grid-cols-2 gap-6 border-t border-ink/10 pt-8">
            <div>
              <dt className="text-xs uppercase tracking-[0.18em] text-ink/45">Atuação</dt>
              <dd className="mt-1.5 font-medium">Climatização e refrigeração</dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-[0.18em] text-ink/45">Atendimento</dt>
              <dd className="mt-1.5 font-medium">No local e orçamento on-line</dd>
            </div>
          </dl>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- 06 higienização ---------- */

function Higienizacao() {
  const sinais = [
    "Odores incomuns ao ligar o aparelho",
    "Sujeira acumulada nos filtros e na saída de ar",
    "Alterações no funcionamento ou no resfriamento",
  ];
  return (
    <section className="bg-sky py-20 text-ink md:py-28">
      <div className={container}>
        <div className="grid overflow-hidden rounded-[2rem] bg-background md:grid-cols-2">
          <ServiceIllustration
            src="/images/57786ddc-013a-4758-a0e3-5666676b6747.jpg"
            mobileSrc="/images/14d237c6-d9cb-411d-8897-163c86037496.jpg"
            className="aspect-[4/3] rounded-none md:aspect-auto md:min-h-[560px]"
          />
          <Reveal className="flex flex-col justify-center p-8 md:p-14">
            <Eyebrow n="04">Higienização</Eyebrow>
            <H2 className="mt-5 md:text-[2.75rem]">Seu ar-condicionado precisa de atenção?</H2>
            <p className="mt-5 text-ink/65">
              Alguns sinais podem indicar que é hora de uma manutenção ou higienização do aparelho:
            </p>
            <ol className="mt-6 divide-y divide-ink/10 border-y border-ink/10">
              {sinais.map((s, i) => (
                <li key={s} className="flex items-baseline gap-4 py-4">
                  <span className="font-mono text-xs text-ink/40">0{i + 1}</span>
                  <span className="font-medium">{s}</span>
                </li>
              ))}
            </ol>
            <div className="mt-8">
              <CtaButton href={wa(MSG.higienizacao)}>Solicitar higienização</CtaButton>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ---------- 07 trabalhos ---------- */

const TRABALHOS = [
  {
    image: "ar-condicionado-split.webp",
    caption: "Ar-condicionado split instalado em parede de azulejos",
    width: 842,
    height: 843,
  },
  {
    image: "manometros-geladeira.webp",
    caption: "Manômetros conectados durante o atendimento em uma geladeira",
    width: 841,
    height: 837,
  },
  {
    image: "manutencao-geladeira.webp",
    caption: "Geladeira em manutenção com bomba de vácuo e ferramentas",
    width: 628,
    height: 790,
  },
];

function Trabalhos() {
  return (
    <section className="bg-background py-20 text-ink md:py-32">
      <div className={container}>
        <Reveal className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <Eyebrow n="05">Trabalhos realizados</Eyebrow>
            <H2 className="mt-5">Climatização e refrigeração na prática.</H2>
          </div>
          <p className="max-w-sm text-ink/60">Registros de atendimentos da Fronteira.</p>
        </Reveal>
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {TRABALHOS.map(({ image, caption, width, height }, index) => (
            <Reveal key={image} delay={index * 100}>
              <figure>
                <img
                  src={"/images/" + image}
                  alt=""
                  width={width}
                  height={height}
                  loading="lazy"
                  className="aspect-square w-full rounded-[1.75rem] object-cover"
                />
                <figcaption className="mt-3 text-sm text-ink/65">{caption}</figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- 08 por que ---------- */

function PorQue() {
  const items = [
    {
      t: "Atendimento no local",
      d: "Consulte a disponibilidade de atendimento no endereço do equipamento.",
    },
    {
      t: "Orçamentos on-line",
      d: "Descreva o problema pelo WhatsApp para solicitar um orçamento.",
    },
    {
      t: "Climatização e refrigeração",
      d: "Ar-condicionado, geladeiras, freezers e mais em um só contato.",
    },
    {
      t: "Diferentes equipamentos",
      d: "Assistência técnica para linha branca e expositores refrigerados.",
    },
    { t: "Em Itajaí", d: "Localizada no bairro Cordeiros, em Itajaí — SC." },
  ];
  return (
    <section className="bg-mist py-20 text-ink md:py-32">
      <div className={`${container} grid gap-12 md:grid-cols-12`}>
        <Reveal className="md:col-span-5">
          <Eyebrow n="06">Diferenciais</Eyebrow>
          <H2 className="mt-5">Por que escolher a Fronteira?</H2>
          <p className="mt-5 max-w-sm text-ink/65">
            Um contato direto para resolver o conforto da sua casa e o funcionamento dos seus
            equipamentos.
          </p>
        </Reveal>
        <ul className="md:col-span-7">
          {items.map((it, i) => (
            <Reveal key={it.t} delay={i * 60}>
              <li className="grid grid-cols-[3rem_1fr] gap-2 border-t border-ink/15 py-6 last:border-b md:grid-cols-[4rem_1fr_1fr] md:gap-6">
                <span className="font-mono text-sm text-ink/40">0{i + 1}</span>
                <h3 className="font-display text-xl font-semibold md:text-2xl">{it.t}</h3>
                <p className="col-start-2 text-ink/60 md:col-start-auto">{it.d}</p>
              </li>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ---------- 09 avaliações ---------- */

const REVIEWS = [
  {
    name: "Flávio de Souza Netinho",
    text: "Serviço de qualidade, custo benefício, eficiência e excelência no atendimento!",
  },
  {
    name: "Flávio Neto",
    text: "Excelência nos serviços prestados e no atendimento. Muito satisfeito!!",
  },
  { name: "Marinalva Barbosa Nunes", text: "um ótimo serviço trabalha bem" },
];

function Avaliacoes() {
  return (
    <section className="bg-background py-20 text-ink md:py-32">
      <div className={`${container} grid gap-12 md:grid-cols-12`}>
        <Reveal className="md:col-span-4">
          <Eyebrow n="07">Avaliações</Eyebrow>
          <p className="mt-8 font-display text-7xl font-semibold tracking-tight md:text-8xl">4,9</p>
          <div className="mt-3 flex gap-1" aria-label="4,9 de 5 estrelas">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`size-5 ${i < 4 ? "fill-cta text-cta" : "fill-cta/40 text-cta"}`}
              />
            ))}
          </div>
          <p className="mt-3 text-ink/60">53 avaliações no Google</p>
        </Reveal>
        <div className="grid gap-5 md:col-span-8 md:grid-cols-2">
          {REVIEWS.map((r, i) => (
            <Reveal key={r.name} delay={i * 100} className={i === 2 ? "md:col-span-2" : ""}>
              <figure className="flex h-full flex-col justify-between rounded-3xl border border-ink/10 p-7">
                <blockquote className="font-display text-lg leading-snug md:text-xl">
                  “{r.text}”
                </blockquote>
                <figcaption className="mt-8 flex items-center justify-between gap-3 text-sm">
                  <span className="font-semibold">{r.name}</span>
                  <span className="text-xs uppercase tracking-[0.16em] text-ink/45">
                    Avaliação do Google
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- 10 FAQ ---------- */

const FAQ = [
  [
    "Quais serviços a Fronteira oferece?",
    "Instalação, manutenção, higienização e conserto de ar-condicionado, além de assistência técnica em geladeiras, freezers, máquinas de lavar, expositores e balcões refrigerados.",
  ],
  [
    "A Fronteira faz orçamento on-line?",
    "Sim. É possível entrar em contato pelo WhatsApp para explicar o serviço desejado e solicitar uma estimativa.",
  ],
  [
    "A empresa realiza atendimento no local?",
    "Sim, a Fronteira oferece serviços no local. A disponibilidade deve ser confirmada no momento do contato.",
  ],
  [
    "Vocês fazem limpeza de ar-condicionado?",
    "Sim. A Fronteira oferece higienização e limpeza dos filtros de ar-condicionado.",
  ],
  [
    "Vocês consertam geladeiras e máquinas de lavar?",
    "Sim. Esses serviços fazem parte da assistência técnica divulgada pela empresa.",
  ],
  [
    "Como posso solicitar atendimento?",
    `Entre em contato pelo WhatsApp ${WHATSAPP_DISPLAY} e explique o problema ou serviço desejado.`,
  ],
  ["Onde a Fronteira está localizada?", ADDRESS],
  [
    "Quais regiões são atendidas?",
    "A Fronteira está localizada em Itajaí. Para confirmar atendimento em outras cidades, entre em contato pelo WhatsApp.",
  ],
];

function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="bg-mist py-20 text-ink md:py-32">
      <div className={`${container} grid gap-12 md:grid-cols-12`}>
        <Reveal className="md:col-span-4">
          <Eyebrow n="08">Dúvidas</Eyebrow>
          <H2 className="mt-5">Perguntas frequentes.</H2>
        </Reveal>
        <div className="md:col-span-8">
          {FAQ.map(([q, a], i) => {
            const isOpen = open === i;
            return (
              <div key={q} className="border-t border-ink/15 last:border-b">
                <h3>
                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-${i}`}
                    className="flex w-full items-center justify-between gap-6 py-6 text-left font-display text-lg font-semibold focus-visible:outline-2 focus-visible:outline-ink md:text-xl"
                  >
                    {q}
                    <Plus
                      className={`size-5 shrink-0 transition-transform duration-300 ${isOpen ? "rotate-45" : ""}`}
                    />
                  </button>
                </h3>
                <div
                  id={`faq-${i}`}
                  className={`grid transition-all duration-300 ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
                >
                  <p className="overflow-hidden pr-10 text-ink/65">
                    <span className="block pb-6">{a}</span>
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ---------- 11 contato ---------- */

const MAPS = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(ADDRESS)}`;
const ROUTES = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(ADDRESS)}`;
const INSTAGRAM = "https://www.instagram.com/fronteirarefrigeracao2014/";

function Contato() {
  const rows = [
    { k: "Endereço", v: ADDRESS },
    { k: "WhatsApp", v: WHATSAPP_DISPLAY },
    { k: "Instagram", v: "@fronteirarefrigeracao2014" },
    { k: "Atendimento", v: "Serviços no local e pedidos de orçamento pelo WhatsApp" },
    { k: "Horário", v: "Aberto 24 horas, conforme o Google Maps" },
    { k: "Pagamento", v: "Cartão de crédito e pagamento por aproximação via celular" },
  ];
  return (
    <section id="contato" className="bg-background py-20 text-ink md:py-32">
      <div className={container}>
        <Reveal className="rounded-[2rem] bg-sky p-8 md:flex md:items-center md:justify-between md:p-14">
          <H2 className="max-w-2xl md:text-[2.75rem]">
            Precisa de assistência técnica? Solicite seu orçamento.
          </H2>
          <div className="mt-8 shrink-0 md:mt-0">
            <CtaButton href={wa(MSG.geral)}>Conversar no WhatsApp</CtaButton>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-10 md:mt-16 md:grid-cols-12">
          <Reveal className="md:col-span-5">
            <Eyebrow n="09">Contato e localização</Eyebrow>
            <h3 className="mt-5 font-display text-2xl font-semibold">Fronteira Refrigeração</h3>
            <dl className="mt-8">
              {rows.map((r) => (
                <div
                  key={r.k}
                  className="grid grid-cols-[8rem_1fr] gap-4 border-t border-ink/10 py-4 text-sm"
                >
                  <dt className="text-ink/50">{r.k}</dt>
                  <dd className="min-w-0 break-words font-medium">{r.v}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-6 flex flex-wrap gap-3">
              <CtaButton href={MAPS} variant="outline">
                Abrir no Google Maps
              </CtaButton>
              <CtaButton href={ROUTES} variant="outline">
                Traçar rota
              </CtaButton>
            </div>
          </Reveal>
          <Reveal className="md:col-span-7" delay={120}>
            <div className="aspect-[4/3] overflow-hidden rounded-[1.75rem] border border-ink/10 bg-mist md:aspect-auto md:h-full md:min-h-[420px]">
              <iframe
                title="Mapa da Fronteira Refrigeração em Cordeiros, Itajaí"
                src={`https://www.google.com/maps?q=${encodeURIComponent(ADDRESS)}&output=embed`}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-full w-full border-0"
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ---------- 12 footer ---------- */

function Footer() {
  const links = [
    ["Início", "#inicio"],
    ["Serviços", "#servicos"],
    ["Sobre", "#sobre"],
    ["Contato", "#contato"],
  ];
  return (
    <footer className="bg-navy pb-28 pt-16 text-navy-foreground md:pb-12 md:pt-24">
      <div className={container}>
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <img
              src={logo}
              alt="Fronteira Refrigeração"
              width={890}
              height={503}
              className="w-56 max-w-full rounded-2xl bg-sky p-3"
              loading="lazy"
            />
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-navy-foreground/65">
              Instalação, manutenção, higienização e conserto de ar-condicionado. Assistência
              técnica em geladeiras, freezers, máquinas de lavar, expositores e balcões
              refrigerados.
            </p>
          </div>
          <nav aria-label="Rodapé" className="md:col-span-2">
            <p className="text-xs uppercase tracking-[0.18em] text-navy-foreground/45">Navegação</p>
            <ul className="mt-4 space-y-2.5 text-sm">
              {links.map(([l, h]) => (
                <li key={h}>
                  <a href={h} className="text-navy-foreground/80 hover:text-navy-foreground">
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="md:col-span-5">
            <p className="text-xs uppercase tracking-[0.18em] text-navy-foreground/45">Contato</p>
            <ul className="mt-4 space-y-2.5 text-sm text-navy-foreground/80">
              <li>
                <a
                  href={wa(MSG.geral)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 hover:text-navy-foreground"
                >
                  <WhatsAppIcon className="size-4 text-whatsapp" /> {WHATSAPP_DISPLAY}
                </a>
              </li>
              <li>
                <a
                  href={INSTAGRAM}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 hover:text-navy-foreground"
                >
                  <Instagram className="size-4" /> @fronteirarefrigeracao2014
                </a>
              </li>
              <li>
                <a
                  href={MAPS}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-start gap-2 hover:text-navy-foreground"
                >
                  <MapPin className="mt-0.5 size-4 shrink-0" /> {ADDRESS}
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-16 flex flex-col justify-between gap-2 border-t border-navy-foreground/10 pt-6 text-xs text-navy-foreground/50 md:flex-row">
          <p>© {new Date().getFullYear()} Fronteira Refrigeração. Todos os direitos reservados.</p>
          <p className="flex items-center gap-1.5">
            <Wind className="size-3.5" /> Itajaí · Santa Catarina
          </p>
        </div>
      </div>
    </footer>
  );
}

/* ---------- floating whatsapp ---------- */

function FloatingWhatsApp() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > window.innerHeight * 0.8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <a
      href={wa(MSG.geral)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Conversar no WhatsApp"
      className={`fixed bottom-5 right-5 z-50 grid size-14 place-items-center rounded-full bg-whatsapp text-whatsapp-foreground shadow-[var(--shadow-soft)] transition-all duration-500 hover:scale-105 ${show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-6 opacity-0"}`}
    >
      <WhatsAppIcon className="size-6" />
    </a>
  );
}

export function SiteSections() {
  return (
    <main className="font-sans">
      <TrustBar />
      <Climatizacao />
      <Refrigeracao />
      <Sobre />
      <Higienizacao />
      <Trabalhos />
      <PorQue />
      <Avaliacoes />
      <Faq />
      <Contato />
      <Footer />
      <FloatingWhatsApp />
    </main>
  );
}
