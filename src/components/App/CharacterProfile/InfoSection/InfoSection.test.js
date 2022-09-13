import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import InfoSection from "./InfoSection";

test("displays each item in info section", async () => {
  const TITLE = "films";
  const DETAILS = ["A New Hope", "Return of the Jedi"];

  render(<InfoSection title={TITLE} details={DETAILS} />);

  DETAILS.forEach((detail) => {
    expect(screen.getByText(detail)).toBeInTheDocument();
  });
});

test("displays 'no info' on empty details", async () => {
  const TITLE = "startships";
  const DETAILS = [];

  render(<InfoSection title={TITLE} details={DETAILS} />);

  expect(screen.getByText("No Info")).toBeInTheDocument();
});
