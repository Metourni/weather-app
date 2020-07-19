import React from 'react'

import LanguageSwitcher from './LanguageSwitcher'
import style from './style.module.scss'

const TopBar = () => {
  return (
    <div className={style.topbar}>
      <div>
        <img src="/resources/images/weather.png" alt="Weather App" width="40" />
      </div>
      <div className="mr-auto mx-4 d-none d-sm-block">
        <LanguageSwitcher />
      </div>
    </div>
  )
}

export default TopBar
