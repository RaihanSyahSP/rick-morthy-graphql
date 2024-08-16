import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { CardEpisode, CharacterSelected, ErrorMessage, Loading } from "@/components";
import { GET_EPISODES } from "../../queries";
import { Episodes } from "../../types";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

export const Grid = () => {
  const [page, setPage] = useState(1);
  const [episodes, setEpisodes] = useState<Episodes["episodes"]["results"]>([]);
  const [searchParams, setSearchParams] = useSearchParams();

  const [localName, setLocalName] = useState(searchParams.get("name") || "");
  const [localEpisode, setLocalEpisode] = useState(searchParams.get("episode") || "");

  const name = searchParams.get("name") || "";
  const episode = searchParams.get("episode") || "";

  const { loading, error, data, fetchMore, refetch } = useQuery<Episodes>(GET_EPISODES, {
    variables: { page, filter: { name, episode } },
    notifyOnNetworkStatusChange: true,
  });

  const handleScroll = (event: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, clientHeight, scrollHeight } = event.currentTarget;
    if (scrollTop + clientHeight >= scrollHeight) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  const handleSearch = () => {
    setEpisodes([]);
    setPage(1);
    setSearchParams({ name: localName, episode: localEpisode });
    refetch({ page: 1, filter: { name: localName, episode: localEpisode } });
  };

  useEffect(() => {
    if (data && data.episodes) {
      setEpisodes((prevEpisodes) =>
        page === 1 ? data.episodes.results : [...prevEpisodes, ...data.episodes.results]
      );
    }
  }, [data, page]);

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
    <div
      onScroll={handleScroll}
      className="overflow-y-scroll h-[80vh] no-scrollbar"
      data-testid="grid-container"
    >
      <div className="flex w-full max-w-sm items-center space-x-2 ml-0">
        <Input
          type="search"
          placeholder="Search Name..."
          value={localName}
          onChange={(e) => setLocalName(e.target.value)}
        />
        <Input
          type="search"
          placeholder="Search Episode..."
          value={localEpisode}
          onChange={(e) => setLocalEpisode(e.target.value)}
        />
        <Button type="button" onClick={handleSearch}>
          Search
        </Button>
      </div>
      {episodes.length === 0 && !loading ? (
        <ErrorMessage error="No Result Found" />
      ) : (
        <section className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2  my-10 lg:gap-10 gap-5">
          {episodes.map((episode, index) => (
            <CardEpisode key={`${episode.id}-${index}`} {...episode} index={index} />
          ))}
        </section>
      )}
      <CharacterSelected />
    </div>
  );
};
