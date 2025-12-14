import type { User } from './types';

/**
 * Generates initials from a user's first and last name
 *
 * @param user - User object with firstName and lastName
 * @returns Two-letter initials string
 *
 * @example
 * ```ts
 * getInitials({ firstName: 'John', lastName: 'Doe' }) // 'JD'
 * ```
 */
export function getInitials(user: Pick<User, 'firstName' | 'lastName'>): string {
  const first = user.firstName.trim()[0] || '';
  const last = user.lastName.trim()[0] || '';
  return `${first}${last}`.toUpperCase();
}

/**
 * Formats a user's full name
 *
 * @param user - User object with firstName and lastName
 * @returns Full name string
 *
 * @example
 * ```ts
 * getFullName({ firstName: 'John', lastName: 'Doe' }) // 'John Doe'
 * ```
 */
export function getFullName(user: Pick<User, 'firstName' | 'lastName'>): string {
  return `${user.firstName.trim()} ${user.lastName.trim()}`.trim();
}

/**
 * Formats a date for display
 *
 * @param date - Date to format
 * @param options - Intl.DateTimeFormat options
 * @returns Formatted date string
 *
 * @example
 * ```ts
 * formatDate(new Date('2023-01-15')) // 'January 15, 2023'
 * ```
 */
export function formatDate(
  date: Date,
  options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }
): string {
  return new Date(date).toLocaleDateString(undefined, options);
}

/**
 * Cleans a URL for display by removing protocol
 *
 * @param url - URL to clean
 * @returns URL without http:// or https://
 *
 * @example
 * ```ts
 * cleanUrl('https://example.com/page') // 'example.com/page'
 * ```
 */
export function cleanUrl(url: string): string {
  return url.replace(/^https?:\/\//, '');
}

/**
 * Generates social media profile URL
 *
 * @param platform - Social media platform
 * @param username - Username on the platform
 * @returns Full profile URL
 *
 * @example
 * ```ts
 * getSocialUrl('twitter', 'johndoe') // 'https://twitter.com/johndoe'
 * ```
 */
export function getSocialUrl(
  platform: 'twitter' | 'linkedin' | 'github',
  username: string
): string {
  const baseUrls = {
    twitter: 'https://twitter.com/',
    linkedin: 'https://linkedin.com/in/',
    github: 'https://github.com/',
  };

  return `${baseUrls[platform]}${username}`;
}

/**
 * Checks if a user has any social links
 *
 * @param user - User object
 * @returns True if user has at least one social link
 *
 * @example
 * ```ts
 * hasSocialLinks({ socialLinks: { twitter: 'johndoe' } }) // true
 * hasSocialLinks({ socialLinks: {} }) // false
 * ```
 */
export function hasSocialLinks(user: Pick<User, 'socialLinks'>): boolean {
  if (!user.socialLinks) return false;

  return Object.values(user.socialLinks).some(
    (value) => value !== undefined && value !== ''
  );
}

/**
 * Creates a mock user for testing/development
 *
 * @param overrides - Partial user object to override defaults
 * @returns Complete User object
 *
 * @example
 * ```ts
 * const testUser = createMockUser({ firstName: 'Test' });
 * ```
 */
export function createMockUser(overrides: Partial<User> = {}): User {
  return {
    id: 'mock-user-1',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    avatar: 'https://via.placeholder.com/150',
    bio: 'Software developer passionate about building great products.',
    location: 'San Francisco, CA',
    website: 'https://johndoe.dev',
    joinedAt: new Date('2023-01-15'),
    isVerified: true,
    socialLinks: {
      twitter: 'johndoe',
      linkedin: 'johndoe',
      github: 'johndoe',
    },
    ...overrides,
  };
}
