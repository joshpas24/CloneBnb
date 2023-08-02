import { useState } from 'react';
import SpotsIndex from '../SpotsIndex';
import MapContainer from '../Maps';
import './Home.css'

const HomePage = () => {
    const [view, setView] = useState("grid")


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
            <div className='home-header'>
                <div>
                    Filter
                </div>
                <div className='view-toggle'>
                    <button onClick={() => setView('map')} id='view-toggle-left' className={view === 'map' ? 'active-view' : 'non-active-view'}>
                        <i class="fa-regular fa-map"></i>
                    </button>
                    <button onClick={() => setView('grid')} id='view-toggle-right' className={view === 'grid' ? 'active-view' : 'non-active-view'}>
                        <div className='grid-icon'>
                            <i class="fa-solid fa-square"></i>
                            <i class="fa-solid fa-square"></i>
                            <i class="fa-solid fa-square"></i>
                            <i class="fa-solid fa-square"></i>
                        </div>
                    </button>
                </div>
                <div>
                    Sort
                </div>
            </div>
            {handleView()}
        </>
    )
}

export default HomePage;
