import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import App from './App.jsx'
import './index.css'
import { persistor, store } from './redux/store.js'


import { PersistGate } from 'redux-persist/integration/react'
import ThemProvider from './components/ThemProvider.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <PersistGate persistor={persistor} >
    <Provider store={store}>
      <ThemProvider>
        <App />
      </ThemProvider>
    </Provider>,
  </PersistGate>
)