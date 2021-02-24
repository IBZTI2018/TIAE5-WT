import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";

// Components
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import Breadcrumbs from "./components/Breadcrumbs";
import CoronaWarning from "./components/CoronaWarning";

// Pages
import HomePage from './pages/HomePage';
import OffersPage from './pages/OffersPage';
import MyOffersPage from './pages/MyOffersPage';
import HotelsPage from './pages/HotelsPage';
import HotelPage from './pages/HotelPage';
import UserPage from './pages/UserPage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import ReservationPage from './pages/ReservationPage';
import BookingPage from './pages/BookingPage';
import ConfirmBookingPage from './pages/ConfirmBookingPage';
import HotelroomsPage from './pages/HotelroomsPage';
import ThankYouPage from "./pages/ThankYouPage";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <Sidebar />
          <Navbar />
          <CoronaWarning />
          <Breadcrumbs />
          <main role="main" className="container">
            <Switch>
              <Route exact path="/" component={HomePage} />
              <Route path="/offers" component={OffersPage} />

              <Route path="/my_offers" component={MyOffersPage} />

              <Route exact path="/hotels" component={HotelsPage} />
              <Route exact path="/hotels/:id" component={HotelPage} />
              <Route path="/hotels/:id/hotelrooms" component={HotelroomsPage} />
              <Route path="/booking/:id" component={BookingPage} />

              <Route path="/login" component={LoginPage} />
              <Route path="/register" component={RegisterPage} />
              <Route path="/user" component={UserPage} />

              <Route path="/reservation" component={ReservationPage} />
              <Route path="/confirmbooking" component={ConfirmBookingPage} />

              <Route path="/thank-you" component={ThankYouPage} />
            </Switch>
          </main>
        </Router>
        <ToastContainer />
      </div>
    );
  }
}

export default App;
