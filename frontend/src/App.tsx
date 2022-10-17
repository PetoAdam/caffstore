import { Routes, Route } from "react-router-dom";
import Layout, { NotFound } from "./components/Layout";
import TestContainer from "./containers/test/TestContainer";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<TestContainer />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
