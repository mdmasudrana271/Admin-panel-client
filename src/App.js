import { useContext } from 'react';
import { RouterProvider } from 'react-router-dom';
import './App.css';
import { ThemeContext } from './context/AuthProvider';
import router from './Router/router';

function App() {
  const {theme} = useContext(ThemeContext)
  return (
    <div data-theme={theme}>
      <RouterProvider router={router}></RouterProvider>
    </div>
  );
}

export default App;
