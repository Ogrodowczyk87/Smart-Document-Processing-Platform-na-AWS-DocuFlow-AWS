import { DocumentProvider } from "./context/DocumentContext";
import { AppRoutes } from "./routes/AppRoutes";

function App() {
  return (
    <DocumentProvider>
      <AppRoutes />
    </DocumentProvider>
  );
}

export default App;
