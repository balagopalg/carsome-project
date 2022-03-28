import express from 'express'
import { route } from './src/routes/router'
import { PORT } from './src/utils/env-constants'

export { express }

const app = express()

app.use(express.json())
app.use(
  express.urlencoded({
    extended: true,
  }),
)

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
})

app.use('/', route)

app.get('/', (req: express.Request, res: express.Response): void => {
  res.send('Product Feedback Forum!')
})

app.use((err: SqlError, req: express.Request, res: express.Response) => {
  console.error('ETT', err.errObj.sqlMessage)
  res.status(500).send(`Something broke! - ${err.errObj.sqlMessage} `)
})

app.listen(PORT, () => {
  console.info(`Server is up and running at http://localhost:${PORT}`)
})
