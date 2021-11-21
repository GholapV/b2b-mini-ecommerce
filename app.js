const express = require('express')
const app = express()
require('dotenv').config()
require('express-async-errors')

const helmet = require('helmet')
const cors = require('cors')
const xss = require('xss-clean')

const ConnectionDB = require('./Mongo-Atlas/connection')

const RegLogRouter = require('./Routers/register&login_route')
const StoreRouter = require('./Routers/ownerRouter/store_route')
const CartRouter = require('./Routers/userRouter/cart_route')
const Authentication = require('./Middlewares/authentication')
const Error_Handler = require('./Middlewares/error_handler')
const Route_Notfound = require('./Middlewares/route_notfound')

//swagger set up
const swaggerUI = require('swagger-ui-express')
const YAML = require('yamljs')
const swaggerDoc = YAML.load('./swagger.yaml')

app.set('trust proxy', 1)
app.use(express.json())
app.use(helmet())
app.use(cors())
app.use(xss())

app.get('/', (req, res) => {
    res.send("<h2>e-commerce API</h2><a href='/api-docs'>documentation</a>")
})

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDoc))

app.use('/e-commerce/v1/api', RegLogRouter)
app.use('/e-commerce/v1/api', StoreRouter)
app.use('/e-commerce/v1/api/user', Authentication, CartRouter)

app.use(Route_Notfound)
app.use(Error_Handler)


//port provided or 5000
const port = process.env.PORT || 5000


{
    (async function () {
        try {
            await ConnectionDB(process.env.MONGO_URI)
            app.listen(port, () => console.log(`listening @port ${port}...`))
        } catch (err) {
            console.log({ ConnectionERR: err });
        }
    })();
}
