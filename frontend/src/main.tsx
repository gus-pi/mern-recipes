import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { BrowserRouter, Route, Routes } from 'react-router';
import Home from './pages/home/Home.tsx';
import ErrorPage from './components/ErrorPage.tsx';
import CategoryPage from './pages/category/CategoryPage.tsx';
import Search from './pages/Search.tsx';

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<Home />} />
        <Route path="/categories/:category" element={<CategoryPage />} />
        <Route path="/search" element={<Search />} />
      </Route>
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  </BrowserRouter>
);
