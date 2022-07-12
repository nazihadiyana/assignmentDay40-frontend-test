import React from "react";
import { render } from "@testing-library/react";
import App from "../App";

test("renders query dom", () => {
  // Possible but not advisable
  const { container } = render(<App />);
  // `container` is just a DOM node
  container.querySelector("button");
});
