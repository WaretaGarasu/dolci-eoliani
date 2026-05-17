import { useEffect, useState } from 'react'
import { COPY } from '../data/copy'
import { scrollToSection } from '../utils/scroll'
import { Icon } from './Icon'

const SCROLL_THRESHOLD = 480

export function ScrollToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > SCROLL_THRESHOLD)

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <button
      type="button"
      onClick={() => scrollToSection('#')}
      aria-label={COPY.a11y.scrollToTop}
      aria-hidden={!visible}
      tabIndex={visible ? 0 : -1}
      className={`fixed right-4 bottom-[max(1rem,env(safe-area-inset-bottom))] z-50 flex h-14 w-14 items-center justify-center border border-primary bg-primary text-on-primary shadow-md transition-[opacity,transform] duration-300 ease-out motion-reduce:transition-none ${
        visible
          ? 'pointer-events-auto translate-y-0 scale-100 opacity-100 motion-safe:animate-[scrollToTopIn_0.4s_cubic-bezier(0.22,1,0.36,1)_both]'
          : 'pointer-events-none translate-y-4 scale-90 opacity-0'
      } hover:border-mandorla hover:bg-mandorla hover:text-nero-carbone motion-safe:hover:scale-105 motion-safe:active:scale-95`}
    >
      <Icon
        name="arrow_upward"
        className={`text-2xl transition-transform duration-300 motion-reduce:transition-none ${
          visible ? 'motion-safe:-translate-y-px' : ''
        }`}
      />
    </button>
  )
}
