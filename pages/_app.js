import '@/styles/globals.css'
import { useState, useEffect } from 'react';
import { Provider } from 'react-redux'
import store from '../store/index.js'
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";



//FONTAWESOME
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";

library.add(fas);

import Layout from '@/components/Layout.js';


export default function App({ Component, pageProps }) {

  const persistor = persistStore(store);



  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </PersistGate>
    </Provider>
  ); 
}
