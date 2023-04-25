import app from "./app";

app.listen(process.env.PORT || 3000, () => console.log(`Server iniciado na porta ${process.env.PORT || 3000}`))
