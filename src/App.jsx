import './App.css'
import { useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from 'framer-motion';
import NavBar from './components/NavBar';
import Home from './components/Home';
import Footer from './components/Footer';


function App() {

  const location = useLocation();

  return (
    <>
        <NavBar />
        <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route index element={<Home />}/>
            </Routes>
        </AnimatePresence>
        <Footer />
    </>
  );
};

export default App;
