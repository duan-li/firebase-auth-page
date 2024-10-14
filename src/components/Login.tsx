import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import {
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
  TwitterAuthProvider,
  GithubAuthProvider,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { Mail, Lock, Github, Twitter, Facebook } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/profile');
    } catch (error) {
      console.error('Error signing in with email and password', error);
    }
  };

  const handleSocialSignIn = async (provider: any) => {
    try {
      await signInWithPopup(auth, provider);
      navigate('/profile');
    } catch (error) {
      console.error('Error signing in with social provider', error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="px-8 py-6 mt-4 text-left bg-white shadow-lg rounded-lg">
        <h3 className="text-2xl font-bold text-center">Login to your account</h3>
        <form onSubmit={handleEmailSignIn}>
          <div className="mt-4">
            <div>
              <label className="block" htmlFor="email">Email</label>
              <input
                type="email"
                placeholder="Email"
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mt-4">
              <label className="block">Password</label>
              <input
                type="password"
                placeholder="Password"
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="flex items-baseline justify-between">
              <button className="px-6 py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-900" type="submit">
                Login
              </button>
            </div>
          </div>
        </form>
        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Or continue with</span>
            </div>
          </div>
          <div className="mt-6 grid grid-cols-2 gap-3">
            <button
              onClick={() => handleSocialSignIn(new GoogleAuthProvider())}
              className="w-full py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
            >
              <Mail className="w-5 h-5 inline-block mr-2" />
              Google
            </button>
            <button
              onClick={() => handleSocialSignIn(new FacebookAuthProvider())}
              className="w-full py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
            >
              <Facebook className="w-5 h-5 inline-block mr-2" />
              Facebook
            </button>
            <button
              onClick={() => handleSocialSignIn(new TwitterAuthProvider())}
              className="w-full py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
            >
              <Twitter className="w-5 h-5 inline-block mr-2" />
              Twitter
            </button>
            <button
              onClick={() => handleSocialSignIn(new GithubAuthProvider())}
              className="w-full py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
            >
              <Github className="w-5 h-5 inline-block mr-2" />
              GitHub
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;