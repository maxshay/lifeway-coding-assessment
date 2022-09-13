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
  searchUser.mockResolvedValue([[], null]); // [dataReturned, errorReturned]

  render(<App />);
  await userEvent.type(screen.getByRole("textbox"), "blahblah");
  await userEvent.click(screen.getByRole("button"));

  const loading = screen.queryByText(/loading/);
  await waitFor(() => expect(loading).not.toBeInTheDocument());

  const noResultsNode = await waitFor(() => screen.getByTestId("no-results"));
  expect(noResultsNode).toBeInTheDocument();
  expect(searchUser).toHaveBeenCalledTimes(1);
});

test("shows error on api error", async () => {
  searchUser.mockResolvedValue([null, "Could not complete request"]); // [dataReturned, errorReturned]

  render(<App />);
  await userEvent.type(screen.getByRole("textbox"), "blahblah");
  await userEvent.click(screen.getByRole("button"));

  const loading = screen.queryByText(/loading/);
  await waitFor(() => expect(loading).not.toBeInTheDocument());

  const fetchErrorNode = await waitFor(() => screen.getByTestId("fetch-error"));
  expect(fetchErrorNode).toBeInTheDocument();
  expect(searchUser).toHaveBeenCalledTimes(1);
});

test("displays table on successful result", async () => {
  const data = [
    {
      name: "Luke Skywalker",
      height: "172",
      mass: "77",
      hair_color: "blond",
      skin_color: "fair",
      eye_color: "blue",
      birth_year: "19BBY",
      gender: "male",
      homeworld: "https://swapi.dev/api/planets/1/",
      films: [
        "https://swapi.dev/api/films/1/",
        "https://swapi.dev/api/films/2/",
        "https://swapi.dev/api/films/3/",
        "https://swapi.dev/api/films/6/",
      ],
      species: [],
      vehicles: [
        "https://swapi.dev/api/vehicles/14/",
        "https://swapi.dev/api/vehicles/30/",
      ],
      starships: [
        "https://swapi.dev/api/starships/12/",
        "https://swapi.dev/api/starships/22/",
      ],
      created: "2014-12-09T13:50:51.644000Z",
      edited: "2014-12-20T21:17:56.891000Z",
      url: "https://swapi.dev/api/people/1/",
    },
  ];
  searchUser.mockResolvedValue([data, null]); // [dataReturned, errorReturned]

  render(<App />);
  await userEvent.type(screen.getByRole("textbox"), "blahblah");
  await userEvent.click(screen.getByRole("button"));

  const loading = screen.queryByText(/loading/);
  await waitFor(() => expect(loading).not.toBeInTheDocument());

  const fetchErrorNode = await waitFor(() => screen.getByRole("table"));
  expect(fetchErrorNode).toBeInTheDocument();
  expect(searchUser).toHaveBeenCalledTimes(1);
});
