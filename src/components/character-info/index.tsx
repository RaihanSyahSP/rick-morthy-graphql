import { useQuery } from "@apollo/client";
import { GET_CHARACTER_BY_ID } from "../../queries";
import { CharacterByID } from "@/types";
import { ErrorMessage, Loading } from "@/components";

export const CharacterInfo = ({ characterId }: { characterId: string }) => {
  const { data, loading, error } = useQuery<CharacterByID>(GET_CHARACTER_BY_ID, {
    variables: { id: characterId },
  });

  if (loading) return <Loading />;

  if (error || !data) return <ErrorMessage error={error!.message} />;

  const { created, gender, image, name, species, status, type } = data.character;

  return (
    <div className="max-w-4xl mx-auto mt-9 flex flex-col justify-center items-center sm:gap-8 gap-3 sm:px-0 px-8">
      <span className="text-3xl lg:text-4xl font-semibold">{name}</span>
      <img
        src={image}
        className="sm:w-52 sm:h-52 w-32 h-32 rounded-md shadow-2xl shadow-black"
      />

      <div className="w-full sm:w-fit grid grid-cols-2 gap-2">
        <p className="rounded-lg bg-gray-800 p-4 text-start sm:text-xl text-lg relative">
          Status: {status}
        </p>
        <p className="rounded-lg bg-gray-800 p-4 text-start sm:text-xl text-lg relative">
          Species: {species}
        </p>
        <p className="rounded-lg bg-gray-800 p-4 text-start sm:text-xl text-lg relative">
          Type: {type}
        </p>
        <p className="rounded-lg bg-gray-800 p-4 text-start sm:text-xl text-lg relative">
          Gender: {gender}
        </p>
      </div>
      <p className="mt-2 text-lg">
        Created at: <span>{created}</span>
      </p>
    </div>
  );
};
