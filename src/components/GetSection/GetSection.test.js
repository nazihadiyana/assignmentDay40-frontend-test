import "@testing-library/jest-dom";
import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import GetSection from "./view";
import axios from "axios";

jest.mock("axios");
const mockResponse = {
  data: [
    {
      id: 4,
      name: "Cookies",
      price: 200000,
      stock: 10,
      imageUrl: "",
    },
  ],
};
const mockError = {
  data: null,
  message: "Test Error",
};
// Test query DOM case
test("GetSection Title", () => {
  render(<GetSection />);
  const headerElement = screen.getByText(/react axios get/i);
  expect(headerElement).toBeInTheDocument();
});

test("GetSection Get Button", () => {
  render(<GetSection />);
  const buttonElement = screen.getByText(/get all/i);
  expect(buttonElement).toBeInTheDocument();
});
test("GetSection Clear Get Button", () => {
  render(<GetSection />);
  const buttonElement = screen.getByText(/clear/i);
  expect(buttonElement).toBeInTheDocument();
});

// Test API Call case
test("renders products", async () => {
  await act(async () => {
    await axios.get.mockImplementationOnce(() => Promise.resolve(mockResponse));
    render(<GetSection />);

    const button = screen.getByTestId("get-button");
    userEvent.click(button);
  });

  const response = screen.getByTestId("get-response");
  expect(response).toBeInTheDocument();
});

test("renders error", async () => {
  await act(async () => {
    await axios.get.mockImplementationOnce(() => Promise.reject(mockError));
    render(<GetSection />);

    const button = screen.getByTestId("get-button");
    userEvent.click(button);
  });
});
