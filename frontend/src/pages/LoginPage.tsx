import React, { useState } from 'react';

interface LoginFormData {
  email: string;
  password: string;
}

interface LoginResponse {
  message: string;
  token?: string;
  user?: {
    id: number;
    name: string;
    email: string;
    bio?: string;
    profilePic?: string;
  };
}

const LoginPage: React.FC = () => {
  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (error) setError(null);
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data: LoginResponse = await response.json();

      if (response.ok) {
        if (data.token) {
          console.log('Login successful:', data);
          alert('Login successful! Token: ' + data.token.substring(0, 20) + '...');
        }
      } else {
        setError(data.message || 'Login failed');
      }
    } catch (err) {
      setError('Network error. Please check if the server is running.');
      console.error('Login error:', err);
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
        
        * {
          box-sizing: border-box;
        }

        .login-container {
          min-height: 100vh;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          background-attachment: fixed;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          font-family: 'Inter', system-ui, -apple-system, sans-serif;
          position: relative;
          overflow: hidden;
        }

        .login-container::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: 
            radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.3) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(255, 255, 255, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 40% 40%, rgba(120, 119, 198, 0.2) 0%, transparent 50%);
          animation: backgroundShift 10s ease-in-out infinite alternate;
        }

        @keyframes backgroundShift {
          0% { opacity: 0.7; }
          100% { opacity: 1; }
        }

        .login-card {
          width: 100%;
          max-width: 440px;
          position: relative;
          z-index: 1;
        }

        .header {
          text-align: center;
          margin-bottom: 40px;
          animation: fadeInDown 0.8s ease-out;
        }

        @keyframes fadeInDown {
          from {
            opacity: 0;
            transform: translateY(-30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .logo {
          display: flex;
          justify-content: center;
          align-items: center;
          margin-bottom: 20px;
        }

        .logo-circle {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          padding: 16px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 10px 30px rgba(102, 126, 234, 0.4);
          animation: logoFloat 3s ease-in-out infinite;
        }

        @keyframes logoFloat {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }

        .title {
          font-size: 36px;
          font-weight: 700;
          color: white;
          margin-bottom: 12px;
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
        }

        .subtitle {
          color: rgba(255, 255, 255, 0.9);
          font-weight: 400;
          font-size: 16px;
        }

        .form-card {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 20px;
          box-shadow: 
            0 25px 50px rgba(0, 0, 0, 0.25),
            0 0 0 1px rgba(255, 255, 255, 0.1) inset;
          padding: 40px;
          animation: slideInUp 0.8s ease-out 0.2s both;
        }

        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(50px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .form-title {
          font-size: 24px;
          font-weight: 600;
          color: #1a1a1a;
          text-align: center;
          margin-bottom: 32px;
          position: relative;
        }

        .form-title::after {
          content: '';
          position: absolute;
          bottom: -8px;
          left: 50%;
          transform: translateX(-50%);
          width: 50px;
          height: 3px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border-radius: 2px;
        }

        .error-message {
          background: rgba(220, 38, 38, 0.1);
          border: 1px solid rgba(220, 38, 38, 0.2);
          color: #dc2626;
          padding: 16px 20px;
          border-radius: 12px;
          margin-bottom: 20px;
          font-weight: 500;
          animation: shake 0.5s ease-in-out;
        }

        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }

        .input-group {
          margin-bottom: 24px;
          position: relative;
        }

        .input-label {
          display: block;
          font-size: 14px;
          font-weight: 600;
          color: #374151;
          margin-bottom: 8px;
          transition: color 0.3s ease;
        }

        .input-field {
          width: 100%;
          padding: 16px 20px;
          border: 2px solid #e5e7eb;
          border-radius: 12px;
          font-size: 16px;
          font-weight: 400;
          background: white;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          outline: none;
        }

        .input-field:focus {
          border-color: #667eea;
          box-shadow: 0 0 0 4px rgba(102, 126, 234, 0.1);
          transform: translateY(-2px);
        }

        .input-field:focus + .input-label {
          color: #667eea;
        }

        .password-container {
          position: relative;
        }

        .password-input {
          padding-right: 55px;
        }

        .eye-button {
          position: absolute;
          right: 16px;
          top: 50%;
          transform: translateY(-50%);
          background: none;
          border: none;
          cursor: pointer;
          padding: 8px;
          color: #9ca3af;
          transition: all 0.3s ease;
          border-radius: 8px;
        }

        .eye-button:hover {
          color: #667eea;
          background: rgba(102, 126, 234, 0.1);
        }

        .remember-container {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 32px;
        }

        .remember-check {
          display: flex;
          align-items: center;
        }

        .checkbox {
          width: 18px;
          height: 18px;
          margin-right: 12px;
          accent-color: #667eea;
        }

        .checkbox-label {
          font-size: 14px;
          font-weight: 500;
          color: #374151;
        }

        .forgot-link {
          font-size: 14px;
          color: #667eea;
          text-decoration: none;
          font-weight: 500;
          transition: all 0.3s ease;
        }

        .forgot-link:hover {
          color: #5a67d8;
          text-decoration: underline;
        }

        .login-button {
          width: 100%;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border: none;
          padding: 18px 24px;
          border-radius: 12px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: hidden;
        }

        .login-button::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
          transition: left 0.5s;
        }

        .login-button:hover::before {
          left: 100%;
        }

        .login-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 15px 35px rgba(102, 126, 234, 0.4);
        }

        .login-button:active {
          transform: translateY(0);
        }

        .login-button:disabled {
          opacity: 0.7;
          cursor: not-allowed;
          transform: none;
        }

        .login-button:disabled:hover {
          transform: none;
          box-shadow: none;
        }

        .spinner {
          animation: spin 1s linear infinite;
          margin-right: 12px;
        }

        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        .signup-link {
          text-align: center;
          margin-top: 32px;
          font-size: 15px;
          color: #6b7280;
        }

        .signup-link a {
          font-weight: 600;
          color: #667eea;
          text-decoration: none;
          transition: color 0.3s ease;
        }

        .signup-link a:hover {
          color: #5a67d8;
          text-decoration: underline;
        }

        .footer {
          text-align: center;
          margin-top: 40px;
          font-size: 13px;
          color: rgba(255, 255, 255, 0.8);
          animation: fadeIn 1s ease-out 0.5s both;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        /* Responsive Design */
        @media (max-width: 480px) {
          .login-container {
            padding: 16px;
          }

          .form-card {
            padding: 32px 24px;
          }

          .title {
            font-size: 28px;
          }

          .input-field {
            padding: 14px 16px;
          }

          .login-button {
            padding: 16px 20px;
          }
        }

        /* Floating particles effect */
        .particle {
          position: absolute;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.1);
          animation: float 6s ease-in-out infinite;
        }

        .particle:nth-child(1) {
          width: 80px;
          height: 80px;
          top: 10%;
          left: 20%;
          animation-delay: 0s;
        }

        .particle:nth-child(2) {
          width: 120px;
          height: 120px;
          top: 70%;
          right: 20%;
          animation-delay: 2s;
        }

        .particle:nth-child(3) {
          width: 60px;
          height: 60px;
          top: 20%;
          right: 30%;
          animation-delay: 4s;
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
            opacity: 0.3;
          }
          33% {
            transform: translateY(-30px) rotate(120deg);
            opacity: 0.6;
          }
          66% {
            transform: translateY(-20px) rotate(240deg);
            opacity: 0.4;
          }
        }
      `}</style>

      <div className="login-container">
        {/* Floating particles */}
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>

        <div className="login-card">
          {/* Header */}
          <div className="header">
            <div className="logo">
              <div className="logo-circle">
                <svg width="32" height="32" fill="white" viewBox="0 0 20 20">
                  <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z"/>
                </svg>
              </div>
            </div>
            <h1 className="title">Book Barter</h1>
            <p className="subtitle">Welcome back! Please sign in to your account.</p>
          </div>

          {/* Login Form */}
          <div className="form-card">
            <div>
              <h3 className="form-title">Sign In</h3>
              
              {error && (
                <div className="error-message">
                  <strong>Error:</strong> {error}
                </div>
              )}

              <div className="input-group">
                <label htmlFor="email" className="input-label">
                  Email Address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  disabled={loading}
                  className="input-field"
                />
              </div>

              <div className="input-group">
                <label htmlFor="password" className="input-label">
                  Password
                </label>
                <div className="password-container">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                    disabled={loading}
                    className="input-field password-input"
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="eye-button"
                    disabled={loading}
                  >
                    {showPassword ? (
                      <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                      </svg>
                    ) : (
                      <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              <div className="remember-container">
                <div className="remember-check">
                  <input
                    id="remember"
                    type="checkbox"
                    className="checkbox"
                  />
                  <label htmlFor="remember" className="checkbox-label">
                    Remember me
                  </label>
                </div>
                <a href="#" className="forgot-link">
                  Forgot password?
                </a>
              </div>

              <button
                onClick={handleSubmit}
                disabled={loading || !formData.email || !formData.password}
                className="login-button"
              >
                {loading ? (
                  <div style={{display: 'flex', alignItems: 'center'}}>
                    <svg className="spinner" width="20" height="20" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle style={{opacity: 0.25}} cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path style={{opacity: 0.75}} fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Signing in...
                  </div>
                ) : (
                  'Sign In'
                )}
              </button>

              <div className="signup-link">
                <p>
                  Don't have an account yet?{' '}
                  <a href="#">
                    Sign up here
                  </a>
                </p>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="footer">
            <p>© 2025 Book Barter. All rights reserved.</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;