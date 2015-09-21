import './_accounts-list.scss'
import React, { PropTypes, Component } from 'react'
import { Styles, RaisedButton } from 'material-ui'
import { t } from '../utils/i18n.js'

let ThemeManager = Styles.ThemeManager()

export default class AccountsList extends Component {
  static propTypes = {
    accounts: PropTypes.array,
    showAccount: PropTypes.function,
    createAccount: PropTypes.createAccount
  }

  static childContextTypes = {
    muiTheme: React.PropTypes.object
  }

  getChildContext () {
    return {
      muiTheme: ThemeManager.getCurrentTheme()
    }
  }

  render () {
    let { accounts } = this.props

    // accounts = []
    return (
      <section className='accounts'>
        {!accounts.length && (
          <div className='accounts__list--empty'>
            <div className='accounts__list__notice'>
              <h4 className='accounts__list__notice__title'>{t('accounts.accountsList.nothingHere')}</h4>
              <RaisedButton
                onClick={this.props.createAccount}
                label='Create your first Account now!'
                primary={true} />
            </div>
          </div>
        )}
          <div className='accounts__list accounts__list--cards'>
          {accounts.map(account => {
            return (
              <div onClick={() => { this.props.showAccount(account.id) }} key={account.id} className='accounts__list__account'>
                <img className='accounts__list__account__image' src='//placehold.it/300x300' />
                <div className='card-section'>
                  <h4>
                      {account.name}
                  </h4>
                </div>
              </div>
            )
          })}
          </div>
      </section>
    )
  }
}
