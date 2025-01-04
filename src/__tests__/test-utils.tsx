import { PropsWithChildren } from 'react';
import { render } from '@testing-library/react';
import type { RenderOptions } from '@testing-library/react';
import { Provider } from 'react-redux';
import {
  configureStore,
  combineReducers,
  type Reducer,
} from '@reduxjs/toolkit';
import { api } from '../redux/api/apiSlice';

// Create a root reducer separately to help with type inference
const rootReducer = combineReducers({
  [api.reducerPath]: api.reducer as Reducer,
});

type StoreType = ReturnType<typeof setupStore>;

export function setupStore(preloadedState?: Partial<RootState>) {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      getDefaultMiddleware().concat(api.middleware as any),
    preloadedState,
  });
}

// Infer the RootState and AppDispatch types from the store itself
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = StoreType['dispatch'];

interface ExtendedRenderOptions extends Omit<RenderOptions, 'wrapper'> {
  preloadedState?: Partial<RootState>;
  store?: StoreType;
}

export function renderWithProviders(
  ui: React.ReactElement,
  {
    preloadedState = {},
    store = setupStore(preloadedState),
    ...renderOptions
  }: ExtendedRenderOptions = {}
) {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  function Wrapper({ children }: PropsWithChildren<{}>): JSX.Element {
    return <Provider store={store}>{children}</Provider>;
  }

  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}

// eslint-disable-next-line react-refresh/only-export-components
export * from '@testing-library/react';
