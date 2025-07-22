import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { act } from "react";
import Body from "../Body";
import MOCK_DATA from "../mocks/mokResListData.json";
import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom";

// Mock global fetch
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve(MOCK_DATA),
  })
);

// ✅ Test 1: Search button presence
it("Should render the Body Component With Search", async () => {
  await act(async () =>
    render(
      <BrowserRouter>
        <Body />
      </BrowserRouter>
    )
  );

  const searchBtn = screen.getByRole("button", { name: "Search" });
  expect(searchBtn).toBeInTheDocument();
});

// ✅ Test 2: Top Rated filter
it("Should filter top-rated restaurants", async () => {
  render(
    <BrowserRouter>
      <Body />
    </BrowserRouter>
  );

  // Wait for all cards to render (initial list)
  await waitFor(() => {
    expect(screen.getAllByTestId("resCard").length).toBe(8);
  });

  const filterBtn = screen.getByRole("button", { name: /Top Rated/i });
  fireEvent.click(filterBtn);

  // Expect only 2 top-rated restaurants after filter
  const filteredCards = screen.getAllByTestId("resCard");
  expect(filteredCards.length).toBe(2);
});
