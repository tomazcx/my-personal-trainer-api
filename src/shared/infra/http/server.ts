import app from "./app";

app.listen(process.env.port || 3000, () => console.log("Server iniciado em localhost:3000"))
