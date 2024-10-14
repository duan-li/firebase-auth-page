import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../firebase';
import { updateProfile, updatePassword, User } from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { LogOut, User as UserIcon, Mail, Image } from 'lucide-react';

const Profile = () => {
  const [user, setUser] = useState<User | null>(null);
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [photoURL, setPhotoURL] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
        setDisplayName(user.displayName || '');
        setEmail(user.email || '');
        setPhotoURL(user.photoURL || '');
        fetchAdditionalUserInfo(user.uid);
      } else {
        navigate('/');
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const fetchAdditionalUserInfo = async (uid: string) => {
    const userDoc = await getDoc(doc(db, 'users', uid));
    if (userDoc.exists()) {
      const userData = userDoc.data();
      // Update state with additional user info if needed
    }
  };

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (user) {
      try {
        await updateProfile(user, { displayName, photoURL });
        await setDoc(doc(db, 'users', user.uid), {
          displayName,
          email,
          photoURL,
        }, { merge: true });
        alert('Profile updated successfully');
      } catch (error) {
        console.error('Error updating profile', error);
        alert('Failed to update profile');
      }
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (user) {
      try {
        await updatePassword(user, newPassword);
        setNewPassword('');
        alert('Password changed successfully');
      } catch (error) {
        console.error('Error changing password', error);
        alert('Failed to change password');
      }
    }
  };

  const handleLogout = async () => {
    try {
      await auth.signOut();
      navigate('/');
    } catch (error) {
      console.error('Error signing out', error);
    }
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-300 to-blue-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div className="max-w-md mx-auto">
            <div className="flex items-center space-x-5">
              <div className="h-14 w-14 bg-blue-500 rounded-full flex flex-shrink-0 justify-center items-center text-white text-2xl font-mono">
                {photoURL ? (
                  <img src={photoURL} alt="Profile" className="h-14 w-14 rounded-full" />
                ) : (
                  <UserIcon size={24} />
                )}
              </div>
              <div className="block pl-2 font-semibold text-xl self-start text-gray-700">
                <h2 className="leading-relaxed">{displayName || 'User'}</h2>
                <p className="text-sm text-gray-500 font-normal leading-relaxed">{email}</p>
              </div>
            </div>
            <div className="divide-y divide-gray-200">
              <form onSubmit={handleUpdateProfile} className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                <div className="flex flex-col">
                  <label className="leading-loose">Display Name</label>
                  <input
                    type="text"
                    className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                  />
                </div>
                <div className="flex flex-col">
                  <label className="leading-loose">Email</label>
                  <input
                    type="email"
                    className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="flex flex-col">
                  <label className="leading-loose">Profile Picture URL</label>
                  <input
                    type="text"
                    className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                    value={photoURL}
                    onChange={(e) => setPhotoURL(e.target.value)}
                  />
                </div>
                <button type="submit" className="bg-blue-500 flex justify-center items-center w-full text-white px-4 py-3 rounded-md focus:outline-none">
                  Update Profile
                </button>
              </form>
              <form onSubmit={handleChangePassword} className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                <div className="flex flex-col">
                  <label className="leading-loose">New Password</label>
                  <input
                    type="password"
                    className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </div>
                <button type="submit" className="bg-green-500 flex justify-center items-center w-full text-white px-4 py-3 rounded-md focus:outline-none">
                  Change Password
                </button>
              </form>
            </div>
            <div className="pt-4 flex items-center space-x-4">
              <button
                onClick={handleLogout}
                className="bg-red-500 flex justify-center items-center w-full text-white px-4 py-3 rounded-md focus:outline-none"
              >
                <LogOut className="mr-2" size={18} />
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;