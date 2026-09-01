import { BrowserRouter, Routes, Route } from "react-router-dom";

import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import AISaathi from "./pages/AISaathi";
import Learning from "./pages/Learning";
import TutorialDetail from "./pages/TutorialDetail";
import PhonePeSimulator from "./pages/PhonePeSimulator";
import Community from "./pages/Community";
import URLChecker from "./pages/URLChecker";
import Schemes from "./pages/Schemes";
import ScamDetector from "./pages/ScamDetector";



function App() {
    return (
        <BrowserRouter>
            <Routes>

                <Route
                    path="/"
                    element={<Login />}
                />

                <Route
                    path="/register"
                    element={<Register />}
                />

                <Route
                    path="/login"
                    element={<Login />}
                />

                <Route
                    path="/dashboard"
                    element={<Dashboard />}
                />
                <Route
    path="/ai-saathi"
    element={<AISaathi />}
/>

<Route
    path="/learning"
    element={<Learning />}
/>


<Route
    path="/learning/phonepe/simulator"
    element={<PhonePeSimulator />}
/>

<Route
    path="/learning/:topic"
    element={<TutorialDetail />}
/>

<Route
            path="/community"
            element={<Community />}
        />

        <Route
    path="/url-checker"
    element={<URLChecker />}
/>

<Route path="/schemes" element={<Schemes />} />

<Route path="/scam-detector" element={<ScamDetector />} />


            </Routes>
        </BrowserRouter>
    );
}

export default App;