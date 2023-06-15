"use client";
import { Fragment, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useAuthState, useCreateUserWithEmailAndPassword, useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth } from "@/firebase/firebaseConfig";
import { FIREBASE_ERRORS } from "@/firebase/errors";

export default function SignupModal({ openSignupModal, setOpenSignupModal }) {
    const [createUserWithEmailAndPassword, getUser, loading, error] = useCreateUserWithEmailAndPassword(auth);
    const [signInWithEmailAndPassword] = useSignInWithEmailAndPassword(auth);

    const [loginDetails, setLoginDetails] = useState({
        email: "",
        password: "",
        confirmPassword: "",
    })

    const [user] = useAuthState(auth);  //To get the user after authentication.

    const [passworderror, setPasswordError] = useState("")

    const handelInputChange = (event) => {
        const { name, value } = event.target;
        setLoginDetails({ ...loginDetails, [name]: value })
    }

    const handelSubmitForm = async (e) => {
        e.preventDefault();
        if (passworderror) setPasswordError("");
        if (loginDetails.password !== loginDetails.confirmPassword) {
            setPasswordError("Passwords do not match.")
            return;
        }
        try {
            await createUserWithEmailAndPassword(loginDetails.email, loginDetails.password);
            await signInWithEmailAndPassword(loginDetails.email, loginDetails.password);
        } catch (error) {
            setPasswordError(error.message)
        }
    }

    useEffect(() => {
        if (user) setOpenSignupModal(false);
    }, [user])

    useEffect(() => {
        if (user) setOpenSignupModal(false);
        setLoginDetails({
            email: "",
            password: "",
            confirmPassword: ""
        })
    }, [user])

    return (
        <Transition.Root appear show={openSignupModal} as={Fragment}>
            <Dialog as="form" onSubmit={handelSubmitForm} className="relative z-10" onClose={setOpenSignupModal}>
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
                            leaveTo="opacity-0">
                            <Dialog.Panel className="w-full max-w-xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                <h1 class="text-4xl font-medium">Signup</h1>
                                <p class="text-slate-500">Hi, Welcome back 👋</p>
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
                                        <label for="password">
                                            <p class="font-medium text-slate-700 pb-2">Confirm Password</p>
                                            <input value={loginDetails.confirmPassword} onChange={handelInputChange} id="password" name="confirmPassword" type="password" class="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow" placeholder="Enter your confirm password" />
                                        </label>
                                        {(passworderror || error) && <p className="text-red-500 font-semibold">{passworderror || FIREBASE_ERRORS[error.message]}</p>}
                                        <button type="submit" class="w-full py-3 font-medium text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg border-indigo-500 hover:shadow inline-flex space-x-2 items-center justify-center">
                                            Signup
                                        </button>
                                    </div>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    );
}
