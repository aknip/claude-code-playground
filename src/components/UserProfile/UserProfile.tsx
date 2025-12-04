import React from 'react';
import type { UserProfileProps } from './types';
import { useUserProfile } from './hooks/useUserProfile';
import { useUserProfileValidation } from './hooks/useUserProfileValidation';
import styles from './UserProfile.module.css';

/**
 * UserProfile component displays user information with optional editing capabilities.
 *
 * @example
 * ```tsx
 * <UserProfile
 *   user={userData}
 *   isEditable
 *   onSave={handleSave}
 *   variant="card"
 * />
 * ```
 */
export const UserProfile: React.FC<UserProfileProps> = ({
  user,
  isLoading = false,
  isEditable = false,
  onEdit,
  onSave,
  className,
  variant = 'full',
  showSocialLinks = true,
}) => {
  const {
    state,
    startEdit,
    cancelEdit,
    updateField,
    saveChanges,
    isSaving,
  } = useUserProfile(user, onSave);

  const { validateField, validateAll } = useUserProfileValidation();

  const handleFieldChange = (field: keyof typeof user, value: string) => {
    updateField(field, value);
    const error = validateField(field, value);
    if (error) {
      // Handle validation error display
    }
  };

  const handleSave = async () => {
    if (!state.editedUser) return;

    const errors = validateAll(state.editedUser);
    if (Object.keys(errors).length > 0) {
      return;
    }

    await saveChanges();
  };

  const handleEditClick = () => {
    startEdit();
    onEdit?.(user);
  };

  if (isLoading) {
    return (
      <div
        className={`${styles.container} ${styles[variant]} ${styles.loading} ${className || ''}`}
        data-testid="user-profile-loading"
        role="status"
        aria-busy="true"
      >
        <div className={styles.skeleton}>
          <div className={styles.skeletonAvatar} />
          <div className={styles.skeletonText} />
          <div className={styles.skeletonText} />
        </div>
        <span className={styles.srOnly}>Loading profile...</span>
      </div>
    );
  }

  const displayUser = state.isEditing && state.editedUser ? state.editedUser : user;
  const fullName = `${displayUser.firstName} ${displayUser.lastName}`;

  return (
    <article
      className={`${styles.container} ${styles[variant]} ${className || ''}`}
      data-testid="user-profile"
      aria-label={`Profile for ${fullName}`}
    >
      <header className={styles.header}>
        <div className={styles.avatarContainer}>
          {displayUser.avatar ? (
            <img
              src={displayUser.avatar}
              alt={`${fullName}'s avatar`}
              className={styles.avatar}
              data-testid="user-avatar"
            />
          ) : (
            <div
              className={styles.avatarPlaceholder}
              data-testid="user-avatar-placeholder"
              aria-label="No avatar"
            >
              {displayUser.firstName[0]}
              {displayUser.lastName[0]}
            </div>
          )}
          {displayUser.isVerified && (
            <span
              className={styles.verifiedBadge}
              title="Verified user"
              data-testid="verified-badge"
            >
              ✓
            </span>
          )}
        </div>

        <div className={styles.nameContainer}>
          {state.isEditing ? (
            <div className={styles.editFields}>
              <input
                type="text"
                value={state.editedUser?.firstName || ''}
                onChange={(e) => handleFieldChange('firstName', e.target.value)}
                className={styles.input}
                aria-label="First name"
                data-testid="edit-first-name"
              />
              <input
                type="text"
                value={state.editedUser?.lastName || ''}
                onChange={(e) => handleFieldChange('lastName', e.target.value)}
                className={styles.input}
                aria-label="Last name"
                data-testid="edit-last-name"
              />
            </div>
          ) : (
            <h2 className={styles.name} data-testid="user-name">
              {fullName}
            </h2>
          )}
          <p className={styles.email} data-testid="user-email">
            {displayUser.email}
          </p>
        </div>
      </header>

      {variant !== 'compact' && (
        <section className={styles.details}>
          {state.isEditing ? (
            <textarea
              value={state.editedUser?.bio || ''}
              onChange={(e) => handleFieldChange('bio', e.target.value)}
              className={styles.textarea}
              aria-label="Bio"
              placeholder="Tell us about yourself..."
              data-testid="edit-bio"
            />
          ) : (
            displayUser.bio && (
              <p className={styles.bio} data-testid="user-bio">
                {displayUser.bio}
              </p>
            )
          )}

          <dl className={styles.infoList}>
            {displayUser.location && (
              <>
                <dt className={styles.srOnly}>Location</dt>
                <dd className={styles.infoItem} data-testid="user-location">
                  <span className={styles.infoIcon}>📍</span>
                  {displayUser.location}
                </dd>
              </>
            )}
            {displayUser.website && (
              <>
                <dt className={styles.srOnly}>Website</dt>
                <dd className={styles.infoItem}>
                  <span className={styles.infoIcon}>🔗</span>
                  <a
                    href={displayUser.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.link}
                    data-testid="user-website"
                  >
                    {displayUser.website.replace(/^https?:\/\//, '')}
                  </a>
                </dd>
              </>
            )}
            <dt className={styles.srOnly}>Member since</dt>
            <dd className={styles.infoItem} data-testid="user-joined">
              <span className={styles.infoIcon}>📅</span>
              Joined {new Date(displayUser.joinedAt).toLocaleDateString()}
            </dd>
          </dl>

          {showSocialLinks && displayUser.socialLinks && (
            <nav className={styles.socialLinks} aria-label="Social links">
              {displayUser.socialLinks.twitter && (
                <a
                  href={`https://twitter.com/${displayUser.socialLinks.twitter}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialLink}
                  aria-label="Twitter profile"
                  data-testid="social-twitter"
                >
                  Twitter
                </a>
              )}
              {displayUser.socialLinks.linkedin && (
                <a
                  href={`https://linkedin.com/in/${displayUser.socialLinks.linkedin}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialLink}
                  aria-label="LinkedIn profile"
                  data-testid="social-linkedin"
                >
                  LinkedIn
                </a>
              )}
              {displayUser.socialLinks.github && (
                <a
                  href={`https://github.com/${displayUser.socialLinks.github}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialLink}
                  aria-label="GitHub profile"
                  data-testid="social-github"
                >
                  GitHub
                </a>
              )}
            </nav>
          )}
        </section>
      )}

      {isEditable && (
        <footer className={styles.actions}>
          {state.isEditing ? (
            <>
              <button
                type="button"
                onClick={cancelEdit}
                className={styles.buttonSecondary}
                disabled={isSaving}
                data-testid="cancel-edit-button"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSave}
                className={styles.buttonPrimary}
                disabled={isSaving || !state.isDirty}
                data-testid="save-button"
              >
                {isSaving ? 'Saving...' : 'Save'}
              </button>
            </>
          ) : (
            <button
              type="button"
              onClick={handleEditClick}
              className={styles.buttonPrimary}
              data-testid="edit-button"
            >
              Edit Profile
            </button>
          )}
        </footer>
      )}
    </article>
  );
};

UserProfile.displayName = 'UserProfile';

export default UserProfile;
