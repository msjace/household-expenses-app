'use client'

import React from 'react'

import { redirect } from 'next/navigation'

import styles from './linkButton.module.css'

interface ILinkButtonProps {
  content: string
  position: 'right' | 'center'
  nextPage: string
}

export const LinkButton: React.FC<ILinkButtonProps> = (props) => {
  const onClick = () => {
    redirect(props.nextPage)
  }

  return (
    <button
      className={`${
        props.position === 'right' ? styles.rightButton : styles.centerButton
      }`}
      type="button"
      onClick={onClick}
    >
      {props.content}
    </button>
  )
}
