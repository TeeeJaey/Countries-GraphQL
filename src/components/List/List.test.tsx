import List from "./List";
import { act, render, waitFor } from "@testing-library/react";
import { testCountries, testLanugages } from "../../constants/TestConstants";

describe("List", () => {
    it("should render countries", () => {
        act(async () => {
            const component = render(<List list={testCountries} />);
            await waitFor(() => {
                expect(component.getByTestId("list-container")).toBeInTheDocument();
                const items = component.getAllByTestId("list-items");
                expect(items.length).toBe(testCountries.length);
            });
        });
    });

    it("should render languages", () => {
        act(async () => {
            const component = render(<List list={testLanugages} />);
            await waitFor(() => {
                expect(component.getByTestId("list-container")).toBeInTheDocument();
                const items = component.getAllByTestId("list-items");
                expect(items.length).toBe(testLanugages.length);
            });
        });
    });
});
