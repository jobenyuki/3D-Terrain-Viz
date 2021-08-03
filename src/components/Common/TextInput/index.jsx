import React, { memo } from 'react'
import classnames from 'classnames'
// Import utils
import { TEXT_INPUT_TYPES } from 'Types'
// Import style
import style from './style.module.css'

const TextInput = ({ label = '', type = TEXT_INPUT_TYPES.TEXT, className = '', ...rest }) => {
  return (
    <div className={classnames(style.textInputContainer, className)}>
      <label>{label}</label>
      <input className={style.textInput} type={type} {...rest} />
    </div>
  )
}

export default memo(TextInput)
