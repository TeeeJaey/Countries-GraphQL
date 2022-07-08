import Dashboard from "./Dashboard";
import { render, waitFor } from "@testing-library/react";
import { act } from "react-dom/test-utils";

describe("Dashboard", () => {
    it("should render", async () => {
        act(async () => {
            const component = render(<Dashboard />);
            await waitFor(() => {
                expect(component.getByTestId("dashboard")).toBeInTheDocument();
            });
        });
    });
});
