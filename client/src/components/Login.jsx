import React from 'react';
import { useAppContext } from '../context/AppContext';
import { toast } from 'react-hot-toast';

const EyeIcon = ({ open }) => (
  open ? (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
    </svg>
  ) : (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.477 0-8.268-2.943-9.542-7a10.058 10.058 0 012.464-4.5m2.826-2.695a9.969 9.969 0 011.747-1.233M15 12a3 3 0 00-3-3m0 0c.3 0 .597.043.875.123M3 3l18 18" />
    </svg>
  )
);

const Login = () => {
  const { setShowUserLogin, setUser ,axios , navigate, user} = useAppContext();

  const [state, setState] = React.useState('register');
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [registeredUser, setRegisteredUser] = React.useState(null);
  const [error, setError] = React.useState('');
  const [showPassword, setShowPassword] = React.useState(false);
  const [showUserExistsImage, setShowUserExistsImage] = React.useState(false);

  const onInputChange = (setter) => (e) => {
    setter(e.target.value);
    if (error) setError('');
    if (showUserExistsImage) setShowUserExistsImage(false);
  };

  if (user) {
    return (
      <div
        onClick={() => setShowUserLogin(false)}
        className="fixed top-0 bottom-0 left-0 right-0 z-30 flex items-center text-sm text-gray-600 bg-black/50"
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className="flex flex-col gap-4 m-auto items-center p-8 py-12 w-80 sm:w-[352px] rounded-lg shadow-xl border border-gray-200 bg-white"
        >
          <p className="text-2xl font-medium">
            <span className="text-primary">You are already logged in.</span>
          </p>
          <button
            onClick={() => setShowUserLogin(false)}
            className="bg-primary hover:bg-primary transition-all text-white w-full py-2 rounded-md cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    );
  }

  const onSubmitHandler = async (event) => {
    try {
        event.preventDefault();
        const {data} = await axios.post(`/api/user/${state}`, {
            name, email, password
        });
        if (data.success) {
            if (state === 'register') {
                toast.success('Signup successful, please login');
                setState('login');
                setName('');
                setPassword('');
                // keep email for login
            } else {
                navigate('/')
                setUser(data.user)
                setShowUserLogin(false)
            }
        }else{
            if (state === 'register' && data.message === 'User already exists') {
                setShowUserExistsImage(true);
                setState('login');
                setName('');
                setPassword('');
                // keep email for login
            } else {
                toast.error(data.message)
            }
        }
    } catch (error) {
        toast.error(error.response?.data?.message || error.message)
    }
}




  // const onSubmitHandler = async (event) => {
  //   event.preventDefault();
  //   setError('');

  //   if (state === 'register') {
  //     setRegisteredUser({ name, email, password });
  //     setState('login');
  //     setName('');
  //     setEmail('');
  //     setPassword('');
  //   } else {
  //     if (!registeredUser) {
  //       setError('No registered user found. Please register first.');
  //       return;
  //     }
  //     if (email === registeredUser.email && password === registeredUser.password) {
  //       setUser({ name: registeredUser.name, email: registeredUser.email });
  //       setShowUserLogin(false);
  //     } else {
  //       setError('Invalid email or password.');
  //     }
  //   }
  // };

  // const onInputChange = (setter) => (e) => {
  //   setter(e.target.value);
  //   if (error) setError('');
  // };











  return (
    <div
      onClick={() => setShowUserLogin(false)}
      className="fixed top-0 bottom-0 left-0 right-0 z-30 flex items-center text-sm text-gray-600 bg-black/50"
    >
      <form
        onSubmit={onSubmitHandler}
        onClick={(e) => e.stopPropagation()}
        className="flex flex-col gap-4 m-auto items-start p-8 py-12 w-80 sm:w-[352px] rounded-lg shadow-xl border border-gray-200 bg-white"
      >
        <p className="text-2xl font-medium m-auto">
          <span className="text-primary">User</span>
          {state === 'login' ? ' Login' : ' Sign Up'}
        </p>

        {state === 'register' && (
          <div className="w-full">
            <p>Name</p>
            <input
              onChange={onInputChange(setName)}
              value={name}
              placeholder="Enter your name"
              className="border border-gray-200 rounded w-full p-2 mt-1 outline-primary"
              type="text"
              required
            />
          </div>
        )}

        <div className="w-full">
          <p>Email</p>
          <input
            onChange={onInputChange(setEmail)}
            value={email}
            placeholder="Enter your email"
            className="border border-gray-200 rounded w-full p-2 mt-1 outline-primary"
            type="email"
            required
          />
        </div>

        <div className="w-full relative">
          <p>Password</p>
          <input
            onChange={onInputChange(setPassword)}
            value={password}
            placeholder="Enter your password"
            className="border border-gray-200 rounded w-full p-2 mt-1 outline-primary pr-10"
            type={showPassword ? 'text' : 'password'}
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-[38px] text-gray-600 cursor-pointer"
            tabIndex={-1}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            <EyeIcon open={showPassword} />
          </button>
        </div>

        {showUserExistsImage && (
            <div className="w-full text-center">
                <img src="/src/assets/profile_icon.png" alt="User already exists" className="mx-auto w-16 h-16 mb-2" />
                <p className="text-red-600">User already exists. Please login with your credentials.</p>
            </div>
        )}

        {error && <p className="text-red-600 w-full text-center">{error}</p>}

        {state === 'register' ? (
          <p className="w-full text-center">
            Already have account?{' '}
            <span
              onClick={() => {
                setState('login');
                setError('');
              }}
              className="text-primary cursor-pointer"
            >
              click here
            </span>
          </p>
        ) : (
          <p className="w-full text-center">
            Create an account?{' '}
            <span
              onClick={() => {
                setState('register');
                setError('');
              }}
              className="text-primary cursor-pointer"
            >
              click here
            </span>
          </p>
        )}

        <button className="bg-primary hover:bg-primary transition-all text-white w-full py-2 rounded-md cursor-pointer">
          {state === 'register' ? 'Create Account' : 'Login'}
        </button>
      </form>
    </div>
  );
};

export default Login;
