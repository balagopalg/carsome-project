import { customDb } from "../utils/mysql-controller"
import { isEmpty } from 'lodash'
import { decimalCount, validateFreeText } from "../utils/utils"

export { addReview }

const addReview = async (req, res, next): Promise<any>=> {
    // Input
    const { productId, rating } = req.body
    let { review } = req.body
    // Validations
    if(isNaN(productId)) res.send({status: false, message: 'Invalid Product Id'})
    if(!decimalCount(rating, 2) || rating > 5) res.send({status: false, message: 'Invalid Rating'})
    if(isNaN(rating)) res.send({status: false, message: 'Invalid Rating'})
    if(!isEmpty(review)) if(!validateFreeText(review, 300)) res.send({status: false, message: 'Review exceed the text limit'})

    if(isEmpty(review)) review = null

    let insertQuery = 'INSERT into Ratings '
    let condition =  `(product_id, rating, review) VALUES (${productId}, ${rating}, '${review}')`
    if(isEmpty(review)) condition = `(product_id, rating) VALUES (${productId}, ${rating})`

    try {

        let query = `
            SELECT name 
            FROM Products p
            WHERE p.active = 1 AND p.id = ${productId}
        `
        let result = await customDb(null, query)
        if(isEmpty(result)) res.send({status: false, message: 'Invalid Product Id'})

        query = ` ${insertQuery} ${condition} `
        result = await customDb(null, query)
        res.send({status: true, message: 'successful'})
    }
    catch (err) {
        next(err)
    }
}