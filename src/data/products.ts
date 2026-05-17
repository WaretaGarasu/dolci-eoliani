export type Product = {
  id: string
  name: string
  description: string
  longDescription: string
  tags: string[]
  badges?: string[]
  image: string
  imageAlt: string
}

export const PRODUCT_IMAGE_SIZE = 800
export const PRODUCT_IMAGE_WIDTHS = [400, 800] as const

export function productImage(id: string): string {
  return `/images/products/${id}.jpg`
}

export function productWebpPath(jpgPath: string): string {
  return jpgPath.replace(/\.jpg$/i, '.webp')
}

export function productImageStem(jpgPath: string): string {
  const base = jpgPath.replace(/\.jpg$/i, '').split('/').pop() ?? ''
  return base
}

export function productResponsiveSrcSet(
  jpgPath: string,
  format: 'webp' | 'jpg',
): string {
  const stem = productImageStem(jpgPath)
  const ext = format === 'webp' ? 'webp' : 'jpg'
  return PRODUCT_IMAGE_WIDTHS.map((w) => `/images/products/${stem}-${w}.${ext} ${w}w`).join(', ')
}

export const PRODUCTS: Product[] = [
  {
    id: 'spicchiteddi',
    name: 'Spicchiteddi',
    description:
      'Dolci tipici preparati con farina, zucchero, mandorle, scorza di agrumi e vino cotto. Attorcigliati a mano per un sapore di memoria e tradizione.',
    longDescription:
      'Gli Spicchiteddi sono dolci tipici eoliani, preparati con farina, zucchero, mandorle, scorza di agrumi, vino cotto e spezie come cannella e chiodi di garofano. Attorcigliati a mano in piccoli riccioli, si preparano per feste come Natale, Pasqua e Carnevale. Conservati nelle ricette di famiglia, restano un simbolo di memoria e tradizione, portando con sé i sapori delle Isole Eolie.',
    tags: ['Mandorle', 'Vino cotto'],
    image: productImage('spicchiteddi'),
    imageAlt:
      'Spicchiteddi eoliani, biscotti attorcigliati a forma di ricciolo decorati con mandorle intere.',
  },
  {
    id: 'nacatole',
    name: 'Nacatole Eoliane',
    description:
      'Frolla aromatizzata alla Malvasia delle Lipari, farcita con mandorle, zucchero, cannella e mandarino. Rifinite a mano con trame di merletto.',
    longDescription:
      'Le Nacatole Eoliane sono biscotti tipici della tradizione eoliana, riconosciuti come prodotto agroalimentare tradizionale italiano. Realizzati con una frolla aromatizzata alla Malvasia delle Lipari e farciti con un impasto di mandorle, zucchero, cannella e mandarino, vengono rifiniti a mano con decorazioni che ricordano trame di merletto. Dolci spettacolari e unici, simbolo della cultura eoliana.',
    tags: ['Malvasia', 'Mandarino'],
    badges: ['PAT'],
    image: productImage('nacatole'),
    imageAlt: 'Nacatole eoliane appena sfornate con crosta dorata e mandorle a scaglie.',
  },
  {
    id: 'scardellini',
    name: 'Scardellini',
    description:
      'Biscotti tipici siciliani con una crosta bianca croccante e base caramellata. Aromatizzati ai chiodi di garofano, noti anche come Moscardini.',
    longDescription:
      'Gli Scardellini sono biscotti tipici siciliani preparati in occasione della commemorazione dei defunti, il 2 novembre. Il nome richiama la festa e il loro aspetto: una crosta bianca croccante con la base caramellata. Aromatizzati ai chiodi di garofano, sono chiamati anche Moscardini, Mustazzoli o Paste di Garofano a seconda delle province, e restano un simbolo di memoria e tradizione in tutta l\'isola.',
    tags: ['Garofano', 'Caramello'],
    image: productImage('scardellini'),
    imageAlt: 'Biscotti Scardellini con crosta liscia beige e texture croccante.',
  },
  {
    id: 'liparoti',
    name: 'Liparoti',
    description:
      'Frolla morbida profumata agli agrumi con un ripieno di uva passa, fichi secchi e vino cotto. Dolci autentici e ricchi di storia.',
    longDescription:
      'I Liparoti sono biscotti tradizionali delle Eolie. Realizzati con una frolla molto morbida e rustica, profumata agli agrumi, custodiscono un ripieno particolare composto da uva passa, fichi secchi, frutta secca, vino cotto e altro. Possono essere realizzati con vari ripieni. Dolci autentici e ricchi di storia.',
    tags: ['Agrumi', 'Fichi secchi'],
    image: productImage('liparoti'),
    imageAlt: 'Biscotti tondi Liparoti dorati su teglia da forno.',
  },
  {
    id: 'sesamini',
    name: 'Sesamini',
    description:
      "Preparati con Malvasia delle Lipari e ricoperti di semi di sesamo tostati. L'accompagnamento ideale a fine pasto con malvasia ghiacciata.",
    longDescription:
      "I Sesamini sono biscotti particolari delle Isole Eolie, realizzati con pochi ma preziosi ingredienti. La loro unicità risiede nell'impasto preparato con la Malvasia delle Lipari, il vino dolce simbolo dell'arcipelago. Ricoperti interamente di semi di sesamo tostati che conferiscono un aroma inconfondibile, nascono per essere l'accompagnamento ideale a fine pasto con un bicchierino di malvasia ghiacciata. Fragranti e croccanti, rappresentano il perfetto connubio tra la dolcezza del vino passito e la rusticità del sesamo.",
    tags: ['Sesamo', 'Malvasia'],
    image: productImage('sesamini'),
    imageAlt: 'Biscotti Sesamini ricoperti di semi di sesamo dorati.',
  },
  {
    id: 'pasticciotti',
    name: 'Pasticciotti',
    description:
      'Biscotto ripieno di marmellata di zucca e cannella. Una frolla morbida e rustica che sprigiona i sentori inconfondibili delle Eolie.',
    longDescription:
      'I Pasticciotti Eoliani sono un biscotto particolarissimo e ripieno, espressione autentica della tradizione dolciaria delle Isole Eolie. Composti da una frolla morbida e rustica, profumata agli agrumi, custodiscono il ripieno tradizionale di marmellata di zucca e cannella che dona un sapore soave e inconfondibile. Possono essere preparati in diverse varianti, tra cui marmellata di albicocche e cannella o marmellata di pesche e malvasia.',
    tags: ['Zucca', 'Cannella'],
    image: productImage('pasticciotti'),
    imageAlt: 'Pasticciotti eoliani spolverati di zucchero a velo.',
  },
  {
    id: 'gigi',
    name: 'Gigi Eoliani',
    description:
      'Dolci fritti della tradizione rurale, tagliati a tocchetti e avvolti in una caratteristica glassa preparata con vino cotto e zucchero.',
    longDescription:
      'I Gigi Eoliani sono deliziosi dolci dalla forma sferica appartenenti alla tradizione rurale delle Isole Eolie. Simili alla pignoccata palermitana per aspetto e ingredienti, se ne distinguono per la caratteristica glassa preparata con vino cotto e zucchero anziché miele. Realizzati con un impasto a base di farina, strutto, tuorli e Malvasia delle Lipari, vengono tagliati a tocchetti, fritti in abbondante olio fino a doratura o fatti al forno, e infine avvolti nella glassa di vino cotto oppure al cioccolato. Tipici del periodo di Carnevale ma ormai preparati tutto l\'anno, vengono serviti cosparsi di zucchero a velo e cannella.',
    tags: ['Vino cotto', 'Fritto dolce'],
    image: productImage('gigi'),
    imageAlt: 'Gigi Eoliani in pirottini, glassati al cioccolato o chiari.',
  },
  {
    id: 'martorana',
    name: 'Frutta Martorana',
    description:
      "Opera d'arte della pasticceria siciliana in pasta di mandorle modellata e dipinta a mano. Tradizione nata nel monastero della Martorana.",
    longDescription:
      "La Frutta Martorana è un'autentica opera d'arte della pasticceria siciliana, riconosciuta come prodotto agroalimentare tradizionale italiano. Realizzata con pasta di mandorle finemente modellata a mano, viene dipinta con maestria artigianale per riprodurre alla perfezione frutti, ortaggi e talvolta pesci. Nata nel monastero benedettino della Martorana a Palermo nel periodo normanno, la leggenda narra che le monache crearono questi dolci per abbellire il giardino spoglio in occasione della visita di un alto prelato.",
    tags: ['Mandorle', 'Artigianale'],
    badges: ['PAT'],
    image: productImage('martorana'),
    imageAlt: 'Frutta Martorana in pasta di mandorle modellata e dipinta a mano.',
  },
  {
    id: 'paste-mandorla',
    name: 'Paste di Mandorla',
    description:
      'Biscotti iconici dal cuore morbido, nati nei monasteri benedettini. Realizzati con farina di mandorle siciliane e aromi naturali agli agrumi.',
    longDescription:
      'Le Paste di Mandorla sono biscotti iconici della pasticceria siciliana, appartenenti alla grande famiglia dei dolci alle mandorle dell\'isola. Nate nel periodo medievale nei monasteri benedettini, vengono realizzate con pochi ingredienti pregiati: farina di mandorle siciliane, albume d\'uovo, zucchero e aromi naturali agli agrumi. Caratterizzate da una superficie leggermente croccante che racchiude un cuore morbido e dolcissimo, possono essere decorate con mandorle intere, ciliegie candite o una spolverata di zucchero a velo. Riconosciute come prodotto agroalimentare tradizionale italiano.',
    tags: ['Mandorle siciliane', 'Senza glutine'],
    badges: ['PAT'],
    image: productImage('paste-mandorla'),
    imageAlt: 'Paste di mandorla coperte di zucchero a velo su carta forno.',
  },
]
