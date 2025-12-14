import { useCallback } from 'react';
import type { User } from '../types';

export interface ValidationError {
  field: string;
  message: string;
}

export interface UseUserProfileValidationReturn {
  validateField: (field: keyof User, value: unknown) => string | null;
  validateAll: (user: User) => Record<string, string>;
  validateEmail: (email: string) => string | null;
  validateUrl: (url: string) => string | null;
  validateName: (name: string, fieldLabel: string) => string | null;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const URL_REGEX = /^https?:\/\/.+/;

/**
 * Custom hook for validating UserProfile fields
 *
 * @returns Validation functions for profile fields
 *
 * @example
 * ```tsx
 * const { validateField, validateAll } = useUserProfileValidation();
 *
 * // Validate a single field
 * const error = validateField('email', 'invalid-email');
 * // error = 'Please enter a valid email address'
 *
 * // Validate all fields
 * const errors = validateAll(userData);
 * // errors = { email: 'Please enter a valid email address' }
 * ```
 */
export function useUserProfileValidation(): UseUserProfileValidationReturn {
  const validateEmail = useCallback((email: string): string | null => {
    if (!email || email.trim() === '') {
      return 'Email is required';
    }
    if (!EMAIL_REGEX.test(email)) {
      return 'Please enter a valid email address';
    }
    return null;
  }, []);

  const validateUrl = useCallback((url: string): string | null => {
    if (!url || url.trim() === '') {
      return null; // URL is optional
    }
    if (!URL_REGEX.test(url)) {
      return 'Please enter a valid URL starting with http:// or https://';
    }
    return null;
  }, []);

  const validateName = useCallback((name: string, fieldLabel: string): string | null => {
    if (!name || name.trim() === '') {
      return `${fieldLabel} is required`;
    }
    if (name.trim().length < 2) {
      return `${fieldLabel} must be at least 2 characters`;
    }
    if (name.trim().length > 50) {
      return `${fieldLabel} must be less than 50 characters`;
    }
    return null;
  }, []);

  const validateField = useCallback(
    (field: keyof User, value: unknown): string | null => {
      const stringValue = String(value ?? '');

      switch (field) {
        case 'firstName':
          return validateName(stringValue, 'First name');
        case 'lastName':
          return validateName(stringValue, 'Last name');
        case 'email':
          return validateEmail(stringValue);
        case 'website':
          return validateUrl(stringValue);
        case 'bio':
          if (stringValue.length > 500) {
            return 'Bio must be less than 500 characters';
          }
          return null;
        case 'location':
          if (stringValue.length > 100) {
            return 'Location must be less than 100 characters';
          }
          return null;
        default:
          return null;
      }
    },
    [validateEmail, validateUrl, validateName]
  );

  const validateAll = useCallback(
    (user: User): Record<string, string> => {
      const errors: Record<string, string> = {};
      const fieldsToValidate: (keyof User)[] = [
        'firstName',
        'lastName',
        'email',
        'website',
        'bio',
        'location',
      ];

      for (const field of fieldsToValidate) {
        const error = validateField(field, user[field]);
        if (error) {
          errors[field] = error;
        }
      }

      return errors;
    },
    [validateField]
  );

  return {
    validateField,
    validateAll,
    validateEmail,
    validateUrl,
    validateName,
  };
}

export default useUserProfileValidation;
