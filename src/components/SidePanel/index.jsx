import React, { memo } from 'react'
import classnames from 'classnames'
// Import custom components
import { ButtonInput, TextInput, RadioInputGroup } from 'Components/Common'
// Import custom hooks
import { useSettings } from 'Hooks/useSettings'
// Import types
import { TEXT_INPUT_TYPES, INPUT_NAMES } from 'Types'
// Import constants
import { MAPPING_OPTIONS } from 'Constants'
// Import style
import style from './style.module.css'

const SidePanel = ({ onApply, className, ...rest }) => {
  const { settings, onSettingsChange } = useSettings()

  return (
    <div className={classnames(style.sidePanel, className)} {...rest}>
      <TextInput
        label="Latitude"
        type={TEXT_INPUT_TYPES.NUMBER}
        name={INPUT_NAMES.LAT}
        value={settings.lat}
        onChange={(e) => onSettingsChange(INPUT_NAMES.LAT, parseFloat(e.target.value, 10))}
      />
      <TextInput
        label="Longitude"
        type={TEXT_INPUT_TYPES.NUMBER}
        name={INPUT_NAMES.LON}
        value={settings.lon}
        onChange={(e) => onSettingsChange(INPUT_NAMES.LON, parseFloat(e.target.value, 10))}
      />
      <TextInput
        label="Zoom"
        type={TEXT_INPUT_TYPES.NUMBER}
        name={INPUT_NAMES.ZOOM}
        value={settings.zoom}
        onChange={(e) => onSettingsChange(INPUT_NAMES.ZOOM, parseFloat(e.target.value, 10))}
      />
      <RadioInputGroup
        name={INPUT_NAMES.MAPPING}
        options={MAPPING_OPTIONS}
        value={settings.mapping}
        onChange={(e) => onSettingsChange('mapping', parseInt(e.target.value))}
      />
      <ButtonInput onClick={() => onApply(settings)}>APPLY</ButtonInput>
    </div>
  )
}

export default memo(SidePanel)
