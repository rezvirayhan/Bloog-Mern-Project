import { BrowserRouter, Route, Routes } from "react-router-dom"
import About from "./Pages/About"
import Dashboard from "./Pages/Dashboard"
import Home from "./Pages/Home"
import Project from "./Pages/Project"
import SignIn from "./Pages/SignIn"
import SignUp from "./Pages/SignUp"
import Footer from "./components/Footer"
import Header from "./components/Header"
function App() {

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/projects" element={<Project />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App
