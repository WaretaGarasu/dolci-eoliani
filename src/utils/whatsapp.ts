import { SITE } from '../data/site'

export function buildWhatsAppUrl(text: string): string {
  return `${SITE.whatsappUrl}?text=${encodeURIComponent(text)}`
}

export function buildOrderWhatsAppMessage(productName: string): string {
  return `Ciao, vorrei ordinare ${productName}. Vorrei informazioni sulla spedizione.`
}

export function buildContactWhatsAppMessage(name: string, message: string): string {
  return ['Ciao, vorrei informazioni da Dolci Eoliani.', '', `Nome: ${name}`, '', 'Messaggio:', message].join(
    '\n',
  )
}
