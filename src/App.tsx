import { createRoot } from "react-dom/client";
import Header from "./Components/Header";
import { CalendarProvider } from "./Reducer/CalendarReducer";
import SideCalendar from "./Components/SideCalendar";
import MainCalendar from "./Components/MainCalendar";
import Modal from "./Components/Modal";

function App() {
  return (
    <CalendarProvider>
      <Header />
      <main className="main-wrapper">
        <SideCalendar />
        <MainCalendar />
      </main>
      <Modal />
    </CalendarProvider>
  );
}

export default App;

const container = document.getElementById("root");

if (!container) {
  throw new Error("no container to render to");
}

const root = createRoot(container);
root.render(<App />);
