import React from 'react'
import classnames from 'classnames'
// Import custom components
import { RadioInput } from 'Components/Common'
// Import style
import style from './style.module.css'

const RadioInputGroup = ({ className = '', options = [], value, ...rest }) => {
  return (
    <div className={classnames(style.radioInputGroupContainer, className)}>
      {options.map((option, index) => (
        <RadioInput
          key={`radio-input-${index}`}
          value={option.value}
          label={option.label}
          checked={value === option.value}
          {...rest}
        />
      ))}
    </div>
  )
}

export default RadioInputGroup
