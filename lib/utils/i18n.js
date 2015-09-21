import i18n from 'i18next-client'
import resBundle from 'i18next-resource-store-loader!../locales/index.js'

i18n.init({
  lng: 'en',
  resStore: resBundle
})

export default i18n
