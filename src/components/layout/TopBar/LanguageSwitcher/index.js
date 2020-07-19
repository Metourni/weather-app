import React from 'react'
import {Menu, Dropdown} from 'antd'
import {connect} from 'react-redux'

import settingsActions from "../../../../redux/settings/actions";
import styles from './style.module.scss'

const LanguageSwitcher = (props) => {
  const changeLanguage = ({key}) => {
    const {changeLanguageSettings} = props
    changeLanguageSettings(key)
  }

  const {
    settings: {locale},
  } = props
  const language = locale.substr(0, 2)
  const menu = (
    <Menu selectedKeys={[locale]} onClick={changeLanguage}>
      <Menu.Item key="en-US">
        <span className="text-uppercase font-size-12 mr-2">EN</span>
        English
      </Menu.Item>
      <Menu.Item key="fr-FR">
        <span className="text-uppercase font-size-12 mr-2">FR</span>
        French
      </Menu.Item>
    </Menu>
  )
  return (
    <Dropdown overlay={menu} trigger={['click']} placement="bottomRight">
      <div className={styles.dropdown}>
        <span className="text-uppercase">{language}</span>
      </div>
    </Dropdown>
  )
}

const mapStateToProps = ({settings}) => ({settings})

const mapPropsToState = dispatch => ({
  changeLanguageSettings: key => {
    dispatch({
      type: settingsActions.CHANGE_SETTING,
      payload: {
        setting: 'locale',
        value: key,
      },
    })
  }
})

export default connect(mapStateToProps, mapPropsToState)(LanguageSwitcher)
