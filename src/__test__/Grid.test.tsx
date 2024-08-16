import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import { MemoryRouter } from "react-router-dom";
import { Grid } from "@/components";
import { GET_EPISODES } from "@/queries";

// Mock data for the episodes query
const initialMocks = [
  {
    request: {
      query: GET_EPISODES,
      variables: { page: 1, filter: { name: "", episode: "" } },
    },
    result: {
      data: {
        episodes: {
          results: [
            {
              id: "1",
              name: "Pilot",
              air_date: "December 2, 2013",
              episode: "S01E01",
              characters: [
                // Add relevant characters
              ],
              created: "2013-12-02T00:00:00Z",
            },
          ],
          info: {
            next: 2,
          },
        },
      },
    },
  },
  {
    request: {
      query: GET_EPISODES,
      variables: { page: 1, filter: { name: "Pilot", episode: "" } }, // Adjust the filter to match the search query
    },
    result: {
      data: {
        episodes: {
          results: [
            {
              id: "1",
              name: "Pilot",
              air_date: "December 2, 2013",
              episode: "S01E01",
              characters: [
                {
                  id: "1",
                  name: "Rick Sanchez",
                  status: "Alive",
                  species: "Human",
                  type: "",
                  gender: "Male",
                  image: "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
                  __typename: "Character",
                },
                {
                  id: "2",
                  name: "Morty Smith",
                  status: "Alive",
                  species: "Human",
                  type: "",
                  gender: "Male",
                  image: "https://rickandmortyapi.com/api/character/avatar/2.jpeg",
                  __typename: "Character",
                },
                {
                  id: "35",
                  name: "Bepisian",
                  status: "Alive",
                  species: "Alien",
                  type: "Bepisian",
                  gender: "unknown",
                  image: "https://rickandmortyapi.com/api/character/avatar/35.jpeg",
                  __typename: "Character",
                },
              ],
              created: "2013-12-02T00:00:00Z",
            },
          ],
          info: {
            next: null, // or appropriate value for pagination
          },
        },
      },
    },
  },
  {
    request: {
      query: GET_EPISODES,
      variables: { page: 1, filter: { name: "", episode: "S01E01" } },
    },
    result: {
      data: {
        episodes: {
          results: [
            {
              id: "1",
              name: "Pilot",
              air_date: "December 2, 2013",
              episode: "S01E01",
              characters: [
                // Character data here
              ],
              created: "2013-12-02T00:00:00Z",
            },
          ],
          info: {
            next: null, // No more pages
          },
        },
      },
    },
  },
];

const errorMock = [
  {
    request: {
      query: GET_EPISODES,
      variables: { page: 1, filter: { name: "", episode: "" } },
    },
    error: new Error("An error occurred"),
  },
];

describe("Grid Component", () => {
  test("renders initial state and performs search", async () => {
    render(
      <MockedProvider mocks={initialMocks} addTypename={false}>
        <MemoryRouter>
          <Grid />
        </MemoryRouter>
      </MockedProvider>
    );

    // Check for initial loading state
    expect(screen.getByText("Loading episodes ...")).toBeInTheDocument();

    // Wait for the component to load and display data
    await waitFor(() => {
      expect(screen.getByText("Pilot")).toBeInTheDocument();
    });

    // Perform a search
    fireEvent.change(screen.getByPlaceholderText("Search Name..."), {
      target: { value: "Pilot" },
    });
    fireEvent.click(screen.getByText("Search"));

    // Check if search results are displayed
    await waitFor(() => {
      expect(screen.getByText("Pilot")).toBeInTheDocument();
    });
  });

  test("performs search by episode", async () => {
    render(
      <MockedProvider mocks={initialMocks} addTypename={false}>
        <MemoryRouter>
          <Grid />
        </MemoryRouter>
      </MockedProvider>
    );

    // Check for initial loading state
    expect(screen.getByText("Loading episodes ...")).toBeInTheDocument();

    // Wait for the component to load and display data
    await waitFor(() => {
      expect(screen.getByText("Pilot")).toBeInTheDocument();
    });

    // Perform a search by episode
    fireEvent.change(screen.getByPlaceholderText("Search Episode..."), {
      target: { value: "S01E01" },
    });
    fireEvent.click(screen.getByText("Search"));

    // Check if search results are displayed
    await waitFor(() => {
      expect(screen.getByText("Pilot")).toBeInTheDocument();
    });
  });

  test("displays loading state initially", async () => {
    render(
      <MockedProvider mocks={[]} addTypename={false}>
        <MemoryRouter>
          <Grid />
        </MemoryRouter>
      </MockedProvider>
    );

    // Verify loading message
    expect(screen.getByText("Loading episodes ...")).toBeInTheDocument();
  });

  test("handles error state", async () => {
    render(
      <MockedProvider mocks={errorMock} addTypename={false}>
        <MemoryRouter>
          <Grid />
        </MemoryRouter>
      </MockedProvider>
    );

    // Check if error message is displayed
    await waitFor(() => {
      expect(screen.getByText("An error occurred")).toBeInTheDocument();
    });
  });
});
