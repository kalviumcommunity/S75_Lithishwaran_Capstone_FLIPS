import React from 'react';
import { Search, MessageSquare, ShoppingBag, User } from 'lucide-react';

const Navbar = () => {
 

    return (
        <>
        <nav className="w-full flex items-center justify-between px-8 py-4 bg-[#f9f7f2]">

        <a href="/" className="text-center text-2xl font-serif mb-4 hover:text-[#c4973f] transition-colors duration-200">FLIPS</a>

        <div className="flex gap-8 font-semibold text-sm">
            <a href="#" className="relative inline-block text-black hover:text-[#c4973f] after:content-[''] after:absolute after:left-1/2 after:bottom-0 after:w-0 after:h-[2px] after:bg-[#c4973f] after:transition-all after:duration-300 hover:after:left-0 hover:after:w-full">DESIGNERS</a>
            <a href="#" className="relative inline-block text-black hover:text-[#c4973f] after:content-[''] after:absolute after:left-1/2 after:bottom-0 after:w-0 after:h-[2px] after:bg-[#c4973f] after:transition-all after:duration-300 hover:after:left-0 hover:after:w-full">EXPLORE</a>
            <a href="#" className="relative inline-block text-black hover:text-[#c4973f] after:content-[''] after:absolute after:left-1/2 after:bottom-0 after:w-0 after:h-[2px] after:bg-[#c4973f] after:transition-all after:duration-300 hover:after:left-0 hover:after:w-full">COLLECTIONS</a>
            <a href="#" className="relative inline-block text-black hover:text-[#c4973f] after:content-[''] after:absolute after:left-1/2 after:bottom-0 after:w-0 after:h-[2px] after:bg-[#c4973f] after:transition-all after:duration-300 hover:after:left-0 hover:after:w-full">DASHBORD</a>
        </div>

        <div className="flex items-center gap-6 text-black">
            <Search className="w-5 h-5 cursor-pointer text-black hover:text-[#c4973f] transition-colors duration-200" />
            <MessageSquare className="w-5 h-5 cursor-pointer text-black hover:text-[#c4973f] transition-colors duration-200" />
            <ShoppingBag className="w-5 h-5 cursor-pointer text-black hover:text-[#c4973f] transition-colors duration-200" />
            <User className="w-5 h-5 cursor-pointer text-black hover:text-[#c4973f] transition-colors duration-200" />
        </div>
        </nav>
        </>
    );
}

export default Navbar;
