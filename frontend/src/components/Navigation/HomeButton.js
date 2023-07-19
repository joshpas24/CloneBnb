import { useHistory } from 'react-router-dom';
import './Navigation.css'
import Logo from './Logo.png';

function HomeButton() {
    const history = useHistory();

    const returnHome = (e) => {
        e.preventDefault();
        history.push("/")
    }

    return (
        <button onClick={returnHome} className="navButton" id='homeButton'>
            <img src={Logo} alt="CloneBnb Logo" />
        </button>
    )
};

export default HomeButton;
