import React, { Component } from "react";
import Header from "../layout/header.layout/Header.container";
import Footer from "../layout/footer.layout/Footer.layout";
import { CategoriesPage } from "../../features";
import { LocationsPage } from "../../features";
import SplashDialog from "../common/SplashDialog"
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <div className="App">
        <SplashDialog/>
        <Router>
          <Header />
          <br/>
          <br/>
          <Route path="/">
            <Redirect to="/categories" />
          </Route>
          <Route path="/categories" component={CategoriesPage} />
          <Route path="/locations" component={LocationsPage} />
          <Footer />
        </Router>
      </div>
    );
  }
}

export default App;
