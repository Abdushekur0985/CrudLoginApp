import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./component/Home";
import Create from "./component/Create";
import Read from "./component/Read";
import Update from "./component/Update";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Create" element={<Create />} />
        <Route path="/read/:id" element={<Read />} />
        <Route path="/update/:id" element={<Update />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;

