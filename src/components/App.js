import React, { useState } from "react";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import BlogPage from "./Blog";
import ContactPage from "./Contact";
import HomePage from "./Home";
import NewBlogPostPage from "./NewBlogPost";

export default function App() {
  const [redirectUrl, setRedirectUrl] = useState("");
  const [shouldRedirect, setShouldRedirect] = useState(false);
  const navigate = useNavigate();

  const pages = ["home", "blog", "new blog post", "contact"];
  const urls = {
    home: "/",
    blog: "/blog",
    "new blog post": "/blog/new",
    contact: "/contact",
  };

  const commands = [
    {
      command: ["Go to *", "Open *"],
      callback: (redirectPage) => {
        setRedirectUrl(redirectPage);
        setShouldRedirect(true);
      },
    },
  ];
  const { transcript } = useSpeechRecognition({ commands });

  function addRedirect() {
    let redirect;
    console.log(redirectUrl);
    console.log(urls[redirectUrl]);
    console.log(pages.includes(redirectUrl));
    if (shouldRedirect && pages.includes(redirectUrl)) {
      setShouldRedirect(false);
      redirect = navigate(urls[redirectUrl]);
    } else {
      redirect = <p>Cannot find page: {redirectUrl}</p>;
    }
    console.log(redirect);
    return redirect;
  }

  

  if (!SpeechRecognition.browserSupportsSpeechRecognition) {
    return null;
  }

  return (
    <div>
      <div id="links">
        <Link to="/">Home</Link>
        <Link to="/blog">Blog</Link>
        <Link to="/blog/new">Add Blog Post</Link>
        <Link to="/contact">Contact</Link>
      </div>
      <Routes>
        {/* Default route to home page */}
        <Route path="*" element={<HomePage />} />
        <Route path="/" exact element={<HomePage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/blog/new" exact element={<NewBlogPostPage />} />
        <Route path="/contact" exact element={<ContactPage />} />
      </Routes>
      <p id="transcript">Transcript: {transcript}</p>

      <button onClick={SpeechRecognition.startListening}>
        Start voice recognition
      </button>
    </div>
  );
}
