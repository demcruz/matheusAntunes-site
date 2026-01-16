"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import MetodoLanding from "./MetodoLanding";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://SEU_DOMINIO_AQUI";

type PricingMode = "online" | "presencial";

type PricingPlan = {
  name: string;
  price: string;
  pricePerMonth?: string;
  perks: string[];
  featured: boolean;
  badge: string;
};

const pricing: Record<PricingMode, PricingPlan[]> = {
  online: [
    {
      name: "Mensal",
      price: "R$ 297",
      featured: false,
      badge: "",
      perks: ["Plano individualizado", "Suporte WhatsApp", "Feedback semanal"],
    },
    {
      name: "Trimestral",
      price: "R$ 597",
      pricePerMonth: "R$ 199/mes",
      featured: true,
      badge: "Mais escolhido",
      perks: ["Ajustes continuos", "Estrategia por rotina", "Feedback semanal"],
    },
    {
      name: "Semestral",
      price: "R$ 1.097",
      pricePerMonth: "R$ 183/mes",
      featured: true,
      badge: "Mais escolhido",
      perks: [
        "Evolucao guiada",
        "Revisoes estrategicas",
        "Alinhamento quinzenal",
        "Feedback semanal",
      ],
    },
    {
      name: "Anual",
      price: "R$ 1.997",
      pricePerMonth: "R$ 166/mes",
      featured: false,
      badge: "Melhor custo/beneficio",
      perks: [
        "Constancia de verdade",
        "Acompanhamento longo",
        "Alinhamento quinzenal",
        "Feedback semanal",
      ],
    },
  ],
  presencial: [
    {
      name: "Mensal",
      price: "R$ 347",
      featured: false,
      badge: "",
      perks: ["Avaliacao presencial", "Dobras cutaneas", "Acompanhamento"],
    },
    {
      name: "Trimestral",
      price: "R$ 747",
      pricePerMonth: "R$ 249/mes",
      featured: true,
      badge: "Mais escolhido",
      perks: ["Ajustes periodicos", "Dados reais", "Evolucao"],
    },
    {
      name: "Semestral",
      price: "R$ 1.397",
      pricePerMonth: "R$ 232/mes",
      featured: true,
      badge: "Mais escolhido",
      perks: [
        "Plano + medidas",
        "Revisoes estrategicas",
        "Alinhamento quinzenal",
        "Evolucao",
      ],
    },
    {
      name: "Anual",
      price: "R$ 2.597",
      pricePerMonth: "R$ 216/mes",
      featured: false,
      badge: "Prioridade vagas",
      perks: [
        "Acompanhamento longo",
        "Medicoes recorrentes",
        "Alinhamento quinzenal",
        "Evolucao",
      ],
    },
  ],
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ProfessionalService",
      "@id": `${siteUrl}/#professionalservice`,
      name: "Shape Sob Controle - Consultoria nutricional premium",
      url: siteUrl,
      telephone: "+55 21 99316-3442",
      areaServed: "BR",
      serviceType: ["Consultoria nutricional online", "Consultoria nutricional presencial"],
      address: {
        "@type": "PostalAddress",
        addressLocality: "Niteroi",
        addressRegion: "RJ",
        addressCountry: "BR",
      },
      provider: {
        "@type": "Person",
        "@id": `${siteUrl}/#matheus-antunes`,
        name: "Matheus Antunes",
        jobTitle: "Nutricionista esportivo e clinico",
      },
      sameAs: ["https://www.instagram.com/maatheusantunes/"],
    },
    {
      "@type": "Person",
      "@id": `${siteUrl}/#matheus-antunes`,
      name: "Matheus Antunes",
      jobTitle: "Nutricionista esportivo e clinico",
      image: `${siteUrl}/ssc-assets/4.jpeg`,
      sameAs: ["https://www.instagram.com/maatheusantunes/"],
    },
    {
      "@type": "Service",
      "@id": `${siteUrl}/#servico`,
      name: "Consultoria nutricional Shape Sob Controle",
      serviceType: "Consultoria nutricional premium",
      provider: { "@id": `${siteUrl}/#professionalservice` },
      areaServed: "BR",
      url: siteUrl,
    },
    {
      "@type": "FAQPage",
      "@id": `${siteUrl}/#faq`,
      mainEntity: [
        {
          "@type": "Question",
          name: "Em quanto tempo eu vejo resultados",
          acceptedAnswer: {
            "@type": "Answer",
            text:
              "Depende do ponto de partida, rotina e adesao. O metodo foca em meses bem conduzidos com ajustes semanais.",
          },
        },
        {
          "@type": "Question",
          name: "Preciso mandar exames",
          acceptedAnswer: {
            "@type": "Answer",
            text:
              "Nao e obrigatorio, mas exames recentes ajudam a refinar a estrategia. Caso nao tenha, avaliamos por fotos e dados.",
          },
        },
        {
          "@type": "Question",
          name: "Como funciona o suporte",
          acceptedAnswer: {
            "@type": "Answer",
            text:
              "Suporte via WhatsApp para duvidas e ajustes, de segunda a sabado, 8h as 18h, com feedback semanal.",
          },
        },
        {
          "@type": "Question",
          name: "Serve pra quem treina pouco ou tem rotina corrida",
          acceptedAnswer: {
            "@type": "Answer",
            text:
              "Sim. O metodo foi criado para vida real com imprevistos. A ideia e controle estrategico, nao rigidez.",
          },
        },
      ],
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${siteUrl}/#breadcrumbs`,
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: siteUrl,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Shape Sob Controle",
          item: `${siteUrl}#metodo`,
        },
      ],
    },
  ],
};

export function ShapeSobControle() {
  const [mode, setMode] = useState<PricingMode>("online");
  const [baValue, setBaValue] = useState(50);
  const [pricingVisible, setPricingVisible] = useState(false);
  const pricingRef = useRef<HTMLDivElement>(null);
  const year = new Date().getFullYear();
  const afterStyle = { clipPath: `inset(0 ${100 - baValue}% 0 0)` };
  const sliderStyle = { left: `${baValue}%` };

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
      if ("scrollRestoration" in window.history) {
        window.history.scrollRestoration = "manual";
      }
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setPricingVisible(true);
          }
        });
      },
      { threshold: 0.2 }
    );

    if (pricingRef.current) {
      observer.observe(pricingRef.current);
    }

    // Carousel with slide effect
    const carouselItems = document.querySelectorAll('.carousel-item');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    
    let currentIndex = 0;
    const totalImages = carouselItems.length;
    
    const updateCarousel = (direction = 'next') => {
      // Remove all classes
      carouselItems.forEach(item => {
        item.classList.remove('active', 'prev');
      });
      
      // Set previous image
      const prevIndex = currentIndex;
      carouselItems[prevIndex]?.classList.add('prev');
      
      // Update current index
      if (direction === 'next') {
        currentIndex = (currentIndex + 1) % totalImages;
      } else {
        currentIndex = (currentIndex - 1 + totalImages) % totalImages;
      }
      
      // Set active image
      carouselItems[currentIndex]?.classList.add('active');
    };
    
    // Auto-play every 3 seconds
    const autoPlay = setInterval(() => updateCarousel('next'), 3000);
    
    // Manual navigation
    const handleNext = () => {
      clearInterval(autoPlay);
      updateCarousel('next');
    };
    
    const handlePrev = () => {
      clearInterval(autoPlay);
      updateCarousel('prev');
    };

    nextBtn?.addEventListener('click', handleNext);
    prevBtn?.addEventListener('click', handlePrev);

    return () => {
      observer.disconnect();
      clearInterval(autoPlay);
      nextBtn?.removeEventListener('click', handleNext);
      prevBtn?.removeEventListener('click', handlePrev);
    };
  }, []);

  return (
    <div className="ssc-page">
      <a className="skipLink" href="#main-content">
        Pular para o conteudo
      </a>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <header className="topbar">
        <div className="wrap">
          <nav className="nav" aria-label="Principal">
            <div className="brand">
              <div className="brandLogoWrap">
                <Image
                  src="/ssc-assets/0.1.png"
                  alt="Matheus Antunes - Nutricao esportiva e clinica"
                  width={96}
                  height={96}
                  priority
                />
              </div>
              <div>
                <div className="t1">Matheus Antunes</div>
                <div className="t2">Nutricao esportiva e clinica - Fisiculturismo</div>
              </div>
            </div>
            <div className="navlinks">
              <a href="#metodo">Home</a>
              <a href="#como-funciona">Servicos</a>
              <a href="#resultados">Resultados</a>
              <a href="#planos">Planos</a>
              <a href="#cta-final">Contato</a>
            </div>
            <div className="navActions">
              <a
                className="btn btn-whatsapp"
                href="https://wa.me/5521993163442?text=Quero%20come%C3%A7ar%20a%20consultoria%20Shape%20Sob%20Controle.%20Pode%20me%20explicar%20o%20processo%20e%20os%20planos%3F"
                aria-label="Chamar no WhatsApp"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.465 3.516"/>
                </svg>
                Quero marcar
              </a>
              <a
                className="btn btn-instagram"
                href="https://www.instagram.com/maatheusantunes/"
                aria-label="Abrir Instagram do Matheus Antunes"
                target="_blank"
                rel="noreferrer"
              >
                <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <rect
                    x="3"
                    y="3"
                    width="18"
                    height="18"
                    rx="5"
                    stroke="currentColor"
                    strokeWidth="1.6"
                  />
                  <circle
                    cx="12"
                    cy="12"
                    r="4.2"
                    stroke="currentColor"
                    strokeWidth="1.6"
                  />
                  <circle cx="17.2" cy="6.8" r="1.2" fill="currentColor" />
                </svg>
                Instagram
              </a>
            </div>
          </nav>
        </div>
      </header>

      <main id="main-content">
        <div className="wrap">
          <nav className="breadcrumbs" aria-label="Breadcrumb">
            <ol>
              <li>
                <Link href="/">Home</Link>
              </li>
              <li aria-current="page">Shape Sob Controle</li>
            </ol>
          </nav>
        </div>

      <section id="bio" aria-label="Quem e Matheus Antunes">
        <div className="wrap">
          <div className="bioCard">
            <div className="bioGrid">
              <div className="bioContent">
                <div className="bioHeader">
                  <span className="bioBadge">Quem sou eu</span>
                  <h2 className="bioTitle">Quem e Matheus Antunes</h2>
                  <p className="bioLead">
                    Nutricionista esportivo e clinico, atleta de fisiculturismo e criador do
                    Metodo Shape Sob Controle.
                  </p>
                </div>
                <p>
                  Natural de Niteroi/RJ, atua profissionalmente desde 2020, unindo
                  ciencia, pratica de palco e experiencia clinica no
                  acompanhamento de homens e mulheres que buscam evolucao fisica
                  e estetica real.
                </p>
                <p>
                  Com 7 titulos municipais e estaduais, Matheus traz para o
                  metodo a vivencia pratica de quem conhece o processo na teoria
                  e na execucao. Seu trabalho vai alem de dietas prontas: e
                  baseado em estrategia, individualidade e constancia, com
                  planos alimentares ajustados a rotina e a realidade de cada
                  pessoa.
                </p>
                <p>
                  O foco e promover resultados consistentes, sustentaveis e
                  alinhados a saude, sem extremismos - transformando habitos,
                  autoestima e performance fisica ao longo do processo.
                </p>
              </div>
              <div className="bioAside">
                <div className="bioQuote">
                  &quot;Estrategia {'>'} extremismo. Constancia {'>'} motivacao.&quot;
                </div>
                <div className="bioPhoto">
                  <Image
                    src="/ssc-assets/4.jpeg"
                    alt="Matheus Antunes em competicao de fisiculturismo"
                    width={800}
                    height={1000}
                    loading="lazy"
                  />
                </div>
                <div className="bioChips">
                  <span className="chip">
                    <span className="dot" /> Vivencia de palco
                  </span>
                  <span className="chip">
                    <span className="dot" /> Nutricao clinica
                  </span>
                  <span className="chip">
                    <span className="dot" /> Estrategia individual
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <MetodoLanding />
      <section id="resultados" className="sectionResults">
        <div className="wrap">
          <div className="sectionTitle sectionTitle--results">
            <span className="pill">Evolucoes reais</span>
            <div>
              <h2>Resultados com metodo, constancia e dados reais</h2>
              <p>Transformacoes reais dos nossos alunos.</p>
            </div>
          </div>

          <div className="proofGrid">
            <div className="panel panel--tight">
              <div className="carousel-container">
                <div className="carousel-image">
                  {[6, 7, 8, 9, 10, 11, 12, 13, 14].map((imageNum, index) => (
                    <div
                      key={imageNum}
                      className={`carousel-item${index === 0 ? " active" : ""}`}
                    >
                      <Image
                        src={`/ssc-assets/${imageNum}.jpeg`}
                        alt={`Transformacao ${imageNum}`}
                        fill
                        sizes="(max-width: 768px) 100vw, 720px"
                        className="carousel-img"
                        loading="lazy"
                      />
                    </div>
                  ))}
                </div>
                <div className="carousel-nav">
                  <button className="carousel-nav-btn" id="prev-btn" type="button" aria-label="Anterior">
                    &lt;
                  </button>
                  <button className="carousel-nav-btn" id="next-btn" type="button" aria-label="Proximo">
                    &gt;
                  </button>
                </div>
              </div>
              <p className="small small--tight">
                Resultados reais dos nossos alunos. Sem filtros, sem mentiras.
              </p>
            </div>

          </div>
        </div>
      </section>
      <section id="planos" ref={pricingRef}>
        <div className="wrap">
          <div className="sectionTitle sectionTitle--center">
            <div className="sectionTitle__copy">
              <h2>Planos e investimento</h2>
              <p>Escolha a modalidade e feche pelo WhatsApp.</p>
            </div>
            <div className="sectionTitle__controls">
              <div className="toggleRow">
                <div className="toggle" role="tablist" aria-label="Alternar modalidade">
                  <button
                    id="tabOnline"
                    className={mode === "online" ? "active" : ""}
                    type="button"
                    role="tab"
                    aria-selected={mode === "online"}
                    onClick={() => setMode("online")}
                  >
                    Online
                  </button>
                  <button
                    id="tabPresencial"
                    className={mode === "presencial" ? "active" : ""}
                    type="button"
                    role="tab"
                    aria-selected={mode === "presencial"}
                    onClick={() => setMode("presencial")}
                  >
                    Presencial
                  </button>
                </div>
              </div>
              <a
                className="btn btn-whatsapp btn--center"
                href="https://wa.me/5521993163442?text=Quero%20fechar%20um%20plano%20do%20Shape%20Sob%20Controle.%20Pode%20me%20enviar%20os%20pr%C3%B3ximos%20passos%3F"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.465 3.516"/>
                </svg>
                Quero fechar agora
              </a>
            </div>
          </div>

          <div className="planNote planNote--center">
            {mode === "online" ? "Planos mais escolhidos pelos alunos: Trimestral e Semestral."
              : "Prioridade para vagas presenciais limitadas."}
          </div>
          <div className={`prices ${pricingVisible ? "prices--visible" : ""}`}>
            {pricing[mode].map((plan, index) => {
              const ctaText = `Quero fechar o plano ${plan.name} (${mode}). Pode me enviar os proximos passos`;
              const ctaHref = `https://wa.me/5521993163442?text=${encodeURIComponent(
                ctaText
              )}`;

              return (
                <div
                  key={`${mode}-${plan.name}`}
                  className={`priceCard${plan.featured ? " featured" : ""} delay-${index + 1}`}
                >
                  {plan.badge ? <div className="badge">{plan.badge}</div> : null}
                  <h4>{plan.name}</h4>
                  <div className="price">
                    {plan.price}
                    {plan.pricePerMonth && (
                      <span className="pricePerMonth">({plan.pricePerMonth})</span>
                    )}
                  </div>
                  <div className="small">
                    {mode === "online" ? "Consulta online (videochamada + WhatsApp)"
                      : "Consulta presencial (dobras + medidas)"}
                  </div>
                  <ul>
                    {plan.perks.map((perk) => (
                      <li key={perk}>
                        <span className="mini">?</span>
                        <span>{perk}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="priceCta">
                    <a className="btn btn-whatsapp btn--block" href={ctaHref}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.465 3.516"/>
                      </svg>
                      Fechar {plan.name}
                    </a>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="panel panel--spaced">
            <h3 className="panelTitle">O que esta incluso</h3>
            <div className="grid2">
              <ul className="list">
                <li className="li">
                  <span className="tick">?</span> Plano alimentar individualizado +
                  estrategias praticas
                </li>
                <li className="li">
                  <span className="tick">?</span> Ajustes constantes com base em
                  feedback semanal
                </li>
                <li className="li">
                  <span className="tick">?</span> Suporte WhatsApp: seg-sab, 8h-18h
                </li>
              </ul>
              <ul className="list">
                <li className="li">
                  <span className="tick">?</span> Analise de fotos (frente/lado/costas)
                  e evolucao
                </li>
                <li className="li">
                  <span className="tick">?</span> Avaliacao de exames laboratoriais
                  (quando aplicavel)
                </li>
                <li className="li">
                  <span className="tick">?</span> Cupons e beneficios com parceiros
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      <section aria-label="Chamada final">
        <div className="wrap">
          <div className="panel panel--cta">
            <div className="grid2 grid2--center">
              <div>
                <h2 className="ctaTitle">Pronto pra recalcular sua rota</h2>
                <p className="ctaText">
                  Se voce quer o melhor layout, precisa do melhor processo:
                  planejamento, execucao e ajustes consistentes. Vem pro controle.
                </p>
              </div>
              <div className="ctaActions">
                <a
                  className="btn btn-whatsapp"
                  href="https://wa.me/5521993163442?text=Quero%20come%C3%A7ar%20a%20consultoria%20premium%20do%20Shape%20Sob%20Controle.%20Qual%20o%20primeiro%20passo%3F"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.465 3.516"/>
                  </svg>
                  Quero mudar de vida
                </a>
                <a className="btn btn-ghost" href="#faq">
                  Tirar duvidas
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="faq">
        <div className="wrap">
          <div className="sectionTitle">
            <div>
              <h2>FAQ</h2>
              <p>As perguntas que travam compra (e como destravar).</p>
            </div>
          </div>

          <div className="faq">
            <details>
              <summary>Em quanto tempo eu vejo resultados</summary>
              <p>
                Depende do ponto de partida, rotina e adesao. O metodo foca em meses bem conduzidos (nao semanas perfeitas).
                Voce tera ajustes semanais para manter a evolucao consistente.
              </p>
            </details>
            <details>
              <summary>Preciso mandar exames</summary>
              <p>
                Nao e obrigatorio, mas se voce tiver exames recentes, eles ajudam a refinar estrategia e saude.
                Se nao tiver, comecamos com avaliacao e evolucao por fotos e dados.
              </p>
            </details>
            <details>
              <summary>Como funciona o suporte</summary>
              <p>
                Suporte via WhatsApp para duvidas e ajustes:
                <b>segunda a sabado, 8h as 18h</b>. Feedback semanal e essencial para ajustar e evoluir.
              </p>
            </details>
            <details>
              <summary>Serve pra quem treina pouco/tem rotina corrida</summary>
              <p>
                Sim. O metodo foi criado exatamente pra vida real: rotinas corridas, imprevistos e semanas nao perfeitas.
                A ideia e controle estrategico, nao rigidez.
              </p>
            </details>
          </div>
        </div>
      </section>
      </main>
      <footer className="footer">
        <div className="wrap">
          <div className="footerRow">
            <div className="footerBrand">
              <div className="brandLogoWrap brandLogoWrap--small">
                <Image
                  src="/ssc-assets/0.1.png"
                  alt="Matheus Antunes"
                  width={48}
                  height={48}
                />
              </div>
              <div>
                <div className="footerBrandName">Matheus Antunes</div>
                <div className="footerBrandMeta">
                  Nutricao esportiva e clinica - Shape Sob Controle
                </div>
              </div>
            </div>
            <div className="footerCopyright">
              c {year} - Todos os direitos reservados.
            </div>
            <a
              className="btn btn-instagram"
              href="https://www.instagram.com/maatheusantunes/"
              aria-label="Abrir Instagram do Matheus Antunes"
              target="_blank"
              rel="noreferrer"
            >
              <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <rect
                  x="3"
                  y="3"
                  width="18"
                  height="18"
                  rx="5"
                  stroke="currentColor"
                  strokeWidth="1.6"
                />
                <circle
                  cx="12"
                  cy="12"
                  r="4.2"
                  stroke="currentColor"
                  strokeWidth="1.6"
                />
                <circle cx="17.2" cy="6.8" r="1.2" fill="currentColor" />
              </svg>
              Instagram
            </a>
          </div>
        </div>
      </footer>
      <div className="sticky" role="contentinfo" aria-label="Barra fixa">
        <div className="wrap">
          <div className="in">
            <div>
              <div className="stickyTitle">
                Consultoria premium - Shape Sob Controle
              </div>
              <div className="miniText">
                Clique e ja abre no WhatsApp com a mensagem pronta.
              </div>
            </div>
            <div className="ctaRow">
              <a
                className="btn btn-whatsapp"
                href="https://wa.me/5521993163442?text=Quero%20assumir%20o%20controle%20do%20meu%20shape.%20Como%20fa%C3%A7o%20para%20come%C3%A7ar%3F"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.465 3.516"/>
                </svg>
                Falar no WhatsApp
              </a>
              <a className="btn btn-ghost" href="#planos">
                Ver planos
              </a>

            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        :global(:root) {
          --bg: #07070a;
          --panel: #0d0f14;
          --panel2: #0b0c10;
          --text: #f5f7ff;
          --muted: #aab0c0;
          --gold: #d4af37;
          --gold2: #f2d16b;
          --line: rgba(255, 255, 255, 0.1);
          --shadow: 0 18px 60px rgba(0, 0, 0, 0.55);
          --radius: 20px;
          --radius2: 28px;
          --max: 1080px;
          --section-space: 64px;
          --section-space-lg: 80px;
        }
        :global(html) {
          scroll-behavior: smooth;
          scroll-padding-top: 80px;
        }
        :global(html),
        :global(body) {
          height: 100%;
        }
        :global(body) {
          margin: 0;
          font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto,
            Helvetica, Arial, "Apple Color Emoji", "Segoe UI Emoji";
          background: radial-gradient(
              1200px 800px at 20% -10%,
              rgba(212, 175, 55, 0.12),
              transparent 55%
            ),
            radial-gradient(
              900px 600px at 90% 10%,
              rgba(242, 209, 107, 0.1),
              transparent 60%
            ),
            radial-gradient(
              1200px 800px at 50% 110%,
              rgba(40, 120, 255, 0.1),
              transparent 55%
            ),
            var(--bg);
          color: var(--text);
          line-height: 1.5;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }
        * {
          box-sizing: border-box;
        }
        a {
          color: inherit;
          text-decoration: none;
          transition: opacity 0.2s ease;
        }
        a:hover {
          opacity: 0.9;
        }
        a:focus-visible {
          outline: 2px solid var(--gold);
          outline-offset: 2px;
          border-radius: 4px;
        }
        .skipLink {
          position: absolute;
          left: 16px;
          top: 12px;
          padding: 8px 12px;
          background: rgba(7, 7, 10, 0.95);
          color: var(--text);
          border: 1px solid var(--line);
          border-radius: 10px;
          transform: translateY(-200%);
          transition: transform 0.2s ease;
          z-index: 80;
          font-weight: 700;
        }
        .skipLink:focus {
          transform: translateY(0);
        }
        .breadcrumbs {
          margin: 10px 0 0;
          font-size: 12px;
          color: var(--muted);
        }
        .breadcrumbs ol {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          list-style: none;
          padding: 0;
          margin: 0;
        }
        .breadcrumbs li {
          display: inline-flex;
          align-items: center;
          gap: 8px;
        }
        .breadcrumbs li:not(:last-child)::after {
          content: "/";
          color: var(--muted);
        }
        .breadcrumbs a {
          color: var(--muted);
        }
        button:focus-visible {
          outline: 2px solid var(--gold);
          outline-offset: 2px;
        }
        img {
          max-width: 100%;
          display: block;
        }
        .wrap {
          max-width: var(--max);
          margin: 0 auto;
          padding: 0 20px;
          width: 100%;
        }
        section {
          padding: 60px 0;
        }
        .topbar {
          position: sticky;
          top: 0;
          z-index: 40;
          backdrop-filter: blur(14px);
          background: rgba(7, 7, 10, 0.55);
          border-bottom: 1px solid var(--line);
        }
        .nav {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 14px;
          padding: 14px 0;
        }
        .brand {
          display: flex;
          align-items: center;
          gap: 14px;
        }
        .brandLogoWrap {
          border-radius: 14px;
          background: #0b0b0f;
          border: 2px solid rgba(212, 175, 55, 0.75);
          width: clamp(50px, 6.5vw, 70px);
          height: clamp(50px, 6.5vw, 70px);
          padding: 8px;
          flex-shrink: 0;
          box-shadow: 
            0 10px 30px rgba(0, 0, 0, 0.45),
            0 0 22px rgba(212, 175, 55, 0.25),
            0 0 0 1px rgba(255, 255, 255, 0.12),
            inset 0 1px 0 rgba(255, 255, 255, 0.8);
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .brandLogoWrap img {
          width: 100%;
          height: 100%;
          object-fit: contain;
          display: block;
          filter: none;
        }
        .brandLogoWrap--small {
          width: clamp(34px, 5vw, 44px);
          height: clamp(34px, 5vw, 44px);
          padding: 4px;
          border-radius: 10px;
          box-shadow: 
            0 6px 16px rgba(0, 0, 0, 0.25),
            0 0 0 1px rgba(255, 255, 255, 0.1);
        }
        .brandLogoWrap--small img {
          width: 100%;
          height: 100%;
        }
        .brand .t1 {
          font-weight: 800;
          letter-spacing: 0.3px;
        }
        .brand .t2 {
          color: var(--muted);
          font-size: 12.5px;
          margin-top: -2px;
        }
        .navlinks {
          display: flex;
          gap: 16px;
          align-items: center;
        }
        .navActions {
          display: flex;
          gap: 12px;
          align-items: center;
        }
        .navlinks a {
          color: var(--muted);
          font-weight: 650;
          font-size: 13.5px;
        }
        .navlinks a:hover {
          color: var(--text);
        }
        .btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          border: 1px solid var(--line);
          padding: 14px 20px;
          border-radius: 999px;
          font-weight: 800;
          font-size: 15px;
          letter-spacing: 0.2px;
          transition: transform 0.15s ease, background 0.15s ease, border 0.15s ease, box-shadow 0.15s ease;
          cursor: pointer;
          user-select: none;
          white-space: nowrap;
          min-height: 48px;
          touch-action: manipulation;
        }
        .btn--block {
          width: 100%;
        }
        .btn--center {
          align-self: center;
        }
        .btn:hover {
          transform: translateY(-2px);
        }
        .btn:active {
          transform: translateY(0);
        }
        .btn-gold {
          background: linear-gradient(135deg, var(--gold), var(--gold2));
          color: #0b0b0f;
          border: 0;
          box-shadow: 0 14px 40px rgba(212, 175, 55, 0.2);
        }
        .btn-gold:hover {
          box-shadow: 0 18px 50px rgba(212, 175, 55, 0.3);
        }
        .btn-whatsapp {
          background: linear-gradient(135deg, #25D366, #128C7E);
          color: white;
          border: 0;
          box-shadow: 0 14px 40px rgba(37, 211, 102, 0.25);
          gap: 8px;
        }
        .btn-whatsapp:hover {
          background: linear-gradient(135deg, #128C7E, #25D366);
          box-shadow: 0 18px 50px rgba(37, 211, 102, 0.35);
        }
        .btn-whatsapp svg {
          width: 18px;
          height: 18px;
          flex-shrink: 0;
        }
        .btn-instagram {
          background: linear-gradient(135deg, #f58529, #dd2a7b, #8134af, #515bd4);
          color: white;
          border: 0;
          box-shadow: 0 14px 40px rgba(221, 42, 123, 0.25);
          gap: 8px;
        }
        .btn-instagram:hover {
          background: linear-gradient(135deg, #515bd4, #8134af, #dd2a7b, #f58529);
          box-shadow: 0 18px 50px rgba(221, 42, 123, 0.35);
        }
        .btn-instagram svg {
          width: 18px;
          height: 18px;
          flex-shrink: 0;
        }
        .btn-ghost {
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.15);
        }
        .btn-ghost:hover {
          background: rgba(255, 255, 255, 0.08);
          border-color: rgba(255, 255, 255, 0.25);
        }
        .chip {
          display: inline-flex;
          gap: 10px;
          align-items: center;
          border: 1px solid var(--line);
          background: rgba(255, 255, 255, 0.03);
          padding: 8px 12px;
          border-radius: 999px;
          color: var(--muted);
          font-size: 13px;
          font-weight: 650;
        }
        .dot {
          width: 8px;
          height: 8px;
          border-radius: 99px;
          background: var(--gold);
          box-shadow: 0 0 0 4px rgba(212, 175, 55, 0.14);
        }

        .hero {
          padding: 40px 0 30px;
        }
        .heroContent {
          text-align: left;
          max-width: var(--max);
          margin: 0 auto;
        }
        .heroMethod {
          margin-top: 18px;
        }
        .heroImageCenter {
          margin: 30px auto;
          max-width: 500px;
          border-radius: 24px;
          overflow: hidden;
          border: 2px solid rgba(212, 175, 55, 0.3);
          box-shadow: 0 30px 80px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.05);
        }
        .heroImageCenter img {
          width: 100%;
          height: auto;
          display: block;
        }
        .heroCta {
          display: flex;
          gap: 12px;
          justify-content: flex-start;
          flex-wrap: wrap;
          margin-bottom: 20px;
        }
        .h1 {
          font-size: clamp(32px, 5vw, 56px);
          line-height: 1.1;
          margin: 14px 0 16px;
          letter-spacing: -1px;
          font-weight: 950;
        }
        .heroHighlight {
          color: #fff;
          text-shadow: 0 0 40px rgba(255, 255, 255, 0.3);
        }
        .sub {
          color: var(--muted);
          font-size: 18px;
          max-width: 55ch;
          line-height: 1.5;
          margin: 0 auto;
        }
        .accent {
          color: var(--gold2);
          text-shadow: 0 0 60px rgba(212, 175, 55, 0.6);
        }
        .heroEmphasis {
          margin: 20px 0;
          display: flex;
          flex-direction: column;
          gap: 8px;
          font-size: 16px;
          color: var(--muted);
        }
        .heroEmphasis .emStrong {
          color: var(--text);
          font-weight: 900;
          letter-spacing: 0.3px;
        }
        .kpiRow {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 12px;
          margin: 24px 0;
          max-width: 600px;
          margin-left: auto;
          margin-right: auto;
        }
        .kpi {
          border: 1px solid rgba(212, 175, 55, 0.2);
          background: linear-gradient(
            135deg,
            rgba(212, 175, 55, 0.08),
            rgba(212, 175, 55, 0.02)
          );
          border-radius: 16px;
          padding: 14px 12px;
          text-align: center;
          position: relative;
          overflow: hidden;
        }
        .kpi::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 2px;
          background: linear-gradient(90deg, transparent, var(--gold2), transparent);
        }
        .kpi .n {
          font-weight: 950;
          font-size: 18px;
          color: var(--gold2);
          text-shadow: 0 0 20px rgba(212, 175, 55, 0.3);
        }
        .kpi .l {
          color: var(--muted);
          font-size: 12px;
          margin-top: 4px;
          font-weight: 500;
        }
        .btn-emphasis {
          transform: scale(1);
          transition: transform 0.2s ease, box-shadow 0.2s ease;
          box-shadow: 0 8px 32px rgba(212, 175, 55, 0.3);
        }
        .btn-emphasis:hover {
          transform: scale(1.02);
          box-shadow: 0 12px 40px rgba(212, 175, 55, 0.4);
        }
        .heroCard {
          border-radius: var(--radius2);
          background: linear-gradient(
            180deg,
            rgba(255, 255, 255, 0.05),
            rgba(255, 255, 255, 0.02)
          );
          border: 1px solid var(--line);
          box-shadow: var(--shadow);
          overflow: hidden;
          position: relative;
        }
        .heroCard:before {
          content: "";
          position: absolute;
          inset: -2px;
          background: radial-gradient(
              600px 420px at 30% 20%,
              rgba(212, 175, 55, 0.16),
              transparent 55%
            ),
            radial-gradient(
              500px 360px at 80% 10%,
              rgba(242, 209, 107, 0.1),
              transparent 60%
            );
          pointer-events: none;
        }
        .heroCardInner {
          position: relative;
          padding: 16px;
        }
        .heroImg {
          border-radius: 22px;
          overflow: hidden;
          border: 1px solid rgba(255, 255, 255, 0.12);
        }
        .heroImg img {
          width: 100%;
          height: 520px;
          object-fit: cover;
          object-position: 50% 25%;
        }
        .credRow {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
          margin-top: 14px;
        }
        .cred {
          font-size: 12px;
          color: var(--muted);
          border: 1px solid var(--line);
          padding: 8px 10px;
          border-radius: 999px;
          background: rgba(0, 0, 0, 0.18);
        }
        .cred b {
          color: var(--text);
        }

        section {
          padding: var(--section-space) 0;
        }
        .sectionResults {
          position: relative;
          border-top: 1px solid rgba(255, 255, 255, 0.06);
          border-bottom: 1px solid rgba(255, 255, 255, 0.06);
          background: radial-gradient(
            600px 320px at 15% 0%,
            rgba(212, 175, 55, 0.14),
            transparent 60%
          );
        }
        @media (min-width: 1024px) {
          section {
            padding: var(--section-space-lg) 0;
          }
        }
        .ssc-page {
          padding-bottom: 96px;
        }
        .sectionTitle {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 10px;
          margin-bottom: 18px;
          text-align: left;
        }
        .sectionTitle__copy {
          display: grid;
          gap: 6px;
        }
        .sectionTitle__controls {
          display: flex;
          flex-direction: column;
          gap: 12px;
          align-items: flex-start;
          width: 100%;
          max-width: 520px;
        }
        .sectionTitle--center {
          align-items: center;
          text-align: center;
        }
        .sectionTitle--left {
          align-items: flex-start;
          text-align: left;
        }
        .sectionTitle--center .sectionTitle__controls {
          align-items: center;
        }
        .sectionTitle--tight {
          margin-bottom: 12px;
        }
        .sectionTitle--accent h2 {
          position: relative;
          padding-left: 14px;
        }
        .sectionTitle--accent h2::before {
          content: "";
          position: absolute;
          left: 0;
          top: 50%;
          transform: translateY(-50%);
          width: 4px;
          height: 70%;
          border-radius: 999px;
          background: linear-gradient(180deg, var(--gold2), transparent);
        }
        .sectionTitle h2 {
          margin: 0;
          font-size: 26px;
          letter-spacing: -0.3px;
          line-height: 1.2;
          text-wrap: balance;
        }
        .sectionTitle p {
          margin: 0;
          color: var(--muted);
          max-width: 60ch;
        }
        .sectionTitle--results h2 {
          font-size: clamp(34px, 4vw, 46px);
          font-weight: 900;
          letter-spacing: -0.6px;
          line-height: 1.05;
          text-shadow: 0 6px 24px rgba(0, 0, 0, 0.45);
        }
        .sectionTitle--results p {
          color: #d7dbe8;
          font-size: 16px;
          font-weight: 600;
        }
        .sectionTitle--center p {
          margin-left: auto;
          margin-right: auto;
        }
        .sectionSubtitle {
          margin: 0;
          color: var(--muted);
          font-size: 14px;
          max-width: 60ch;
        }
        .grid2 {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 18px;
        }
        .grid2--center {
          align-items: center;
        }
        .panel {
          border: 1px solid var(--line);
          background: linear-gradient(
            180deg,
            rgba(255, 255, 255, 0.04),
            rgba(255, 255, 255, 0.02)
          );
          border-radius: var(--radius);
          padding: 18px;
        }
        .sectionResults .panel {
          border-color: rgba(212, 175, 55, 0.25);
          box-shadow: 0 26px 70px rgba(0, 0, 0, 0.55);
        }
        .panel--tight {
          padding: 14px;
        }
        .panel--spaced {
          margin-top: 14px;
        }
        .panel--cta {
          padding: 22px;
          border-radius: 28px;
          background:
            radial-gradient(
              700px 420px at 20% 20%,
              rgba(212, 175, 55, 0.18),
              transparent 60%
            ),
            rgba(255, 255, 255, 0.02);
        }
        .panelTitle {
          margin: 0 0 10px;
          font-size: 18px;
        }
        .ctaTitle {
          margin: 0 0 8px;
          font-size: 26px;
        }
        .ctaText {
          margin: 0;
          color: var(--muted);
        }
        .ctaActions {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
          justify-content: center;
        }
        .methodIntro {
          margin-bottom: 18px;
        }
        .methodIntro p {
          margin: 0;
          color: var(--muted);
        }
        .methodHeader {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 12px;
        }
        .methodHeader h3 {
          margin: 0;
          font-size: 20px;
        }
        .pill {
          font-size: 11px;
          font-weight: 900;
          letter-spacing: 0.6px;
          text-transform: uppercase;
          padding: 6px 10px;
          border-radius: 999px;
          border: 1px solid rgba(212, 175, 55, 0.4);
          background: rgba(212, 175, 55, 0.12);
          color: var(--gold2);
        }
        .panel h3 {
          margin: 0 0 10px;
          font-size: 18px;
        }
        .list {
          margin: 0;
          padding: 0;
          list-style: none;
          display: grid;
          gap: 10px;
        }
        .li {
          display: flex;
          gap: 10px;
          align-items: flex-start;
          color: var(--muted);
        }
        .tick {
          flex: 0 0 auto;
          width: 22px;
          height: 22px;
          border-radius: 7px;
          background: rgba(212, 175, 55, 0.14);
          border: 1px solid rgba(212, 175, 55, 0.35);
          display: grid;
          place-items: center;
          color: var(--gold2);
          font-weight: 900;
        }

        .steps {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 14px;
        }
        .step {
          padding: 16px;
          border-radius: 20px;
          border: 1px solid var(--line);
          background: rgba(255, 255, 255, 0.03);
        }
        .step .tag {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 12px;
          color: var(--muted);
          border: 1px solid var(--line);
          border-radius: 999px;
          padding: 6px 10px;
        }
        .step h4 {
          margin: 10px 0 8px;
          font-size: 17px;
        }
        .step p {
          margin: 0;
          color: var(--muted);
          font-size: 13.5px;
        }
        .consultancySplit {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 16px;
        }
        .consultancyCard {
          position: relative;
          padding: 16px;
          border-radius: 24px;
          border: 1px solid var(--line);
          background: linear-gradient(
            180deg,
            rgba(255, 255, 255, 0.05),
            rgba(255, 255, 255, 0.02)
          );
          overflow: hidden;
        }
        .consultancyCard::before {
          content: "";
          position: absolute;
          inset: 0;
          background: radial-gradient(
              420px 220px at 15% 10%,
              rgba(212, 175, 55, 0.18),
              transparent 60%
            );
          opacity: 0.9;
          pointer-events: none;
        }
        .consultancyCard.presencial::before {
          background: radial-gradient(
              420px 220px at 85% 0%,
              rgba(80, 150, 255, 0.18),
              transparent 60%
            );
        }
        .consultancyCard > * {
          position: relative;
        }
        .consultancyHeader {
          display: grid;
          gap: 6px;
          margin-bottom: 14px;
        }
        .consultancyHeader h3 {
          margin: 0;
          font-size: 18.5px;
          font-weight: 900;
          letter-spacing: 0.2px;
        }
        .consultancyHeader p {
          margin: 0;
          color: var(--muted);
          font-size: 13.5px;
        }
        .consultancyMeta {
          font-size: 12px;
          font-weight: 800;
          color: rgba(242, 209, 107, 0.95);
          letter-spacing: 0.2px;
          line-height: 1.3;
        }
        .consultancySteps {
          margin: 4px 0 0;
          padding: 0;
          list-style: none;
          display: grid;
          gap: 12px;
        }
        .consultancySteps li {
          display: flex;
          gap: 12px;
          align-items: center;
          padding: 12px 12px 12px 10px;
          border-radius: 14px;
          border: 1px solid var(--line);
          background: rgba(255, 255, 255, 0.02);
        }
        .consultancySteps li > div {
          display: grid;
          gap: 4px;
        }
        .consultancySteps li.isKey {
          border-color: rgba(242, 209, 107, 0.4);
          box-shadow: 0 12px 30px rgba(212, 175, 55, 0.12);
          background: linear-gradient(
            180deg,
            rgba(212, 175, 55, 0.08),
            rgba(255, 255, 255, 0.02)
          );
        }
        .stepIndex {
          width: 22px;
          height: 22px;
          border-radius: 999px;
          display: grid;
          place-items: center;
          flex: 0 0 auto;
          font-weight: 800;
          font-size: 11px;
          line-height: 1;
          text-align: center;
          font-variant-numeric: tabular-nums;
          padding-top: 1px;
          color: var(--gold2);
          border: 1px solid rgba(242, 209, 107, 0.35);
          background: rgba(255, 255, 255, 0.04);
          box-shadow: 0 6px 14px rgba(0, 0, 0, 0.25);
        }
        .consultancyCard.presencial .stepIndex {
          color: #cfe3ff;
          border-color: rgba(80, 150, 255, 0.35);
          background: rgba(255, 255, 255, 0.04);
        }
        .consultancyCard.presencial .consultancySteps li.isKey {
          border-color: rgba(80, 150, 255, 0.4);
          box-shadow: 0 12px 30px rgba(80, 150, 255, 0.12);
          background: linear-gradient(
            180deg,
            rgba(80, 150, 255, 0.1),
            rgba(255, 255, 255, 0.02)
          );
        }
        .consultancySteps strong {
          display: block;
          margin-bottom: 4px;
          font-size: 13.5px;
          font-weight: 800;
        }
        .consultancySteps span {
          display: block;
          color: var(--muted);
          font-size: 12.5px;
        }
        .consultancyBadges {
          margin-top: 14px;
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }
        .consultancyBadge {
          font-size: 11px;
          font-weight: 700;
          color: var(--muted);
          border: 1px solid var(--line);
          border-radius: 999px;
          padding: 6px 10px;
          background: rgba(7, 7, 10, 0.6);
        }
        .exampleBlock {
          margin-top: 24px;
          display: grid;
          gap: 16px;
        }
        .exampleTitle h3 {
          margin: 0;
          font-size: 20px;
        }
        .exampleTitle p {
          margin: 6px 0 0;
          color: var(--muted);
        }
        .exampleGrid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 12px;
        }
        .exampleCard {
          position: relative;
          padding: 18px;
          border-radius: 20px;
          border: 1px solid var(--line);
          background: linear-gradient(
            180deg,
            rgba(255, 255, 255, 0.04),
            rgba(255, 255, 255, 0.01)
          );
        }
        .exampleCard .num {
          position: absolute;
          top: 16px;
          left: 16px;
          width: 36px;
          height: 36px;
          border-radius: 999px;
          border: 1px solid rgba(242, 209, 107, 0.6);
          display: grid;
          place-items: center;
          color: var(--gold2);
          font-weight: 900;
          background: rgba(7, 7, 10, 0.9);
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.35);
        }
        .exampleCard h4 {
          margin: 42px 0 8px;
          font-size: 16.5px;
        }
        .exampleCard p {
          margin: 0;
          color: var(--muted);
          font-size: 13.5px;
        }
        .exampleMedia {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 12px;
        }
        .exampleShot {
          position: relative;
          min-height: 190px;
          border-radius: 22px;
          border: 1px solid var(--line);
          background: radial-gradient(
              220px 140px at 20% 20%,
              rgba(242, 209, 107, 0.16),
              transparent 60%
            ),
            linear-gradient(135deg, rgba(255, 255, 255, 0.04), rgba(7, 7, 10, 0.6));
          overflow: hidden;
        }
        .exampleShot.alt {
          background: radial-gradient(
              260px 160px at 70% 10%,
              rgba(212, 175, 55, 0.18),
              transparent 65%
            ),
            linear-gradient(135deg, rgba(255, 255, 255, 0.03), rgba(7, 7, 10, 0.7));
        }
        .exampleTag {
          position: absolute;
          top: 14px;
          left: 14px;
          font-size: 11px;
          font-weight: 800;
          color: var(--muted);
          padding: 6px 10px;
          border-radius: 999px;
          border: 1px solid var(--line);
          background: rgba(7, 7, 10, 0.7);
        }
        .exampleLines {
          position: absolute;
          left: 16px;
          right: 16px;
          bottom: 16px;
          display: grid;
          gap: 8px;
        }
        .exampleLines span {
          display: block;
          height: 10px;
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.12);
        }
        .exampleLines span:nth-child(2) {
          width: 70%;
        }
        .exampleLines span:nth-child(3) {
          width: 55%;
        }

        .toggleRow {
          display: flex;
          gap: 10px;
          align-items: center;
          justify-content: center;
        }
        .planNote {
          margin: 10px 0 0;
          color: var(--muted);
          font-size: 13px;
          font-weight: 600;
        }
        .planNote--center {
          text-align: center;
        }
        .toggle {
          display: inline-flex;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid var(--line);
          padding: 6px;
          border-radius: 999px;
          gap: 6px;
        }
        .toggle button {
          border: 0;
          background: transparent;
          color: var(--muted);
          font-weight: 900;
          padding: 10px 14px;
          border-radius: 999px;
          cursor: pointer;
        }
        .toggle button.active {
          background: rgba(212, 175, 55, 0.18);
          color: var(--text);
          border: 1px solid rgba(212, 175, 55, 0.3);
        }
        .prices {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 18px;
          margin-top: 20px;
          align-items: stretch;
        }
        .priceCard {
          display: flex;
          flex-direction: column;
          border-radius: 24px;
          border: 1px solid var(--line);
          background: linear-gradient(
            180deg,
            rgba(255, 255, 255, 0.05),
            rgba(255, 255, 255, 0.02)
          );
          padding: 20px;
          position: relative;
          overflow: hidden;
          min-height: 200px;
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 0.5s ease, transform 0.5s ease, border-color 0.3s ease, box-shadow 0.3s ease;
        }
        .priceCard.delay-1 {
          transition-delay: 0s;
        }
        .priceCard.delay-2 {
          transition-delay: 0.1s;
        }
        .priceCard.delay-3 {
          transition-delay: 0.2s;
        }
        .priceCard.delay-4 {
          transition-delay: 0.3s;
        }
        .priceCard:hover {
          border-color: rgba(255, 255, 255, 0.2);
        }
        .prices--visible .priceCard {
          opacity: 1;
          transform: translateY(0);
        }
        .priceCard.featured {
          border-color: rgba(212, 175, 55, 0.5);
          box-shadow: 0 24px 60px rgba(212, 175, 55, 0.15);
          background: linear-gradient(
            180deg,
            rgba(212, 175, 55, 0.08),
            rgba(212, 175, 55, 0.02)
          );
        }
        .priceCard.featured:hover {
          border-color: rgba(212, 175, 55, 0.7);
          box-shadow: 0 28px 70px rgba(212, 175, 55, 0.2);
        }
        .badge {
          position: absolute;
          top: 16px;
          right: 16px;
          font-size: 10px;
          font-weight: 900;
          letter-spacing: 0.4px;
          text-transform: uppercase;
          padding: 6px 10px;
          border-radius: 999px;
          background: linear-gradient(135deg, var(--gold), var(--gold2));
          color: #0b0b0f;
        }
        .priceCard h4 {
          margin: 0 0 8px;
          font-size: 18px;
          font-weight: 800;
        }
        .price {
          font-size: 32px;
          font-weight: 900;
          letter-spacing: -0.5px;
          display: flex;
          align-items: baseline;
          gap: 8px;
          flex-wrap: wrap;
          color: var(--text);
        }
        .priceCard.featured h4,
        .priceCard.featured .price {
          color: var(--gold2);
          text-shadow: 0 8px 24px rgba(212, 175, 55, 0.25);
        }
        .pricePerMonth {
          font-size: 13px;
          font-weight: 500;
          color: var(--muted);
        }
        .small {
          color: var(--muted);
          font-size: 12.5px;
          margin-top: 6px;
          line-height: 1.4;
        }
        .small--tight {
          margin: 10px 4px 0;
        }
        .priceCard ul {
          margin: 14px 0 0;
          padding: 0;
          list-style: none;
          display: grid;
          gap: 10px;
          flex: 1;
        }
        .priceCard li {
          color: var(--muted);
          font-size: 13px;
          display: flex;
          gap: 10px;
          align-items: flex-start;
        }
        .priceCta {
          margin-top: auto;
          padding-top: 16px;
        }
        .mini {
          width: 20px;
          height: 20px;
          border-radius: 6px;
          background: rgba(37, 211, 102, 0.15);
          border: 1px solid rgba(37, 211, 102, 0.3);
          display: grid;
          place-items: center;
          color: #25D366;
          font-weight: 900;
          font-size: 12px;
          flex: 0 0 auto;
        }

        .carousel-container {
          position: relative;
          border-radius: 22px;
          overflow: hidden;
          background: rgba(255, 255, 255, 0.02);
        }
        .carousel-image {
          width: 100%;
          aspect-ratio: 4/3;
          position: relative;
          overflow: hidden;
        }
        .carousel-item {
          position: absolute;
          inset: 0;
          opacity: 0;
          transform: translateX(100%);
          transition: all 0.6s ease-in-out;
        }
        .carousel-item.active {
          opacity: 1;
          transform: translateX(0);
        }
        .carousel-item.prev {
          transform: translateX(-100%);
          opacity: 0;
        }
        .carousel-img {
          object-fit: cover;
        }
        .carousel-nav {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          width: 100%;
          display: flex;
          justify-content: space-between;
          padding: 0 16px;
          pointer-events: none;
        }
        .carousel-nav-btn {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          border: none;
          background: rgba(212, 175, 55, 0.9);
          color: white;
          font-size: 18px;
          font-weight: bold;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          pointer-events: all;
          transition: all 0.2s ease;
          opacity: 0.7;
        }
        .carousel-nav-btn:hover {
          opacity: 1;
          transform: scale(1.1);
          background: var(--gold2);
        }

        .proofGrid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 16px;
          align-items: stretch;
          justify-items: center;
        }
        .proofGrid .panel {
          width: 100%;
          max-width: 720px;
        }
        .bioCard {
          border: 1px solid rgba(255, 255, 255, 0.04);
          border-radius: 26px;
          background: linear-gradient(
            180deg,
            rgba(255, 255, 255, 0.04),
            rgba(255, 255, 255, 0.01)
          );
          padding: 24px;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.35);
        }
        .bioGrid {
          display: grid;
          grid-template-columns: 1.3fr 0.7fr;
          gap: 24px;
          align-items: center;
        }
        .bioContent {
          text-align: left;
          max-width: 60ch;
        }
        .bioHeader {
          display: grid;
          gap: 10px;
          margin-bottom: 14px;
        }
        .bioBadge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 8px 14px;
          border-radius: 999px;
          border: 1px solid rgba(255, 255, 255, 0.12);
          background: rgba(255, 255, 255, 0.03);
          color: var(--muted);
          font-size: 13px;
          font-weight: 600;
          letter-spacing: 0.2px;
          width: fit-content;
        }
        .bioTitle {
          margin: 0;
          font-size: clamp(34px, 4vw, 46px);
          line-height: 1.1;
          letter-spacing: -0.6px;
          font-weight: 800;
        }
        .bioLead {
          margin: 0;
          color: var(--muted);
          max-width: 60ch;
          font-size: clamp(16px, 1.6vw, 18px);
          line-height: 1.6;
        }
        .bioAside {
          display: grid;
          gap: 12px;
        }
        .bioQuote {
          color: var(--text);
          font-weight: 900;
          font-size: 14.5px;
          letter-spacing: 0.2px;
        }
        .bioContent p {
          color: var(--muted);
          margin: 0 0 12px;
          line-height: 1.7;
        }
        .bioContent p:last-child {
          margin-bottom: 0;
        }
        .bioPhoto {
          border-radius: 22px;
          overflow: hidden;
          border: 1px solid rgba(212, 175, 55, 0.22);
          box-shadow: 0 24px 60px rgba(212, 175, 55, 0.1);
        }
        .bioPhoto img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }
        .bioChips {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
        }
        .imgCard {
          border-radius: var(--radius2);
          overflow: hidden;
          border: 1px solid var(--line);
          background: rgba(255, 255, 255, 0.02);
        }
        .imgCard img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .quote {
          padding: 18px;
        }
        .quote p {
          color: var(--muted);
          margin: 0;
        }
        .quote .who {
          margin-top: 12px;
          color: var(--text);
          font-weight: 900;
        }

        .ba {
          position: relative;
          height: 420px;
          border-radius: var(--radius2);
          overflow: hidden;
          border: 1px solid var(--line);
          background: #0b0b0f;
        }
        .ba img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .ba .after {
          clip-path: inset(0 50% 0 0);
        }
        .ba .handle {
          position: absolute;
          top: 0;
          bottom: 0;
          left: 50%;
          width: 2px;
          background: rgba(242, 209, 107, 0.85);
          box-shadow: 0 0 0 6px rgba(212, 175, 55, 0.18);
        }
        .ba .knob {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 44px;
          height: 44px;
          border-radius: 99px;
          background: rgba(7, 7, 10, 0.82);
          border: 1px solid rgba(242, 209, 107, 0.55);
          display: grid;
          place-items: center;
          color: var(--gold2);
          font-weight: 1000;
        }
        .ba .label {
          position: absolute;
          top: 14px;
          padding: 8px 12px;
          border-radius: 999px;
          background: rgba(7, 7, 10, 0.72);
          border: 1px solid var(--line);
          color: var(--muted);
          font-size: 12px;
          font-weight: 900;
        }
        .ba .label.left {
          left: 14px;
        }
        .ba .label.right {
          right: 14px;
        }
        input[type="range"] {
          width: 100%;
        }

        .faq {
          display: grid;
          gap: 12px;
        }
        details {
          border: 1px solid var(--line);
          background: rgba(255, 255, 255, 0.02);
          border-radius: 18px;
          overflow: hidden;
          transition: border-color 0.2s ease, background 0.2s ease;
        }
        details:hover {
          border-color: rgba(255, 255, 255, 0.15);
        }
        details[open] {
          border-color: rgba(212, 175, 55, 0.3);
          background: rgba(212, 175, 55, 0.03);
        }
        summary {
          cursor: pointer;
          font-weight: 800;
          font-size: 16px;
          padding: 18px 20px;
          list-style: none;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 12px;
          user-select: none;
        }
        summary::-webkit-details-marker {
          display: none;
        }
        summary::after {
          content: '+';
          font-size: 20px;
          font-weight: 400;
          color: var(--gold);
          transition: transform 0.2s ease;
        }
        details[open] summary::after {
          transform: rotate(45deg);
        }
        details p {
          color: var(--muted);
          margin: 0;
          padding: 0 20px 18px;
          line-height: 1.6;
        }

        .footer {
          padding: 40px 0 100px;
          border-top: 1px solid var(--line);
          color: var(--muted);
        }
        .footerRow {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 18px;
        }
        .footerBrand {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .footerBrandName {
          font-weight: 950;
          color: var(--text);
        }
        .footerBrandMeta {
          font-size: 12.5px;
        }
        .footerCopyright {
          font-size: 12.5px;
          order: 2;
        }
        .footerRow .btn-instagram {
          order: 3;
        }
        .sticky {
          position: fixed;
          left: 0;
          right: 0;
          bottom: 0;
          z-index: 60;
          background: rgba(7, 7, 10, 0.85);
          border-top: 1px solid var(--line);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
        }
        .sticky .in {
          display: flex;
          gap: 12px;
          align-items: center;
          justify-content: space-between;
          padding: 14px 0;
        }
        .sticky .miniText {
          color: var(--muted);
          font-size: 12.5px;
        }
        .stickyTitle {
          font-weight: 950;
        }
        .sticky .ctaRow {
          display: flex;
          gap: 12px;
          align-items: center;
        }
        .sticky .btn-whatsapp {
          order: 1;
        }
        .sticky .btn-ghost {
          order: 2;
        }
        .sticky .btn-instagram {
          order: 3;
        }

        /* Tablet landscape */
        @media (max-width: 1200px) {
          .wrap {
            padding: 0 24px;
          }
          .heroImageCenter {
            max-width: 450px;
          }
          .h1 {
            font-size: clamp(32px, 4.5vw, 52px);
          }
          .accent {
            font-size: clamp(36px, 5vw, 58px);
          }
        }

        @media (min-width: 1024px) {
          .methodGrid {
            grid-template-columns: repeat(12, minmax(0, 1fr));
            gap: 56px;
          }
          .methodIntro {
            grid-column: span 5;
          }
          .methodPhoto {
            grid-column: span 7;
            aspect-ratio: 3 / 4;
            min-height: 620px;
            transform: translateY(-24px);
          }
        }

        @media (min-width: 1280px) {
          .methodPhoto {
            aspect-ratio: 4 / 5;
            min-height: 680px;
          }
        }

        /* Tablet portrait */
        @media (max-width: 980px) {
          .wrap {
            padding: 0 20px;
          }
          .heroImageCenter {
            max-width: 400px;
            margin: 24px auto;
          }
          .h1 {
            font-size: clamp(28px, 6vw, 42px);
          }
          .heroHighlight {
            display: inline;
          }
          .accent {
            display: inline;
            font-size: clamp(32px, 7vw, 48px);
          }
          .sub {
            font-size: 16px;
            margin: 0 auto;
          }
          .heroEmphasis {
            justify-items: center;
          }
          .heroContent {
            text-align: center;
          }
          .heroCta {
            justify-content: center;
          }
          .kpiRow {
            grid-template-columns: repeat(3, 1fr);
            gap: 8px;
          }
          .kpi {
            padding: 12px 8px;
          }
          .kpi .n {
            font-size: 16px;
          }
          .kpi .l {
            font-size: 11px;
          }
          .credRow {
            justify-content: center;
          }
          .grid2 {
            grid-template-columns: 1fr;
            gap: 16px;
          }
          .steps {
            grid-template-columns: 1fr 1fr;
            gap: 12px;
          }
          .consultancySplit {
            grid-template-columns: 1fr;
          }
          .consultancyMeta {
            font-size: 11.5px;
          }
          .prices {
            grid-template-columns: 1fr 1fr;
            gap: 10px;
          }
          .proofGrid {
            grid-template-columns: 1fr;
            gap: 20px;
          }
          .bioGrid {
            grid-template-columns: 1fr;
          }
          .bioPhoto {
            max-width: 420px;
            justify-self: center;
          }
          .carousel-nav {
            padding: 0 12px;
          }
          .carousel-nav-btn {
            width: 36px;
            height: 36px;
            font-size: 16px;
          }
          .navlinks {
            display: none;
          }
          .nav {
            flex-wrap: wrap;
            justify-content: center;
          }
          .brand {
            flex: 1 1 100%;
            justify-content: center;
            text-align: center;
          }
          .navActions {
            width: 100%;
            justify-content: center;
            flex-wrap: wrap;
          }
          .navActions .btn {
            flex: 1 1 180px;
          }
          .methodHighlights {
            grid-template-columns: 1fr;
          }
          .methodGrid {
            grid-template-columns: 1fr;
          }
          .methodPhoto {
            max-width: 520px;
            justify-self: center;
          }
          .exampleGrid {
            grid-template-columns: 1fr 1fr;
          }
          .exampleMedia {
            grid-template-columns: 1fr;
          }
          .brandLogoWrap img {
            width: 100%;
            height: 100%;
          }
          .brandLogoWrap--small img {
            width: 100%;
            height: 100%;
          }
          .brand .t1 {
            font-size: 14px;
          }
          .brand .t2 {
            font-size: 11px;
          }
          .sectionTitle {
            gap: 12px;
          }
          .sectionTitle--center {
            align-items: center;
            text-align: center;
          }
          .sectionTitle h2 {
            font-size: 24px;
          }
          .toggleRow {
            flex-direction: column;
            gap: 12px;
            align-items: stretch;
          }
          .toggle {
            width: 100%;
            justify-content: center;
          }
          .sticky .in {
            flex-direction: column;
            align-items: stretch;
            text-align: center;
          }
          .sticky .ctaRow {
            flex-direction: column;
          }
          .sticky .ctaRow .btn {
            width: 100%;
          }
          .faq details summary {
            font-size: 15px;
          }
          .panel {
            padding: 16px;
          }
          .methodIntro {
            padding: 20px;
          }
          .methodPhoto {
            min-height: 320px;
            aspect-ratio: 4 / 5;
          }
        }

        /* Mobile large */
        @media (max-width: 768px) {
          .wrap {
            padding: 0 16px;
          }
          .hero {
            padding: 40px 0 24px;
          }
          .heroImageCenter {
            max-width: 350px;
          }
          .brandLogoWrap {
            width: 76px;
            height: 76px;
            padding: 8px;
          }
          .brand .t1,
          .brand .t2 {
            display: none;
          }
          .brand {
            gap: 0;
          }
          .h1 {
            font-size: clamp(26px, 7vw, 36px);
            line-height: 1.1;
          }
          .accent {
            font-size: clamp(28px, 8vw, 40px);
          }
          .sub {
            font-size: 15px;
          }
          .kpiRow {
            grid-template-columns: 1fr;
            gap: 8px;
          }
          .kpi {
            padding: 14px 12px;
            display: flex;
            align-items: center;
            justify-content: space-between;
          }
          .kpi .n {
            font-size: 18px;
          }
          .kpi .l {
            font-size: 12px;
            margin-top: 0;
          }
          .steps {
            grid-template-columns: 1fr;
          }
          .step {
            padding: 16px;
          }
          .consultancySplit {
            grid-template-columns: 1fr;
          }
          .consultancyCard {
            padding: 16px;
          }
          .consultancySteps li {
            padding: 10px 10px 10px 8px;
          }
          .stepIndex {
            width: 20px;
            height: 20px;
            font-size: 10px;
            line-height: 1;
          }
          .prices {
            grid-template-columns: 1fr;
          }
          .priceCard {
            padding: 14px;
          }
          .price {
            font-size: 24px;
          }
          .pricePerMonth {
            font-size: 12px;
          }
          .exampleGrid {
            grid-template-columns: 1fr;
          }
          .btn {
            padding: 14px 18px;
            font-size: 14px;
          }
          .btn-whatsapp svg {
            width: 16px;
            height: 16px;
          }
          .topbar {
            padding: 10px 0;
          }
          .nav {
            gap: 10px;
          }
          .brand {
            gap: 10px;
          }
          .heroCard {
            padding: 12px;
          }
          .heroCardInner {
            padding: 12px;
          }
          .footer {
            padding: 30px 0;
          }
        }

        /* Mobile small */
        @media (max-width: 520px) {
          .wrap {
            padding: 0 14px;
          }
          .brandLogoWrap {
            width: 72px;
            height: 72px;
            padding: 6px;
            border-radius: 10px;
          }
          .brandLogoWrap img {
            width: 100%;
            height: 100%;
          }
          .brandLogoWrap--small img {
            width: 100%;
            height: 100%;
          }
          .brand .t1 {
            display: none;
          }
          .brand .t2 {
            display: none;
          }
          .brand {
            gap: 0;
          }
          .navActions {
            gap: 8px;
          }
          .navActions .btn {
            width: 100%;
          }
          .h1 {
            font-size: clamp(24px, 8vw, 32px);
          }
          .accent {
            font-size: clamp(26px, 9vw, 36px);
          }
          .heroImg img {
            height: 280px;
          }
          .chip {
            font-size: 11px;
            padding: 6px 10px;
          }
          .sectionTitle h2 {
            font-size: 20px;
          }
          .ssc-page {
            padding-bottom: 120px;
          }
          .sectionTitle p {
            font-size: 13px;
          }
          .consultancyMeta {
            font-size: 11px;
          }
          .panel h3 {
            font-size: 16px;
          }
          .panel p {
            font-size: 13px;
          }
          .list .li {
            font-size: 13px;
          }
          .tick {
            width: 20px;
            height: 20px;
            font-size: 12px;
          }
          .priceCard h4 {
            font-size: 14px;
          }
          .price {
            font-size: 22px;
          }
          .badge {
            font-size: 10px;
            padding: 5px 8px;
          }
          .btn {
            padding: 12px 16px;
            font-size: 13px;
          }
          .sticky {
            padding: 10px 0;
          }
          .sticky .in > div:first-child {
            display: none;
          }
          .sticky .ctaRow {
            width: 100%;
          }
          .carousel-image {
            aspect-ratio: 1/1;
          }
          .carousel-nav-btn {
            width: 32px;
            height: 32px;
            font-size: 14px;
          }
          .faq details summary {
            font-size: 14px;
            padding: 14px;
          }
          .faq details p {
            font-size: 13px;
            padding: 0 14px 14px;
          }
          .footer {
            text-align: center;
          }
          .footer > .wrap > div {
            flex-direction: column;
            gap: 16px;
          }
        }

        /* Extra small devices */
        @media (max-width: 380px) {
          .wrap {
            padding: 0 12px;
          }
          .h1 {
            font-size: 22px;
          }
          .accent {
            font-size: 24px;
          }
          .sectionTitle h2 {
            font-size: 18px;
          }
          .btn {
            padding: 10px 14px;
            font-size: 12px;
          }
          .kpi .n {
            font-size: 16px;
          }
          .price {
            font-size: 20px;
          }
        }
      `}</style>
    </div>
  );
}




























