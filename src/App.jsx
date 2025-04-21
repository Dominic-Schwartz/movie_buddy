import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage/LandingPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import HomePage from "./pages/HomePage/HomePage";
import SearchResultsPage from "./pages/SearchResultsPage/SearchResultsPage";
import MovieDetailPage from "./pages/MovieDetailPage/MovieDetailPage";


function App() {
    return (
        <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/searchresults" element={<SearchResultsPage />} />
            <Route path="/movie/:id" element={<MovieDetailPage />} />
        </Routes>
    );
}

export default App;
