import { gql } from "@apollo/client";

export const GET_EPISODES = gql`
  query GetEpisodes($page: Int!) {
    episodes(page: $page) {
      results {
        id
        name
        air_date
        episode
        characters {
          id
          name
          status
          species
          type
          gender
          image
        }
        created
      }
    }
  }
`;

export const GET_CHARACTERS = gql`
  query GetCharacters($page: Int!, $filter: FilterCharacters) {
    characters(page: $page, filter: $filter) {
      results {
        id
        name
        status
        image
        origin {
          name
        }
        created
      }
    }
  }
`;
