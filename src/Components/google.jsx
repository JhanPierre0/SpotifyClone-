import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../data/supabase';

const OneTapComponent = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const initializeGoogleSignIn = () => {
      window.google.accounts.id.initialize({
        client_id: "798017889658-i3ham3mep3ikjspf3pnll2d2t96fklp3.apps.googleusercontent.com",
        callback: async (response) => {
          const { data, error } = await supabase.auth.signInWithIdToken({
            provider: 'google',
            token: response.credential,
          });

          if (error) {
            console.error("Error using Google authentication:", error.message);
            alert("Error trying to use Google authentication.");
          } else {
            alert("Google authentication successful!");

            // SAFER REDIRECT FOR VERCEL:
            if (window.location.pathname !== "/main") {
              window.location.href = "/main"; // hard redirect for Vercel
            } else {
              navigate("/main"); // soft redirect if already on site
            }
          }
        },
      });

      window.google.accounts.id.renderButton(
        document.getElementById("g_id_signin"),
        {
          theme: "filled_black",
          size: "medium",
          text: "signin_with", // or "continue_with", "signup_with"
        }
      );

      window.google.accounts.id.prompt(); // show One Tap
    };

    if (window.google && window.google.accounts) {
      initializeGoogleSignIn();
    } else {
      const interval = setInterval(() => {
        if (window.google && window.google.accounts) {
          clearInterval(interval);
          initializeGoogleSignIn();
        }
      }, 100);
    }
  }, [navigate]);

  return (
    <>
      <div id="g_id_signin"></div>
    </>
  );
};

export default OneTapComponent;
