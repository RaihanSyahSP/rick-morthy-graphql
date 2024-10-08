import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { CardEpisode, CharacterSelected, ErrorMessage, Loading } from "@/components";
import { GET_EPISODES } from "../../queries/episodes";
import { Episodes } from "../../types";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const Grid = () => {
  const [page, setPage] = useState(1);
  const [episodes, setEpisodes] = useState<Episodes["episodes"]["results"]>([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  const [hasMoreResults, setHasMoreResults] = useState(true);

  const [searchType, setSearchType] = useState<"name" | "episode">("name");
  const [searchValue, setSearchValue] = useState(searchParams.get("name") || "");

  const name = searchType === "name" ? searchParams.get("name") || "" : "";
  const episode = searchType === "episode" ? searchParams.get("episode") || "" : "";

  const { loading, error, data, fetchMore, refetch } = useQuery<Episodes>(GET_EPISODES, {
    variables: { page, filter: { name, episode } },
    notifyOnNetworkStatusChange: true,
  });

  const handleScroll = (event: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, clientHeight, scrollHeight } = event.currentTarget;
    if (scrollTop + clientHeight >= scrollHeight && hasMoreResults) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  const handleSearch = () => {
    if (!searchValue.trim()) {
      return;
    }

    setEpisodes([]);
    setPage(1);
    setHasMoreResults(true);

    if (searchType === "name") {
      setSearchParams({ name: searchValue });
      refetch({ page: 1, filter: { name: searchValue, episode: "" } });
    } else {
      setSearchParams({ episode: searchValue });
      refetch({ page: 1, filter: { name: "", episode: searchValue } });
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleClearSearch = () => {
    setSearchParams({});
    setSearchValue("");
    setSearchType("name");
    setEpisodes([]);
    setPage(1);
    setHasMoreResults(true);
    refetch({ page: 1, filter: { name: "", episode: "" } });
  };

  useEffect(() => {
    if (data && data.episodes && data.episodes.results) {
      setEpisodes((prevEpisodes) =>
        page === 1 ? data.episodes.results : [...prevEpisodes, ...data.episodes.results]
      );
      setHasMoreResults(data.episodes.results.length > 0);
    }
  }, [data, page]);

  useEffect(() => {
    if (page > 1 && hasMoreResults) {
      setIsFetchingMore(true);
      fetchMore({
        variables: { page },
        updateQuery: (previousResult, { fetchMoreResult }) => {
          if (!fetchMoreResult || fetchMoreResult.episodes.results.length === 0) {
            setHasMoreResults(false);
            return previousResult;
          }
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
      }).finally(() => setIsFetchingMore(false));
    }
  }, [page, fetchMore, hasMoreResults]);

  if (loading && page === 1) return <Loading />;

  if (error) return <ErrorMessage error={error.message} />;

  return (
    <div
      onScroll={handleScroll}
      className="overflow-y-scroll h-[80vh] no-scrollbar"
      data-testid="grid-container"
    >
      <div className="flex w-full items-end space-x-2 ml-0">
        <Select
          onValueChange={(value) => setSearchType(value as "name" | "episode")}
          defaultValue={searchType}
        >
          <SelectTrigger className="w-[160px]">
            <SelectValue placeholder="Search by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="name">Search by Name</SelectItem>
            <SelectItem value="episode">Search by Episode</SelectItem>
          </SelectContent>
        </Select>
        <Input
          type="search"
          placeholder={`Search ${searchType === "name" ? "Name" : "Episode"}...`}
          value={searchValue}
          onChange={(e) => {
            setSearchValue(e.target.value);
            if (!e.target.value) {
              handleClearSearch();
            }
          }}
          className="max-w-[200px]"
          onKeyDown={handleKeyDown}
        />
        <Button onClick={handleSearch}>Search</Button>
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
      {isFetchingMore && <Loading />}
      <CharacterSelected />
    </div>
  );
};
