import React from "react";
import "./App.css";

import configureStore from "./configureStore";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import Header from "./components/Header/Header.js";
import Search from "./components/Search/Search.js";

const { persistor, store } = configureStore();

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <div className="App">
          <header>
            <Header></Header>
          </header>
          <main>
            <Search></Search>
          </main>
        </div>
      </PersistGate>
    </Provider>
  );
}

export default App;
