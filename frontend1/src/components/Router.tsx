import { MemberProvider } from '@/integrations';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import { ScrollToTop } from '@/lib/scroll-to-top';
import Layout from './layout/Layout';
import HomePage from './pages/HomePage';
import ExplorePage from './pages/ExplorePage';
import SkillsPage from './pages/SkillsPage';
import LocalPage from './pages/LocalPage';
import WellnessPage from './pages/WellnessPage';
import VoicePage from './pages/VoicePage';
import ChatPage from './pages/ChatPage';

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <ScrollToTop />
        <Layout />
      </>
    ),
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "explore",
        element: <ExplorePage />,
      },
      {
        path: "skills",
        element: <SkillsPage />,
      },
      {
        path: "local",
        element: <LocalPage />,
      },
      {
        path: "wellness",
        element: <WellnessPage />,
      },
      {
        path: "voice",
        element: <VoicePage />,
      },
      {
        path: "chat",
        element: <ChatPage />,
      },
      {
        path: "*",
        element: <Navigate to="/" replace />,
      },
    ],
  },
], {
  basename: import.meta.env.BASE_NAME,
});

export default function AppRouter() {
  return (
    <MemberProvider>
      <RouterProvider router={router} />
    </MemberProvider>
  );
}
