import 'antd/dist/antd.css';
import axios from 'axios';
import { Provider } from 'react-redux';
import Employee from './pages/employee';
import store from './redux/store';

axios.defaults.baseURL ="http://localhost:5000";

const App = () => {

  return (
    <>
      <Provider store={store}>
        <Employee />
      </Provider>
    </>
  )
}

export default App;