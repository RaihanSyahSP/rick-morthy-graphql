import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import { MemoryRouter } from "react-router-dom";
import { Grid } from "@/components";
import { GET_EPISODES } from "@/queries/episodes";

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
  //   mock for the search by name
  {
    request: {
      query: GET_EPISODES,
      variables: { page: 1, filter: { name: "Pilot", episode: "" } },
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
            next: null,
          },
        },
      },
    },
  },
  //   mock for the search by episode
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
            next: null,
          },
        },
      },
    },
  },
  //   mock for the second page of episodes
  {
    request: {
      query: GET_EPISODES,
      variables: { page: 2, filter: { name: "", episode: "" } },
    },
    result: {
      data: {
        episodes: {
          results: [
            {
              id: "21",
              name: "The Wedding Squanchers",
              air_date: "October 4, 2015",
              episode: "S02E10",
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
              ],
              created: "2015-10-04T00:00:00Z",
            },
          ],
          info: {
            next: null,
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

    expect(screen.getByText("Loading episodes ...")).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText("Pilot")).toBeInTheDocument();
    });

    fireEvent.change(screen.getByPlaceholderText("Search Name..."), {
      target: { value: "Pilot" },
    });
    fireEvent.click(screen.getByText("Search"));

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

    expect(screen.getByText("Loading episodes ...")).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText("Pilot")).toBeInTheDocument();
    });

    fireEvent.change(screen.getByPlaceholderText("Search Episode..."), {
      target: { value: "S01E01" },
    });
    fireEvent.click(screen.getByText("Search"));

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

    await waitFor(() => {
      expect(screen.getByText("An error occurred")).toBeInTheDocument();
    });
  });

  test("loads more data on scroll", async () => {
    render(
      <MockedProvider mocks={initialMocks} addTypename={false}>
        <MemoryRouter>
          <Grid />
        </MemoryRouter>
      </MockedProvider>
    );

    await waitFor(() => {
      expect(screen.getByText("Pilot")).toBeInTheDocument();
    });

    const gridContainer = screen.getByTestId("grid-container");

    Object.defineProperty(gridContainer, "scrollTop", {
      writable: true,
      value: 1000,
    });
    Object.defineProperty(gridContainer, "clientHeight", {
      writable: true,
      value: 500,
    });
    Object.defineProperty(gridContainer, "scrollHeight", {
      writable: true,
      value: 1500,
    });

    fireEvent.scroll(gridContainer, {
      target: { scrollTop: 1000, clientHeight: 500, scrollHeight: 1500 },
    });

    await waitFor(() => {
      expect(screen.getByText("The Wedding Squanchers")).toBeInTheDocument();
    });
  });
});
