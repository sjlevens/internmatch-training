const withPWA = require('next-pwa')
const runtimeCaching = require('next-pwa/cache')

module.exports = withPWA({
  pwa: {
    dest: 'public',
    runtimeCaching,
  },
  env: {
    UDEMY_AUTH: process.env.UDEMY_AUTH,
    UDEMY_API: process.env.UDEMY_API,
  },
})
