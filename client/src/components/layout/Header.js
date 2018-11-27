import React, { Component } from "react";
import { Link } from "react-router-dom";

class Header extends Component {
  render() {
    let styles = {
      backgroundColor: "#ffffff",
      color: "#ffdc00"
    };
    let styles1 = {
      color: "#FF4136"
    };
    let bgt = {
      //   backgroundColor: "#ffffff",
      //   color: "#ffdc00",
      backgroundColor: "rgba(0,0,0,0.4)",
      flex: 1
    };
    let styles2 = {
      color: "#2ECC40"
    };
    return (
      // Header
      <header className="masthead">
        <div className="container">
          <div className="intro-text">
            <Link to="/register" class="btn btn-lg btn-info mr-2">
              Sign Up
            </Link>
            <Link to="/login" class="btn btn-lg btn-light">
              Login
            </Link>
            <div className="intro-lead-in pt-5" style={styles1}>
              Get the ride you want in 15 minutes
            </div>

            <div className="col-lg-12 rounded" style={bgt}>
              {/* Hire a Taxi to your destination in town */}
              <div className="row">
                <div className="col-sm-3  pb-3 pt-2">
                  From
                  <select className="form-control">
                    <option value="" disabled selected>
                      your location
                    </option>
                    <option value="1">Option 1</option>
                    <option value="2">Option 2</option>
                    <option value="3">Option 3</option>
                  </select>
                </div>
                <div className="col-sm-3   pb-3 pt-2">
                  To <input type="text" className="form-control" id="drop" />
                </div>
                <div className="col-sm-3   pb-3 pt-2">
                  Total Passengers
                  <select className="form-control">
                    <option value="" disabled selected>
                      no. of Passengers
                    </option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                  </select>
                </div>
                <div className="col-sm-2   pb-3 pt-2">
                  Round Trip
                  <input
                    type="checkbox"
                    className="form-control"
                    id="roundTrip"
                  />
                </div>
              </div>
              <div className="row justify-content-center ">
                <div className="col-sm-3 pt-3 pb-2" style={styles2}>
                  <a
                    className="btn btn-success btn-xl js-scroll-trigger"
                    href="#services"
                    required=""
                  >
                    Search TaxiDoo
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    );
  }
}
export default Header;
