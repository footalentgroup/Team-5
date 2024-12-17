const app = require('./app')
require('./db')

const { PORT } = require('./config')

app.listen(PORT, () => {
  console.log(`Listening from port: ${PORT}`)
})


// TWITCH BOT

// const tmi = require('tmi.js')

// const opts = {
//   identity: {
//     username: 'brianco007',
//     password: 'oauth:j0d6lpy2nhoyw4yxs4nhmkwztz39xm'
//   },
//   channels: ['brianco007']
// }

// const client = new tmi.client(opts)

// client.on('message', onMessage )
// client.on('connected', onConnected)

// client.connect().catch((err) => {
//   console.error('Error connecting:', err);
// });

// function onConnected(addr, port){
//   console.log(`Bot conectado en ${addr} y ${port}`)
// }

// function onMessage(channel, tags, message, self){
//   // Si el mensaje no es un comando mostrar el mensaje solo
//   if(!message.startsWith('!')) return;

//   const args = message.slice(1).split(" ") // ["mensaje", "de", "prueba"]
//   const finalMessage = args.join(" ")
//   const command = args.shift().toLowerCase() // "mensaje"

//   if(command === "mensaje"){
//     client.say(channel, "Bienvenidos a todos!")
//   }
// }
