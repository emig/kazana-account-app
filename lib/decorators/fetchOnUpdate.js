import React, { PropTypes } from 'react'
import shallowEqual from 'react-redux/lib/utils/shallowEqual'

function mapParams (paramKeys, params) {
  var newParams = paramKeys.reduce((acc, key) => {
    return Object.assign({}, acc, { [key]: params[key] })
  }, {})

  console.log(newParams)

  return newParams
}

export default function fetchOnUpdate (paramKeys, fn) {
  return DecoratedComponent =>
  class FetchOnUpdateDecorator extends React.Component {

    static propTypes = {
      actions: PropTypes.object
    }

    componentWillMount () {
      fn(mapParams(paramKeys, this.props.params), this.props.actions)
    }

    componentDidUpdate (prevProps) {
      const params = mapParams(paramKeys, this.props.params)
      const prevParams = mapParams(paramKeys, prevProps.params)

      if (!shallowEqual(params, prevParams)) {
        fn(params, this.props.actions)
      }
    }

    render () {
      return (
        <DecoratedComponent {...this.props} />
      )
    }
  }
}
