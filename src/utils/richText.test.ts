import { describe, expect, it } from 'vitest'
import { richTextToPlain } from './richText'

describe('richTextToPlain', () => {
  it('joins text and link labels', () => {
    const plain = richTextToPlain([
      { type: 'text', value: 'Vai a ' },
      { type: 'link', href: '#contatti', label: 'Contatti' },
      { type: 'text', value: '.' },
    ])
    expect(plain).toBe('Vai a Contatti.')
  })
})
