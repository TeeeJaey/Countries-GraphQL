import Dashboard from "./Dashboard";
import { act, render, waitFor } from "@testing-library/react";
import ApiService from "../../services/ApiService";
import { testContinents, testLanugages } from "../../constants/TestConstants";

describe("Dashboard", () => {
    it("should render", () => {
        ApiService.fetchInitData = jest.fn().mockResolvedValue({ continents: testContinents, languages: testLanugages });

        act(async () => {
            const component = render(<Dashboard />);
            await waitFor(() => {
                expect(component.getByTestId("dashboard")).toBeInTheDocument();
            });
        });
    });
});
