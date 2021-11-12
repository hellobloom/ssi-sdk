import React, { ReactNode } from 'react'
import { FC, forwardProps } from 'react-forward-props'

import { ButtonOptions, CommonWACIElementProps } from '../types'
import { useId } from '../utils'
import { LargeButtonContent } from './large'
import { MediumButtonContent } from './medium'
import { SmallButtonContent } from './small'

type WACIButtonElementProps = CommonWACIElementProps & ButtonOptions

export const WACIButtonElement: FC<'a', WACIButtonElementProps> = ({ data, ...props }) => {
  const id = useId(props.id)

  let children: ReactNode

  switch (props.size) {
    case 'lg':
      children = <LargeButtonContent type={props.type} baseId={id} />
      break
    case 'md':
      children = <MediumButtonContent type={props.type} baseId={id} />
      break
    case 'sm':
      children = <SmallButtonContent type={props.type} invert={props.invert} baseId={id} />
      break
    default:
      throw new Error(`Unknown size: ${(props as any).size}`)
  }

  const href =
    typeof props.__hrefBuilder === 'undefined'
      ? `https://bloom.co/download?payload=${window.btoa(JSON.stringify(data))}`
      : props.__hrefBuilder(data)

  return (
    <a
      {...forwardProps(props, 'size', 'type', 'invert', '__hrefBuilder', 'ref')}
      target="_blank"
      rel="noreferrer noopener"
      href={href}
      id={id}
    >
      {children}
    </a>
  )
}
