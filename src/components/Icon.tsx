type IconName =
  | 'chat'
  | 'close'
  | 'menu'
  | 'groups'
  | 'open_in_new'
  | 'mail'
  | 'arrow_forward'
  | 'check'
  | 'content_copy'
  | 'expand_more'
  | 'arrow_upward'

type IconProps = {
  name: IconName | string
  className?: string
  filled?: boolean
}

const PATHS: Record<IconName, string> = {
  chat: 'M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z',
  close: 'M18.3 5.71 12 12.01l-6.29-6.3-1.42 1.42 6.3 6.29-6.3 6.29 1.42 1.42 6.29-6.3 6.29 6.3 1.42-1.42-6.3-6.29 6.3-6.29z',
  menu: 'M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z',
  groups:
    'M12 12.75c1.63 0 3.07.39 4.24 1.01 1.08.56 1.76 1.63 1.76 2.82V18H6v-1.42c0-1.19.68-2.26 1.76-2.82 1.17-.62 2.61-1.01 4.24-1.01zM12 2C9.79 2 8 3.79 8 6s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm7 10.5c0-.83-.5-1.56-1.22-1.88-.63-.27-1.33-.42-2.03-.42-.35 0-.69.03-1.02.08 1.19.93 1.97 2.33 1.97 3.92V18h4.5v-5.5zM5.5 12c0-1.59.78-2.99 1.97-3.92C7.14 8.03 6.8 8 6.45 8c-.7 0-1.4.15-2.03.42C3.5 8.94 3 9.67 3 10.5V18h2.5v-5.5z',
  open_in_new:
    'M19 19H5V5h7V3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z',
  mail: 'M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z',
  arrow_forward: 'M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8-8-8z',
  check: 'M9 16.17 4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z',
  content_copy:
    'M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z',
  expand_more: 'M16.59 8.59 12 13.17 7.41 8.59 6 10l6 6 6-6-1.41-1.41z',
  arrow_upward: 'M4 12l1.41 1.41L11 7.83V20h2V7.83l5.59 5.58L20 12l-8-8-8 8z',
}

export function Icon({ name, className = '' }: IconProps) {
  const path = PATHS[name as IconName]
  if (!path) return null

  return (
    <svg
      className={`inline-block shrink-0 fill-current ${className}`}
      viewBox="0 0 24 24"
      width="1em"
      height="1em"
      aria-hidden
    >
      <path d={path} />
    </svg>
  )
}
