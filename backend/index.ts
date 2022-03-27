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

app.use('/',route);


app.get('/', (Req:any, Res:any) => {
    Res.send('Server is Up & Healthy!')
})
app.use((err, req, res, next) => {
  res.status(500).send(`Something broke! - ${err.errObj.sqlMessage} `)
})
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

export { express }