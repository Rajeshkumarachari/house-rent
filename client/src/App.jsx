import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Profile from "./pages/Profile";
import About from "./components/About";
import Header from "./components/Header";
import PrivateRoute from "./components/PrivateRoute";
import PastTrips from "./components/PastTrips";
import Connections from "./components/Connections";
import Footer from "./components/Footer";

export default function App() {
  return (
    <BrowserRouter
      future={{
        v7_startTransition: true,
      }}
    >
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route element={<PrivateRoute />}>
          {/* <Profile/> */}
          <Route path="/profile" element={<Profile />}>
            <Route index element={<About />} />
            <Route path="past-trips" element={<PastTrips />} />
            <Route path="connections" element={<Connections />} />
          </Route>
        </Route>
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
