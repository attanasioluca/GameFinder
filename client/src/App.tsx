import { Route, Routes } from "react-router-dom";
import GamePage from "./components/GamePage";
import MainPage from "./components/MainPage";
import ProfilePage from "./components/ProfilePage";
import LoginPage from "./components/LoginPage";
import SignUpPage from "./components/SignUpPage";
import GoogleLoginPage from "./components/GoogleLoginPage";

function App() {
    let userToken = localStorage.getItem('token');
    return (
    <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/games/:gameId" element={<GamePage />} />
        <Route path="/account" element={<ProfilePage/>} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/googleLogin" element={<GoogleLoginPage />} />
    </Routes>
    );
}
export default App;
