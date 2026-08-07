// import { createContext, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { AppLayout } from "./components"
import { Home, Login, Register } from "./pages";

import { NotFound } from "./pages/httperrors"

// const AuthContext = createContext();

export function App() {
    // const [isLoggedIn, setIsLoggedIn] = useState(false);

    return (
        // <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
            <BrowserRouter>
                <Routes>
                    <Route path="/login" element={<Login />}></Route>
                    <Route path="/register" element={<Register />}></Route>

                    <Route element={<AppLayout />}>
                        <Route path="/" element={<Home />}></Route>
                        <Route path="/search" element={<h1>Search</h1>}></Route>
                        <Route path="*" element={<NotFound />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        // </AuthContext.Provider>
    )
}