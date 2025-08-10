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
import BecomeAHost from "./pages/BecomeAHost";
import Listings from "./components/Listings";
import UpdateListing from "./pages/UpdateListing";
import Listing from "./pages/Listing";
import Search from "./pages/Search";

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <BrowserRouter
        className=""
        future={{
          v7_startTransition: true,
        }}
      >
        <Header />
        <main className="  flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/search" element={<Search />} />
            <Route path="/listing/:id" element={<Listing />} />
            <Route element={<PrivateRoute />}>
              {/* <Profile/> */}
              <Route path="/profile" element={<Profile />}>
                <Route index element={<About />} />
                <Route path="past-trips" element={<PastTrips />} />
                <Route path="connections" element={<Connections />} />
                <Route path="listings" element={<Listings />} />
              </Route>
              <Route path="/become-a-host" element={<BecomeAHost />} />
              <Route
                path="/update-listing/:listingId"
                element={<UpdateListing />}
              />
            </Route>
          </Routes>
        </main>
        <Footer />
      </BrowserRouter>
    </div>
  );
}
