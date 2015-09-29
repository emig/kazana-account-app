import './_signin.scss'
import React, { PropTypes } from 'react'
import * as actions from '../actions/application'
import { TextField, RaisedButton } from 'material-ui'
import { t } from '../utils/i18n'

export default class SignIn extends React.Component {

  static propTypes = {
    location: PropTypes.object
  }

  static contextTypes = {
    store: PropTypes.any,
    history: PropTypes.object.isRequired
  }

  constructor (props) {
    super(props)
    this.state = { email: null, password: null }
  }

  handleInputChange (evt) {
    this.setState({
      [evt.target.name]: evt.target.value
    })
  }

  handleSubmit (evt) {
    evt.preventDefault()
    const { history, store } = this.context
    const { location } = this.props

    const nextPath = location.query.nextPathname || '/dashboard'
    store.dispatch(actions.signIn(this.state, history, nextPath))
  }

  render () {
    return (
      <div className='signin-form'>
        <form
          name='signinForm'
          className='signin-form__form'
          onSubmit={::this.handleSubmit}
          onChange={::this.handleInputChange}>
          <fieldset>
            <div className='pure-control-group'>
              <TextField
                fullWidth={true}
                hintText={t('common.signIn.username')} />
            </div>
            <div className='pure-control-group'>
              <TextField
                fullWidth={true}
                hintText={t('common.signIn.password')}
                type='password' />
            </div>
            <RaisedButton
              type='submit'
              label={t('common.signIn.signIn')}
              primary={true} />
          </fieldset>
        </form>
      </div>
    )
  }
}
