import React from 'react'

const Header = () => {
  return (
    <header className="flex justify-between items-center p-4 bg-white shadow-md border-b">
        <div className="text-2xl font-bold">Your Name</div>
        <button className="text-2xl focus:outline-none">☰</button>
    </header>
  )
}

export default Header