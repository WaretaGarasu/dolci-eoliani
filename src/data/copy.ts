export const COPY = {
  a11y: {
    skipToContent: 'Vai al contenuto',
    openMenu: 'Apri menu',
    closeMenu: 'Chiudi menu',
    scrollToTop: 'Torna su',
  },
  nav: {
    exploreCta: 'I nostri dolci',
    orderCta: 'Ordina',
  },
  footer: {
    privacy: 'Informativa privacy',
    developerPrefix: 'Sito realizzato da',
    developerName: 'WaretaGarasu',
  },
  hero: {
    eyebrow: 'Pasticceria artigianale delle Isole Eolie',
    titleLine1: "L'Arte della",
    titleLine2: 'Pasticceria Eoliana',
    subtitle:
      "Passione, territorio e artigianalità siciliana in ogni creazione. Specialità eoliane preparate a mano: ordini e spedizioni in tutta Italia su richiesta.",
    orderCta: 'Come ordinare',
    cta: 'Scopri i dolci',
  },
  tradition: {
    label: 'La nostra storia',
    title: "Dolci nati dalla passione di un'unica mano",
    body: 'Specialità eoliane autentiche e creazioni che raccontano amore per la pasticceria. Ingredienti scelti: Malvasia, mandorle e agrumi delle Eolie. Contattaci per ordini e spedizioni: portiamo i sapori dell\'arcipelago fino a casa tua.',
  },
  ordering: {
    title: 'Come ordinare',
    subtitle:
      'Tre passi semplici per portare i sapori delle Eolie a casa tua. Per domande specifiche scrivici su WhatsApp.',
    steps: [
      {
        title: 'Scegli i dolci',
        body: 'Esplora la collezione e apri la scheda di ogni specialità per ingredienti e tradizione.',
      },
      {
        title: 'Scrivici su WhatsApp',
        body: 'Indicaci quantità, preferenze e data desiderata: ti rispondiamo con disponibilità e modalità di pagamento.',
      },
      {
        title: 'Ricevi in tutta Italia',
        body: 'Prepariamo con cura e spediamo i dolci con imballaggio adatto al trasporto.',
      },
    ],
  },
  faq: {
    title: 'Domande frequenti',
    subtitle: 'Ordini, spedizioni e personalizzazioni',
    items: [
      {
        id: 'zone',
        question: 'Spedite in tutta Italia?',
        answer: [
          {
            type: 'text',
            value:
              'Sì, organizziamo spedizioni su tutto il territorio nazionale. Scrivici su WhatsApp con il tuo CAP per confermare tempi e costi.',
          },
        ],
      },
      {
        id: 'tempi',
        question: 'Quali sono i tempi di preparazione?',
        answer: [
          {
            type: 'text',
            value:
              "I tempi dipendono dal tipo di dolce e dalla quantità. Ti comunichiamo una stima precisa in chat prima di confermare l'ordine.",
          },
        ],
      },
      {
        id: 'pagamento',
        question: 'Come si paga?',
        answer: [
          {
            type: 'text',
            value:
              "Le modalità di pagamento ti vengono indicate in chat al momento della conferma dell'ordine.",
          },
        ],
      },
    ],
  },
  products: {
    title: 'I nostri dolci',
    subtitle: 'Specialità eoliane preparate a mano',
    discoverMore: 'Scheda prodotto',
    featuredLabel: 'In evidenza',
  },
  contact: {
    title: 'Ordini e spedizioni',
    intro: 'Ordini personalizzati e spedizioni in tutta Italia. Scegli il canale che preferisci.',
    whatsappCta: 'Contatta su WhatsApp',
    whatsappCtaHint: 'Risposta rapida — il modo più veloce per ordinare',
    channelsLabel: 'Telefono ed e-mail',
    whatsapp: {
      label: 'WhatsApp',
      hint: 'Risposta rapida per ordini e spedizioni',
      open: 'Apri chat',
    },
    email: {
      label: 'E-mail',
      hint: 'Risposta entro 48 ore lavorative',
      open: 'Invia e-mail',
    },
    facebook: 'Seguici su Facebook',
    form: {
      secondaryTitle: 'Oppure compila il modulo',
      whatsappLabel: 'Messaggio via WhatsApp',
      helper: 'Nome e messaggio: ti apriamo WhatsApp con il testo già pronto.',
      submit: 'Invia su WhatsApp',
      submitting: 'Apertura di WhatsApp…',
      validation: 'Compila tutti i campi',
    },
  },
  notFound: {
    eyebrow: 'Errore 404',
    title: 'Pagina non trovata',
    body: 'La pagina che cerchi non esiste o è stata spostata.',
    home: 'Torna alla home',
    whatsapp: 'Scrivici su WhatsApp',
  },
  modal: {
    orderWhatsApp: 'Ordina su WhatsApp',
    close: 'Chiudi',
  },
  privacy: {
    title: 'Informativa privacy',
    intro:
      'Informativa sul trattamento dei dati personali ai sensi del Regolamento UE 2016/679 (GDPR) e del D.Lgs. 196/2003 come modificato.',
    tocLabel: 'Indice',
    disclaimer:
      'Testo da verificare con consulente legale prima della pubblicazione.',
    updated: 'Ultimo aggiornamento: maggio 2026',
  },
} as const

export type PrivacySection = {
  id: string
  title: string
  paragraphs: string[]
}

export function getPrivacySections(
  site: { name: string; email: string; phone: string },
): PrivacySection[] {
  return [
    {
      id: 'privacy-titolare',
      title: 'Titolare del trattamento',
      paragraphs: [
        `Il titolare del trattamento dei dati personali è ${site.name}, raggiungibile all'indirizzo e-mail ${site.email} o al numero di telefono ${site.phone}.`,
      ],
    },
    {
      id: 'privacy-dati',
      title: 'Tipi di dati raccolti',
      paragraphs: [
        'Attraverso il modulo di contatto del sito possiamo raccogliere nome e contenuto del messaggio che scegli di inviarci.',
        'I dati vengono trasmessi tramite WhatsApp o e-mail solo quando avvii tu la conversazione (ad esempio cliccando «Invia su WhatsApp» o scrivendoci direttamente).',
        'Il sito può registrare dati tecnici di navigazione essenziali al funzionamento (ad esempio log del server o preferenze di accessibilità nel browser), senza profilazione commerciale.',
      ],
    },
    {
      id: 'privacy-finalita',
      title: 'Finalità e base giuridica',
      paragraphs: [
        'Trattiamo i dati per rispondere a richieste di informazioni, ordini personalizzati e spedizioni, e per gestire il rapporto con i clienti.',
        "La base giuridica è il tuo consenso espresso inviando il messaggio, l'esecuzione di misure precontrattuali su tua richiesta e, ove applicabile, il legittimo interesse del titolare a gestire le comunicazioni commerciali ricevute.",
      ],
    },
    {
      id: 'privacy-modalita',
      title: 'Modalità di trattamento',
      paragraphs: [
        'I dati sono trattati con strumenti informatici e telematici, nel rispetto delle misure di sicurezza adeguate.',
        'Per le comunicazioni via WhatsApp si applicano anche le condizioni del fornitore Meta Platforms; per l\'e-mail si applicano le policy del provider di posta utilizzato.',
        'Non vendiamo né cediamo i dati personali a terzi per finalità di marketing autonomo.',
      ],
    },
    {
      id: 'privacy-conservazione',
      title: 'Conservazione',
      paragraphs: [
        'Conserviamo i dati per il tempo necessario a evadere la richiesta e, ove previsto, per adempiere a obblighi fiscali o legali.',
        'Le conversazioni su WhatsApp e le e-mail possono essere conservate fino a 24 mesi dalla ultima interazione, salvo obblighi di legge diversi o tua richiesta di cancellazione anticipata.',
      ],
    },
    {
      id: 'privacy-diritti',
      title: "Diritti dell'interessato",
      paragraphs: [
        'Hai diritto di accesso, rettifica, cancellazione, limitazione, opposizione e portabilità dei dati, nei casi previsti dalla legge.',
        'Puoi revocare il consenso in qualsiasi momento senza pregiudicare la liceità del trattamento basato sul consenso prestato prima della revoca.',
        'Hai diritto di proporre reclamo al Garante per la protezione dei dati personali (www.garanteprivacy.it).',
        `Per esercitare i diritti scrivi a ${site.email} o contattaci su WhatsApp al ${site.phone}.`,
      ],
    },
    {
      id: 'privacy-cookie',
      title: 'Cookie e strumenti di analisi',
      paragraphs: [
        'Questo sito non utilizza cookie di profilazione o strumenti di analisi di terze parti (ad esempio Google Analytics).',
        'Possono essere utilizzati solo cookie tecnici o memorizzazioni locali strettamente necessarie al funzionamento e alla sicurezza del sito.',
      ],
    },
    {
      id: 'privacy-aggiornamenti',
      title: 'Aggiornamenti',
      paragraphs: [
        'Il titolare può aggiornare la presente informativa per adeguarla a modifiche normative o organizzative. La data di ultimo aggiornamento è indicata in fondo alla pagina.',
      ],
    },
  ]
}
