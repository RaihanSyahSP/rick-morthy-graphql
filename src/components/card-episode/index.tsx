import { motion } from "framer-motion";
import { ResultEpisodes } from "../../types";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

interface Props extends ResultEpisodes {
  onSelected: (id: string) => void;
  index: number;
}

export const CardEpisode = (props: Props) => {
  const { id, name, index, air_date, onSelected, characters } = props;

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

        <ScrollArea className="whitespace-nowrap rounded-md border">
          <div className="flex w-max space-x-4 p-4">
            {characters.map((character) => (
              <figure
                key={character.id}
                className="shrink-0 bg-gray-100 dark:bg-gray-700 rounded-lg p-4 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-600"
                onClick={() => onSelected(character.id)}
              >
                <div className="overflow-hidden rounded-md">
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
            ))}
          </div>
          <ScrollBar orientation="horizontal" className="bg-slate-300" />
        </ScrollArea>
      </motion.div>
    </motion.div>
  );
};
