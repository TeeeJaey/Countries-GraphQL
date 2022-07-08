export const QueryConstants = {
    fetchInitData: `
        query {
            continents {
                code,
                name
            },
            languages {
                code,
                name,
                native
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
};
