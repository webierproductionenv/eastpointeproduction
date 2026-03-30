import React, { useState } from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import CabinCollection from "./pages/CabinCollection";
import ComfortConvenience from "./pages/ComfortConvenience";
import GatherConnect from "./pages/GatherConnect";
import BeyondCabin from "./pages/BeyondCabin";
import BecomeFamily from "./pages/BecomeFamily";
import Preloader from "./components/Preloader";
import { AppRoute } from "./types";

const App: React.FC = () => {
  const [loading, setLoading] = useState(true);

  return (
    <>
      {loading && <Preloader onFinish={() => setLoading(false)} />}
      <HashRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path={AppRoute.CABINS} element={<CabinCollection />} />
            <Route path={AppRoute.COMFORT} element={<ComfortConvenience />} />
            <Route path={AppRoute.GATHER} element={<GatherConnect />} />
            <Route path={AppRoute.BEYOND} element={<BeyondCabin />} />
            <Route path={AppRoute.FAMILY} element={<BecomeFamily />} />
          </Route>
        </Routes>
      </HashRouter>
      <Analytics />
    </>
  );
};

export default App;
