import './_accounts.scss'
import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'
import AccountsList from '../components/AccountsList'
import PageHeader from '../components/PageHeader'
import { bindActionCreators } from 'redux'
import { History } from 'react-router'
import * as accountsActions from '../actions/accounts'
import { RaisedButton } from 'material-ui'
import { t } from '../utils/i18n.js'

@connect(state => ({
  accounts: state.accounts
}), dispatch => ({
  accountsActions: bindActionCreators(accountsActions, dispatch)
}))
export default class Accounts extends Component {

  static mixins = [
    History
  ]

  static propTypes = {
    accountsActions: PropTypes.object,
    accounts: PropTypes.shape({
      isLoading: PropTypes.boolean,
      items: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.string,
          name: PropTypes.string
        })
      )
    }),
    history: PropTypes.object
  }

  componentWillMount () {
    const { accountsActions } = this.props
    accountsActions.getAccounts()
  }

  gotoNewAccountPage () {
    const { history } = this.props
    history.pushState(null, '/accounts/new')
  }

  showAccount (id) {
    const { history } = this.props
    history.pushState(null, `/accounts/${id}`)
  }

  render () {
    return (
      <div className='accounts content__main'>
        <PageHeader isLoading={this.props.accounts.isLoading} title={t('common.accounts')}>
          <div className='buttons'>
            <RaisedButton
              label={t('accounts.addAccount')}
              secondary={true}
              onClick={this.gotoNewAccountPage.bind(this)}
              className='button' />
          </div>
        </PageHeader>
        {!this.props.accounts.isLoading && (
        <div className='content__main__body'>
          <AccountsList createAccount={() => this.gotoNewAccountPage()} showAccount={(id) => this.showAccount(id)} accounts={this.props.accounts.items} />

        </div>
        )}
      </div>
    )
  }
}
