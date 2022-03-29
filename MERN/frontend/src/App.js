import './App.css';
import Header from './component/layout/Header/Header.js';
import Footer from './component/layout/Footer/Footer.js';
import {BrowserRouter as Router} from "react-router-dom";
import {Routes,Route} from "react-router-dom";
import WebFont from 'webfontloader';
import React from 'react';
import Home from "./component/Home/Home.js";
import ProductDetails from './component/Product/ProductDetails.js'
import Products from './component/Product/Products.js'
import Search from './component/Product/Search.js'
import LoginSignUP from './component/User/LoginSignUp'
import store from './store'
import { loadUser } from './actions/userAction';
import UserOptions from "./component/layout/Header/UserOptions.js";
import { useSelector } from 'react-redux';
import Profile from './component/User/Profile.js'
import ProtectedRoute from './component/Route/ProtectedRoute';

function App() {

  const { isAuthenticated, user } = useSelector((state) => state.user);

  React.useEffect(()=> {
    WebFont.load({
      google:{
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });

    store.dispatch(loadUser());
  }, []);

  return (
    <Router>
      <Header/>

      {isAuthenticated && <UserOptions user={user} />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:keyword" element={<Products />} />
        <Route path="/search" element={<Search />} />
        <Route path="/account" element={<Profile/>}/>
        <Route path="/login" element={<LoginSignUP />} />
      </Routes>
      <Footer/>
    </Router>
  );
}

export default App;
