import { sendPasswordResetEmail, signInWithEmailAndPassword, signOut } from "firebase/auth";
import auth from "../../firebase/firebase.config";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
    const [loginError, setLoginError] = useState('');
    const [success, setSuccess] = useState('');
    const emailRef = useRef(null);

    const handleLogin = (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        console.log(email, password);
        // reset error & success
        setLoginError('');
        setSuccess('');

        signInWithEmailAndPassword(auth, email, password)
            .then(result => {
                console.log(result.user);
                if(result.user.emailVerified){
                    setSuccess("User login successfully.")
                }
                else{
                    alert('Please verify your email address.');
                }
                
            })
            .catch(error => {
                console.error(error.message);
                setLoginError(error.message)
            })

        signOut(auth)
            .then(result => {
                console.log(result.user);
            })
            .catch(error => {
                console.error(error.message);
            })
    }

    const handleForgetPassword = () => {
        const email = emailRef.current.value;
        setLoginError('');
        setSuccess('');
        if(!email){
            setLoginError('Please provide an email!');
            return;
        }
        else if(!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)){
            setLoginError('Please write e valid email');
            return;
        }

        // send validation email
        sendPasswordResetEmail(auth, email)
        .then(() => {
            alert('Please check your email')
        })
        .catch(error => {
            console.log(error.message);
        })
        
    }
    return (
        <div className=''>
            <div className='mt-12 md:mt-24 flex justify-center items-center '>
                <div className=' bg-base-200 text-center w-[80%] md:w-1/4 rounded-lg shadow-lg '>
                    <h3 className="text-3xl text-center mt-8 font-bold">Please Login!</h3>
                    <form onSubmit={handleLogin} className='p-4 pt-12 '>
                        <label className="label ml-8  font-medium">
                            <span className="label-text text-lg">Email</span>
                        </label>
                        <input className='border-2 w-[80%] py-1 px-3 border-black rounded-lg'
                            type="email"
                            name='email'
                            ref={emailRef}
                            placeholder='Email'
                            required />
                        <br />
                        <label className="label ml-8 font-medium ">
                            <span className="label-text text-lg">Password</span>
                        </label>
                        <input className='border-2 w-[80%] py-1 px-3 border-black rounded-lg' type="password" name='password' placeholder='Password' required />
                        <br />
                        <label className="label">
                            <a onClick={handleForgetPassword} href="#" className="label-text-alt link link-hover w-[80%] -ml-12 text-[14px]">Forgot password?</a>
                        </label>
                        <button className="btn w-[80%] bg-[#0FE712] text-white text-xl mt-4">Login</button>
                    </form>
                    <div className="pb-3">
                        {loginError && <p className="text-red-600">{loginError}</p>}
                        {success && <p className="text-green-600">{success}</p>}
                    </div>
                    <p className="mb-3">New here? <Link className="underline" to='/register'>Please Register!</Link></p>
                </div>
            </div>
        </div>
    );
};

export default Login;