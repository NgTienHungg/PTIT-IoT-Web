import './App.css';
import Page from './Components/page/page';
import { Routes, Route } from 'react-router-dom';
import routes from './routes';
import HookMqtt from './Components/Hook/HookMqtt';

function App() {
  return (
    <div>

      {/* <Page />, */}
      <Routes>
        {
          routes.map((item) => {
            return (
              <Route key={item.id} path={item.path} element={item.main()} />
            )
          })
        }
      </Routes>

      {/* <HookMqtt />, */}
    </div>
  )
}

export default App;
