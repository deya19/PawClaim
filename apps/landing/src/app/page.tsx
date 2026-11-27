import { WaitlistForm } from "../components/WaitlistForm";
import { BRAND_NAME, strings } from "../strings";

const WAITLIST_ID = "waitlist";

function Header() {
  return (
    <header className="site-header">
      <a className="skip-link" href="#main">
        {strings.nav.skipToContent}
      </a>
      <div className="container header-row">
        <span className="brand">{BRAND_NAME}</span>
        <a className="header-link" href={`#${WAITLIST_ID}`}>
          {strings.nav.joinWaitlist}
        </a>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-heading">
      <div className="container">
        <p className="eyebrow">{strings.hero.eyebrow}</p>
        <h1 id="hero-heading">{strings.hero.headline}</h1>
        <p className="lead">{strings.hero.subhead}</p>
        <a className="button" href={`#${WAITLIST_ID}`}>
          {strings.hero.cta}
        </a>
      </div>
    </section>
  );
}

function HowItWorks() {
  return (
    <section className="section" aria-labelledby="how-heading">
      <div className="container">
        <h2 id="how-heading">{strings.howItWorks.heading}</h2>
        <ol className="steps">
          {strings.howItWorks.steps.map((step) => (
            <li key={step.title} className="card">
              <h3>{step.title}</h3>
              <p>{step.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function Audience() {
  return (
    <section className="section section-alt" aria-labelledby="audience-heading">
      <div className="container">
        <h2 id="audience-heading">{strings.audience.heading}</h2>
        <ul className="checklist">
          {strings.audience.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Faq() {
  return (
    <section className="section" aria-labelledby="faq-heading">
      <div className="container">
        <h2 id="faq-heading">{strings.faq.heading}</h2>
        <div className="faq">
          {strings.faq.items.map((item) => (
            <details key={item.question}>
              <summary>{item.question}</summary>
              <p>{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

function Waitlist() {
  return (
    <section id={WAITLIST_ID} className="section section-alt" aria-labelledby="waitlist-heading">
      <div className="container narrow">
        <h2 id="waitlist-heading">{strings.waitlist.heading}</h2>
        <p>{strings.waitlist.intro}</p>
        <WaitlistForm />
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <p>{strings.footer.disclaimer}</p>
        <p>{strings.footer.copyright}</p>
      </div>
    </footer>
  );
}

export default function HomePage() {
  return (
    <>
      <Header />
      <main id="main">
        <Hero />
        <HowItWorks />
        <Audience />
        <Faq />
        <Waitlist />
      </main>
      <Footer />
    </>
  );
}
