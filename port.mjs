import net from "net";

const port = 8000;

const server = net.createServer();

server.listen(port, () => {
  console.log(`The server is listening on port ${port}`);
});

server.on("error", (err) => {
  if (err.code === "EADDRINUSE") {
    console.error(`The port ${port} is already in use.`);
  } else {
    console.error(err);
  }
});
