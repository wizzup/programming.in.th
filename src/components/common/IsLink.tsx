import Link from 'next/link'

const LinkComponent = ({
  children,
  className = '',
  href,
  isLink = false
}: {
  children: JSX.Element
  className?: string
  href: string
  isLink?: boolean
}) => {
  if (isLink) {
    return (
      <Link href={href}>
        <a className={className}>{children}</a>
      </Link>
    )
  }
  return <div className={className}>{children}</div>
}

export default LinkComponent
