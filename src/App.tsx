import { RouterProvider } from 'react-router-dom';
import { Toaster } from 'sonner';
import { router } from './routes';
import StoreProvider from './providers/store.provider';

function App() {
  return (
    <StoreProvider>
      <Toaster visibleToasts={1} position="top-right" richColors />
      <RouterProvider router={router} />
    </StoreProvider>
  );
}

export default App;
