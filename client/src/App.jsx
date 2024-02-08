import { BrowserRouter, Route, Routes } from "react-router-dom"
import About from "./Pages/About"
import CreatePost from "./Pages/CreatePost"
import Dashboard from "./Pages/Dashboard"
import Home from "./Pages/Home"
import PostPages from "./Pages/PostPages"
import Project from "./Pages/Project"
import SignIn from "./Pages/SignIn"
import SignUp from "./Pages/SignUp"
import UpdatePost from "./Pages/UpdatePost"
import Footer from "./components/Footer"
import Header from "./components/Header"
import OnlyAdminPrivateRoute from "./components/OnlyAdminPrivateRoute"
import PrivateRoute from "./components/PrivateRoute"
import ScrollToTop from "./components/ScrollToTop"
function App() {

  return (
    <BrowserRouter>
      <ScrollToTop />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
        <Route element={<OnlyAdminPrivateRoute />}>
          <Route path="/create-post" element={<CreatePost />} />
          <Route path="/update-post/:postId" element={<UpdatePost />} />

        </Route>
        <Route path="/projects" element={<Project />} />
        <Route path="/post/:postSlug" element={<PostPages />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App
