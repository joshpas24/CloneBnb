import { useState } from 'react';
import SpotsIndex from '../SpotsIndex';
import MapContainer from '../Maps';
import './Home.css'

const HomePage = () => {
    const [view, setView] = useState("grid")


    const toggleView = () => {
        if (view === 'grid') {
            setView('map')
        } else {
            setView('grid')
        }
    }

    const handleView = () => {
        if (view === 'grid') {
            return (
                <SpotsIndex />
            )
        } else {
            return (
                <MapContainer />
            )
        }
    }

    return (
        <>
            {handleView()}
            <div className='home-toggle'>
                <button onClick={() => toggleView()} className='toggle-button'>
                    {view === 'grid' ? (
                        <div className='button-content'>
                            <div>Show map</div>
                            <i class="fa-regular fa-map"></i>
                        </div>
                    ): (
                        <div className='button-content'>
                            <div>Show list</div>
                            <div className='grid-icon'>
                                <i class="fa-solid fa-square-full"></i>
                                <i class="fa-solid fa-square-full"></i>
                                <i class="fa-solid fa-square-full"></i>
                                <i class="fa-solid fa-square-full"></i>
                            </div>
                        </div>
                    )}
                </button>
            </div>
        </>
    )
}

export default HomePage;
