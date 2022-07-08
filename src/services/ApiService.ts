import axios from "axios";
import { ApiConstants } from "../constants/ApiConstants";
import { QueryConstants } from "../constants/QueryConstants";
import { IContinent } from "../utils/Interfaces";

export class ApiService {
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

    static async fetchAllContinents() {
        const data = await this.fetch(QueryConstants.fetchAllContinents, null);
        return data;
    }

    static async fetchAllLanguages() {
        const data = await this.fetch(QueryConstants.fetchAllLanguages, null);
        return data;
    }

    static async fetchCountriesFromContinent(continent: IContinent) {
        const data = await this.fetch(QueryConstants.fetchCountriesFromContinent, { code: continent.code });
        return data;
    }
}
