import React, { useState } from 'react';
import { UserProfile } from '../components/UserProfile';
import { createMockUser } from '../components/UserProfile/utils';
import type { User } from '../components/UserProfile/types';

type Variant = 'compact' | 'full' | 'card';

function App() {
  const [user, setUser] = useState<User>(createMockUser());
  const [variant, setVariant] = useState<Variant>('full');
  const [isEditable, setIsEditable] = useState(true);
  const [showSocialLinks, setShowSocialLinks] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const handleSave = async (updatedUser: User) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setUser(updatedUser);
    console.log('User saved:', updatedUser);
  };

  const simulateLoading = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 2000);
  };

  return (
    <div className="demo-container">
      <header className="demo-header">
        <h1>UserProfile Component Demo</h1>
        <p>Interactive demonstration of the UserProfile component</p>
      </header>

      <div className="demo-layout">
        <aside className="demo-controls">
          <h2>Controls</h2>

          <div className="control-group">
            <label>Variant</label>
            <div className="button-group">
              {(['compact', 'full', 'card'] as Variant[]).map((v) => (
                <button
                  key={v}
                  className={variant === v ? 'active' : ''}
                  onClick={() => setVariant(v)}
                >
                  {v}
                </button>
              ))}
            </div>
          </div>

          <div className="control-group">
            <label>
              <input
                type="checkbox"
                checked={isEditable}
                onChange={(e) => setIsEditable(e.target.checked)}
              />
              Editable
            </label>
          </div>

          <div className="control-group">
            <label>
              <input
                type="checkbox"
                checked={showSocialLinks}
                onChange={(e) => setShowSocialLinks(e.target.checked)}
              />
              Show Social Links
            </label>
          </div>

          <div className="control-group">
            <button onClick={simulateLoading} className="secondary">
              Simulate Loading
            </button>
          </div>

          <div className="control-group">
            <button
              onClick={() => setUser(createMockUser({ isVerified: !user.isVerified }))}
              className="secondary"
            >
              Toggle Verified
            </button>
          </div>

          <div className="control-group">
            <button
              onClick={() =>
                setUser(createMockUser({ avatar: user.avatar ? undefined : 'https://i.pravatar.cc/150' }))
              }
              className="secondary"
            >
              Toggle Avatar
            </button>
          </div>
        </aside>

        <main className="demo-preview">
          <h2>Preview</h2>
          <div className={`preview-area preview-${variant}`}>
            <UserProfile
              user={user}
              variant={variant}
              isEditable={isEditable}
              showSocialLinks={showSocialLinks}
              isLoading={isLoading}
              onSave={handleSave}
              onEdit={(u) => console.log('Edit started for:', u.firstName)}
            />
          </div>
        </main>
      </div>

      <section className="demo-code">
        <h2>Usage</h2>
        <pre>
          <code>{`import { UserProfile } from './components/UserProfile';

<UserProfile
  user={user}
  variant="${variant}"
  isEditable={${isEditable}}
  showSocialLinks={${showSocialLinks}}
  onSave={handleSave}
/>`}</code>
        </pre>
      </section>
    </div>
  );
}

export default App;
