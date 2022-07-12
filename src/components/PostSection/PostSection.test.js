import "@testing-library/jest-dom";
import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import axios from "axios";
import PostSection from "../PostSection/view";

jest.mock("axios");
const mockResponse = {
  data: {
    text: "okay",
  },
};
const mockError = {
  data: null,
  message: "error",
};

// Test query DOM case
test("PostSection Title", () => {
  render(<PostSection />);
  const headerElement = screen.getByText(/react axios post/i);
  expect(headerElement).toBeInTheDocument();
});
test("PostSection Post Button", () => {
  render(<PostSection />);
  const linkElement = screen.getByText(/Post Data/i);
  expect(linkElement).toBeInTheDocument();
});
test("PostSection Clear Post Button", () => {
  render(<PostSection />);
  const linkElement = screen.getByText(/Clear/i);
  expect(linkElement).toBeInTheDocument();
});
// Test User Action case
test("Render Title Input", () => {
  const testTitle = "judul";

  render(<PostSection />);
  const inputTitle = screen.getByTestId("title-input");

  userEvent.type(inputTitle, testTitle);

  const titleElement = screen.getByText(`Title: ${testTitle}`);

  expect(titleElement).toBeInTheDocument();
});

test("Render Description Input", () => {
  const testDescription = "description";

  render(<PostSection />);
  const inputDescription = screen.getByTestId("description-input");

  userEvent.type(inputDescription, testDescription);

  const descriptionElement = screen.getByText(
    `Description: ${testDescription}`
  );

  expect(descriptionElement).toBeInTheDocument();
});
test("Render Post Button Clicked", () => {
  render(<PostSection />);
  const button = screen.getByText(/post data/i);
  expect(button).toBeInTheDocument();
});
test("Render Clear Post Button Clicked", () => {
  render(<PostSection />);
  const buttonElement = screen.getByText(/clear/i);
  const button = screen.getByTestId("clear-button");
  userEvent.click(button);
  expect(buttonElement).toBeInTheDocument();
});
// Test API Call case
test("renders products", async () => {
  await act(async () => {
    await axios.post.mockImplementationOnce(() =>
      Promise.resolve(mockResponse)
    );
    render(<PostSection />);

    const button = screen.getByTestId("postdata-button");
    userEvent.click(button);
  });

  const response = screen.getByTestId("post-response");
  expect(response).toBeInTheDocument();
});

test("renders error", async () => {
  await act(async () => {
    await axios.post.mockImplementationOnce(() => Promise.reject(mockError));
    render(<PostSection />);

    const button = screen.getByTestId("postdata-button");
    userEvent.click(button);
  });
});
