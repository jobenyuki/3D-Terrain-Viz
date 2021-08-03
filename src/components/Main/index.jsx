import React, { useCallback, useEffect, useRef } from 'react'
// Import custom components
import SidePanel from 'Components/SidePanel'
import TerrainRenderer from 'Utils/terrainRenderer'
// Import style
import style from './style.module.css'

const Main = () => {
  const rendererContainer = useRef()
  const renderer = useRef()

  // Listener whenever settings get updated
  const handleApply = useCallback((settings) => {
    renderer.current?.updateTile(settings)
  }, [])

  // Create terrain renderer when component mounted
  useEffect(() => {
    renderer.current = new TerrainRenderer(rendererContainer.current)

    return () => {
      if (renderer.current) {
        renderer.current.dispose()
      }
    }
  }, [])

  return (
    <div className={style.main}>
      <SidePanel className={style.sidePanel} onApply={handleApply} />
      <div className={style.rendererContainer} ref={rendererContainer}></div>
    </div>
  )
}

export default Main
