import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PageHeader from '../components/PageHeader.js'
import * as accountsActions from '../actions/accounts'
import { t } from '../utils/i18n'

@connect(state => ({
  accounts: state.accounts
}), dispatch => ({
  accountsActions: bindActionCreators(accountsActions, dispatch)
}))
export default class Dashboard extends Component {

  static propTypes = {
    accounts: PropTypes.object,
    accountsActions: PropTypes.object
  }

  componentWillMount () {
    const { accountsActions } = this.props
    accountsActions.getAccounts()
  }

  render () {
    let count = this.props.accounts.items.length
    return (
      <div className='dashboard content__main'>
        <PageHeader isLoading={this.props.accounts.isLoading} title={t('common.dashboard')} />
        <div>
        {!this.props.accounts.isLoading && (
          <div className='content__main__body'>
            <p>{t('dashboard.intro')}</p>
            <p>{t('dashboard.accountCount', {count})}</p>
          </div>
        )}
        </div>
      </div>
    )
  }
}
