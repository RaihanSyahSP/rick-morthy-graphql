import "@testing-library/jest-dom/jest-globals";
import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";

import { BrowserRouter } from "react-router-dom";
import { CardEpisode } from "@/components/card-episode";
import { ResultEpisodes } from "@/types";

// Mock useNavigate from react-router-dom
const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

// Mock data for the component
const mockEpisode: ResultEpisodes = {
  id: "1",
  name: "Pilot",
  air_date: "December 2, 2013",
  characters: [
    {
      id: "1",
      name: "Rick Sanchez",
      image: "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
      status: "Alive",
      species: "",
      gender: "",
    },
    {
      id: "2",
      name: "Morty Smith",
      image: "https://rickandmortyapi.com/api/character/avatar/2.jpeg",
      status: "Alive",
      species: "",
      gender: "",
    },
  ],
};

describe("CardEpisode Component", () => {
  test("renders episode details", () => {
    render(
      <BrowserRouter>
        <CardEpisode {...mockEpisode} index={0} />
      </BrowserRouter>
    );

    expect(screen.getByText("Pilot")).toBeInTheDocument();
    expect(screen.getByText("Air Date: December 2, 2013")).toBeInTheDocument();
    expect(screen.getByText("Rick Sanchez")).toBeInTheDocument();
    expect(screen.getByText("Morty Smith")).toBeInTheDocument();
  });

  test("navigates to character details on character click", () => {
    render(
      <BrowserRouter>
        <CardEpisode {...mockEpisode} index={0} />
      </BrowserRouter>
    );

    fireEvent.click(screen.getByText("Rick Sanchez"));
    expect(mockNavigate).toHaveBeenCalledWith("/episode/1/character/1");
  });
});
