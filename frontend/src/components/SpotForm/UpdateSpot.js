import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { thunkCreateSpot, thunkGetSpot, thunkUpdateSpot } from "../../store/spots";
import './SpotForm.css'

const UpdateSpotForm = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { spotId } = useParams();
    const spot = useSelector(state=>state.spots.singleSpot)
    // const spot = spotObj[spotId]
    // console.log("update spot: ", spot)

    const [country, setCountry] = useState(spot.country);
    const [address, setAddress] = useState(spot.address);
    const [city, setCity] = useState(spot.city);
    const [state, setState] = useState(spot.state);
    const [lat, setLat] = useState(spot.lat);
    const [lng, setLng] = useState(spot.lng);
    const [description, setDescription] = useState(spot.description);
    const [name, setName] = useState(spot.name);
    const [price, setPrice] = useState(spot.price);
    const [images, setImages] = useState([]);
    const [preview, setPreview] = useState(0);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            const data = await dispatch(thunkGetSpot(spotId))
            setCountry(data.country)
            setAddress(data.address)
            setCity(data.city)
            setState(data.state)
            setDescription(data.description)
            setName(data.name)
            setPrice(data.price)
            setImages(data.SpotImages)
            // console.log("images: ", images)
            if (data.lat) {
                setLat(data.lat)
            }

            if (data.lng) {
                setLng(data.lng)
            }
        }
        fetchData()
    }, [dispatch, spotId])

    const handleSubmit = (e) => {
        e.preventDefault();

        const updatedSpot = {
            id: spot.id,
            country: country,
            address: address,
            city: city,
            state: state,
            lat: lat,
            lng: lng,
            description: description,
            name: name,
            price: price,
        }

        dispatch(thunkUpdateSpot(updatedSpot))
            .then((res) => {
                // console.log("res from dispatch thunk creator: ",res)
                if (res.errors) {
                    setErrors(res.errors)
                    console.log("errors set from thunk res: ", errors)
                } else {
                    history.push(`/spots/${res.id}`);
                }
            });

        return;

    };

    const addImage = (e) => {
        e.preventDefault();
        const newImgArr = images;
        const imgURL = e.target.value;
        let preview;
        if (newImgArr.length > 1) {
            preview = false
        } else {
            preview = true
        }
        newImgArr.push({imgURL, preview})
        setImages(newImgArr)
    };

    useEffect(() => {
        if (images[preview]) {
            images[preview].preview = true
        }
    }, [preview])

    return (
        <div className="form-page-container">
        <h1>Update Spot</h1>
        <form className="create-spot" onSubmit={(e) => handleSubmit(e)}>
            <section className="create-location">
                <h2>Where's your place located?</h2>
                <h3>Guests will only get your exact address once they booked a reservation.</h3>
                <label>
                    Street Address
                    <input
                        placeholder="e.g. 123 Park Ave"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                    />
                    {errors.address && <p>{errors.address}</p>}
                </label>
                <div className="same-line">
                    <label>
                        City
                        <input
                            placeholder="e.g. Los Angeles"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                        />
                        {errors.city && <p>{errors.city}</p>}
                    </label>
                    <label>
                        State
                        <input
                            placeholder="e.g. California"
                            value={state}
                            onChange={(e) => setState(e.target.value)}
                        />
                        {errors.state && <p>{errors.state}</p>}
                    </label>
                </div>
                <label>
                    Country
                    <input
                        placeholder="e.g. United States"
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                    />
                    {errors.country && <p>{errors.country}</p>}
                </label>
                <div className="same-line">
                    <label>
                        Latitude
                        <input
                            placeholder=""
                            value={lat}
                            onChange={(e) => setLat(e.target.value)}
                        />
                        {errors.lat && <p>{errors.lat}</p>}
                    </label>
                    <label>
                        Longitude
                        <input
                            placeholder=""
                            value={lng}
                            onChange={(e) => setLng(e.target.value)}
                        />
                        {errors.lng && <p>{errors.lng}</p>}
                    </label>
                </div>
            </section>
            <section>
                <h2>Describe your place to guests</h2>
                <h3>Mention the best features of your space, any special amentities like fast wif or parking, and what you love about the neighborhood.</h3>
                <textarea
                    placeholder="e.g. Fast Wi-Fi, walkable distance to bars and restaurants, & located in safe neighborhood, this is the spot to get the perfect LA experience!"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                {errors.description && <p>{errors.description}</p>}
            </section>
            <section>
                <h2>Create a title for your spot</h2>
                <h3>Catch guests' attention with a spot title that highlights what makes your place special.</h3>
                <input
                    placeholder="e.g. LA Dream House"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="spot-name-input"
                />
                {errors.name && <p>{errors.name}</p>}
            </section>
            <section>
                <h2>Set a base price for your spot</h2>
                <h3>Competitive pricing can help your listing stand out and rank higher in search results.</h3>
                <div className="price-entry">
                    $ <input
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                    />
                    {errors.name && <p>{errors.name}</p>}
                </div>
            </section>
            {/* <section className="add-images">
                <h2>Liven up your spot with photos</h2>
                <h3>Submit a link to at least one photo to publish your spot. If adding multiple images, please select one to be your spot's preview image.</h3>
                <div className="image-entry">
                    <input
                        type="checkbox"
                        checked={preview === 0}
                        onClick={() => setPreview(0)}
                    />
                    <input
                        type="text"
                        placeholder="Image URL (required)"
                        value={images[0].url}
                        onChange={(e) => addImage(e)}
                    />
                </div>
                <div className="image-entry">
                    <input
                        type="checkbox"
                        checked={preview === 1}
                        onClick={() => setPreview(1)}
                    />
                    <input
                        type="text"
                        placeholder="Image URL"
                        value={images[1].url}
                        onChange={(e) => addImage(e)}
                    />
                </div>
                <div className="image-entry">
                    <input
                        type="checkbox"
                        checked={preview === 2}
                        onClick={() => setPreview(2)}
                    />
                    <input
                        type="text"
                        placeholder="Image URL"
                        value={images[2].url}
                        onChange={(e) => addImage(e)}
                    />
                </div>
                <div className="image-entry">
                    <input
                        type="checkbox"
                        checked={preview === 3}
                        onClick={() => setPreview(3)}
                    />
                    <input
                        type="text"
                        placeholder="Image URL"
                        value={images[3].url}
                        onChange={(e) => addImage(e)}
                    />
                </div>
                <div className="image-entry">
                    <input
                        type="checkbox"
                        checked={preview === 4}
                        onClick={() => setPreview(4)}
                    />
                    <input
                        type="text"
                        placeholder="Image URL"
                        value={images[4].url}
                        onChange={(e) => addImage(e)}
                    />
                </div>
            </section> */}
            <div className="form-bottom-div">
                <button
                    className="create-spot-button"
                >
                    Update
                </button>
            </div>
        </form>
    </div>
    )
}

export default UpdateSpotForm;
