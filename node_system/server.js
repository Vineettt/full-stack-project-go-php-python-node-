const utils = require('./utliz.js');
const uWs = require('uWebSockets.js');

function payload(type, data){
    let payload = {
        type, data
    }
    return payload;
}

const app = uWs.App({}).ws('/ws', {
    compression: uWs.SHARED_COMPRESSOR,
    maxPayloadLength: 16 * 1024 * 1024,
    idleTimeout: 0,

    upgrade: (res, req, context) => {
        utils.logData('An Http connection wants to become a WebSocket @URL:' + req.getUrl() + '!');
        const upgradeAborted = { aborted: false };
        res.onAborted(() => {
            utils.logData('Websocket aborted connect or Foreign Address Detected...');
            upgradeAborted.aborted = true;
        })
        if (req.getHeader('origin') === 'http://a0uth.local.com') {
            res.upgrade({ url: req.getUrl() }, req.getHeader('sec-websocket-key'),
                req.getHeader('sec-websocket-protocol'),
                req.getHeader('sec-websocket-extensions'), context);
        } else {
            utils.logData('Kill the foregin Request.');
            res.close();
        }
    }, open: async (ws) => {
        utils.logData('A WebSocket Connected with URL:' + ws.url);
        utils.logData('A WebSocket connected via address: ' + utils.ArrayBufferToString(ws.getRemoteAddressAsText()) + '!');
    },
    message: async (ws, message, isBinary) => {
        let tjo = JSON.parse(utils.ArrayBufferToString(message));
        switch(tjo['type']){
            case "node-client-test-msg":
                ws.send(JSON.stringify(payload('test-response-from-node-server', 'Hello from node server')))
                break;
            default:
                break;
        }
    },
    drain: (ws) => {

    },
    close: (ws, code, message) => {

    }
}).listen(1300, async (sock) => {
    (sock) ? utils.logData('Server listening : 1300') : utils.logData('Something went horribly wrong!')
})