export const QueryConstants = {
    fetchAllContinents: `
        query {
            continents {
                code,
                name
            }
        }
    `,

    fetchCountriesFromContinent: `
        query getCountriesByContinent($code: ID!){
            continent(code: $code)  {
                countries {
                    code,
                    name,
                    native,
                    languages{
                        code,
                        name,
                        native
                    }
                }
            }
        }
    `,

    fetchAllLanguages: `
        query {
            languages {
                code,
                name,
                native
            }
        }
    `,
};
