import '@/styles/globals.css'
import { useState, useEffect } from 'react';
import { Provider } from 'react-redux'
import store from '../store/index.js'
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";

import { useSelector, useDispatch } from 'react-redux';


//FONTAWESOME
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

library.add(fas);


export default function App({ Component, pageProps }) {

  const persistor = persistStore(store);

  
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simuliere eine Verzögerung von 2 Sekunden für das Laden der Seite
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  if (isLoading) {
    return (
      <p
        style={{
          fontSize: "2rem",
          color: "purple",
          position: "relative",
          top: "40px",
          left: "40px",
          margin: "0px",
          padding: "0px"
        }}
      >
        loading page content
      </p>
    );
  } 




  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Component {...pageProps} />
      </PersistGate>
    </Provider>
  ); 
}
