import { CharacterSelected, Grid } from "@/components";
import { Route, Routes } from "react-router-dom";

function BaseRoute() {
  return (
    <Routes>
      <Route path="/" element={<Grid />} />
      <Route
        path="/episode/:episodeId/character/:characterId"
        element={<CharacterSelected />}
      />
    </Routes>
  );
}

export default BaseRoute;
