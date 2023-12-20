import { createRoot } from 'react-dom/client';

function App() {
  return <h1 class="text-3xl font-bold p-4">Hello, World!</h1>;
}
createRoot(globalThis.root).render(<App />);
