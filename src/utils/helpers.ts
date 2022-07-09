import { DefaultFilter } from "../constants/DefaultStateConstants";
import { IContinent, ICountry, ILanguage, IFilter } from "./Interfaces";

export const onSelectContinent = (filter: IFilter, continent: IContinent): IFilter => {
    if (continent.code === filter.continent.code) {
        return filter;
    }
    const newFilter = { ...filter };
    newFilter.continent = continent;
    if (newFilter?.country?.code) {
        newFilter.country = DefaultFilter.country;
    }
    if (newFilter?.language?.code) {
        newFilter.language = DefaultFilter.language;
    }

    return newFilter;
};

export const filterCountriesByLanguage = (countries: ICountry[], language: ILanguage): ICountry[] => {
    if (!language?.code) return countries;
    return countries.filter(country => country.languages.some(lang => lang.code === language.code));
};
