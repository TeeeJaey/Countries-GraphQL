import Dashboard from "./Dashboard";
import { act, render, waitFor } from "@testing-library/react";
import { ApiService } from "../../services/ApiService";
import { testContinents } from "../../constants/TestConstants";

describe("Dashboard", () => {
    it("should render", () => {
        ApiService.fetchAllContinents = jest.fn().mockResolvedValue(testContinents);

        act(async () => {
            const component = render(<Dashboard />);
            await waitFor(() => {
                expect(component.getByTestId("dashboard")).toBeInTheDocument();
            });
        });
    });
});
