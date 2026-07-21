import { BrowserRouter, Navigate, Route, Routes, useParams } from "react-router-dom";
import { PublicExploreFrame, PublicLessonPreview, PublicLockedPage } from "./components/PublicExplore";
import PublicExploreScreen from "./components/PublicExploreScreens";

const framed = (children) => <PublicExploreFrame>{children}</PublicExploreFrame>;

function MapRoute() {
  const { world, level } = useParams();
  return framed(<PublicExploreScreen view="map" world={world} level={level} />);
}

export default function PublicExploreApp() {
  return <BrowserRouter><Routes>
    <Route path="/explore" element={<Navigate to="/explore/home" replace />} />
    <Route path="/explore/home" element={framed(<PublicExploreScreen view="home" />)} />
    <Route path="/explore/english" element={framed(<PublicExploreScreen view="levels" world="english" />)} />
    <Route path="/explore/computer" element={framed(<PublicExploreScreen view="levels" world="computer" />)} />
    <Route path="/explore/math" element={framed(<PublicExploreScreen view="levels" world="math" />)} />
    <Route path="/explore/language" element={framed(<PublicExploreScreen view="levels" world="language" />)} />
    <Route path="/explore/:world/:level" element={<MapRoute />} />
    <Route path="/explore/preview/:world/:level/:unit" element={<PublicLessonPreview />} />
    <Route path="/explore/preview/:world" element={<PublicLessonPreview />} />
    <Route path="/explore/locked" element={<PublicLockedPage />} />
    <Route path="*" element={<Navigate to="/explore/home" replace />} />
  </Routes></BrowserRouter>;
}
