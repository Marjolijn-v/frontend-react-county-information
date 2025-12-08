import './App.css';
import axios from 'axios';
import world_map from './assets/world_map.png'


function App() {

    async function fetchCountries () {
        try {
            const result = await axios.get('https://restcountries.com/v3.1/all?fields=name');
            console.log(result.data);
        } catch (error) {
            console.error(error);
        }

    }

    fetchCountries();



    return (
        <>
            <header>
                <img className="header-image" src={world_map} alt="map of the world"/>
            </header>
            <button>

            </button>

        </>
    )
}

export default App
