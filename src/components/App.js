import React from "react";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import BlogPage from "./Blog";
import ContactPage from "./Contact";
import HomePage from "./Home";
import NewBlogPostPage from "./NewBlogPost";

export default function App() {
  return (
    <div>
      <BrowserRouter>
        <div id="links">
          <Link to="/">Home</Link>
          <Link to="/blog">Blog</Link>
          <Link to="/blog/new">Add Blog Post</Link>
          <Link to="/contact">Contact</Link>
        </div>
        <Routes>
          {/* Default route to home page */}
          <Route path="*" element={<HomePage />} />
          <Route path="/" exact element={<HomePage />}></Route>
          <Route path="/home" element={<HomePage />}></Route>
          <Route path="/blog" element={<BlogPage />}></Route>
          <Route path="/blog/new" exact element={<NewBlogPostPage />}></Route>
          <Route path="/contact" exact element={<ContactPage />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}
