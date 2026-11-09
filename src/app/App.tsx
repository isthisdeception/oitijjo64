import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { RootLayout } from '../components/layout/RootLayout';
import {
  HomePage,
  DistrictsPage,
  DistrictDetailPage,
  LeaderboardPage,
  AboutPage,
  NotFoundPage,
} from '../pages';

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<RootLayout />}>
          <Route index element={<HomePage />} />
          <Route path="districts" element={<DistrictsPage />} />
          <Route path="district/:slug" element={<DistrictDetailPage />} />
          <Route path="leaderboard" element={<LeaderboardPage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
