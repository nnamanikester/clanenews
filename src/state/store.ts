import { init, RematchDispatch, RematchRootState } from '@rematch/core';
import { models, RootModel } from './models';

// Initialize and export the store
export const store = init({
    models,
});

// Exporting the store types
export type Store = typeof store;
export type Dispatch = RematchDispatch<RootModel>;
export type RootState = RematchRootState<RootModel>;