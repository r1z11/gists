import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from 'react-redux'
import store from './store/store'
import Search from './pages/search';
import Forks from './pages/forks';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className="App">
          <Routes>
            <Route path="/" element={<Search />} />
            <Route path="/forks" element={<Forks />} />
          </Routes>
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
