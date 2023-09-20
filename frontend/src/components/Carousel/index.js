import React, { useState } from 'react'
import './Carousel.css'


function ImageCarousel({ images, type }) {

    const [imgIdx, setImgIdx] = useState(0)

    return (
        <div className='carousel-container'>
            <div className={`carousel-buttons-${type}`}>
                <button onClick={() => setImgIdx(imgIdx - 1)}
                    disabled={imgIdx === 0 ? true : false}
                >
                    <i class="fa-solid fa-angle-left"></i>
                </button>
                <button onClick={() => setImgIdx(imgIdx + 1)}
                    disabled={imgIdx === images.length - 1 ? true : false}
                >
                    <i class="fa-solid fa-angle-right"></i>
                </button>
            </div>
            <div className='carousel-images' >
                <img src={images[imgIdx].url} className='spotImage'/>
            </div>
        </div>
    )
}

export default ImageCarousel;
