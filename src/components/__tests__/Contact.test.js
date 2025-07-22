import React from "react"; // ✅ Required for JSX
import { render, screen } from "@testing-library/react";
import Contact from "../Contact";
import "@testing-library/jest-dom";

describe("Contact Us Page Test Case", () => {
test("Should load contact us component", () => {
    render(<Contact/>);

    const heading = screen.getByRole("heading");

    expect(heading).toBeInTheDocument();
});

it("Should load button inside contact component", () => {
    render(<Contact/>);

    const button = screen.getByRole("button");

    expect(button).toBeInTheDocument();
});
});