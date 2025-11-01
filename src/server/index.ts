import expres from "express";
import { authRouter } from "./routes/auth";
const app = expres();

app.use(expres.json());

app.use(authRouter);

app.get("/ping", (req, res) => {
  res.send("Hello World!");
});

app.listen(process.env.PORT!, () => {
  console.log(`Server is running http://localhost:${process.env.PORT}`);
});
