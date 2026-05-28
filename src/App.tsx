import { useState } from "react";
import { Content } from "./components/Content";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { Sidebar } from "./app/layout/Sidebar";
import type { Page } from "./app/layout/page.types";

function App() {
  const [activePage, setActivePage] = useState<Page>("Dashboard");

  return (
    <div className="min-h-screen bg-white text-slate-950">
      <Header />

      <div className="flex min-h-[calc(100vh-6rem)]">
        <Sidebar activePage={activePage} onPageChange={setActivePage} />
        <Content activePage={activePage} />
      </div>

      <Footer />
    </div>
  );
}

export default App;
