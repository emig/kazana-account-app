import accountAdmin from '../vendor/account'
export default function requireAuth (nextState, replaceState) {
  if (!accountAdmin.isSignedIn()) {
    replaceState({
      nextPathname: nextState.location.pathname
    }, '/sign-in')
  }
}
