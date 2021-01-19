// ========================================
// UI Actions
// ========================================

import { types } from '../types/types';

// payload significa carga útil

export const setErrorAction = ( err ) => ( { type: types.uiSetError, payload: err } );

export const removeErrorAction = () => ( { type: types.uiRemoveError } );

export const startLoadingAction = () => ( { type: types.uiStartLoading } );

// export const finishLoadingAction = () => ( { type: types.uiFinishLoading } );

export const finishLoadingAction = () => {

  return { type: types.uiFinishLoading };

};
