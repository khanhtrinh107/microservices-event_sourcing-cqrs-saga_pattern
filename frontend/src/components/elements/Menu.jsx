import React, { useState } from 'react';
import { Link } from "react-router-dom";
const Menu = () => {
    const [open, setOpen] = useState(false);
    return (
        <div className="">
          <img
            src="/menu.png"
            alt=""
            width={28}
            height={28}
            className="cursor-pointer"
            onClick={() => setOpen((prev) => !prev)}
          />
          {open && (
            <div className="absolute bg-black text-white left-0 top-20 w-full h-[calc(100vh-80px)] flex flex-col items-center justify-center gap-8 text-xl  z-10">
              <Link to="/">Homepage</Link>
              <Link to="/">Shop</Link>
              <Link to="/">Deals</Link>
              <Link to="/">About</Link>
              <Link to="/">Contact</Link>
              <Link to="/">Logout</Link>
              <Link to="/">Cart(1)</Link>
            </div>
          )}
        </div>
      );
}

export default Menu
