import { customDb } from "../utils/mysql-controller"
import { isEmpty } from 'lodash'
import { decimalCount, validateFreeText, _generateTimestamp } from "../utils/utils"

export { addReview }

const addReview = async (req, res, next): Promise<any>=> {
    // Input
    const { productId, rating } = req.body
    let { review } = req.body
    // Validations
    if(isNaN(productId)) res.send({status: false, message: 'Invalid Product Id'})
    if(!decimalCount(rating, 2) || rating > 5 || rating <= 0) res.send({status: false, message: 'Invalid Rating'})
    if(isNaN(rating)) res.send({status: false, message: 'Invalid Rating'})
    if(!isEmpty(review)) if(!validateFreeText(review, 300)) res.send({status: false, message: 'Review exceed the text limit'})

    if(isEmpty(review)) review = null

    const time = _generateTimestamp()

    let insertQuery = 'INSERT into Ratings '
    let condition =  `(product_id, rating, review, timestamp) VALUES (${productId}, ${rating}, '${review}', ${time})`
    if(isEmpty(review)) condition = `(product_id, rating, timestamp) VALUES (${productId}, ${rating}, ${time})`

    try {

        let query = `
            SELECT name 
            FROM Products p
            WHERE p.active = 1 AND p.id = ${productId}
        `
        let result = await customDb(null, query)
        if(isEmpty(result)) {
            res.send({status: false, message: 'Invalid Product Id'})
            return
        }

        query = ` ${insertQuery} ${condition} `
        result = await customDb(null, query)

        query = `
            SELECT rating, review,
            (SELECT ROUND(AVG(rating), 2) FROM Ratings ra WHERE ra.product_id = ${productId}) AS averageRatings 
            FROM Ratings r
            INNER JOIN Products p ON r.product_id = p.id
            WHERE p.active = 1 AND r.product_id = ${productId} ORDER BY timestamp DESC
        `
        result = await customDb(null, query)
        res.send({status: true, message: 'successful', result })
        return
    }
    catch (err) {
        next(err)
    }
}