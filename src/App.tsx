import { Route, Routes } from "react-router-dom";
import GamePage from "./components/GamePage";
import MainPage from "./components/MainPage";
import ProfilePage from "./components/ProfilePage";

function App() {
    return (
    <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/games/:gameId" element={<GamePage />} />
        <Route path="/account" element={<ProfilePage userId="1"/>} />
    </Routes>
    );
}
export default App;
