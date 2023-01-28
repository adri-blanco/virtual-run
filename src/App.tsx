import MapPage from "./pages/MapPage";
import MapContextProvider from "./context/map-context";
import GlobalStyle from "./GlobalStyle";

function App() {
  return (
    <MapContextProvider>
      <GlobalStyle />
      <MapPage />
    </MapContextProvider>
  );
}

export default App;
