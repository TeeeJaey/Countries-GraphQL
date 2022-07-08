import React, { useState, useEffect } from "react";
import { DefaultFilter } from "../../constants/DefaultStateConstants";
import ApiService from "../../services/ApiService";
import { ICountry, ILanguage, IContinent, IList, IFilter } from "../../utils/Interfaces";
import Dropdown from "../Dropdown/Dropdown";
import "./Dashboard.css";
import List from "../List/List";
import { onSelectContinent, onSelectCountry, onSelectLanguage } from "../../utils/helpers";

export default function Dashboard() {
    const [continents, setContinents] = useState<IContinent[]>([]);
    const [countries, setCountries] = useState<ICountry[]>([]);
    const [languages, setLanguages] = useState<ILanguage[]>([]);

    const [filter, setFilter] = useState<IFilter>(DefaultFilter);
    const [list, setList] = useState<IList[]>([]);

    /* Initial API call for continents and Languages */
    useEffect(() => {
        ApiService.fetchInitData().then(res => {
            console.log("Continents: ", res.continents);
            console.log("Languages: ", res.languages);
            setContinents(res.continents);
            setLanguages(res.languages);
        });
    }, []);

    /* API call to get countries on change of continent */
    useEffect(() => {
        if (!filter?.continent?.code) return;
        ApiService.fetchCountriesFromContinent(filter.continent).then(res => {
            console.log("Countries: ", res.continent.countries);
            setCountries(res.continent.countries);
        });
    }, [filter.continent]);

    /* Set display list on change of country */
    useEffect(() => {
        if (!filter?.country?.code) return;
        setList(filter.country.languages);
    }, [filter.country]);

    /* Set display list on change of language */
    useEffect(() => {
        if (!filter?.language?.code) return;
        setList(countries.filter(country => country.languages.some(lang => lang.code === filter.language.code)));
    }, [filter.language]);

    return (
        <div data-testid="dashboard">
            {continents.length > 0 ? (
                <>
                    <span className="heading">Filters</span>
                    <div className="dropdown-list">
                        <Dropdown
                            list={continents}
                            selected={filter.continent}
                            onSelect={(item: IContinent) => setFilter(onSelectContinent(filter, item))}
                        />
                    </div>
                    <div className="dropdown-list">
                        {filter?.continent?.code && (
                            <>
                                <Dropdown
                                    list={countries}
                                    selected={filter.country}
                                    onSelect={(item: ICountry) => setFilter(onSelectCountry(filter, item))}
                                />
                                <Dropdown
                                    list={languages}
                                    selected={filter.language}
                                    onSelect={(item: ILanguage) => setFilter(onSelectLanguage(filter, item))}
                                />
                            </>
                        )}
                    </div>

                    <hr />

                    {filter?.country?.code && <span className="heading">Languages</span>}
                    {filter?.language?.code && <span className="heading">Countries</span>}

                    {list.length > 0 ? (
                        <List list={list} />
                    ) : filter?.country?.code || filter?.language?.code ? (
                        <div className="no-data">No Data</div>
                    ) : (
                        <></>
                    )}
                </>
            ) : (
                <img src={require("../../assets/loading.gif")} className="loading-gif" />
            )}
        </div>
    );
}
