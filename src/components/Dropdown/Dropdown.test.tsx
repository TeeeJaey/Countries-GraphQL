import Dropdown from "./Dropdown";
import { act, fireEvent, render, waitFor, within } from "@testing-library/react";
import { testCountries } from "../../constants/TestConstants";
import { IItem } from "../../utils/Interfaces";

describe("Dropdown", () => {
    const props = {
        list: testCountries,
        selected: testCountries[0],
        onSelect: (item: IItem) => {},
    };

    it("should render", () => {
        act(async () => {
            const component = render(<Dropdown {...props} />);
            await waitFor(() => {
                expect(component.getByTestId("dropdown")).toBeInTheDocument();
                expect(component.getByRole("button")).toBeInTheDocument();
            });
        });
    });

    it("should render and display list", () => {
        act(async () => {
            const component = render(<Dropdown {...props} />);

            await waitFor(() => {
                fireEvent.mouseOver(component.getByRole("button"));
                const items = component.getAllByTestId("dropdown-items");
                expect(items.length).toBe(testCountries.length);
            });
        });
    });
});
