import { BrowserRouter as Route, Router } from "react-router-dom";
import "./App.css";
import TableData from "./components/Table/TableData";

function App() {
  return (
    <div className="App">
      {/* <Navigation /> */}
      <TableData />
      {/* <Router>
        <Route path="/table" element={<TableData />} />
      </Router> */}
    </div>
  );
}

export default App;
