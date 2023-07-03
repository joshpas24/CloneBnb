import { useHistory } from 'react-router-dom';
import './Navigation.css'

function HomeButton() {
    const history = useHistory();

    const returnHome = (e) => {
        e.preventDefault();
        history.push("/")
    }

    return (
        <button onClick={returnHome} className="navButton" id='homeButton'>
            <i className="fa-solid fa-ghost"></i>
            <div>CloneBnb</div>
        </button>
    )
};

export default HomeButton;
