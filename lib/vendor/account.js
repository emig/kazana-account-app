import 'babel/polyfill'

import AccountAdmin from 'hoodie-client-account/admin'
export default new AccountAdmin({
  url: '/kazana/account/api'
})
