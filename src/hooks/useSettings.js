import { useCallback, useState } from 'react'
// Import constants
import { DEFAULT_SETTINGS } from 'Constants'

export const useSettings = () => {
  const [settings, setSettings] = useState(DEFAULT_SETTINGS)

  // Listener for settings change by user
  const onSettingsChange = useCallback((key, val) => {
    setSettings((currentState) => ({
      ...currentState,
      [key]: val,
    }))
  }, [])

  return {
    settings,
    onSettingsChange,
  }
}
