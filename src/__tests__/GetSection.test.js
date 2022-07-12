import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import GetSection from "../components/GetSection/view";

test("rander data", async () => {
  render(<GetSection />);

  const button = screen.getByTestId("get-button");
  userEvent.click(button);

  await waitFor(() => {
    expect(screen.queryByTestId("getAllData")).toBe(null);
  });
});
