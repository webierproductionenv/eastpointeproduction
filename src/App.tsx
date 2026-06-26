import React, { useState, Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
const Home = lazy(() => import("./pages/Home"));
const CabinCollection = lazy(() => import("./pages/CabinCollection"));
const ComfortConvenience = lazy(() => import("./pages/ComfortConvenience"));
const GatherConnect = lazy(() => import("./pages/GatherConnect"));
const BeyondCabin = lazy(() => import("./pages/BeyondCabin"));
const BecomeFamily = lazy(() => import("./pages/BecomeFamily"));
const StudioPage = lazy(() => import("./pages/Studio"));
const Contact = lazy(() => import("./pages/Contact"));
import Preloader from "./components/Preloader";
import { AppRoute } from "./types";

const App: React.FC = () => {
  const [loading, setLoading] = useState(true);

  return (
    <>
      {loading && <Preloader onFinish={() => setLoading(false)} />}
      <BrowserRouter>
        <Suspense fallback={<Preloader onFinish={() => {}} />}>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path={AppRoute.CABINS} element={<CabinCollection />} />
              <Route path={AppRoute.COMFORT} element={<ComfortConvenience />} />
              <Route path={AppRoute.GATHER} element={<GatherConnect />} />
              <Route path={AppRoute.BEYOND} element={<BeyondCabin />} />
              <Route path={AppRoute.FAMILY} element={<BecomeFamily />} />
              <Route path={AppRoute.CONTACT} element={<Contact />} />
            </Route>
            <Route path="/studio/*" element={<StudioPage />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </>
  );
};

export default App;
