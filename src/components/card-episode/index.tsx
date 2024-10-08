import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ResultEpisodes } from "../../types";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";

interface Props extends ResultEpisodes {
  index: number;
}

export const CardEpisode = (props: Props) => {
  const { id, name, index, air_date, characters } = props;
  const navigate = useNavigate();

  const handleCharacterSelect = (characterId: string) => {
    navigate(`/episode/${id}/character/${characterId}`);
  };

  if (!Array.isArray(characters)) {
    return <div>No characters available</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 * index }}
      className="w-full px-1 py-1 mx-auto"
    >
      <motion.div
        key={id}
        className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 h-full"
      >
        <motion.h2 className="text-xl font-bold mb-2">{name}</motion.h2>
        <motion.p className="text-gray-500 dark:text-gray-400 mb-4">
          Air Date: {air_date}
        </motion.p>

        <Carousel className="mx-9 sm:mx-8 md:mx-14">
          <CarouselContent className="">
            {characters.map((character) => (
              <CarouselItem key={character.id} className="flex justify-center">
                <figure
                  className="shrink-0 bg-gray-100 dark:bg-gray-700 rounded-lg p-6 md:p-4 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-600"
                  onClick={() => handleCharacterSelect(character.id)}
                >
                  <div className="rounded-md">
                    <img
                      src={character.image}
                      alt={character.name}
                      className="aspect-square h-fit w-fit object-cover transition-all hover:grayscale-0 grayscale"
                      width={300}
                      height={400}
                    />
                  </div>
                  <figcaption className="text-lg font-medium mb-2">
                    {character.name}
                  </figcaption>
                  <p className="text-gray-500 dark:text-gray-400">
                    Status: {character.status}
                  </p>
                </figure>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </motion.div>
    </motion.div>
  );
};
