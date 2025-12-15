import './App.css';
import axios from 'axios';
import world_map from './assets/world_map.png'
import {useState} from "react";
import coloredRegionName from "./assets/helpers/coloredRegionName.js";
import populationMillions from "./assets/helpers/populationMillions.js";


function App() {

    const [countries, setCountries] = useState([]);
    const [error, toggleError] = useState(false);
    const [loading, toggleLoading] = useState(false);
    const [searchResult, setSearchResult] = useState(0);
    const [inputValue, setInputValue] = useState('');



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

    async function searchCountries () {
        try {
            toggleLoading(true);
            toggleError(false);
            const outcome = await axios.get('https://restcountries.com/v3.1/name/nederland');
            console.log(outcome.data);
            console.log(outcome.data[0]?.capital[0]);
            console.log(outcome.data[0]?.name?.common);

            setSearchResult(outcome.data[0]);


        } catch (error) {
            console.error(error);
            toggleError(true)

        } finally {
            toggleLoading(false)

        }
    }




    return (
        <>
            <header>
                <img className="header-image" src={world_map} alt="map of the world"/>
                <h1>World Regions</h1>
            </header>

            <div className="button-wrapper">
            <button type="button" onClick={fetchCountries} disabled={loading}>
                Fetch all countries
            </button>
            </div>

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


            <input type="text"
                   name="search"
                   id="search-field"
                   value={inputValue}
                   onChange={(e) => setInputValue(e.target.value)}
                   onKeyDown={(e) => e.key === "Enter" && searchCountries()}

            />
            <button type="button" onClick={searchCountries}>Search</button>


            <div className="container-search-result">
                <img className="flag" src={searchResult.flags?.svg} alt={searchResult.flags?.alt}/>
                <h2>{searchResult.name?.common}</h2>
                <p>{searchResult.name?.common} is situated in {searchResult.subregion} and the capital
                    is {searchResult.capital}. </p>
                <p>It has a population of {populationMillions(searchResult.population)} million people and it borders with {searchResult.borders?.length} neighboring countries</p>
            </div>
        </>
    )
}

export default App
