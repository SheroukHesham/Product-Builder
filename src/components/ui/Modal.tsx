import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { type ReactNode } from "react";

interface IProps {
  title?: string;
  isOpen: boolean;
  description?: string;
  close: () => void;
  children: ReactNode;
}

const Modal = ({ title, isOpen, close, children, description }: IProps) => {
  return (
    <>
      <Dialog
        open={isOpen}
        as="div"
        className="relative z-10 focus focus:outline-none "
        onClose={close}
        __demoMode
      >
        <DialogBackdrop className="fixed backdrop-blur-sm inset-0 bg-black bg-opacity-25" />
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel
              transition
              className="w-full max-w-md rounded-xl  bg-white shadow-lg p-6 backdrop-blur-2xl duration-300 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0 "
            >
              {title && (
                <DialogTitle
                  as="h3"
                  className="text-base/7 font-medium text-black"
                >
                  {title}
                </DialogTitle>
              )}

              {description && (
                <p className="text-gray-500 text-sm mt-3">{description}</p>
              )}

              <div className="mt-4">{children}</div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default Modal;
