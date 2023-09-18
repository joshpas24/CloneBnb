import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { thunkCreateSpot } from "../../store/spots";
import './SpotForm.css'

const CreateSpotForm = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const [country, setCountry] = useState();
    const [address, setAddress] = useState();
    const [city, setCity] = useState();
    const [state, setState] = useState();
    const [lat, setLat] = useState();
    const [lng, setLng] = useState();
    const [description, setDescription] = useState();
    const [name, setName] = useState();
    const [price, setPrice] = useState();
    const [images, setImages] = useState([]);
    const [files, setFiles] = useState([]);
    const [buffer, setBuffer] = useState(false)
    const [imageType, setImageType] = useState('links')
    const [preview, setPreview] = useState(0);
    const [errors, setErrors] = useState({});

    const handleSubmit = (e) => {
        e.preventDefault();
        const spot = {
            address,
            city,
            state,
            country,
            lat,
            lng,
            description,
            name,
            price
        };

        if (images.length > files.length) {
            dispatch(thunkCreateSpot(spot, images, buffer))
                .then((res) => {
                    if (res.errors) {
                        setErrors(res.errors)
                    } else {
                        history.push(`/spots/${res.id}`)
                    }
                })
        }

        if (files.length > images.length) {
            dispatch(thunkCreateSpot(spot, files, buffer))
                .then((res) => {
                    if (res.errors) {
                        setErrors(res.errors)
                    } else {
                        history.push(`/spots/${res.id}`)
                    }
                })
        }

    };

    const addImage = (e) => {
        e.preventDefault();
        const newImgArr = images;
        const url = e.target.value;
        let preview;
        if (!newImgArr.length) {
            preview = true
        } else {
            preview = false
        }
        newImgArr.push({url, preview})
        setImages(newImgArr)
    };

    const handleFileInputChange = (e) => {
        setFiles([...e.target.files]);
        setPreview(0)
      };

    useEffect(() => {
        if (images[preview]) {
            images[preview].preview = true
        }
    }, [preview])

    useEffect(() => {
        if (files.length) {
            setBuffer(true)
        }
        if (files.length > 5) {
            errors.files = 'Maximum of 5 images allowed'
        }
    }, [files]);

    const handleDeleteImage = (index) => {
        const updatedFiles = files.filter((_, i) => i !== index);
        setFiles(updatedFiles);
        setPreview(0);
    };

    const handlePreview = (index) => {
        setPreview(index);
    };

    const handleImage = () => {
        if (imageType === 'file') {
            return (
                <div className="file-input">
                    <input type='file' accept="image/png, image/jpeg" onChange={handleFileInputChange} multiple />
                    <div className="image-previews">
                        {files.map((file, index) => (
                            <div key={index} className={`file-image ${preview === index ? 'selected' : ''}`}>
                                <img src={URL.createObjectURL(file)} alt={`Image ${index}`} />
                                <button className="delete-button" onClick={() => handleDeleteImage(index)}>x</button>
                                <div className="select-overlay" onClick={() => handlePreview(index)}></div>
                            </div>
                        ))}
                    </div>
                    {errors.files && <p>{errors.files}</p>}
                </div>
            )
        } else if (imageType === 'link') {
            return (
                <div className="link-input">
                    <div className="image-entry">
                        {/* <input
                            type="checkbox"
                            checked={preview === 0}
                            onClick={() => setPreview(0)}
                        /> */}
                        <input
                            type="text"
                            placeholder="Preview Image URL"
                            onChange={(e) => addImage(e)}
                        />
                    </div>
                    <div className="image-entry">
                        {/* <input
                            type="checkbox"
                            checked={preview === 1}
                            onClick={() => setPreview(1)}
                        /> */}
                        <input
                            type="text"
                            placeholder="Image URL"
                            onChange={(e) => addImage(e)}
                        />
                    </div>
                    <div className="image-entry">
                        {/* <input
                            type="checkbox"
                            checked={preview === 2}
                            onClick={() => setPreview(2)}
                        /> */}
                        <input
                            type="text"
                            placeholder="Image URL"
                            onChange={(e) => addImage(e)}
                        />
                    </div>
                    <div className="image-entry">
                        {/* <input
                            type="checkbox"
                            checked={preview === 3}
                            onClick={() => setPreview(3)}
                        /> */}
                        <input
                            type="text"
                            placeholder="Image URL"
                            onChange={(e) => addImage(e)}
                        />
                    </div>
                    <div className="image-entry">
                        {/* <input
                            type="checkbox"
                            checked={preview === 4}
                            onClick={() => setPreview(4)}
                        /> */}
                        <input
                            type="text"
                            placeholder="Image URL"
                            onChange={(e) => addImage(e)}
                        />
                    </div>
                </div>
            )
        }
    }

    return (
        <div className="form-page-container">
        <h1>Create New Spot</h1>
        <form className="create-spot" onSubmit={handleSubmit}>
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
                <h3>Mention the best features of your space, any special amentities like fast wifi or parking, and what you love about the neighborhood.</h3>
                <textarea
                    placeholder="Please write at least 30 characters"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                {errors.description && <p>{errors.description}</p>}
            </section>
            <section>
                <h2>Create a title for your spot</h2>
                <h3>Catch guests' attention with a spot title that highlights what makes your place special.</h3>
                <input
                    placeholder="Name of your spot"
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
                        placeholder="Price per night (USD)"
                        onChange={(e) => setPrice(e.target.value)}
                    />
                    {errors.price && <p>{errors.price}</p>}
                </div>
            </section>
            <section className="add-images">
                <h2>Liven up your spot with photos</h2>
                <h3>Submit a file or link to at least one photo to publish your spot. If adding multiple images, please select one to be your spot's preview image.</h3>
                <div className="image-type">
                    <div className="image-radio">
                        {/* <input type="radio" id="file" name="imageType" onClick={() => setImageType('file')}/> */}
                        <input type="radio" id="file" name="imageType" onClick={() => alert('Feature undergoing maintenance. Please add images by links.')}/>
                        <div>File</div>
                    </div>
                    <div className="image-radio">
                        <input type="radio" id="link" name="imageType" onClick={() => setImageType('link')}/>
                        <div>Link</div>
                    </div>
                </div>
                {handleImage()}
            </section>
            <div className="form-bottom-div">
                <button
                    className="create-spot-button"
                >
                    Create Spot
                </button>
            </div>
        </form>
    </div>
    )
}

export default CreateSpotForm;
