import { customDb } from "../utils/mysql-controller"
import { isEmpty } from 'lodash'

export { productReviews }

const productReviews = async (req, res, next): Promise<any>=> {
    const { productId } = req.body

    if(isNaN(productId)) res.send({status: false, message: 'Invalid Product Id'})

    try {
        let query = `
            SELECT rating, review,
            (SELECT ROUND(AVG(rating), 2) FROM Ratings ra WHERE ra.product_id = ${productId}) AS averageRatings 
            FROM Ratings r
            INNER JOIN Products p ON r.product_id = p.id
            WHERE p.active = 1 AND r.product_id = ${productId}
        `
        const result = await customDb(null, query)
        if(isEmpty(result)) res.send({status: false, message: 'Invalid Product Id'})
        res.send(({status: true, message: 'successful', result}))
    }
    catch (err) {
        next(err)
    }
}