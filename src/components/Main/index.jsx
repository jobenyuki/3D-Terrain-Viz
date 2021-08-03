import React from 'react'
// Import custom components
import SidePanel from 'Components/SidePanel'
// Import style
import style from './style.module.css'

const Main = () => {
  return (
    <div className={style.main}>
      <SidePanel className={style.sidePanel} onApply={handleApply} />
      {/* TODO  */}
      {/* <div className={style.rendererContainer} ref={rendererContainer}></div> */}
    </div>
  )
}

export default Main
