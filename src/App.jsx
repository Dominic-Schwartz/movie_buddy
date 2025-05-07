import { Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage/LandingPage';
import LoginPage from './pages/LoginPage/LoginPage';
import RegisterPage from './pages/RegisterPage/RegisterPage';
import HomePage from './pages/HomePage/HomePage';
import SearchResultsPage from './pages/SearchResultsPage/SearchResultsPage';
import MovieDetailPage from './pages/MovieDetailPage/MovieDetailPage';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import UnauthorizedPage from './pages/UnauthorizedPage/UnauthorizedPage';
import WatchlistPage from "./pages/WatchlistPage/WatchlistPage.jsx";
import AdminPage from "./pages/AdminPage/AdminPage";

function App() {

    return (
        <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />

            <Route element={<ProtectedRoute requiredRoles={['ROLE_USER']} />}>
                <Route path="/home" element={<HomePage />} />
                <Route path="/search" element={<SearchResultsPage />} />
                <Route path="/searchresults" element={<SearchResultsPage />} />
                <Route path="/watchlist" element={<WatchlistPage />} />
                <Route path="/movie/:id" element={<MovieDetailPage />} />
            </Route>

            <Route element={<ProtectedRoute requiredRoles={['ROLE_ADMIN']} />}>
                <Route path="/admin" element={<AdminPage />} />
            </Route>

            <Route path="/unauthorized" element={<UnauthorizedPage />} />
        </Routes>
    );
}

export default App;
