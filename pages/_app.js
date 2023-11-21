import '@/styles/globals.css'

import { Provider } from 'react-redux'
import store from '../store/index.js'

import { useSelector, useDispatch } from 'react-redux';


//FONTAWESOME
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

library.add(fas);

export default function App({ Component, pageProps }) {



  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  ); 
}
