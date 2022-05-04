import React from "react";
import "./App.css";
import Header from "./components/view/Header";
import Footer from "./components/view/Footer";
import Student from "./routes/Student";

function App() {
  return (
    <div className="App">
      <Header />
      <Student />
      <Footer />
    </div>
  );
}

export default App;
