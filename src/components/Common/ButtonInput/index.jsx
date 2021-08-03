import React, { memo } from 'react'
import classnames from 'classnames'
// Import style
import style from './style.module.css'

const ButtonInput = ({ className = '', children = '', ...rest }) => {
  return (
    <button className={classnames(style.buttonInput, className)} {...rest}>
      {children}
    </button>
  )
}

export default memo(ButtonInput)
