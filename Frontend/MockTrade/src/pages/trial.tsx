import {
    Dialog,
    DialogPanel,
    DialogTitle,
    Transition,
} from "@headlessui/react";
import { Fragment, useState } from "react";

export default function Trial() {
    const [isOpen, setIsOpen] = useState(false);

    function closeModal() {
        setIsOpen(false);
    }

    function openModal() {
        setIsOpen(true);
    }

    return (
        <>
            <div className="trial w-[100vw] h-[100vh] justify-center flex ">
                <button
                    onClick={openModal}
                    className="bg-blue-300 text-black px-3 py-1 font-medium rounded-sm"
                >
                    {" "}
                    Click here
                </button>
                <Transition appear show={isOpen} as={Fragment}>
                    <Dialog
                        as="div"
                        className="relative z-10"
                        onClose={closeModal}
                    >
                        {/* Background overlay with blur effect */}
                        <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm" />
                        <div className="fixed inset-0 flex items-center justify-center p-4">
                            {/* Dialog panel with glass effect */}
                            <DialogPanel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white bg-opacity-10 backdrop-blur-lg text-white p-6 text-left align-middle shadow-xl transition-all">
                                <DialogTitle
                                    as="h3"
                                    className="text-lg font-semibold leading-6"
                                >
                                    Currency Details
                                </DialogTitle>
                                <div className="mt-2">
                                    <p className="text-sm text-gray-300">
                                        Here are more details about the selected
                                        currency.
                                    </p>
                                </div>
                                <div className="mt-4">
                                    <button
                                        type="button"
                                        className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition duration-200"
                                        onClick={closeModal}
                                    >
                                        Buy Currency
                                    </button>
                                </div>
                            </DialogPanel>
                        </div>
                    </Dialog>
                </Transition>
            </div>
        </>
    );
}
