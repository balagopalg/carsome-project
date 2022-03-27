import { customDb } from "../utils/mysql-controller"
import { isEmpty } from 'lodash'

export { productDetails }

const productDetails = async (req, res, next): Promise<any>=> {
    try {
        let query = `
            SELECT Distinct id, name, 
            (SELECT ROUND(AVG(rating), 2) FROM Ratings ra WHERE ra.product_id = p.id) AS averageRatings
            FROM Products p
            LEFT JOIN Ratings r ON p.id = r.product_id
            WHERE active = 1
        `
        const result = await customDb(null, query)
        if(isEmpty(result)) res.send({status: false, message: 'No products found'})
        res.send({status: true, message: 'successful', result})
    }
    catch (err) {
        next(err)
    }
}