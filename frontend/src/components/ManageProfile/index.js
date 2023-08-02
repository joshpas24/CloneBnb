import { useState } from "react";
import ManageSpots from "../ManageSpots";
import ManageBookings from "../ManageBookings";
import "./ManageProfile.css"


const ManageAccount = () => {
    const [view, setView] = useState('spots')
    // const [activePage, setActivePage] = useState()

    return (
        <div className="manage-container">
            <div className="profile-nav">
                <li className={view === 'profile' ? 'activePage' : null}>
                    <div >Profile</div>
                </li>
                <li className={view === 'spots' ? 'activePage' : null} onClick={() => setView('spots')}>
                    <div>Spots</div>
                </li>
                <li className={view === 'bookings' ? 'activePage' : null} onClick={() => setView('bookings')}>
                    <div>Bookings</div>
                </li>
            </div>
            <div>
                {view === 'spots' ? <ManageSpots /> : <ManageBookings />}
            </div>
        </div>
    )
}

export default ManageAccount;
