import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ShopProvider } from './contexts/ShopContext';
import ProtectedRoute from './components/ProtectedRoute';
import LandingPage from './pages/LandingPage';
import ShopsPage from './pages/ShopsPage';
import ShopPage from './pages/ShopPage';
import LoginPage from './pages/LoginPage';
import AdminPage from './pages/AdminPage';
import ShopFormPage from './pages/ShopFormPage';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ShopProvider>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/shops" element={<ShopsPage />} />
            <Route path="/:shopName" element={<ShopPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route
              path="/admin"
              element={
                <ProtectedRoute>
                  <AdminPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/new"
              element={
                <ProtectedRoute>
                  <ShopFormPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/edit/:shopId"
              element={
                <ProtectedRoute>
                  <ShopFormPage />
                </ProtectedRoute>
              }
            />
            <Route path="/404" element={<NotFoundPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </ShopProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;