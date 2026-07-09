import { Link, NavLink } from 'react-router-dom'

export default function NavBar() {
    return (
        <>
            <nav className="flex justify-around bg-blue-900 text-white h-12 px-6">
                <ul className="flex w-3/4 h-full items-center">
                    <li className="flex-1 text-center h-full">
                        {/* didnt use {isActive} property here. could be used for styling */}
                        <NavLink 
                        to="/"
                        className="block w-full h-full py-2.5 font-bold text-xl transition-all hover:bg-black/25"
                        >
                            Home
                        </NavLink>
                    </li>
                    <li className="flex-1 text-center h-full">
                        <NavLink 
                        to="/Products"
                        className="block w-full h-full py-2.5 font-bold text-xl transition-all hover:bg-black/25"
                        >
                            Products
                        </NavLink>
                    </li>
                    <li className="flex-1 text-center h-full">
                        <NavLink 
                        to="/About"
                        className="block w-full h-full py-2.5 font-bold text-xl transition-all hover:bg-black/25"
                        >
                            About Us
                        </NavLink>
                    </li>
                </ul>
                <h3 className="font-bold text-xl hover:underline mt-1.5 cursor-pointer">Cart</h3>
            </nav>
        </>
    )

}