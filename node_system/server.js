const utils = require('./utliz.js');
const uWs = require('uWebSockets.js');

const app = uWs.App({}).ws('/ws', {
    compression: uWs.SHARED_COMPRESSOR,
    maxPayloadLength: 16 * 1024 * 1024,
    idleTimeout: 0,

    upgrade: (res, req, context) => {

    }, open: async (ws) => {

    },
    message: async (ws, message, isBinary) => {

    },
    drain: (ws) => {

    },
    close: (ws, code, message) => {

    }
}).listen(1300, async (sock) => {
    (sock) ? utils.logData('Server listening : 1300') : utils.logData('Something went horribly wrong!')
})