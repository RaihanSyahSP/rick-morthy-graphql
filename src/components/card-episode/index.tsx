import { motion } from "framer-motion";
import { useState } from "react";
import { ResultEpisodes } from "../../types";

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
      className="w-full px-1 py-1 mx-auto "
    >
      <motion.div key={id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <motion.h2 className="text-xl font-bold mb-2">{name}</motion.h2>
        <motion.p className="text-gray-500 dark:text-gray-400 mb-4">
          Air Date: {air_date}
        </motion.p>
        <motion.div className="">
          {characters.map((character) => (
            <motion.div
              key={character.id}
              className="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-600 mb-2"
              onClick={() => onSelected(character.id)}
            >
              <motion.h3 className="text-lg font-medium mb-2">{character.name}</motion.h3>
              <motion.p className="text-gray-500 dark:text-gray-400">
                Status: {character.status}
              </motion.p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </motion.div>
  );
};
