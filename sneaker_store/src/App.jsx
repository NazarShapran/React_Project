import "./App.css";
import Router from "./router/Router";
import SearchInputProvider from "./common/context/searchInput/searchInputProvider";

function App() {
  return (
    <>
      <SearchInputProvider>
        <Router />
      </SearchInputProvider>
    </>
  );
}

export default App;
