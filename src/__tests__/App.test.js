import React from "react";
import { render, screen } from "@testing-library/react";
import App from "../App";

test("renders query dom", () => {
  // Possible but not advisable
  const { container } = render(<App />);
  // `container` is just a DOM node
  container.querySelector("button");
});

test("render text", async () => {
  render(<App />);

  const linkElement = screen.getByText("React Axios GET");
  expect(linkElement).toBeInTheDocument();

  const linkElement1 = screen.getByText("React Axios POST");
  expect(linkElement1).toBeInTheDocument();
});

test("renders Query DOM", async () => {
  render(<App />);

  const linkElement = await screen.findByText(
    "React Axios example - netlify 11/06/2022"
  );
  expect(linkElement).toBeInTheDocument();
});
