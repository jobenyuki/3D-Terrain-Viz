import React from 'react'
import classnames from 'classnames'
// Import style
import style from './style.module.css'

const RadioInput = ({ className = '', label = '', ...rest }) => {
  return (
    <div className={classnames(style.radioInputContainer, className)}>
      <label>{label}</label>
      <input className={style.radioInput} type="radio" {...rest} />
    </div>
  )
}

export default RadioInput
