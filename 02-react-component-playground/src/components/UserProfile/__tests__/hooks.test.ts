import { renderHook, act } from '@testing-library/react';
import { useUserProfile } from '../hooks/useUserProfile';
import { useUserProfileValidation } from '../hooks/useUserProfileValidation';
import type { User } from '../types';

const mockUser: User = {
  id: '1',
  firstName: 'John',
  lastName: 'Doe',
  email: 'john.doe@example.com',
  bio: 'Test bio',
  location: 'Test location',
  website: 'https://example.com',
  joinedAt: new Date('2023-01-15'),
};

describe('useUserProfile', () => {
  describe('Initial State', () => {
    it('returns initial state correctly', () => {
      const { result } = renderHook(() => useUserProfile(mockUser));

      expect(result.current.state.isEditing).toBe(false);
      expect(result.current.state.editedUser).toBeNull();
      expect(result.current.state.errors).toEqual({});
      expect(result.current.state.isDirty).toBe(false);
      expect(result.current.isSaving).toBe(false);
    });
  });

  describe('Edit Actions', () => {
    it('starts edit mode', () => {
      const { result } = renderHook(() => useUserProfile(mockUser));

      act(() => {
        result.current.startEdit();
      });

      expect(result.current.state.isEditing).toBe(true);
      expect(result.current.state.editedUser).toEqual(mockUser);
    });

    it('cancels edit mode', () => {
      const { result } = renderHook(() => useUserProfile(mockUser));

      act(() => {
        result.current.startEdit();
      });

      act(() => {
        result.current.cancelEdit();
      });

      expect(result.current.state.isEditing).toBe(false);
      expect(result.current.state.editedUser).toBeNull();
    });

    it('updates field correctly', () => {
      const { result } = renderHook(() => useUserProfile(mockUser));

      act(() => {
        result.current.startEdit();
      });

      act(() => {
        result.current.updateField('firstName', 'Jane');
      });

      expect(result.current.state.editedUser?.firstName).toBe('Jane');
      expect(result.current.state.isDirty).toBe(true);
    });

    it('does not update field when not editing', () => {
      const { result } = renderHook(() => useUserProfile(mockUser));

      act(() => {
        result.current.updateField('firstName', 'Jane');
      });

      expect(result.current.state.editedUser).toBeNull();
    });
  });

  describe('Error Handling', () => {
    it('sets error correctly', () => {
      const { result } = renderHook(() => useUserProfile(mockUser));

      act(() => {
        result.current.setError('email', 'Invalid email');
      });

      expect(result.current.state.errors.email).toBe('Invalid email');
    });

    it('clears error correctly', () => {
      const { result } = renderHook(() => useUserProfile(mockUser));

      act(() => {
        result.current.setError('email', 'Invalid email');
      });

      act(() => {
        result.current.clearError('email');
      });

      expect(result.current.state.errors.email).toBeUndefined();
    });
  });

  describe('Save Changes', () => {
    it('calls onSave with edited user', async () => {
      const onSave = jest.fn().mockResolvedValue(undefined);
      const { result } = renderHook(() => useUserProfile(mockUser, onSave));

      act(() => {
        result.current.startEdit();
      });

      act(() => {
        result.current.updateField('firstName', 'Jane');
      });

      await act(async () => {
        await result.current.saveChanges();
      });

      expect(onSave).toHaveBeenCalledWith(
        expect.objectContaining({ firstName: 'Jane' })
      );
      expect(result.current.state.isEditing).toBe(false);
    });

    it('handles save error', async () => {
      const onSave = jest.fn().mockRejectedValue(new Error('Save failed'));
      const { result } = renderHook(() => useUserProfile(mockUser, onSave));

      act(() => {
        result.current.startEdit();
      });

      await act(async () => {
        try {
          await result.current.saveChanges();
        } catch {
          // Expected error
        }
      });

      expect(result.current.state.errors.save).toBe('Save failed');
      expect(result.current.state.isEditing).toBe(true);
    });

    it('sets isSaving during save operation', async () => {
      let resolvePromise: () => void;
      const onSave = jest.fn().mockImplementation(
        () =>
          new Promise<void>((resolve) => {
            resolvePromise = resolve;
          })
      );
      const { result } = renderHook(() => useUserProfile(mockUser, onSave));

      act(() => {
        result.current.startEdit();
      });

      act(() => {
        result.current.updateField('firstName', 'Jane');
      });

      // Start save without awaiting
      let savePromise: Promise<void>;
      await act(async () => {
        savePromise = result.current.saveChanges();
        // Let the save start but don't resolve yet
        await Promise.resolve();
      });

      expect(result.current.isSaving).toBe(true);

      await act(async () => {
        resolvePromise!();
        await savePromise;
      });

      expect(result.current.isSaving).toBe(false);
    });

    it('does nothing when not editing', async () => {
      const onSave = jest.fn();
      const { result } = renderHook(() => useUserProfile(mockUser, onSave));

      await act(async () => {
        await result.current.saveChanges();
      });

      expect(onSave).not.toHaveBeenCalled();
    });
  });

  describe('Reset', () => {
    it('resets state to initial values', () => {
      const { result } = renderHook(() => useUserProfile(mockUser));

      act(() => {
        result.current.startEdit();
        result.current.updateField('firstName', 'Jane');
        result.current.setError('email', 'Invalid');
      });

      act(() => {
        result.current.reset();
      });

      expect(result.current.state.isEditing).toBe(false);
      expect(result.current.state.editedUser).toBeNull();
      expect(result.current.state.errors).toEqual({});
      expect(result.current.state.isDirty).toBe(false);
    });
  });
});

describe('useUserProfileValidation', () => {
  describe('validateEmail', () => {
    it('returns error for empty email', () => {
      const { result } = renderHook(() => useUserProfileValidation());

      expect(result.current.validateEmail('')).toBe('Email is required');
    });

    it('returns error for invalid email', () => {
      const { result } = renderHook(() => useUserProfileValidation());

      expect(result.current.validateEmail('invalid')).toBe(
        'Please enter a valid email address'
      );
      expect(result.current.validateEmail('invalid@')).toBe(
        'Please enter a valid email address'
      );
      expect(result.current.validateEmail('@example.com')).toBe(
        'Please enter a valid email address'
      );
    });

    it('returns null for valid email', () => {
      const { result } = renderHook(() => useUserProfileValidation());

      expect(result.current.validateEmail('test@example.com')).toBeNull();
      expect(result.current.validateEmail('user.name@domain.co.uk')).toBeNull();
    });
  });

  describe('validateUrl', () => {
    it('returns null for empty URL (optional)', () => {
      const { result } = renderHook(() => useUserProfileValidation());

      expect(result.current.validateUrl('')).toBeNull();
    });

    it('returns error for invalid URL', () => {
      const { result } = renderHook(() => useUserProfileValidation());

      expect(result.current.validateUrl('invalid')).toBe(
        'Please enter a valid URL starting with http:// or https://'
      );
      expect(result.current.validateUrl('ftp://example.com')).toBe(
        'Please enter a valid URL starting with http:// or https://'
      );
    });

    it('returns null for valid URL', () => {
      const { result } = renderHook(() => useUserProfileValidation());

      expect(result.current.validateUrl('https://example.com')).toBeNull();
      expect(result.current.validateUrl('http://example.com')).toBeNull();
    });
  });

  describe('validateName', () => {
    it('returns error for empty name', () => {
      const { result } = renderHook(() => useUserProfileValidation());

      expect(result.current.validateName('', 'First name')).toBe(
        'First name is required'
      );
    });

    it('returns error for short name', () => {
      const { result } = renderHook(() => useUserProfileValidation());

      expect(result.current.validateName('A', 'First name')).toBe(
        'First name must be at least 2 characters'
      );
    });

    it('returns error for long name', () => {
      const { result } = renderHook(() => useUserProfileValidation());

      const longName = 'A'.repeat(51);
      expect(result.current.validateName(longName, 'First name')).toBe(
        'First name must be less than 50 characters'
      );
    });

    it('returns null for valid name', () => {
      const { result } = renderHook(() => useUserProfileValidation());

      expect(result.current.validateName('John', 'First name')).toBeNull();
    });
  });

  describe('validateField', () => {
    it('validates firstName field', () => {
      const { result } = renderHook(() => useUserProfileValidation());

      expect(result.current.validateField('firstName', '')).toBe(
        'First name is required'
      );
      expect(result.current.validateField('firstName', 'John')).toBeNull();
    });

    it('validates lastName field', () => {
      const { result } = renderHook(() => useUserProfileValidation());

      expect(result.current.validateField('lastName', '')).toBe(
        'Last name is required'
      );
      expect(result.current.validateField('lastName', 'Doe')).toBeNull();
    });

    it('validates bio field length', () => {
      const { result } = renderHook(() => useUserProfileValidation());

      const longBio = 'A'.repeat(501);
      expect(result.current.validateField('bio', longBio)).toBe(
        'Bio must be less than 500 characters'
      );
      expect(result.current.validateField('bio', 'Short bio')).toBeNull();
    });

    it('validates location field length', () => {
      const { result } = renderHook(() => useUserProfileValidation());

      const longLocation = 'A'.repeat(101);
      expect(result.current.validateField('location', longLocation)).toBe(
        'Location must be less than 100 characters'
      );
    });

    it('returns null for unknown fields', () => {
      const { result } = renderHook(() => useUserProfileValidation());

      expect(result.current.validateField('id', 'test')).toBeNull();
    });
  });

  describe('validateAll', () => {
    it('returns all validation errors', () => {
      const { result } = renderHook(() => useUserProfileValidation());

      const invalidUser: User = {
        id: '1',
        firstName: '',
        lastName: 'A',
        email: 'invalid',
        joinedAt: new Date(),
      };

      const errors = result.current.validateAll(invalidUser);

      expect(errors.firstName).toBe('First name is required');
      expect(errors.lastName).toBe('Last name must be at least 2 characters');
      expect(errors.email).toBe('Please enter a valid email address');
    });

    it('returns empty object for valid user', () => {
      const { result } = renderHook(() => useUserProfileValidation());

      const errors = result.current.validateAll(mockUser);

      expect(Object.keys(errors)).toHaveLength(0);
    });
  });
});
