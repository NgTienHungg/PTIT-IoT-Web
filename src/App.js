import './App.css';
import Page from './Components/page/page';
import { Routes, Route } from 'react-router-dom';
import routes from './routes';
import Menu from './Components/menu/Menu';
function App() {
  return (
    <Page />,
    <Routes>
      {
        routes.map((item) => {
          return (
            <Route key={item.id} path={item.path} element={item.main()} />
          )
        })
      }
    </Routes>
  )
}

export default App;
