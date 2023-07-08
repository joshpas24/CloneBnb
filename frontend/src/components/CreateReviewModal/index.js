import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { thunkCreateReview } from '../../store/reviews';
import { useModal } from "../../context/Modal";
import './CreateReviewModal.css'

const CreateReview = ({ spotId }) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const [review, setReview] = useState();
    const [stars, setStars] = useState(0);
    const [errors, setErrors] = useState({});
    const { closeModal } = useModal();

    // useEffect(() => {
    //     setRating(rating)
    // }, [rating])

    const handleSubmit = (e) => {
        e.preventDefault();

        const newReview = {
            review,
            stars
        }
        console.log("review sent to thunk: ", newReview);

        dispatch(thunkCreateReview(newReview, spotId))
            .then((res) => {
                if (res.errors) {
                    console.log(res.errors)
                    setErrors(res.errors)
                } else {
                    history.push(`/spots/${spotId}`)
                }
            }).then(closeModal)

    }

    const handleReview = (e) => {
        e.preventDefault();
        setReview(e.target.value);
    }

    return (
        <div className='review-modal'>
            <h2>How was your stay?</h2>
            <form onSubmit={(e) => handleSubmit(e)} className='review-form'>
                <textarea placeholder='Type review here!'
                    onChange={(e) => handleReview(e)}
                />
                <div className='rating-input'>
                    <div className={stars >= 1 ? 'filled' : 'empty'}
                        onClick={() => setStars(1)}
                    >
                        <i className="fa-solid fa-star"></i>
                    </div>
                    <div className={stars >= 2 ? 'filled' : 'empty'}
                        onClick={() => setStars(2)}
                    >
                        <i className="fa-solid fa-star"></i>
                    </div>
                    <div className={stars >= 3 ? 'filled' : 'empty'}
                        onClick={() => setStars(3)}
                    >
                        <i className="fa-solid fa-star"></i>
                    </div>
                    <div className={stars >= 4 ? 'filled' : 'empty'}
                        onClick={() => setStars(4)}
                    >
                        <i className="fa-solid fa-star"></i>
                    </div>
                    <div className={stars >= 5 ? 'filled' : 'empty'}
                        onClick={() => setStars(5)}
                    >
                        <i className="fa-solid fa-star"></i>
                    </div>
                </div>
                <button>Submit Review</button>
            </form>
        </div>
    )
};

export default CreateReview;
