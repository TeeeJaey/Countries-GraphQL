import { ICountry, ILanguage } from "./Interfaces";

export const filterCountriesByLanguage = (countries: ICountry[], language: ILanguage): ICountry[] => {
    if (!language?.code) return countries;
    return countries.filter(country => country.languages.some(lang => lang.code === language.code));
};
