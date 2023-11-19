import Home from './Componenets/Home/Home';
import Header from './Componenets/Header/Header';
import './App.css';

function App() {
  return (
    <div className="App">
      <div>
          <Header/>
      </div>

      <div className='home'>
          <Home/>
      </div>
    </div>
  );
}

export default App;
