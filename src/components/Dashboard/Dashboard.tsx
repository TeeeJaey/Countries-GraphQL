import React, { useState, useEffect } from "react";
import "./Dashboard.css";
import List from "../List/List";
import Dropdown from "../Dropdown/Dropdown";
import ApiService from "../../services/ApiService";
import { DefaultFilter } from "../../constants/DefaultStateConstants";
import { ICountry, ILanguage, IContinent, IList, IFilter } from "../../utils/Interfaces";
import { filterCountriesByLanguage } from "../../utils/helpers";

/**
 * Main dashboard component includes all other components
 * and the States to handle data for the app
 * @returns JSX
 */
export default function Dashboard() {
    const [continents, setContinents] = useState<IContinent[]>([]);
    const [countries, setCountries] = useState<ICountry[]>([]);
    const [languages, setLanguages] = useState<ILanguage[]>([]);

    const [filter, setFilter] = useState<IFilter>(DefaultFilter);
    const [list, setList] = useState<IList[]>([]);

    // #region - Initial API call for continents and Languages
    useEffect(() => {
        if (continents?.length > 0) return;
        ApiService.fetchInitData().then(res => {
            setContinents(res.continents);
            setLanguages(res.languages);
        });
    }, []);
    // #endregion

    // #region - API call to get countries on change of continent
    useEffect(() => {
        if (!filter?.continent?.code) return;
        ApiService.fetchCountriesFromContinent(filter.continent).then(res => {
            setCountries(res.continent.countries);
        });
    }, [filter.continent.code]);
    // #endregion

    // #region - Set display list on change of country
    useEffect(() => {
        if (!filter?.country?.code) return;
        setList(filter.country.languages);
    }, [filter.country.code]);
    // #endregion

    // #region - Set display list on change of language
    useEffect(() => {
        if (!filter?.language?.code) return;
        setList(filterCountriesByLanguage(countries, filter.language));
    }, [filter.language.code]);
    // #endregion

    return (
        <div data-testid="dashboard">
            {continents.length > 0 ? (
                <>
                    <span className="heading">Filters</span>
                    <div className="dropdown-list">
                        <Dropdown
                            list={continents}
                            selected={filter.continent}
                            onSelect={(continent: IContinent) => {
                                setFilter({ ...DefaultFilter, continent });
                                setList([]);
                            }}
                        />
                    </div>

                    <div className="dropdown-list">
                        {filter?.continent?.code && (
                            <>
                                <Dropdown
                                    list={countries}
                                    selected={filter.country}
                                    onSelect={(country: ICountry) => setFilter({ ...filter, country, language: DefaultFilter.language })}
                                />
                                <Dropdown
                                    list={languages}
                                    selected={filter.language}
                                    onSelect={(language: ILanguage) => setFilter({ ...filter, country: DefaultFilter.country, language })}
                                />
                            </>
                        )}
                    </div>

                    <hr className="hr-line" />

                    {filter?.country?.code && <span className="heading">Languages</span>}
                    {filter?.language?.code && <span className="heading">Countries</span>}

                    {list.length > 0 ? (
                        <List list={list} />
                    ) : (
                        filter?.country?.code || (filter?.language?.code && <div className="no-data">No Data</div>)
                    )}
                </>
            ) : (
                <img src={require("../../assets/loading.gif")} className="loading-gif" />
            )}
        </div>
    );
}
