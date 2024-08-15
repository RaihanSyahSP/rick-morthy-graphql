import { useQuery } from "@apollo/client";
import { useState, useEffect } from "react";
import { CardEpisode, CharacterSelected, ErrorMessage, Loading } from "@/components";
import { GET_EPISODES } from "../../queries";
import { Episodes } from "../../types";

export const Grid = () => {
  const [selected, setSelected] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [episodes, setEpisodes] = useState<Episodes["episodes"]["results"]>([]);

  const { loading, error, data, fetchMore } = useQuery<Episodes>(GET_EPISODES, {
    variables: { page },
    notifyOnNetworkStatusChange: true,
  });

  const handleScroll = (event: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, clientHeight, scrollHeight } = event.currentTarget;
    if (scrollTop + clientHeight >= scrollHeight) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    if (data && data.episodes) {
      setEpisodes((prevEpisodes) => [...prevEpisodes, ...data.episodes.results]);
    }
  }, [data]);

  useEffect(() => {
    if (page > 1) {
      fetchMore({
        variables: { page },
        updateQuery: (previousResult, { fetchMoreResult }) => {
          if (!fetchMoreResult) return previousResult;
          return {
            episodes: {
              ...fetchMoreResult.episodes,
              results: [
                ...previousResult.episodes.results,
                ...fetchMoreResult.episodes.results,
              ],
            },
          };
        },
      });
    }
  }, [page, fetchMore]);

  if (loading && page === 1) return <Loading />;

  if (error) return <ErrorMessage error={error.message} />;

  return (
    <div onScroll={handleScroll} className="overflow-y-scroll h-[80vh] no-scrollbar">
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 my-10 lg:gap-10 gap-5 px-5 sm:px-8 lg:px-12">
        {episodes.map((episode, index) => (
          <CardEpisode
            key={episode.id}
            {...episode}
            index={index}
            onSelected={(characterId: string) => setSelected(characterId)}
          />
        ))}
      </section>
      <CharacterSelected
        onClearSelected={() => setSelected(null)}
        characterId={selected}
      />
    </div>
  );
};
