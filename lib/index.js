import './styles/app.scss'
import React from 'react'
import { render } from 'react-dom'
import Root from './Root'
import injectTapEventPlugin from 'react-tap-event-plugin'

// Needed for onTouchTap
// Can go away when react 1.0 release
// Check this repo:
// https://github.com/zilverline/react-tap-event-plugin
injectTapEventPlugin()

render(<Root />, document.getElementById('root'))
