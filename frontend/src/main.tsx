import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { BrowserRouter, Route, Routes } from 'react-router';
import Home from './pages/home/Home.tsx';
import ErrorPage from './components/ErrorPage.tsx';
import CategoryPage from './pages/category/CategoryPage.tsx';
import Search from './pages/Search.tsx';
import SingleRecipePage from './pages/recipes/SingleRecipePage.tsx';

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<Home />} />
        <Route path="/categories/:category" element={<CategoryPage />} />
        <Route path="/search" element={<Search />} />
        <Route path="/recipes" element={<SingleRecipePage />} />
        <Route path="/recipes/:id" element={<SingleRecipePage />} />
      </Route>
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  </BrowserRouter>
);
