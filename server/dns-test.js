const { UDPClient } = require("dns2");

const dns = UDPClient({
    dns: "8.8.8.8"
});

dns.resolve("_mongodb._tcp.cluster0.tvisqtq.mongodb.net", "SRV")
    .then(response => {
        console.log(response.answers);
    })
    .catch(error => {
        console.error(error);
    });