import reviewService from '../services/reviewService.js';

// const handleReviewPage = async (req, res) => {
//     try {
//         const reviews = await reviewService.getAllReviews();
//         res.render('home', {
//             data: {
//                 title: 'Review List',
//                 page: 'review',
//                 reviews: reviews, // Đảm bảo reviews được truyền vào đúng chỗ
//                 username: req.session.user.username,
//             },
//         });
//     } catch (error) {
//         console.error('Error fetching reviews:', error);
//         res.status(500).send('Internal Server Error');
//     }
// }
const handleReviewPage = async (req, res) => {
    try {
        const { reviews, productRatings } = await reviewService.getAllReviews();
        res.render('home', {
            data: {
                title: 'Review List',
                page: 'review',
                reviews: reviews, 
                productRatings: productRatings, // Gửi productRatings vào
                username: req.session.user.username,
            },
        });
    } catch (error) {
        console.error('Error fetching reviews:', error);
        res.status(500).send('Internal Server Error');
    }
}


export default { handleReviewPage };