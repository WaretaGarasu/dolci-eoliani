import { describe, expect, it } from 'vitest'
import { buildContactWhatsAppMessage, buildWhatsAppUrl } from './whatsapp'

describe('buildWhatsAppUrl', () => {
  it('encodes message with spaces and accents', () => {
    const url = buildWhatsAppUrl('Ciao à tutti, ordine spedizione')
    expect(url).toContain('https://wa.me/393338374526?text=')
    expect(url).toContain(encodeURIComponent('Ciao à tutti, ordine spedizione'))
  })

  it('encodes multiline contact message', () => {
    const text = buildContactWhatsAppMessage('Maria', 'Vorrei ordinare nacatole')
    const url = buildWhatsAppUrl(text)
    expect(url).toContain(encodeURIComponent('Maria'))
    expect(url).toContain(encodeURIComponent('nacatole'))
  })
})
