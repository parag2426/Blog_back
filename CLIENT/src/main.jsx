import React from 'react';
import { createRoot } from 'react-dom/client';
import { ClerkProvider } from '@clerk/clerk-react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';


import {
  QueryClient, 
  QueryClientProvider
} from '@tanstack/react-query';

import MainLayouts from './layouts/MainLayouts.jsx';
import HomePage from './routes/HomePage.jsx';
import AboutPage from './routes/AboutPage.jsx';
import LoginPage from './routes/LoginPage.jsx';
import RegisterPage from './routes/RegisterPage.jsx';
import PostListPage from './routes/PostListPage.jsx';
import SinglePostPage from './routes/SinglePostPage.jsx';
import Write from './routes/Write.jsx';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // ✅ Correct path
import SavedPost from './routes/SavedPost.jsx';

const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ClerkProvider publishableKey={clerkPubKey}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            {/* Layout with nested routes */}
            <Route path="/" element={<MainLayouts />}>
              <Route index element={<HomePage />} />
              <Route path="about" element={<AboutPage />} />
              <Route path="posts" element={<PostListPage />} />
              <Route path="write" element={<Write />} />
              <Route path="saved" element={<SavedPost />} />
              <Route path=":slug" element={<SinglePostPage />} />
            </Route>

            {/* Auth routes */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />

            {/* 404 Fallback */}
            <Route path="*" element={<h1>404 - Page Not Found</h1>} />
          </Routes>
          <ToastContainer position="bottom-right" />
        </BrowserRouter>
      </QueryClientProvider>
    </ClerkProvider>
  </React.StrictMode>
);
