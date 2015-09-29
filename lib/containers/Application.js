import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import Footer from '../components/Footer'
import './_application.scss'
import { AppBar, MenuItem, LeftNav } from 'material-ui'
import { t } from '../utils/i18n.js'

const menuItems = [
  { route: '/', text: t('common.dashboard') },
  { route: '/accounts', text: t('common.accounts') },
  { type: MenuItem.Types.SUBHEADER, text: t('common.account') },
  {
    route: '/sign-out',
    text: t('common.signOut')
  }
]

@connect(state => ({
  application: state.application
}))
export default class Application extends React.Component {

  static propTypes = {
    children: PropTypes.any,
    history: PropTypes.object,
    location: PropTypes.object
  }

  static contextTypes = {
    router: PropTypes.func
  }

  constructor () {
    super()
    this.toggleLeftNav = this.toggleLeftNav.bind(this)
    this.handleLeftNavClick = this.handleLeftNavClick.bind(this)
    this.handleLeftNavSelectedIndex = this.handleLeftNavSelectedIndex.bind(this)
  }

  toggleLeftNav (e) {
    e.preventDefault()
    this.refs.leftNav.toggle()
  }

  handleLeftNavClick (e, key, payload) {
    this.props.history.pushState({}, payload.route)
  }

  // Get the selected item in LeftMenu
  handleLeftNavSelectedIndex () {
    let currentItem
    for (let i = menuItems.length - 1; i >= 0; i--) {
      currentItem = menuItems[i]
      if (currentItem.route === this.props.location.pathname) {
        return i
      }
    }
  }

  render () {
    return (
      <div>
      <AppBar
        title={t('common.app.name')}
        isInitiallyOpen={true}
        onLeftIconButtonTouchTap={this.toggleLeftNav} />
      <LeftNav
        ref='leftNav'
        docked={false}
        onChange={this.handleLeftNavClick}
        selectedIndex={this.handleLeftNavSelectedIndex()}
        menuItems={menuItems} />
      <div className='frame'>
      <div className='content'>
      {this.props.children}
      <Footer {...this.props} />
      </div>
      </div>
      </div>
    )
  }
}
