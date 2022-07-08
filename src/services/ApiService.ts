import axios from "axios";
import { ApiConstants } from "../constants/ApiConstants";
import { QueryConstants } from "../constants/QueryConstants";
import { IContinent } from "../utils/Interfaces";

export default class ApiService {
    private static async fetch(query: string, variables: any) {
        const result = await axios({
            url: ApiConstants.URL,
            method: ApiConstants.post,
            data: {
                query: query,
                variables: variables,
            },
        });

        return result.data.data;
    }

    static async fetchInitData() {
        const data = await this.fetch(QueryConstants.fetchInitData, null);
        return data;
    }

    static async fetchCountriesFromContinent(continent: IContinent) {
        const data = await this.fetch(QueryConstants.fetchCountriesFromContinent, { code: continent.code });
        return data;
    }
}
