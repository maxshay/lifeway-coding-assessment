import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
// import "jest-dom/extend-expect";
import "@testing-library/jest-dom";

import { searchUser } from "../../utils";
import App from "./App";

jest.mock("../../utils");

test("loads and displays prompt", async () => {
  render(<App />);
  expect(screen.getByText(/please use the search bar/i)).toBeInTheDocument();
});

test("shows no results on bad search", async () => {
  searchUser.mockResolvedValue([[], null]);

  render(<App />);
  await userEvent.type(screen.getByRole("textbox"), "blahblah");
  await userEvent.click(screen.getByRole("button"));

  const loading = screen.queryByText(/loading/);
  await waitFor(() => expect(loading).not.toBeInTheDocument());

  const noResultsNode = await waitFor(() => screen.getByTestId("no-results"));
  expect(noResultsNode).toBeInTheDocument();
  expect(searchUser).toHaveBeenCalledTimes(1);
});
