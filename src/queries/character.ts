import { gql } from "@apollo/client";

export const GET_EPISODES = gql`
  query GetEpisodes($page: Int!, $filter: FilterEpisode) {
    episodes(page: $page, filter: $filter) {
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
  query {
    characters {
      results {
        name
        id
        image
      }
    }
  }
`;

export const GET_CHARACTER_BY_ID = gql`
  query ($id: ID!) {
    character(id: $id) {
      id
      name
      status
      species
      gender
      image
      type
      created
    }
  }
`;
