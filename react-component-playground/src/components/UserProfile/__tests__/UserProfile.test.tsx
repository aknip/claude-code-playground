import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { UserProfile } from '../UserProfile';
import type { User } from '../types';

const mockUser: User = {
  id: '1',
  firstName: 'John',
  lastName: 'Doe',
  email: 'john.doe@example.com',
  avatar: 'https://example.com/avatar.jpg',
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
};

const mockUserWithoutOptionals: User = {
  id: '2',
  firstName: 'Jane',
  lastName: 'Smith',
  email: 'jane.smith@example.com',
  joinedAt: new Date('2023-06-20'),
};

describe('UserProfile', () => {
  describe('Rendering', () => {
    it('renders user profile with all information', () => {
      render(<UserProfile user={mockUser} />);

      expect(screen.getByTestId('user-profile')).toBeInTheDocument();
      expect(screen.getByTestId('user-name')).toHaveTextContent('John Doe');
      expect(screen.getByTestId('user-email')).toHaveTextContent('john.doe@example.com');
      expect(screen.getByTestId('user-bio')).toHaveTextContent(mockUser.bio!);
      expect(screen.getByTestId('user-location')).toHaveTextContent('San Francisco, CA');
      expect(screen.getByTestId('user-website')).toHaveTextContent('johndoe.dev');
    });

    it('renders avatar image when provided', () => {
      render(<UserProfile user={mockUser} />);

      const avatar = screen.getByTestId('user-avatar');
      expect(avatar).toHaveAttribute('src', mockUser.avatar);
      expect(avatar).toHaveAttribute('alt', "John Doe's avatar");
    });

    it('renders avatar placeholder when no avatar is provided', () => {
      render(<UserProfile user={mockUserWithoutOptionals} />);

      const placeholder = screen.getByTestId('user-avatar-placeholder');
      expect(placeholder).toHaveTextContent('JS');
    });

    it('renders verified badge for verified users', () => {
      render(<UserProfile user={mockUser} />);

      expect(screen.getByTestId('verified-badge')).toBeInTheDocument();
    });

    it('does not render verified badge for non-verified users', () => {
      render(<UserProfile user={mockUserWithoutOptionals} />);

      expect(screen.queryByTestId('verified-badge')).not.toBeInTheDocument();
    });

    it('renders social links when available', () => {
      render(<UserProfile user={mockUser} showSocialLinks />);

      expect(screen.getByTestId('social-twitter')).toHaveAttribute(
        'href',
        'https://twitter.com/johndoe'
      );
      expect(screen.getByTestId('social-linkedin')).toHaveAttribute(
        'href',
        'https://linkedin.com/in/johndoe'
      );
      expect(screen.getByTestId('social-github')).toHaveAttribute(
        'href',
        'https://github.com/johndoe'
      );
    });

    it('does not render social links when showSocialLinks is false', () => {
      render(<UserProfile user={mockUser} showSocialLinks={false} />);

      expect(screen.queryByTestId('social-twitter')).not.toBeInTheDocument();
    });

    it('renders loading state correctly', () => {
      render(<UserProfile user={mockUser} isLoading />);

      expect(screen.getByTestId('user-profile-loading')).toBeInTheDocument();
      expect(screen.getByRole('status')).toHaveAttribute('aria-busy', 'true');
    });
  });

  describe('Variants', () => {
    it('renders compact variant without details section', () => {
      render(<UserProfile user={mockUser} variant="compact" />);

      expect(screen.queryByTestId('user-bio')).not.toBeInTheDocument();
    });

    it('renders full variant with all details', () => {
      render(<UserProfile user={mockUser} variant="full" />);

      expect(screen.getByTestId('user-bio')).toBeInTheDocument();
      expect(screen.getByTestId('user-location')).toBeInTheDocument();
    });

    it('renders card variant', () => {
      render(<UserProfile user={mockUser} variant="card" />);

      expect(screen.getByTestId('user-profile')).toBeInTheDocument();
    });

    it('applies custom className', () => {
      render(<UserProfile user={mockUser} className="custom-class" />);

      expect(screen.getByTestId('user-profile')).toHaveClass('custom-class');
    });
  });

  describe('Editing', () => {
    it('renders edit button when isEditable is true', () => {
      render(<UserProfile user={mockUser} isEditable />);

      expect(screen.getByTestId('edit-button')).toBeInTheDocument();
    });

    it('does not render edit button when isEditable is false', () => {
      render(<UserProfile user={mockUser} isEditable={false} />);

      expect(screen.queryByTestId('edit-button')).not.toBeInTheDocument();
    });

    it('enters edit mode when edit button is clicked', async () => {
      const user = userEvent.setup();
      render(<UserProfile user={mockUser} isEditable />);

      await user.click(screen.getByTestId('edit-button'));

      await waitFor(() => {
        expect(screen.getByTestId('edit-first-name')).toBeInTheDocument();
      });
      expect(screen.getByTestId('edit-last-name')).toBeInTheDocument();
      expect(screen.getByTestId('edit-bio')).toBeInTheDocument();
    });

    it('calls onEdit callback when entering edit mode', async () => {
      const user = userEvent.setup();
      const onEdit = jest.fn();
      render(<UserProfile user={mockUser} isEditable onEdit={onEdit} />);

      await user.click(screen.getByTestId('edit-button'));

      await waitFor(() => {
        expect(onEdit).toHaveBeenCalledWith(mockUser);
      });
    });

    it('exits edit mode when cancel button is clicked', async () => {
      const user = userEvent.setup();
      render(<UserProfile user={mockUser} isEditable />);

      await user.click(screen.getByTestId('edit-button'));
      await waitFor(() => {
        expect(screen.getByTestId('edit-first-name')).toBeInTheDocument();
      });

      await user.click(screen.getByTestId('cancel-edit-button'));
      await waitFor(() => {
        expect(screen.queryByTestId('edit-first-name')).not.toBeInTheDocument();
      });
    });

    it('allows editing first name', async () => {
      const user = userEvent.setup();
      render(<UserProfile user={mockUser} isEditable />);

      await user.click(screen.getByTestId('edit-button'));
      await waitFor(() => {
        expect(screen.getByTestId('edit-first-name')).toBeInTheDocument();
      });

      const firstNameInput = screen.getByTestId('edit-first-name');
      await user.clear(firstNameInput);
      await user.type(firstNameInput, 'Jane');

      expect(firstNameInput).toHaveValue('Jane');
    });

    it('allows editing bio', async () => {
      const user = userEvent.setup();
      render(<UserProfile user={mockUser} isEditable />);

      await user.click(screen.getByTestId('edit-button'));
      await waitFor(() => {
        expect(screen.getByTestId('edit-bio')).toBeInTheDocument();
      });

      const bioInput = screen.getByTestId('edit-bio');
      await user.clear(bioInput);
      await user.type(bioInput, 'New bio text');

      expect(bioInput).toHaveValue('New bio text');
    });

    it('calls onSave with updated user data', async () => {
      const user = userEvent.setup();
      const onSave = jest.fn().mockResolvedValue(undefined);
      render(<UserProfile user={mockUser} isEditable onSave={onSave} />);

      await user.click(screen.getByTestId('edit-button'));
      await waitFor(() => {
        expect(screen.getByTestId('edit-first-name')).toBeInTheDocument();
      });

      const firstNameInput = screen.getByTestId('edit-first-name');
      await user.clear(firstNameInput);
      await user.type(firstNameInput, 'Jane');
      await user.click(screen.getByTestId('save-button'));

      await waitFor(() => {
        expect(onSave).toHaveBeenCalledWith(
          expect.objectContaining({
            firstName: 'Jane',
          })
        );
      });

      // Wait for edit mode to exit
      await waitFor(() => {
        expect(screen.queryByTestId('edit-first-name')).not.toBeInTheDocument();
      });
    });

    it('disables save button when there are no changes', async () => {
      const user = userEvent.setup();
      render(<UserProfile user={mockUser} isEditable />);

      await user.click(screen.getByTestId('edit-button'));
      await waitFor(() => {
        expect(screen.getByTestId('save-button')).toBeDisabled();
      });
    });

    it('enables save button after making changes', async () => {
      const user = userEvent.setup();
      render(<UserProfile user={mockUser} isEditable onSave={jest.fn()} />);

      await user.click(screen.getByTestId('edit-button'));
      await waitFor(() => {
        expect(screen.getByTestId('edit-first-name')).toBeInTheDocument();
      });

      const firstNameInput = screen.getByTestId('edit-first-name');
      await user.type(firstNameInput, 'x');

      await waitFor(() => {
        expect(screen.getByTestId('save-button')).not.toBeDisabled();
      });
    });
  });

  describe('Accessibility', () => {
    it('has proper aria-label on profile container', () => {
      render(<UserProfile user={mockUser} />);

      expect(screen.getByTestId('user-profile')).toHaveAttribute(
        'aria-label',
        'Profile for John Doe'
      );
    });

    it('has proper aria-label on social links', () => {
      render(<UserProfile user={mockUser} showSocialLinks />);

      expect(screen.getByTestId('social-twitter')).toHaveAttribute(
        'aria-label',
        'Twitter profile'
      );
    });

    it('has proper aria-label on edit inputs', async () => {
      const user = userEvent.setup();
      render(<UserProfile user={mockUser} isEditable />);

      await user.click(screen.getByTestId('edit-button'));

      await waitFor(() => {
        expect(screen.getByTestId('edit-first-name')).toHaveAttribute('aria-label', 'First name');
      });
      expect(screen.getByTestId('edit-last-name')).toHaveAttribute('aria-label', 'Last name');
      expect(screen.getByTestId('edit-bio')).toHaveAttribute('aria-label', 'Bio');
    });

    it('external links have rel="noopener noreferrer"', () => {
      render(<UserProfile user={mockUser} showSocialLinks />);

      const twitterLink = screen.getByTestId('social-twitter');
      expect(twitterLink).toHaveAttribute('rel', 'noopener noreferrer');
      expect(twitterLink).toHaveAttribute('target', '_blank');
    });
  });

  describe('Edge Cases', () => {
    it('handles user without optional fields', () => {
      render(<UserProfile user={mockUserWithoutOptionals} />);

      expect(screen.getByTestId('user-name')).toHaveTextContent('Jane Smith');
      expect(screen.queryByTestId('user-bio')).not.toBeInTheDocument();
      expect(screen.queryByTestId('user-location')).not.toBeInTheDocument();
      expect(screen.queryByTestId('user-website')).not.toBeInTheDocument();
    });

    it('handles empty social links', () => {
      const userWithEmptySocials: User = {
        ...mockUser,
        socialLinks: {},
      };
      render(<UserProfile user={userWithEmptySocials} showSocialLinks />);

      expect(screen.queryByTestId('social-twitter')).not.toBeInTheDocument();
      expect(screen.queryByTestId('social-linkedin')).not.toBeInTheDocument();
      expect(screen.queryByTestId('social-github')).not.toBeInTheDocument();
    });

    it('formats join date correctly', () => {
      render(<UserProfile user={mockUser} />);

      const joinedText = screen.getByTestId('user-joined');
      expect(joinedText).toHaveTextContent('Joined');
      // Date format depends on locale, just check it contains something
      expect(joinedText.textContent).toMatch(/Joined \d/);
    });
  });
});
