import { waitFor } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { QueryConstants } from "../constants/QueryConstants";
import { testContinents, testCountries, testLanugages } from "../constants/TestConstants";
import ApiService from "./ApiService";

describe("ApiService", () => {
    it("#fetchInitData should call fetch and return recieved data", () => {
        const fetch = jest.spyOn(ApiService as any, "fetch");
        fetch.mockResolvedValue({ continents: testContinents, languages: testLanugages });

        ApiService.fetchInitData().then(res => {
            expect(res.continents).toBe(testContinents);
            expect(res.languages).toBe(testLanugages);
        });
    });
});
