import React, { PropsWithChildren } from 'react'

interface ModalProps {
  onClickOutside: Function
}

const Modal: React.FC<PropsWithChildren<ModalProps>> = ({
  onClickOutside,
  children,
}) => (
  <>
    <div
      role="button"
      tabIndex={-1}
      className="justify-center cursor-default items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
      onClick={() => onClickOutside()}
      onKeyPress={(e) => e}
    >
      <div
        className="relative cursor-default w-auto mx-auto max-w-3xl "
        role="button"
        tabIndex={-1}
        onClick={(e) => e.stopPropagation()}
        onKeyPress={(e) => e}
      >
        {/* content */}
        <div className="mt-60 sm:mt-0 border-0 rounded-lg shadow-lg relative flex flex-col bg-white outline-none focus:outline-none">
          {/* header */}
          {children}
        </div>
      </div>
    </div>
    <div className="opacity-25 fixed inset-0 z-40 bg-black" />
  </>
)

export default Modal
