import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from "firebase/auth";
import auth from "../../firebase/firebase.config";
import { useState } from "react";
import { Link } from "react-router-dom";


const Register = () => {
    const [registerError, setRegisterError] = useState("");
    const [success, setSuccess] = useState('');

    const handleRegister = (e) => {
        e.preventDefault();
        const name = e.target.name.value;
        const email = e.target.email.value;
        const password = e.target.password.value;
        const accepted = e.target.terms.checked;
        console.log(name,email, password, accepted);

        if (password.length < 6) {
            setRegisterError("Password should be at least 6 characters or longer");
            return;
        }
        else if (!/[A-Z]/.test(password)) {
            setRegisterError("Your password should have at least one upper case character");
            return;
        }
        else if(!accepted){
            setRegisterError('Please accept our terms & conditions');
            return;
        }

        setRegisterError('');
        setSuccess('');

        createUserWithEmailAndPassword(auth, email, password)
            .then(result => {
                console.log(result.user);
                setSuccess("User Created Successfully.");

                //update profile
                updateProfile(result.user, {
                    displayName: name,
                    photoURL: 'https://i.ibb.co/vLbMsqd/1699531272434-01.jpg',
                })
                .then(() => {
                    console.log('profile updated');
                })
                .catch

                // send verification email
                sendEmailVerification(result.user)
                .then(() => {
                    alert('Please check your email and verify your account')
                })
            })
            .catch(error => {
                console.error(error);
                setRegisterError(error.message)
            })
    }
    return (
        <div className=''>
            <div className='mt-12 md:mt-24  flex justify-center items-center '>
                <div className=' bg-base-200 text-center w-[80%] md:w-1/4 rounded-lg shadow-lg '>
                    <h3 className="text-3xl text-center mt-8 font-bold">Please Register!</h3>
                    <form onSubmit={handleRegister} className='p-4 pt-12 '>
                        <label className="label ml-8  font-medium">
                            <span className="label-text text-lg">Name</span>
                        </label>
                        <input className='border-2 w-[80%] py-1 px-3 border-black rounded-lg' type="text" name='name' placeholder='Name' required />
                        <br />
                        <label className="label ml-8  font-medium">
                            <span className="label-text text-lg">Email</span>
                        </label>
                        <input className='border-2 w-[80%] py-1 px-3 border-black rounded-lg' type="email" name='email' placeholder='Email' required />
                        <br />
                        <label className="label ml-8 font-medium ">
                            <span className="label-text text-lg">Password</span>
                        </label>
                        <input className='border-2 w-[80%] py-1 px-3 border-black rounded-lg' type="password" name='password' placeholder='Password' required />
                        <br />
                        <div className="mt-2  md:w-[90%] ">
                            <input className="mr-2 text-lg " type="checkbox" name="terms" id="terms" />
                            <label htmlFor="terms">Accept our <a className="underline" href="">Terms & Conditions</a></label>
                        </div>
                        <br />
                        {/* <input className='btn w-[80%] bg-[#FF3F3F] text-white text-xl -mt-2' type="submit" name="submit" /> */}
                        <button className="btn w-[80%] bg-[#FF3F3F] text-white text-xl -mt-2">Register</button>
                    </form>
                    <div className="pb-3">
                        {registerError && <p className="text-red-600">{registerError}</p>}
                        {success && <p className="text-green-600">{success}</p>}
                    </div>
                    <p className="mb-3">Already have an account? <Link className="underline" to='/login'>Please Login</Link></p>
                </div>
            </div>
        </div>
    );
};

export default Register;