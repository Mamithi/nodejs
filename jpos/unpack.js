const iso8583 = require('iso-8583');

module.exports = function() {
    const message = new iso8583.Message();
    const data = "1234D020000002C000000000000000000008161234567890123456000000005699000234000431323334352020203637383930313233342020202020200009424C414820424C4148";
    // const msg = new Buffer(data, "hex");
    // let len = msg.length;

    const unpackedMessage = message.parseSync(data);
    console.log(unpackedMessage);
}