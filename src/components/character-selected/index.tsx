import { CharacterInfo } from "../character-info";
import { ModalCharacter } from "../modal";

interface Props {
  characterId: string | null;
  onClearSelected: () => void;
}

export const CharacterSelected = ({ characterId, onClearSelected }: Props) => {
  return (
    <ModalCharacter isOpen={!!characterId} onClearSelected={onClearSelected}>
      <>{characterId && <CharacterInfo characterId={characterId} />}</>
    </ModalCharacter>
  );
};
