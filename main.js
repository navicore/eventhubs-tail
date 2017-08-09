var EventHubClient = require("azure-event-hubs").Client;
var connStr = process.env["CONN_STR"];
var client = EventHubClient.fromConnectionString(connStr, "security-logs");
client
  .open()
  .then(function() {
    return client.createReceiver("$Default", "1", {
      startAfterTime: Date.now()
    });
  })
  .then(function(rx) {
    rx.on("errorReceived", function(err) {
      console.log(err);
    });
    rx.on("message", function(message) {
      console.log(JSON.stringify(message.body, 0, 2));
    });
  });
