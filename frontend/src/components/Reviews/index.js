import { useSelector, useDispatch } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { useEffect } from 'react';
import { thunkDeleteReview, thunkGetSpotReviews } from '../../store/reviews';
import './Reviews.css'


const ReviewsIndex = ({ parent }) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { spotId } = useParams();
    const user = useSelector(state=>state.session.user)
    const reviewsObj = useSelector(state=>state.reviews);
    const reviews = Object.values(reviewsObj.spot);
    // console.log("reviews from components: ",reviews)

    useEffect(() => {
        dispatch(thunkGetSpotReviews(spotId))
    }, [spotId])

    function formatDate(dateString) {
        const options = { year: 'numeric', month: 'long' };
        const date = new Date(dateString);
        return date.toLocaleDateString(undefined, options);
    }

    const handleDelete = (review) => {
        console.log("review sent to delete thunk: ", review)
        dispatch(thunkDeleteReview(review))
        history.push(`/spots/${spotId}`)
    }

    if (parent === "spot") {
        return (
            <>
                {reviews.map(review => (
                    <div className='review'>
                        <div className='review-name'>{review.User.firstName}</div>
                        <div className='review-date'>{formatDate(review.createdAt)}</div>
                        <div className='review-review'>{review.review}</div>
                        {review.userId === user.id ? <button onClick={() => handleDelete(review)}>Delete</button> : ""}
                    </div>
                ))}
            </>
        )
    }
}

export default ReviewsIndex;
