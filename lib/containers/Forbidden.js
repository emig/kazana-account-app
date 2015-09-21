import React from 'react'
import { t } from '../utils/i18n'

export default class Forbidden extends React.Component {
  render () {
    return (
      <div>
        <div className='header'>
          <h1>{t('forbidden.header')}</h1>
        </div>
        <div className='content'>
          <p>
            {/* TODO: get some info about the error */}
            {t('forbidden.message')}
          </p>
        </div>
      </div>
    )
  }
}
