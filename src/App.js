import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MovieCreationIcon from '@mui/icons-material/MovieCreation';
import Header from './components/Header/Header';
import SimpleBottomNavigation from './components/MainNav/MainNav';
import { Container } from '@mui/material';
import Movies from './components/Pages/Movies/Movies';
import Trending from './components/Pages/Trending/Trending';
import Series from './components/Pages/Series/Series';
import Search from './components/Pages/Search/Search';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <div className="app">
        <Container>
          <Routes>
            <Route path="/" Component={Trending} exact />
            <Route path="/movies" Component={Movies} />
            <Route path="/series" Component={Series} />
            <Route path="/search" Component={Search} />
          </Routes>
        </Container>
      </div>
      <SimpleBottomNavigation />
    </BrowserRouter>
  );
}

export default App;