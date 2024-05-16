import express, { NextFunction, Request, Response } from "express";
const app = express();
const port = 3000;

// parsers
app.use(express.json());
app.use(express.text());

// middlewares
const logger = (req: Request, res: Response, next: NextFunction) => {
  console.log(req.url, req.method, req.hostname);
  next();
};

// what about router in express
const userRouter = express.Router();
const courseRouter = express.Router();

app.use("/api/v1/users", userRouter);
app.use("/api/v1/courses", courseRouter);

// user route
userRouter.post("/create-user", (req: Request, res: Response) => {
  const user = req.body;
  console.log(user);
  res.json({
    success: true,
    message: "user created successfully",
    data: user,
  });
});

// courses
courseRouter.post("/create-course", (req: Request, res: Response) => {
  const course = req.body;
  console.log(course);
  res.json({
    success: true,
    message: "course created successfully",
    data: course,
  });
});

// get params
// app.get("/:userId/:subId", (req: Request, res: Response) => {
//   console.log(req.params)
//   res.send("Hello Developer!");
// });

// get query
// http://localhost:5000?email=apuraba@gmail.com
// app.get("/", logger, (req: Request, res: Response) => {
//   console.log(req.query.email);
//   res.send("Hello Developer!");
// });

// handle errors using global errors
app.all("*",(req: Request, res:Response)=> {
  res.status(400).json({
    success: false,
    message: "Route is not found"
  })
})

app.get(
  "/",
  logger,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      res.send(something);
    } catch (error) {
      console.log({ error });
      next(error);
    }
  }
);

app.post("/", logger, (req: Request, res: Response) => {
  console.log(req.body);
  res.send("got data!");
});

// global error handler
app.use((error: any, req: Request, res: Response, next: NextFunction) => {
  console.log(error);

  if (error) {
    res.status(400).json({
      success: false,
      message: "soemthing went wrong",
    });
  }
});

export default app;
