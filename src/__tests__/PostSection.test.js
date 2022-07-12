import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import PostSection from "../components/PostSection/view";

test("render user Action ", async () => {
  render(<PostSection />);

  const input = screen.getByTestId("judul");
  const event = new Event("change");
  input.value = "missile";
  input.dispatchEvent(event);

  expect(input).toHaveValue("missile");
});
