import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import { register } from './interfaces/register.interface';
import mongoose, { ConnectOptions } from 'mongoose';

dotenv.config();

const app: Express = express();
const port = process.env.PORT;
const VERSION: string = "/api/v1";
const BASE_URL: string = "auth";
app.use(express.json());
app.use(express.urlencoded());

mongoose.connect("mongodb://localhost:27017/crpto-market", {
  autoIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true
} as ConnectOptions).then(data =>{
    console.log("connected")
    data.model("credential", credentialSchema, "credentials").create({
      email: "koko@B.com",
      username: "koko-billions",
      password: "Koko@0611" 
    }).then(data =>{
      console.log(data)
    }).catch(error =>{
      console.log(error)
    })
}).catch(error => console.log(error))

const credentialSchema = new mongoose.Schema({
  username: {
    type: String,
    reqiured: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  }
})



app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});

app.post(`${VERSION}/${BASE_URL}/register`, (req:Request, res:Response)=>{
    let data:register = req.body;
    console.log(data);
    res.status(201).json({
      message: "User Registered Successfully"
    })
})

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});
