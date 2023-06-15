"use client";
import { Fragment, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useAuthState, useSignInWithEmailAndPassword, useSignInWithGoogle } from 'react-firebase-hooks/auth';
import { auth } from "@/firebase/firebaseConfig";
import { FIREBASE_ERRORS } from "@/firebase/errors";
import SignupModal from "./SignupModal";
import ForgotPasswordModal from "./ForgotpasswordModal";

export default function LoginModal({ open, setOpen }) {
    const [openSignupModal, setOpenSignupModal] = useState(false); //Usestate to handle the Signup Model state.
    const [openForgotPasswordModal, setOpenForgotPasswordModal] = useState(false); //Usestate to handle the Forgot Password Model state.
    const [signInWithGoogle] = useSignInWithGoogle(auth);
    const [signInWithEmailAndPassword, getUser, loading, error,] = useSignInWithEmailAndPassword(auth);
    const [user] = useAuthState(auth); //To get the user after authentication.

    const [loginDetails, setLoginDetails] = useState({
        email: "",
        password: "",
    })

    const handelInputChange = (event) => {
        const { name, value } = event.target;
        setLoginDetails({ ...loginDetails, [name]: value })
    }

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await signInWithEmailAndPassword(loginDetails.email, loginDetails.password);
        } catch (error) {
            console.log("Login error:", error);
        }
    };

    useEffect(() => {
        if (user) setOpen(false);
        setLoginDetails({
            email: "",
            password: ""
        })
    }, [user])

    return (
        <>
            {/* Login Modal */}
            <Transition.Root appear show={open} as={Fragment}>
                <Dialog as="form" onSubmit={handleLogin} className="relative z-10" onClose={setOpen}>
                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full justify-center items-center p-4 text-center">
                            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0"
                                enterTo="opacity-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100"
                                leaveTo="opacity-0"
                            >
                                <Dialog.Panel className="w-full max-w-xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                    <h1 class="text-4xl font-medium">Login</h1>
                                    <p class="text-slate-500">Hi, Welcome back 👋</p>
                                    <div class="my-5">
                                        <button
                                            onClick={() => {
                                                signInWithGoogle();
                                                setOpen(false);
                                            }
                                            }
                                            className="w-full text-center py-3 my-3 border flex space-x-2 items-center justify-center border-slate-200 rounded-lg text-slate-700 hover:border-slate-400 hover:text-slate-900 hover:shadow transition duration-150"
                                        >
                                            <img src="https://www.svgrepo.com/show/355037/google.svg" className="w-6 h-6" alt="" />
                                            <span>Login with Google</span>
                                        </button>

                                    </div>
                                    <div class="my-10">
                                        <div class="flex flex-col space-y-5">
                                            <label for="email">
                                                <p class="font-medium text-slate-700 pb-2">Email address</p>
                                                <input value={loginDetails.email} onChange={handelInputChange} id="email" name="email" type="email" class="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow" placeholder="Enter email address" />
                                            </label>
                                            <label for="password">
                                                <p class="font-medium text-slate-700 pb-2">Password</p>
                                                <input value={loginDetails.password} onChange={handelInputChange} id="password" name="password" type="password" class="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow" placeholder="Enter your password" />
                                            </label>
                                            {error && <p className="text-red-500 font-semibold">{FIREBASE_ERRORS[error.message]}</p>}
                                            <div class="flex flex-row justify-between">
                                                <button
                                                    onClick={() => {
                                                        setOpen(false);
                                                        setOpenForgotPasswordModal(true);
                                                    }}
                                                    class="font-medium text-indigo-600">Forgot Password?</button>
                                            </div>
                                            <button
                                                type="submit" class="w-full py-3 font-medium text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg border-indigo-500 hover:shadow inline-flex space-x-2 items-center justify-center">
                                                Login
                                            </button>
                                            <p class="text-center">Not signedup yet?
                                                <div class="text-indigo-600 font-medium inline-flex space-x-1 items-center">
                                                    <button onClick={() => {
                                                        setOpen(false);
                                                        setOpenSignupModal(true);
                                                    }}>Signup Now </button>
                                                </div>
                                            </p>
                                        </div>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition.Root>
            {/* Signup Modal Component */}
            <SignupModal openSignupModal={openSignupModal} setOpenSignupModal={setOpenSignupModal} />
            {/* Forgotpassword Modal Component */}
            <ForgotPasswordModal openForgotPasswordModal={openForgotPasswordModal} setOpenForgotPasswordModal={setOpenForgotPasswordModal} />
        </>
    );
}
