import React, { useState } from 'react';
import useAuth from '../../hooks/useAuth';
import useToast from '../../hooks/useToast';
import { User, Phone, Mail, MapPin, Save, UserCheck, ShieldCheck } from 'lucide-react';
import './Profile.css';

export const ProfilePage = () => {
  const { user, updateProfile, isGuest } = useAuth();
  const { showToast } = useToast();

  const [name, setName] = useState(user?.name || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [email] = useState(user?.email || '');
  const [editing, setEditing] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    if (!name.trim()) {
      showToast('Name cannot be empty', 'error');
      return;
    }

    updateProfile({ name, phone });
    setEditing(false);
    showToast('Profile updated successfully!', 'success');
  };

  return (
    <div className="profile-page container">
      <h2>My Profile</h2>

      <div className="profile-layout">
        {/* Left Side: Stats Card */}
        <div className="profile-card">
          <div className="avatar-large">
            {name.slice(0, 2).toUpperCase()}
          </div>
          <h3>{name}</h3>
          <span className="profile-role">
            {user?.role === 'admin' ? (
              <span className="badge-admin">Admin Account</span>
            ) : isGuest ? (
              <span className="badge-guest">Guest Account</span>
            ) : (
              <span className="badge-user">Verified Buyer</span>
            )}
          </span>
          
          <div className="profile-mini-stats">
            <div className="mini-stat">
              <span>Status</span>
              <strong>Active</strong>
            </div>
            <div className="mini-stat">
              <span>Region</span>
              <strong>India (IN)</strong>
            </div>
          </div>
        </div>

        {/* Right Side: Profile Details form */}
        <div className="profile-details-section">
          <h3>Account Details</h3>

          {isGuest ? (
            <div className="guest-alert">
              <ShieldCheck size={20} />
              <p>You are logged in as a Guest. Create a permanent account to save your order history and delivery addresses.</p>
            </div>
          ) : (
            <form onSubmit={handleSave} className="profile-form">
              <div className="form-group-profile">
                <label>Full Name</label>
                <div className="profile-input-wrapper">
                  <User size={16} />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    disabled={!editing}
                  />
                </div>
              </div>

              <div className="form-group-profile">
                <label>Email Address</label>
                <div className="profile-input-wrapper disabled">
                  <Mail size={16} />
                  <input type="email" value={email} disabled />
                </div>
                <small>Email address cannot be changed.</small>
              </div>

              <div className="form-group-profile">
                <label>Mobile Number</label>
                <div className="profile-input-wrapper">
                  <Phone size={16} />
                  <input
                    type="text"
                    placeholder="Enter phone number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    disabled={!editing}
                  />
                </div>
              </div>

              <div className="form-group-profile">
                <label>Default Address</label>
                <div className="profile-input-wrapper disabled">
                  <MapPin size={16} />
                  <input
                    type="text"
                    value="Chennai, Tamil Nadu, India"
                    disabled
                  />
                </div>
              </div>

              <div className="form-actions-profile">
                {editing ? (
                  <>
                    <button type="submit" className="save-profile-btn">
                      <Save size={16} />
                      <span>Save Changes</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setName(user?.name || '');
                        setPhone(user?.phone || '');
                        setEditing(false);
                      }}
                      className="cancel-profile-btn"
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <button
                    type="button"
                    onClick={() => setEditing(true)}
                    className="edit-profile-btn"
                  >
                    <UserCheck size={16} />
                    <span>Edit Profile Details</span>
                  </button>
                )}
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
export default ProfilePage;
