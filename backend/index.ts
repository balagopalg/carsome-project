const express = require("express");
const app = express();
import { route } from './src/routes/router' 

const port = 3000;
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
})

app.use('/',route);


app.get('/', (req:any, res:any) => {
  req.send('Server is Up & Healthy!')
})
app.use((err, req, res, next) => {
  res.status(500).send(`Something broke! - ${err.errObj.sqlMessage} `)
})
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

export { express }