import db from '../models/index';
// const getAllReviews = async () => {
//     try {
//         const reviews = await db.Review.findAll({
//             include: [
//                 {
//                     model: db.Customer, 
//                     as: 'customer', // Alias đã được định nghĩa trong quan hệ
//                     attributes: ['full_name']
//                 },
//                 {
//                     model: db.Product, 
//                     as: 'product', // Alias đã được định nghĩa trong quan hệ
//                     attributes: ['product_name']
//                 }
//             ]
//         });
//         return reviews;
//     } catch (error) {
//         console.error('Error fetching reviews:', error);
//         throw error;
//     }
// }
const getAllReviews = async () => {
    try {
        const reviews = await db.Review.findAll({
            include: [
                {
                    model: db.Customer, 
                    as: 'customer',
                    attributes: ['full_name']
                },
                {
                    model: db.Product, 
                    as: 'product', 
                    attributes: ['product_name']
                }
            ]
        });

        // Tính số lượng đánh giá theo từng mức sao
        const productRatings = {};

        reviews.forEach(review => {
            const productId = review.product_id;
            const rating = review.rating;

            if (!productRatings[productId]) {
                productRatings[productId] = {
                    1: 0,
                    2: 0,
                    3: 0,
                    4: 0,
                    5: 0
                };
            }
            productRatings[productId][rating]++;
        });

        // Gửi cả reviews và productRatings vào view
        return { reviews, productRatings };
    } catch (error) {
        console.error('Error fetching reviews:', error);
        throw error;
    }
}



export default { getAllReviews };