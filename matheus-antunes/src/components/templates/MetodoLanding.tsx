import Image from "next/image";
import styles from "./MetodoLanding.module.css";

export default function MetodoLanding() {
  return (
    <section className={styles.landing} aria-label="Fundamentos do Metodo">
      <div className={`${styles.section} ${styles.hero}`} id="metodo">
        <div className={styles.container}>
          <div className={styles.hero__grid}>
            <div className={styles.hero__copy}>
              <span className={styles.badge}>
                Consultoria nutricional premium - online e presencial
              </span>
              <h1 className={styles.title}>
                Fundamentos do Metodo Shape Sob Controle
              </h1>
              <p className={styles.lead}>
                O Metodo Shape Sob Controle foi criado para pessoas que precisam de
                resultado real dentro de uma rotina real.
              </p>
              <p className={styles.heroNote}>
                Agende uma avaliacao e entenda se o metodo e ideal para sua rotina.
              </p>
              <div className={styles.actions}>
                <a className={`${styles.btn} ${styles["btn--primary"]}`} href="#problema-real">
                  Quero entender o metodo
                </a>
                <a className={`${styles.btn} ${styles["btn--secondary"]}`} href="#como-funciona">
                  Ver como funciona
                </a>
              </div>
            </div>
            <div className={styles.hero__media}>
              <div className={styles.media}>
                <Image
                  src="/ssc-assets/15.jpeg"
                  alt="Matheus Antunes em competicao"
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className={styles.mediaImage}
                />
                <div className={styles.media__overlay} />
                <div className={styles.media__quote}>
                  &quot;Estrategia antes de motivacao.&quot;
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.section} id="problema-real">
        <div className={styles.container}>
          <div className={`${styles.grid} ${styles.problem}`}>
            <div>
              <p className={styles.eyebrow}>O problema real</p>
              <h2 className={styles.subtitle}>
                Ele nao foi pensado para cenarios ideais, semanas perfeitas ou vidas
                sem imprevistos.
              </h2>
              <p className={styles.text}>
                O foco do metodo nao e perfeicao alimentar, e sim controle estrategico.
              </p>
              <p className={styles.text}>
                Controle significa saber o que esta fazendo, entender por que esta fazendo
                e conseguir ajustar quando algo sai do planejado.
              </p>
            </div>
            <div className={styles.card}>
              <p className={styles.card__title}>A virada de chave</p>
              <p className={styles.card__text}>
                Resultados fisicos consistentes nao vem de semanas perfeitas, mas
                de meses bem conduzidos.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.section} id="como-funciona">
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <p className={styles.eyebrow}>Como funciona</p>
            <h2 className={styles.subtitle}>Processo claro, sem enrolacao.</h2>
          </div>
          <div className={`${styles.grid} ${styles.cards}`}>
            <div className={styles.card}>
              <h3 className={styles.card__title}>Processos simples</h3>
              <p className={styles.card__text}>
                Por isso, o metodo prioriza processos simples, repetiveis e sustentaveis.
              </p>
            </div>
            <div className={styles.card}>
              <h3 className={styles.card__title}>Medio e longo prazo</h3>
              <p className={styles.card__text}>
                Que podem ser mantidos no medio e longo prazo.
              </p>
            </div>
            <div className={styles.card}>
              <h3 className={styles.card__title}>Organizacao e estrutura</h3>
              <p className={styles.card__text}>
                Aqui, organizacao vem antes de motivacao. Estrutura vem antes de
                forca de vontade.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.section}>
        <div className={styles.container}>
          <div className={`${styles.grid} ${styles.lists}`}>
            <div className={styles.card}>
              <h3 className={styles.card__title}>Para quem e</h3>
              <ul className={styles.list}>
                <li>Esse metodo e para quem quer controle e consistencia.</li>
                <li>Para quem precisa de resultado real dentro de uma rotina real.</li>
              </ul>
            </div>
            <div className={styles.card}>
              <h3 className={styles.card__title}>Nao e para</h3>
              <ul className={styles.list}>
                <li>Nao e para quem busca milagre, dieta extrema ou resultado em 7 dias.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className={`${styles.section} ${styles.cta}`} id="cta-final">
        <div className={styles.container}>
          <div className={styles.cta__box}>
            <div>
              <h2 className={styles.subtitle}>
                Quer assumir o controle do seu shape?
              </h2>
              <p className={styles.text}>
                Se a ideia de um plano estrategico faz sentido, o proximo passo e
                conversar e entender se o metodo faz sentido para voce.
              </p>
            </div>
            <a className={`${styles.btn} ${styles["btn--primary"]}`} href="#planos">
              Quero comecar agora
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
