import React, { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { assets } from '../assets/assets'
import { Search as SearchIcon, Menu as MenuIcon, X as XIcon, TicketCheckIcon, TicketPlus } from 'lucide-react'
import { useClerk, UserButton, useUser } from '@clerk/clerk-react'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const { user } = useUser()
  const { openSignIn, signOut } = useClerk()
  const [showProfileMenu, setShowProfileMenu] = useState(false)

  const profileButtonRef = useRef(null)
  const profileMenuRef = useRef(null)
  const mobilePanelRef = useRef(null)

  useEffect(() => {
    function handleClickOutside(e) {
      // close profile menu if click is outside both button and menu
      if (
        showProfileMenu &&
        profileMenuRef.current &&
        !profileMenuRef.current.contains(e.target) &&
        profileButtonRef.current &&
        !profileButtonRef.current.contains(e.target)
      ) {
        setShowProfileMenu(false)
      }

      // close mobile panel if open and click is outside the panel
      if (
        isOpen &&
        mobilePanelRef.current &&
        !mobilePanelRef.current.contains(e.target) &&
        // ignore clicks on the menu toggle button (it toggles separately)
        !(e.target.closest && e.target.closest('.mobile-menu-toggle'))
      ) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [showProfileMenu, isOpen])

  return (
    <nav>
      <div className="fixed top-0 left-0 z-50 w-full flex items-center justify-between px-6 md:px-16 lg:px-36 py-5">
        <Link to="/" className="max-md:flex-1">
          <img src={assets.logo} alt="" className="w-36 h-auto" />
        </Link>

        {/* desktop links only */}
        <div className="hidden md:flex z-50 flex-row items-center justify-center gap-8 px-4 py-0 md:px-0 md:py-0">
          <XIcon className="md:hidden absolute top-6 right-6 w-6 h-6 cursor-pointer" onClick={() => setIsOpen(false)} />
          <Link to="/" onClick={() => { window.scrollTo(0, 0); setIsOpen(false); }}>Home</Link>
          <Link to="/MovieDetails" onClick={() => { window.scrollTo(0, 0); setIsOpen(false); }}>MovieDetails</Link>
          <Link to="/Movies" onClick={() => { window.scrollTo(0, 0); setIsOpen(false); }}>Movies</Link>
          <Link to="/MyBookings" onClick={() => { window.scrollTo(0, 0); setIsOpen(false); }}>MyBookings</Link>
        </div>

        <div className="flex items-center gap-8 relative">
          <SearchIcon className="max-md:hidden w-6 h-6 cursor-pointer" />

          {!user ? (
            <button
              onClick={() => openSignIn()}
              className="px-4 py-1 sm:px-7 sm:py-2 bg-primary hover:bg-primary-dull transition rounded-full font-medium cursor-pointer"
            >
              Login
            </button>
          ) : (
            <>
              <button
                ref={profileButtonRef}
                onClick={() => setShowProfileMenu(prev => !prev)}
                className="w-8 h-8 rounded-full overflow-hidden border-2 border-gray-200"
                aria-label="Open profile menu"
              >
                {user.profileImageUrl || user.imageUrl ? (
                  <img
                    src={user.profileImageUrl || user.imageUrl}
                    alt={user.fullName || 'Profile'}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="w-full h-full flex items-center justify-center bg-gray-200 text-sm text-gray-800">
                    {(user.firstName || user.fullName || 'U')[0].toUpperCase()}
                  </span>
                )}
              </button>

              {showProfileMenu && (
                <div ref={profileMenuRef} className="absolute right-0 top-full mt-2 w-44 bg-white text-black rounded shadow-lg p-2 z-50">
                  <Link
                    to="/MyBookings"
                    onClick={() => setShowProfileMenu(false)}
                    className="block px-3 py-2 hover:bg-gray-100"
                  >
                    My Bookings
                  </Link>
                  <button
                    onClick={() => { setShowProfileMenu(false); signOut(); }}
                    className="w-full text-left px-3 py-2 hover:bg-gray-100"
                  >
                    Sign out
                  </button>
                </div>
              )}
            </>
          )}
        </div>

        <MenuIcon
          className="max-md:ml-4 md:hidden w-8 h-8 cursor-pointer mobile-menu-toggle"
          onClick={() => setIsOpen(prev => !prev)}
        />
      </div>

      {/* centered mobile menu */}
      <div className={`fixed inset-0 z-50 flex items-center justify-center md:static md:inset-auto ${isOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}>
        <div
          ref={mobilePanelRef}
          className={`w-full max-w-sm mx-4 bg-black/70 backdrop-blur rounded-md p-6 flex flex-col items-center gap-6 transition-all duration-200 transform ${isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
        >
          <XIcon className="md:hidden absolute top-6 right-6 w-6 h-6 cursor-pointer" onClick={() => setIsOpen(false)} />
          <Link to="/" onClick={() => { window.scrollTo(0, 0); setIsOpen(false); }}>Home</Link>
          <Link to="/MovieDetails" onClick={() => { window.scrollTo(0, 0); setIsOpen(false); }}>MovieDetails</Link>
          <Link to="/Movies" onClick={() => { window.scrollTo(0, 0); setIsOpen(false); }}>Movies</Link>
          <Link to="/MyBookings" onClick={() => { window.scrollTo(0, 0); setIsOpen(false); }}>MyBookings</Link>
        </div>
      </div>
    </nav>
  )
}

export default Navbar