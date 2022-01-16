const express = require('express')
const cookieParser = require('cookie-parser')
const zones = require('./zones')
const configureUnlock = require('@unlock-protocol/unlock-express')
const app = express()
const port = process.env.PORT || 3000;

app.use(cookieParser())


const { membersOnly } = configureUnlock(
  {
    yieldPaywallConfig: () => {
      return {
        locks: {
          '0x45249Cf19A2C78064FDF1a503Ed53801900D8f3C': {
            network: 4,
          },
        },
      }
    },
    getUserEthereumAddress: async (request) => {
      return request.cookies.userAddress
    },
    updateUserEthereumAddress: async (
      request,
      response,
      address,
    ) => {
      response.cookie('userAddress', address)
    },
  },
  app
)

const dateInZone = (zone, label) => {
  const d = new Date();
  const city = label || (zone.split("/")[1]).replace('_', ' ')
  return `${d.toLocaleString('en-US', { timeZone: zone })} in ${city}`
}

app.get('/', (req, res) => {
  res.send(`<h1>RAY'S PODCAST LANDING PAGE</h1>
  <p>Welcome! </p>
 
  <p>Premium version: <a href="/premium">UNLOCK</a>!</p>`)
})

app.get('/premium', membersOnly(), (req, res) => {
  res.send(`<h1>Thank you for your support!</h1>

  <p>Enter Livestream --> <a href="http://20.83.127.93:3000/">START</a>!</p>
  ${zones.map((group) => {
    return `<div>

    </div>`
  }).join("")}
  <p><a href="/logout">Logout</a></p>`)
})

app.get('/logout', (req, res) => {
  res.clearCookie('userAddress')
  res.redirect('/')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
