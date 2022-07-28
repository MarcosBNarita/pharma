import React from 'react'

const TopBar: React.FC = () => (
  <div className="shadow-xl w-full flex-auto h-16 ">
    <div className="flex h-full items-center">
      <img
        className="ml-10 mr-0 inline-block"
        alt="logo"
        src="https://via.placeholder.com/50"
      />

      <p className="ml-2 inline font-black">Pharma.inc</p>
      <img
        src="https://i.pravatar.cc/50"
        className="ml-auto mr-10 rounded-full"
        alt="user"
      />
    </div>
  </div>
)

export default TopBar
