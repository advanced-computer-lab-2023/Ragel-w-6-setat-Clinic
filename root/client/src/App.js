import { BrowserRouter , Routes, Route} from 'react-router-dom'

//pages and components
import Admin from './pages/Admin';


function App() {
  return (
    <div className="App">
    <BrowserRouter>
    <div classname = "pages">
      <Routes>
        <Route
        path = "/admins"
        element = {<Admin />}
        />
      </Routes>
    </div>
    </BrowserRouter>
    </div>
  );
}

export default App;
