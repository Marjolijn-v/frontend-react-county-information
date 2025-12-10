import './App.css';
import axios from 'axios';
import world_map from './assets/world_map.png'
import {useState} from "react";
import coloredRegionName from "./assets/helpers/coloredRegionName.js";


function App() {

    const [countries, setCountries] = useState([])
    const [error, toggleError] = useState(false)
    const [loading, toggleLoading] = useState(false)



    async function fetchCountries () {

        try {
            toggleLoading(true);
            toggleError(false);
            const result = await axios.get('https://restcountries.com/v3.1/all?fields=name,flags,population,region');
            console.log(result.data);

            result.data.sort((a, b) => {
                return a.population - b.population;
            })

            setCountries(result.data);
        } catch (error) {
            console.error(error);
            toggleError(true);
        } finally {
            toggleLoading(false);

        }

    }



    return (
        <>
            <header>
                <img className="header-image" src={world_map} alt="map of the world"/>
                <h1>World Regions</h1>
            </header>

            <button type="button" onClick={fetchCountries} disabled={loading}>
                Fetch countries
            </button>

            {error && <p>Er is iets misgegaan. Probeer het nog eens</p>}


            <ul>
                {countries.map((country) => {
                    return (
                        <li key={country?.name?.official}>
                            <img className="flag" src={country?.flags?.svg} alt={country?.flags?.alt}/>
                            <h2 className={coloredRegionName(country?.region)}>{country?.name?.common}</h2>
                            <p>Has a population of {country?.population} people</p>
                        </li>
                    )
                })}
            </ul>

            {/*<img src={countries[0]?.flags?.svg} alt={countries?.flags?.alt}/>*/}
            {/*    <h2>{countries[0]?.name?.common}</h2>*/}
            {/*            <p>Has a population of {countries[0]?.population} people</p>*/}



        </>
    )
}

export default App
