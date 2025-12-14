// UserProfile Component Library

export {
  UserProfile,
  default as UserProfileDefault,
} from './components/UserProfile';

export type {
  UserProfileProps,
  User,
  SocialLinks,
  UserProfileEditState,
} from './components/UserProfile';

export {
  useUserProfile,
  useUserProfileValidation,
} from './components/UserProfile';

export type {
  UseUserProfileReturn,
  UseUserProfileValidationReturn,
} from './components/UserProfile';

export {
  getInitials,
  getFullName,
  formatDate,
  cleanUrl,
  getSocialUrl,
  hasSocialLinks,
  createMockUser,
} from './components/UserProfile/utils';
