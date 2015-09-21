import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as accountActions from '../actions/accounts.js'
import PageHeader from '../components/PageHeader.js'
import { Styles, RaisedButton, TextField } from 'material-ui'
import { t } from '../utils/i18n.js'

let ThemeManager = Styles.ThemeManager()

@connect(state => ({
  account: state.account
}), dispatch => ({
  actions: bindActionCreators(accountActions, dispatch)
}))
export default class Account extends Component {

  static propTypes = {
    account: PropTypes.object,
    actions: PropTypes.object,
    params: PropTypes.object
  }

  static childContextTypes = {
    muiTheme: React.PropTypes.object
  }

  getInitialState () {
    return {
      account: {
        name: '',
        email: '',
        password: ''
      }
    }
  }

  handleTextFieldChange (e, field) {
    this.setState(Object.assign({}, this.state, {
      account: {
        [field]: e.target.value
      }
    }))
  }

  getChildContext () {
    return {
      muiTheme: ThemeManager.getCurrentTheme()
    }
  }

  componentWillMount () {
    if (this.props.params && this.props.params.accountId) {
      const { accountId } = this.props.params
      this.props.actions.getAccount(accountId)
      this.setState({
        id: accountId
      })
    }
  }

  handleFormSubmit (e) {
    e.preventDefault()
    let account = {
      id: this.state.id,
      name: this.refs.name.getValue().trim(),
      email: this.refs.email.getValue().trim(),
      password: this.refs.password.getValue().trim()
    }

    this.props.actions.saveAccount(account)
  }

  renderAccount () {
    return this.renderForm()
  }

  renderForm () {
    let name = this.props.account.account ? this.props.account.account.name : ''
    let email = this.props.account.account ? this.props.account.account.email : ''

    return (
          <form
            onSubmit={this.handleFormSubmit.bind(this)}>
            <fieldset>
              <label>
                <TextField
                  name='name'
                  ref='name'
                  defaultValue={name}
                  floatingLabelText={t('accounts.account.form.fullName.label')}
                  onChange={e => this.handleTextFieldChange(e, 'name')}
                  required
                  hintText={t('accounts.account.form.fullName.hint')}/>
              </label>
              <label>
                <TextField
                  name='email'
                  ref='email'
                  type='email'
                  defaultValue={email}
                  floatingLabelText={t('accounts.account.form.email.label')}
                  required
                  hintText={t('accounts.account.form.email.hint')} />
              </label>
              <label>
                <TextField
                  name='password'
                  ref='password'
                  type='password'
                  floatingLabelText={t('accounts.account.form.password.label')}
                  hintText={t('accounts.account.form.password.hint')} />
              </label>
              <RaisedButton
                label={t('common.save')}
                type='submit'
                primary={true} />
            </fieldset>
          </form>
    )
  }

  renderNewAccount () {
    return this.renderForm()
  }

  render () {
    var headerText

    if (this.props.account.isLoading) {
      headerText = t('accounts.account.loading')
    } else if (!this.props.account.isLoading && this.props.account.account) {
      headerText = this.props.account.account.name
    }else if (!this.props.account.isLoading && !this.props.account.account) {
      headerText = t('accounts.account.newAccount')
    }

    return (
      <section className='account content__main'>
        <PageHeader
          isLoading={this.props.account.isLoading}
          title={headerText} />
        <div className='content__main__body'>
          { this.props.account.isLoading && !this.props.account.account && (
            <div></div>
          )}
          { !this.props.account.isLoading && this.props.account.account && this.renderAccount() }
          { !this.props.account.isLoading && !this.props.account.account && this.renderNewAccount() }
        </div>
      </section>
    )
  }
}
