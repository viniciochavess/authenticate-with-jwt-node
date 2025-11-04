import expres from "express";
import { authRouter } from "./routes/auth";
import { userRouter } from "./routes/user";
const app = expres();

app.use(expres.json());

app.use(authRouter);
app.use(userRouter);

app.get("/ping", (req, res) => {
  res.send("pong");
});

app.listen(process.env.PORT!, () => {
  console.log(`Server is running http://localhost:${process.env.PORT}`);
});
