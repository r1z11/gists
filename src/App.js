import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { HashRouter, Routes, Route } from "react-router-dom";
import { Provider } from 'react-redux'
import store from './store/store'
import Search from './pages/search';
import Forks from './pages/forks';

function App() {
  return (
    <Provider store={store}>
      <HashRouter>
        <div className="App">
          <Routes>
            <Route path="/" element={<Search />} />
            <Route path="/forks" element={<Forks />} />
          </Routes>
        </div>
      </HashRouter>
    </Provider>
  );
}

export default App;
