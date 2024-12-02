import { registerRootComponent } from 'expo';
import { Provider } from 'react-redux'; // Import Provider
import App from './App';
import store from './src/redux/store'; // Import store Redux

// Wrap App component with Redux Provider
registerRootComponent(() => (
  <Provider store={store}>
    <App />
  </Provider>
));
