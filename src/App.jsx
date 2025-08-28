import { Route, Routes } from "react-router-dom";
import AppV1 from "./pages/AppV1";
import AppV2 from "./pages/Appv2";

function App() {
  return (
    <>
      <Routes>
        <Route path="/v1" element={<AppV1 />} />
        <Route path="/v2" element={<AppV2 />} />
      </Routes>
    </>
  );
}

export default App;
