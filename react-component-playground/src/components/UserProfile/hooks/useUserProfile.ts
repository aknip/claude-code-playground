import { useReducer, useCallback, useState } from 'react';
import type { User, UserProfileEditState, UserProfileAction } from '../types';

const initialState: UserProfileEditState = {
  isEditing: false,
  editedUser: null,
  errors: {},
  isDirty: false,
};

function userProfileReducer(
  state: UserProfileEditState,
  action: UserProfileAction
): UserProfileEditState {
  switch (action.type) {
    case 'START_EDIT':
      return {
        ...state,
        isEditing: true,
        editedUser: { ...action.payload },
        errors: {},
        isDirty: false,
      };

    case 'CANCEL_EDIT':
      return {
        ...state,
        isEditing: false,
        editedUser: null,
        errors: {},
        isDirty: false,
      };

    case 'UPDATE_FIELD':
      if (!state.editedUser) return state;
      return {
        ...state,
        editedUser: {
          ...state.editedUser,
          [action.payload.field]: action.payload.value,
        },
        isDirty: true,
      };

    case 'SET_ERROR':
      return {
        ...state,
        errors: {
          ...state.errors,
          [action.payload.field]: action.payload.message,
        },
      };

    case 'CLEAR_ERROR': {
      const { [action.payload]: _removed, ...remainingErrors } = state.errors;
      void _removed; // Intentionally unused - extracting to remove from object
      return {
        ...state,
        errors: remainingErrors,
      };
    }

    case 'SAVE_SUCCESS':
      return {
        ...state,
        isEditing: false,
        editedUser: null,
        errors: {},
        isDirty: false,
      };

    case 'RESET':
      return initialState;

    default:
      return state;
  }
}

export interface UseUserProfileReturn {
  state: UserProfileEditState;
  startEdit: () => void;
  cancelEdit: () => void;
  updateField: (field: keyof User, value: unknown) => void;
  setError: (field: string, message: string) => void;
  clearError: (field: string) => void;
  saveChanges: () => Promise<void>;
  reset: () => void;
  isSaving: boolean;
}

/**
 * Custom hook for managing UserProfile edit state
 *
 * @param user - The current user data
 * @param onSave - Optional callback to save changes
 * @returns State and actions for managing profile editing
 *
 * @example
 * ```tsx
 * const { state, startEdit, updateField, saveChanges } = useUserProfile(user, handleSave);
 *
 * // Start editing
 * startEdit();
 *
 * // Update a field
 * updateField('firstName', 'John');
 *
 * // Save changes
 * await saveChanges();
 * ```
 */
export function useUserProfile(
  user: User,
  onSave?: (user: User) => Promise<void>
): UseUserProfileReturn {
  const [state, dispatch] = useReducer(userProfileReducer, initialState);
  const [isSaving, setIsSaving] = useState(false);

  const startEdit = useCallback(() => {
    dispatch({ type: 'START_EDIT', payload: user });
  }, [user]);

  const cancelEdit = useCallback(() => {
    dispatch({ type: 'CANCEL_EDIT' });
  }, []);

  const updateField = useCallback((field: keyof User, value: unknown) => {
    dispatch({ type: 'UPDATE_FIELD', payload: { field, value } });
  }, []);

  const setError = useCallback((field: string, message: string) => {
    dispatch({ type: 'SET_ERROR', payload: { field, message } });
  }, []);

  const clearError = useCallback((field: string) => {
    dispatch({ type: 'CLEAR_ERROR', payload: field });
  }, []);

  const saveChanges = useCallback(async () => {
    if (!state.editedUser || !onSave) return;

    setIsSaving(true);
    try {
      await onSave(state.editedUser);
      dispatch({ type: 'SAVE_SUCCESS' });
    } catch (error) {
      setError('save', error instanceof Error ? error.message : 'Failed to save');
      throw error;
    } finally {
      setIsSaving(false);
    }
  }, [state.editedUser, onSave, setError]);

  const reset = useCallback(() => {
    dispatch({ type: 'RESET' });
  }, []);

  return {
    state,
    startEdit,
    cancelEdit,
    updateField,
    setError,
    clearError,
    saveChanges,
    reset,
    isSaving,
  };
}

export default useUserProfile;
