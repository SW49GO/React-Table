import React from 'react'
import ReactDOM from 'react-dom/client'
import './example/index.css'
import App from './example/App'
import { PersistGate } from 'redux-persist/integration/react'
import { store, persistor } from './lib/store'
import { Provider } from 'react-redux'

const root = ReactDOM.createRoot(document.getElementById('root'))



root.render(
  <Provider store={store}>
  <PersistGate loading={null} persistor={persistor}>
    <React.StrictMode>
      <App/>
    </React.StrictMode>
  </PersistGate>
</Provider>
)