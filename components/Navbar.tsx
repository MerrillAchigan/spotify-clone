'use client';

import { useEffect, useState } from 'react';
import { BellDot, Users, ArrowLeft, ArrowRight, Home } from 'lucide-react';
import SearchForm from './SearchForm';
import Image from 'next/image';

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('access_token');
  
    if (token) {
      localStorage.setItem('spotify_access_token', token); // Save it
      setAccessToken(token);
    } else {
      const storedToken = localStorage.getItem('spotify_access_token');
      if (!storedToken) return;
      setAccessToken(storedToken);
    }
  
    const activeToken = token || localStorage.getItem('spotify_access_token');
  
    fetch('/api/spotify', {
      headers: {
        Authorization: `Bearer ${activeToken}`
      }
    })
      .then((res) => res.json())
      .then((data) => {
        if (!data.error) setUser(data);
      })
      .catch((err) => console.error('Spotify profile error:', err));
  }, []);
  

  const handleLogin = () => {
    // Redirect to Spotify login page
    const clientId = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID;
    const redirectUri = 'http://localhost:3000/api/auth/callback';
    const scopes = 'user-read-email user-read-private';

    const loginUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=code&redirect_uri=${encodeURIComponent(
      redirectUri
    )}&scope=${encodeURIComponent(scopes)}`;

    window.location.href = loginUrl;
  };

  return (
    <section className='flex-between'>
      <div className='flex gap-2'>
        <button>
          <ArrowLeft className='size-5' />
        </button>
        <button>
          <ArrowRight className='size-5' />
        </button>
      </div>

      <div className='flex-between gap-2'>
        <button className='icon-button'>
          <Home className='size-5' />
        </button>
        <SearchForm />
      </div>

      <div className='flex-between gap-4 items-center'>
        <p className='bg-white text-black rounded-full px-4 py-2 font-semibold'>Explore Premium</p>
        <button>
          <BellDot className='size-5' />
        </button>
        <button>
          <Users className='size-5' />
        </button>

        {/* Profile/Login */}
        <button onClick={handleLogin} className='flex items-center gap-2'>
          {!user ? (
            <span className='font-medium'>Login</span>
          ) : (
            <>
              {user.images?.[0]?.url && (
                <Image
                  src={user.images[0].url}
                  alt='Profile'
                  width={30}
                  height={30}
                  className='rounded-full'
                />
              )}
              <span>{user.display_name}</span>
            </>
          )}
        </button>
      </div>
    </section>
  );
};

export default Navbar;
