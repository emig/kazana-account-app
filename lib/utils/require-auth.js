import HoodieAccount from '../vendor/account'
const account = new HoodieAccount()
export default function requireAuth (nextState, replaceState) {
  if (!account.isSignedIn()) {
    replaceState({
      nextPathname: nextState.location.pathname
    }, '/sign-in')
  }
}
