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

export const onSelectCountry = (filter: IFilter, country: ICountry): IFilter => {
    if (country.code === filter.country.code) {
        return filter;
    }
    const newFilter = { ...filter };
    newFilter.country = country;
    if (newFilter?.language?.code) {
        newFilter.language = DefaultFilter.language;
    }

    return newFilter;
};

export const onSelectLanguage = (filter: IFilter, language: ILanguage): IFilter => {
    if (language.code === filter.language.code) {
        return filter;
    }
    const newFilter = { ...filter };
    newFilter.language = language;
    if (newFilter?.country?.code) {
        newFilter.country = DefaultFilter.country;
    }

    return newFilter;
};
