import { express } from '../../index'
import { addReview } from '../controller/addReview'
import { productDetails } from '../controller/products'
import { productReviews } from '../controller/reviews'

const route = express.Router()

route.get('/getProducts', productDetails)
route.post('/getReview', productReviews)
route.post('/addReview', addReview)

export { route }
