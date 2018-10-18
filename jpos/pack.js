const iso8583 = require('iso-8583');
module.exports = function(){
    const msg = [
        [0, "1234"],
        [2, "1234567890123456"],
        [4, "000000005699"],
        [11, "000234"],
        [39, "004"],
        [41, "12345"],
        [42, "678901234"],
        [125, "BLAH BLAH"]
    ];
    
    const message = new iso8583.Message();
    const packedMessage = message.packSync(msg);
    console.log(packedMessage);
} 
