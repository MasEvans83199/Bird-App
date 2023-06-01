import { Auth } from '@supabase/auth-ui-react';
import { supabase } from '../services/supabase';
import { ThemeSupa } from '@supabase/auth-ui-shared';

const Login = ({ onLogin, isAuthenticated }) => {
  const handleLogin = () => {
    onLogin();
  };

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      onLogin(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      {isAuthenticated ? (
        <button onClick={handleLogout}>Logout</button>
      ) : (
        <Auth
          supabaseClient={supabase}
          appearance={{ theme: ThemeSupa }}
          providers={['discord', 'google', 'github']}
          onAuthSuccess={handleLogin}
          onAuthFailure={() => console.log('login failed')}
        />
      )}
    </div>
  );
};

export default Login;