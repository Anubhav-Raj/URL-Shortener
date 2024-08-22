// /* eslint-disable no-undef */
// const zookeeper = require("node-zookeeper-client");

// const client = zookeeper.createClient("localhost:2181");

// client.once("connected", function () {
//   console.log("Connected to the Zookeeper server.");
// });

// client.connect();

// function assignCounterRange(serverId, callback) {
//   const path = `/counter-ranges/${serverId}`;

//   client.create(path, new Buffer.alloc(0), (error) => {
//     if (error) {
//       if (error.getCode() === zookeeper.Exception.NODE_EXISTS) {
//         console.log("Counter range already assigned");
//       } else {
//         console.error(error.stack);
//         return;
//       }
//     }

//     const min = Math.floor(Math.random() * 1000000);
//     const max = min + 10000;

//     client.setData(path, Buffer.from(`${min}-${max}`), (error) => {
//       if (error) {
//         console.error(error.stack);
//         return;
//       }
//       callback(min, max);
//     });
//   });
// }
// const serverId = `server-${Math.floor(Math.random() * 10000)}`;

// assignCounterRange(serverId, (min, max) => {
//   counterRange = { min, max };
//   currentCounter = min;
// });

// function generateShortUrl() {
//   const shortUrl = Buffer.from(currentCounter.toString())
//     .toString("base64")
//     .slice(0, 7);
//   currentCounter++;

//   if (currentCounter > counterRange.max) {
//     throw new Error("Counter range exhausted");
//   }

//   return shortUrl;
// }
// module.exports = {
//   assignCounterRange,
//   generateShortUrl,
//   client,
// };
