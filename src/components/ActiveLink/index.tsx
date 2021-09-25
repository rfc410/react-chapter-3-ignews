import { cloneElement, ReactElement } from 'react'
import Link, { LinkProps } from 'next/link'
import { useRouter } from 'next/router'

interface ActiveLinkProps extends LinkProps {
  activeClassName: string
  children: ReactElement
}

export const ActiveLink = (
  {
    activeClassName,
    children,
    ...linkProps
  }: ActiveLinkProps
) => {
  const { asPath } = useRouter()

  const className = asPath === linkProps.href ? activeClassName : ''

  return (
    <Link {...linkProps}>
      {cloneElement(children, { className })}
    </Link>
  )
}