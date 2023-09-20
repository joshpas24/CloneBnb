import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Switch, Route } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import SpotsIndex from "./components/SpotsIndex";
import SpotDetails from "./components/SpotDetails/SpotDetails";
import SpotForm from "./components/SpotForm/CreateSpot";
import ManageSpots from "./components/ManageSpots";
import CreateSpotForm from "./components/SpotForm/CreateSpot";
import UpdateSpotForm from "./components/SpotForm/UpdateSpot";
import ManageBookings from "./components/ManageBookings";
import HomePage from "./components/Home";
import ManageAccount from "./components/ManageProfile";
import Footer from "./components/Footer";
import './App.css'

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded &&
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/spots" component={HomePage} />
          <Route exact path="/spots/create" component={CreateSpotForm} />
          <Route exact path="/spots/:spotId/update" component={UpdateSpotForm} />
          <Route exact path="/spots/current" component={ManageSpots} />
          <Route exact path="/bookings/current" component={ManageBookings}/>
          <Route path="/spots/:spotId" component={SpotDetails}/>
          <Route exact path="/manage" component={ManageAccount}/>
        </Switch>
      }
      <Footer />
    </>
  );
}

export default App;
