import './_page-header.scss'
import React, { Component, PropTypes } from 'react'
export default class PageHeader extends Component {
  static propTypes = {
    actions: PropTypes.object,
    title: PropTypes.string.isRequired,
    children: PropTypes.any,
    isLoading: PropTypes.bool
  }
  render () {
    let classNames = [
      'page-header'
    ]

    if (this.props.isLoading) {
      classNames.push('page-header--loading')
    }

    return (
      <div className={classNames.join(' ')}>
        <h1 className='page-header__title'><span className='icon'></span>{this.props.title}</h1>
        {this.props.children}
      </div>
    )
  }
}
