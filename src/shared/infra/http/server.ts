import app from "./app";

app.listen(process.env.port || 3000, () => console.log(`Server iniciado na porta ${process.env.port || 3000}`))
