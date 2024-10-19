import { Dialog, DialogPanel, Transition } from "@headlessui/react";
import { ReactNode } from "react";
import { Fragment } from "react/jsx-runtime";

interface GlassDialogProps {
    isOpen: boolean;
    closeModal: () => void;
    children: ReactNode;
}

export default function GlassDialog({
    isOpen,
    closeModal,
    children,
}: GlassDialogProps) {
    return (
        <>
            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={closeModal}>
                    {/* Background overlay with blur effect */}
                    <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm" />
                    <div className="fixed inset-0 flex items-center justify-center p-4">
                        {/* Dialog panel with glass effect for both dark and light modes */}
                        <DialogPanel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white bg-opacity-10 backdrop-blur-lg text-gray-900 dark:text-gray-100 p-6 text-left align-middle shadow-xl transition-all">
                            {children}
                        </DialogPanel>
                    </div>
                </Dialog>
            </Transition>
        </>
    );
}
