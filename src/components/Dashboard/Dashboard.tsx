import React, { useState, useEffect } from "react";
import { DefaultStateConstants } from "../../constants/DefaultStateConstants";
import { ApiService } from "../../services/ApiService";
import { ICountry, ILanguage, IContinent, IList } from "../../utils/Interfaces";
import Dropdown from "../Dropdown/Dropdown";
import "./Dashboard.css";
import List from "../List/List";

export default function Dashboard() {
    const [continents, setContinents] = useState<IContinent[]>([]);
    const [selectedContinent, setSelectedContinent] = useState<IContinent>(DefaultStateConstants.selectedContinent);

    const [countries, setCountries] = useState<ICountry[]>([]);
    const [selectedCountry, setSelectedCountry] = useState<ICountry>(DefaultStateConstants.selectedCountry);

    const [languages, setLanguages] = useState<ILanguage[]>([]);
    const [selectedLanguage, setSelectedLanguage] = useState<ILanguage>(DefaultStateConstants.selectedLanguage);

    const [list, setList] = useState<IList[]>([]);

    useEffect(() => {
        ApiService.fetchAllContinents().then(res => {
            console.log("Continents: ", res);
            setContinents(res.continents);
        });

        ApiService.fetchAllLanguages().then(res => {
            console.log("Languages: ", res);
            setLanguages(res.languages);
        });
    }, []);

    const onSelectContinent = (continent: IContinent) => {
        if (continent.code === selectedContinent.code) {
            return;
        }

        setSelectedCountry(DefaultStateConstants.selectedCountry);
        setSelectedLanguage(DefaultStateConstants.selectedLanguage);

        setSelectedContinent(continent);
        ApiService.fetchCountriesFromContinent(continent).then(res => {
            console.log("Countries: ", res.continent.countries);
            setCountries(res.continent.countries);
        });
    };

    const onSelectCountry = (country: ICountry) => {
        if (country.code === selectedCountry.code) {
            return;
        }

        setSelectedLanguage(DefaultStateConstants.selectedLanguage);
        setSelectedCountry(country);
        setList(country.languages);
        console.log(country);
    };

    const onSelectLanguage = (language: ILanguage) => {
        if (language.code === selectedLanguage.code) {
            return;
        }

        setSelectedCountry(DefaultStateConstants.selectedCountry);
        setSelectedLanguage(language);
        const list = countries.filter(country => {
            return country.languages.some(lang => lang.code === language.code);
        });
        setList(list);
        console.log(list);
    };

    return (
        <div data-testid="dashboard">
            <span className="heading">Filters</span>
            <div className="dropdown-list">
                <Dropdown list={continents} selected={selectedContinent} onSelect={(item: IContinent) => onSelectContinent(item)} />
            </div>
            <div className="dropdown-list">
                {selectedContinent?.code && (
                    <>
                        <Dropdown list={countries} selected={selectedCountry} onSelect={(item: ICountry) => onSelectCountry(item)} />
                        <Dropdown list={languages} selected={selectedLanguage} onSelect={(item: ILanguage) => onSelectLanguage(item)} />
                    </>
                )}
            </div>

            <hr />

            {selectedCountry.code && <span className="heading">Showing Languages</span>}
            {selectedLanguage.code && <span className="heading">Showing Countries</span>}
            {list.length > 0 ? <List list={list} /> : selectedCountry.code || selectedLanguage.code ? <div className="no-data">No Data</div> : <></>}
        </div>
    );
}
