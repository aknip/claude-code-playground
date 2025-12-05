/**
 * User data structure representing profile information
 */
export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  avatar?: string;
  bio?: string;
  location?: string;
  website?: string;
  joinedAt: Date;
  isVerified?: boolean;
  socialLinks?: SocialLinks;
}

export interface SocialLinks {
  twitter?: string;
  linkedin?: string;
  github?: string;
}

/**
 * Props for the UserProfile component
 */
export interface UserProfileProps {
  /** User data to display */
  user: User;
  /** Whether the profile is in loading state */
  isLoading?: boolean;
  /** Whether the profile is editable */
  isEditable?: boolean;
  /** Callback when edit is requested */
  onEdit?: (user: User) => void;
  /** Callback when profile is saved */
  onSave?: (user: User) => Promise<void>;
  /** Custom CSS class name */
  className?: string;
  /** Display variant */
  variant?: 'compact' | 'full' | 'card';
  /** Show social links */
  showSocialLinks?: boolean;
}

/**
 * State for user profile editing
 */
export interface UserProfileEditState {
  isEditing: boolean;
  editedUser: User | null;
  errors: Record<string, string>;
  isDirty: boolean;
}

/**
 * Actions for user profile state management
 */
export type UserProfileAction =
  | { type: 'START_EDIT'; payload: User }
  | { type: 'CANCEL_EDIT' }
  | { type: 'UPDATE_FIELD'; payload: { field: keyof User; value: unknown } }
  | { type: 'SET_ERROR'; payload: { field: string; message: string } }
  | { type: 'CLEAR_ERROR'; payload: string }
  | { type: 'SAVE_SUCCESS' }
  | { type: 'RESET' };
