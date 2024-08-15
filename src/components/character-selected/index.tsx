import { useNavigate, useParams } from "react-router-dom";
import { CharacterInfo } from "../character-info";
import { ModalCharacter } from "../modal";

export const CharacterSelected = () => {
  const { characterId } = useParams<{ characterId: string }>();
  const navigate = useNavigate();

  const handleClearSelection = () => {
    navigate(-1);
  };
  return (
    <ModalCharacter isOpen={!!characterId} onClearSelected={handleClearSelection}>
      <>{characterId && <CharacterInfo />}</>
    </ModalCharacter>
  );
};
