import { Link } from "react-router-dom";
import { ArrowLeft, Mail, Phone, Globe } from "lucide-react";
import logo from "@/assets/neflixy-logo.png";

const sections = [
  {
    title: "1. What information do we process?",
    body: (
      <>
        <p>
          When using the PriceLab website and submitting the quote request form, we may process the
          following information:
        </p>
        <ul>
          <li>name;</li>
          <li>phone number;</li>
          <li>email address;</li>
          <li>message text;</li>
          <li>selected website type;</li>
          <li>selected package;</li>
          <li>estimated calculated price;</li>
          <li>selected additional features;</li>
          <li>any other information voluntarily provided by the user in the quote request form.</li>
        </ul>
        <p>We do not intentionally request or collect sensitive personal data.</p>
      </>
    ),
  },
  {
    title: "2. Why do we use this data?",
    body: (
      <>
        <p>Personal data is used for the following purposes:</p>
        <ul>
          <li>to prepare a website development offer;</li>
          <li>to contact the client;</li>
          <li>to respond to requests;</li>
          <li>to understand what type of website or service the client needs;</li>
          <li>to improve the website and user experience;</li>
          <li>to analyze website traffic and user interest.</li>
        </ul>
      </>
    ),
  },
  {
    title: "3. Legal basis for processing",
    body: (
      <>
        <p>Personal data is processed based on:</p>
        <ul>
          <li>the user's consent when submitting the quote request form;</li>
          <li>legitimate interest in responding to client requests and improving our services;</li>
          <li>the need to take steps before a possible cooperation or agreement.</li>
        </ul>
      </>
    ),
  },
  {
    title: "4. Where is the data sent?",
    body: (
      <>
        <p>
          When the quote request form is submitted, the data may be sent to a Neflixy team Telegram
          account or chat so that we can quickly receive and process the request.
        </p>
        <p>
          The data may also be stored in a database connected to the website or its technical
          solution in order to keep request history and respond to the client.
        </p>
        <p>We do not sell personal data to third parties.</p>
      </>
    ),
  },
  {
    title: "5. Data retention period",
    body: (
      <>
        <p>
          Quote requests are stored for up to 6 months from the moment they are received, unless
          longer storage is necessary for continued cooperation, dispute resolution, or compliance
          with legal obligations.
        </p>
        <p>After this period, the data is deleted or anonymized.</p>
      </>
    ),
  },
  {
    title: "6. Google Analytics",
    body: (
      <>
        <p>
          The website may use Google Analytics to analyze traffic, user behavior, and website
          performance.
        </p>
        <p>
          Google Analytics may use cookies and similar technologies to collect statistical
          information about website usage.
        </p>
        <p>Google Analytics data is used only for analytics purposes, such as understanding:</p>
        <ul>
          <li>how many people visit the website;</li>
          <li>which sections are used the most;</li>
          <li>how to improve website content and structure.</li>
        </ul>
        <p>Google Analytics is not used to directly identify a specific person.</p>
      </>
    ),
  },
  {
    title: "7. Google Maps",
    body: (
      <>
        <p>
          The website may use an embedded Google Maps solution to display a location or help the
          user find a related business or service provider.
        </p>
        <p>
          When using Google Maps, Google may process certain technical information, such as device,
          browser, or location data, according to Google's own privacy policy.
        </p>
      </>
    ),
  },
  {
    title: "8. Cookies",
    body: (
      <>
        <p>The website may use cookies.</p>
        <p>
          Cookies are small files stored on the user's device to help the website function properly,
          improve user experience, and analyze website traffic.
        </p>
        <p>The website may use the following cookie categories:</p>
        <p>
          <strong>Necessary cookies:</strong> These ensure basic website functionality and security.
          Without them, the website may not work correctly.
        </p>
        <p>
          <strong>Analytics cookies:</strong> These help us understand how users use the website,
          for example through Google Analytics.
        </p>
        <p>
          <strong>Third-party cookies:</strong> These may be used when Google Maps or other external
          services are loaded on the website.
        </p>
        <p>
          When visiting the website, the user is shown a cookie notice where they can accept or
          reject analytics and third-party cookies.
        </p>
      </>
    ),
  },
  {
    title: "9. Data security",
    body: (
      <>
        <p>
          We take reasonable technical and organizational measures to protect personal data from
          unauthorized access, loss, disclosure, or misuse.
        </p>
        <p>
          However, please note that data transmission over the internet can never be guaranteed to
          be completely secure.
        </p>
      </>
    ),
  },
  {
    title: "10. Who has access to the data?",
    body: (
      <>
        <p>
          Personal data may be accessed only by Neflixy team members who need the information to
          process the client's request and prepare an offer.
        </p>
        <p>
          For technical reasons, certain information may also be processed by service providers used
          by the website, such as hosting, database, Telegram, Google Analytics, or Google Maps
          service providers.
        </p>
      </>
    ),
  },
  {
    title: "11. User rights",
    body: (
      <>
        <p>The user has the right to:</p>
        <ul>
          <li>request information about the processing of their personal data;</li>
          <li>request access to their personal data;</li>
          <li>request correction of inaccurate data;</li>
          <li>request deletion of their data;</li>
          <li>withdraw consent to data processing;</li>
          <li>object to certain types of data processing;</li>
          <li>request restriction of data processing.</li>
        </ul>
        <p>
          To exercise these rights, the user can contact us at:{" "}
          <a href="mailto:neflixyteam@gmail.com" className="text-primary hover:underline">
            neflixyteam@gmail.com
          </a>
        </p>
      </>
    ),
  },
  {
    title: "12. Complaints",
    body: (
      <p>
        If the user believes that their personal data is being processed unlawfully, they have the
        right to contact the Data State Inspectorate of Latvia.
      </p>
    ),
  },
  {
    title: "13. Changes to this Privacy Policy",
    body: (
      <>
        <p>
          We may update this Privacy Policy from time to time to reflect website functionality,
          services used, or legal requirements.
        </p>
        <p>The current version of the Privacy Policy will always be available on this website.</p>
      </>
    ),
  },
];

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-gradient-surface">
      {/* Decorative gradient blobs */}
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-0 overflow-hidden">
        <div className="mx-auto h-72 max-w-5xl blur-3xl opacity-40 bg-gradient-brand rounded-full" />
      </div>

      <header className="relative z-10 border-b border-border/60">
        <div className="container max-w-4xl flex items-center justify-between py-5">
          <Link to="/" className="flex items-center gap-3 group">
            <img
              src={logo}
              alt="PriceLab by Neflixy logo"
              className="h-10 w-10 rounded-xl shadow-brand transition-transform group-hover:scale-105"
            />
            <div className="leading-tight">
              <div className="font-semibold tracking-tight">PriceLab</div>
              <div className="text-xs text-muted-foreground">by Neflixy</div>
            </div>
          </Link>
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Link>
        </div>
      </header>

      <main className="relative z-10 container max-w-4xl py-12 sm:py-16">
        <div className="mb-10">
          <span className="inline-flex items-center rounded-full border border-border bg-card/60 px-3 py-1 text-xs text-muted-foreground">
            Last updated: 28.04.2026
          </span>
          <h1 className="mt-4 text-4xl sm:text-5xl font-bold tracking-tight">
            Privacy <span className="text-gradient-brand">Policy</span>
          </h1>
          <p className="mt-4 text-muted-foreground max-w-2xl">
            This Privacy Policy explains how PriceLab by Neflixy processes personal data of website
            visitors and potential clients.
          </p>
        </div>

        {/* Info card */}
        <section className="grid gap-3 sm:grid-cols-2 mb-12">
          <div className="rounded-2xl border border-border bg-card/60 p-5 shadow-soft">
            <div className="text-xs uppercase tracking-wider text-muted-foreground mb-2">
              Service
            </div>
            <div className="font-medium">PriceLab by Neflixy</div>
            <div className="mt-3 flex items-center gap-2 text-sm text-muted-foreground">
              <Globe className="h-4 w-4" />
              <a
                href="https://pricelab-neflixy.vercel.app"
                target="_blank"
                rel="noreferrer"
                className="hover:text-foreground transition-colors break-all"
              >
                pricelab-neflixy.vercel.app
              </a>
            </div>
          </div>
          <div className="rounded-2xl border border-border bg-card/60 p-5 shadow-soft">
            <div className="text-xs uppercase tracking-wider text-muted-foreground mb-2">
              Data controller
            </div>
            <div className="font-medium">Neflixy</div>
            <div className="mt-3 space-y-1.5 text-sm text-muted-foreground">
              <a
                href="mailto:neflixyteam@gmail.com"
                className="flex items-center gap-2 hover:text-foreground transition-colors"
              >
                <Mail className="h-4 w-4" /> neflixyteam@gmail.com
              </a>
              <a
                href="tel:+37125610853"
                className="flex items-center gap-2 hover:text-foreground transition-colors"
              >
                <Phone className="h-4 w-4" /> +371 25 610 853
              </a>
              <a
                href="tel:+37126212014"
                className="flex items-center gap-2 hover:text-foreground transition-colors"
              >
                <Phone className="h-4 w-4" /> +371 26 212 014
              </a>
            </div>
          </div>
        </section>

        <article className="space-y-8">
          {sections.map((s) => (
            <section
              key={s.title}
              className="rounded-2xl border border-border bg-card/40 p-6 sm:p-8 shadow-soft"
            >
              <h2 className="text-xl sm:text-2xl font-semibold tracking-tight mb-4">
                {s.title}
              </h2>
              <div className="prose prose-invert prose-sm sm:prose-base max-w-none text-muted-foreground prose-p:my-2 prose-ul:my-2 prose-li:my-0.5 prose-strong:text-foreground">
                {s.body}
              </div>
            </section>
          ))}
        </article>

        <footer className="mt-16 pt-8 border-t border-border/60 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} Neflixy · PriceLab
        </footer>
      </main>
    </div>
  );
};

export default PrivacyPolicy;
