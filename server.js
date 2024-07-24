const express = require("express");
const cluster = require('cluster')

const app = express();

const PORT = 8001;

function delay(duration) {
  const startTime = Date.now();
  while (Date.now() - startTime < duration) {
    //event loop is blocked
  }
}
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/timer", (req, res) => {
  // setTimeout(() => {
  //     res.send('Hello World!')
  // }, 2000);

  delay(9000);

  res.send("Hello World!");
});

if (cluster.isMaster) {
  cluster.fork();
  cluster.fork();
} else {
    app.listen(PORT)
}


// if (cluster.isMaster) {
//     // Get the number of CPU cores
//     const numCPUs = os.cpus().length;
  
//     console.log(numCPUs)
//     // Fork workers
//     for (let i = 0; i < numCPUs; i++) {
//       cluster.fork();
//     }
  
//     cluster.on('exit', (worker, code, signal) => {
//       console.log(`Worker ${worker.process.pid} died`);
//       // Optionally, you can fork a new worker
//       cluster.fork();
//     });
//   } else {
//     app.listen(PORT, () => {
//       console.log("App listening on port: " + PORT);
//     });
//   }