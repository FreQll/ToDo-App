import "./App.scss";
import { Routes, Route } from "react-router-dom";
import Main from "./components/Main/Main";
import Users from "./components/Users";

function App() {
  return (
    <div className="content">
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/users" element={<Users />} />
        <Route
          path="*"
          element={<div style={{color: "white"}}>Sorry, but this page doesnt exist :(</div>}
        />
      </Routes>
    </div>
  );
}

export default App;
