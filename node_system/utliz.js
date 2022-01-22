function logData(message) {
    let d = new Date();
    var time = '[' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds() + ']';
    console.log(time + message);
}

module.exports = {
    logData,
    ArrayBufferToString: function (buffer, encoding) {
        if (encoding == null) encoding = 'utf8';
        return Buffer.from(buffer).toString(encoding);
    },
};