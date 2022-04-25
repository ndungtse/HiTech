import React, { useState, useEffect } from "react";
import "./App.css";
import "boxicons/css/boxicons.css";
import Home from "./components/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AddProduct from "./products/AddProduct";
import Products from "./products/Products";
import Cart from "./components/Cart/Cart";
import Favs from "./components/Favs/Favs";
import Signup from "./components/Sign/signup";
import Login from './components/Sign/Login'
import Account from "./components/account/Account";
import { api } from './components/utilities/one';
import Search from "./components/search/search";
import Footer from "./components/Sign/Footer";
import ProductPreview from "./components/preview/productPrev";

function App() {
  const [category, setCategory] = useState("all");
  const [cartCount, setCartCount] = useState(0);
  const [wishCount, setWishCount] = useState(0);
  const [counts, setCounts] = useState([])
  const [products, setProducts] = useState([])
  const [filter, setFilter] = useState([]);
  const [payment, setPayment] = useState(0)
  const [isHomeLoader, setHomeLoader] = useState(false);
  const [quantity, setQuantity ] = useState([]);
  

  const fetchProducts = async () => {
    const data = await fetch("https://hitech1.herokuapp.com/products");
    const products = await data.json();
    setProducts(products)
    setFilter(products)
    setHomeLoader(true)
  };
  const fetchCounts = async () => {
    const data = await fetch("https://hitech1.herokuapp.com/user/counts");
    const counts = await data.json()
    setCounts(counts)
    setPayment(counts[0].payment)
    if (counts[0].cart < 0) counts[0].cart = 0;
    setCartCount(counts[0].cart);
    if (counts[0].wish<0) counts[0].wish = 0;
    setWishCount(counts[0].wish)
  }
  useEffect(()=>{
    fetchProducts();
  }, [])
  useEffect(()=>{
    fetchCounts();
  }, [])
  
  // useEffect(()=>{
  //   api.put(`/user/counts/${counts[0].id}`, counts[0]);
  // }, [counts])

  const updateCounts = async (id, newdata) => {
    const response = await api.put(`/user/counts/${id}`, newdata);
     console.log(response);
  }

  const cartIncrement = async () => {
    setCartCount((prevCount) => prevCount + 1);
    counts[0].payment = payment
    counts[0].cart = cartCount + 1
    updateCounts(counts[0]._id, counts[0]);
  };
  const cartDecrement = () => {
    setCartCount((prevCount) =>
      prevCount <= 0 ? (prevCount = 0) : prevCount - 1);
    counts[0].cart = cartCount - 1;
    updateCounts(counts[0]._id, counts[0]);
  };

  const wishIncrement = () => {
    setWishCount((prevCount) => prevCount + 1);
    counts[0].wish = wishCount + 1;
    updateCounts(counts[0]._id, counts[0]);
  };
  const wishDecrement = () => {
    setWishCount((prevCount) =>
      prevCount <= 0 ? (prevCount = 0) : prevCount - 1);
    counts[0].wish = wishCount - 1;
    updateCounts(counts[0]._id, counts[0]);
  };
  
  return (
    <BrowserRouter>
      <div className="App flex flex-col w-full">
        <Routes>
          <Route
            path="/"
            element={
              <Home
                cartIncrement={cartIncrement}
                cartCount={cartCount}
                isHomeLoader={isHomeLoader}
                setHomeLoader={setHomeLoader}
                wishCount={wishCount}
                category={category}
                setCategory={setCategory}
                wishDecrement={wishDecrement}
                cartDecrement={cartDecrement}
                wishIncrement={wishIncrement}
                products={products}
                filter={filter}
                setFilter={setFilter}
                setProducts={setProducts}
                quantity={quantity}
                setQuantity={setQuantity}
              />
            }
          />
          <Route
            path="/products"
            element={
              <Products
                filter={filter}
                category={category}
                setCategory={setCategory}
                setFilter={setFilter}
                counts={counts}
                wishDecrement={wishDecrement}
                cartDecrement={cartDecrement}
                wishIncrement={wishIncrement}
                setProducts={setProducts}
                cartIncrement={cartIncrement}
                cartCount={cartCount}
                setPayment={setPayment}
                wishCount={wishCount}
                payment={payment}
                products={products}
                updateCounts={updateCounts}
                quantity={quantity}
                setQuantity={setQuantity}
              />
            }
          />
          <Route
            path="/cart"
            element={
              <Cart
                cartCount={cartCount}
                wishIncrement={wishIncrement}
                cartDecrement={cartDecrement}
                wishDecrement={wishDecrement}
                products={products}
                wishCount={wishCount}
                cartIncrement={cartIncrement}
                payment={payment}
                setPayment={setPayment}
              />
            }
          />
          <Route
            path="/wishlist"
            element={
              <Favs
                cartCount={cartCount}
                wishIncrement={wishIncrement}
                cartDecrement={cartDecrement}
                wishDecrement={wishDecrement}
                wishCount={wishCount}
                cartIncrement={cartIncrement}
                products={products}
              />
            }
          />
          <Route
            path="/account"
            element={<Account cartCount={cartCount} wishCount={wishCount} />}
          />
          {/* <Route
            path="/preview"
            element={<ProductPreview cartCount={cartCount} wishCount={wishCount} />}
          /> */}
          <Route
            path="/search"
            element={
              <Search
                counts={counts}
                wishDecrement={wishDecrement}
                cartDecrement={cartDecrement}
                wishIncrement={wishIncrement}
                setProducts={setProducts}
                cartIncrement={cartIncrement}
                cartCount={cartCount}
                setPayment={setPayment}
                wishCount={wishCount}
                payment={payment}
                products={products}
                updateCounts={updateCounts}
                quantity={quantity}
                setQuantity={setQuantity}
              />
            }
          />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/addproduct" element={<AddProduct />} />
          {/* crazzy stufss*/}
          <Route
            path="/products/gaming"
            element={
              <Products
                filter={filter}
                setFilter={setFilter}
                wishDecrement={wishDecrement}
                cartDecrement={cartDecrement}
                category={category}
                setCategory={setCategory}
                wishIncrement={wishIncrement}
                setProducts={setProducts}
                cartIncrement={cartIncrement}
                cartCount={cartCount}
                wishCount={wishCount}
                products={products}
              />
            }
          />
          <Route
            path="/products/all"
            element={
              <Products
                filter={filter}
                setFilter={setFilter}
                wishDecrement={wishDecrement}
                cartDecrement={cartDecrement}
                category={category}
                setCategory={setCategory}
                wishIncrement={wishIncrement}
                setProducts={setProducts}
                cartIncrement={cartIncrement}
                cartCount={cartCount}
                wishCount={wishCount}
                products={products}
              />
            }
          />
          <Route
            path="/products/phones"
            element={
              <Products
                filter={filter}
                setFilter={setFilter}
                wishDecrement={wishDecrement}
                cartDecrement={cartDecrement}
                category={category}
                setCategory={setCategory}
                wishIncrement={wishIncrement}
                setProducts={setProducts}
                cartIncrement={cartIncrement}
                cartCount={cartCount}
                wishCount={wishCount}
                products={products}
              />
            }
          />
          <Route
            path="/products/pcs"
            element={
              <Products
                filter={filter}
                setFilter={setFilter}
                wishDecrement={wishDecrement}
                cartDecrement={cartDecrement}
                category={category}
                setCategory={setCategory}
                wishIncrement={wishIncrement}
                setProducts={setProducts}
                cartIncrement={cartIncrement}
                cartCount={cartCount}
                wishCount={wishCount}
                products={products}
              />
            }
          />
          <Route
            path="/products/others"
            element={
              <Products
                filter={filter}
                setFilter={setFilter}
                wishDecrement={wishDecrement}
                cartDecrement={cartDecrement}
                category={category}
                setCategory={setCategory}
                wishIncrement={wishIncrement}
                setProducts={setProducts}
                cartIncrement={cartIncrement}
                cartCount={cartCount}
                wishCount={wishCount}
                products={products}
              />
            }
          />
          <Route
            path="/products/accessories"
            element={
              <Products
                filter={filter}
                setFilter={setFilter}
                wishDecrement={wishDecrement}
                cartDecrement={cartDecrement}
                category={category}
                setCategory={setCategory}
                wishIncrement={wishIncrement}
                setProducts={setProducts}
                cartIncrement={cartIncrement}
                cartCount={cartCount}
                wishCount={wishCount}
                products={products}
              />
            }
          />
          <Route
            path="/products/home"
            element={
              <Products
                filter={filter}
                setFilter={setFilter}
                wishDecrement={wishDecrement}
                cartDecrement={cartDecrement}
                category={category}
                setCategory={setCategory}
                wishIncrement={wishIncrement}
                setProducts={setProducts}
                cartIncrement={cartIncrement}
                cartCount={cartCount}
                wishCount={wishCount}
                products={products}
              />
            }
          />
        </Routes>
        {/* <Footer /> */}
      </div>
    </BrowserRouter>
  );
}

export default App;