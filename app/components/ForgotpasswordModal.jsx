"use client";
import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import SignupModal from "./SignupModal";

export default function ForgotPasswordModal({ openForgotPasswordModal, setOpenForgotPasswordModal }) {
    return (
        <>
            <Transition.Root appear show={openForgotPasswordModal} as={Fragment}>
                <Dialog as="form" onSubmit={(e) => { e.preventDefault() }} className="relative z-10" onClose={setOpenForgotPasswordModal}>
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
                                    <div class="flex flex-col space-y-5">
                                        <label for="email">
                                            <p class="font-medium text-slate-700 pb-2">Email address</p>
                                            <input id="email" name="email" type="email" class="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow" placeholder="Enter email address" />
                                        </label>

                                        <button type="submit" class="w-full py-3 font-medium text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg border-indigo-500 hover:shadow inline-flex space-x-2 items-center justify-center">
                                            Reset Password
                                        </button>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition.Root>
        </>
    );
}
