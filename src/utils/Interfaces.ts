export interface IItem {
    name: string;
    code: string;
}
export interface IContinent extends IItem {}

export interface ICountry extends IItem {
    native: string;
    languages: ILanguage[];
}

export interface ILanguage extends IItem {
    native: string;
}

export interface IList extends ILanguage {}

export interface IFilter {
    continent: IContinent;
    country: ICountry;
    language: ILanguage;
}

/* PROPS interfaces */
export interface IDropdownPropsType {
    list: any[];
    selected: { name: string; code?: string };
    onSelect: Function;
}

export interface IListPropsType {
    list: IList[];
}
