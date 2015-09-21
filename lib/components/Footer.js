import React, { PropTypes } from 'react'
import { t } from '../utils/i18n'

export default class Footer extends React.Component {

  static propTypes = {
    application: PropTypes.object
  }

  render () {
    if (!this.props.application.session) return <div></div>
    return (
      <div className='footer'>
      {t('common.copyright')}
      </div>
    )
  }
}
