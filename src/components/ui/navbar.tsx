"use client";

import React from "react";
import { Menu, X } from "lucide-react";
import { Link } from "react-scroll";
import Image from "next/image";

import { Button } from "./button";
import { ModeToggle } from "./toggle";

interface MenuItem {
  name: string;
  href: string;
}

const menuItems: MenuItem[] = [
  {
    name: "Home",
    href: "/",
  },
  {
    name: "Problems",
    href: "/problems",
  },
  {
    name: "Profile",
    href: "/profile",
  },
  {
    name: "Report Bug",
    href: "/report",
  },
];

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState<boolean>(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="mx-auto fixed top-0 left-0 right-0 z-50 w-full backdrop-filter backdrop-blur-lg border-b border-none">
      <div className="flex items-center justify-between px-4 py-4 bg-white dark:bg-gray-900 bg-opacity-30 dark:bg-opacity-30 rounded-lg">
        <Link
          activeClass="active"
          to="home"
          spy={true}
          smooth={true}
          offset={-20}
          duration={500}
          className="inline-flex items-center space-x-2 cursor-pointer hover:underline"
        >
          <span className="bg-white dark:bg-gray-800 rounded-full">
            <Image
              src="https://img.icons8.com/?size=100&id=N5H8YRvduAGy&format=png&color=000000"
              width={30}
              height={30}
              alt="logo"
            />
          </span>
        </Link>
        <div className="hidden lg:block">
          <ul className="inline-flex space-x-5">
            {menuItems.map((item) => (
              <li
                key={item.name}
                className="relative cursor-pointer font-[500] text-[18px]"
              >
                <Link
                  activeClass="active"
                  to={item.href}
                  spy={true}
                  smooth={true}
                  offset={-20}
                  duration={500}
                  className="text-sm hover:underline font-semibold text-black dark:text-white cursor-pointer px-2"
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="hidden lg:flex items-center space-x-4">
          <ModeToggle />
        </div>
        <div className="lg:hidden">
          <Menu onClick={toggleMenu} className="h-6 w-6 cursor-pointer" />
        </div>
        {isMenuOpen && (
          <div className="absolute inset-x-0 top-0 z-50 origin-top-right transform p-2 transition lg:hidden">
            <div className="divide-y-2 divide-gray-200 rounded-lg bg-white dark:bg-gray-800 bg-opacity-80 dark:bg-opacity-80 shadow-lg ring-1 ring-black dark:ring-white ring-opacity-5 backdrop-filter backdrop-blur-lg">
              <div className="px-5 pb-6 pt-5">
                <div className="flex items-center justify-between">
                  <div className="inline-flex items-center space-x-2">
                    <span className="bg-white dark:bg-gray-800 rounded-full">
                      <Image
                        src="https://img.icons8.com/?size=100&id=N5H8YRvduAGy&format=png&color=000000"
                        width={30}
                        height={30}
                        alt="logo"
                      />
                    </span>
                  </div>
                  <div className="-mr-2">
                    <button
                      type="button"
                      onClick={toggleMenu}
                      className="inline-flex items-center justify-center rounded-md p-2 text-black dark:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black dark:focus-visible:outline-white"
                    >
                      <span className="sr-only">Close menu</span>
                      <X className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>
                </div>
                <div className="mt-6">
                  <nav className="grid gap-y-4">
                    {menuItems.map((item) => (
                      <Link
                        key={item.name}
                        to={item.href}
                        smooth={true}
                        duration={500}
                        className="-m-3 flex items-center rounded-md p-3 text-sm font-semibold cursor-pointer text-black dark:text-white"
                      >
                        <span className="ml-3 text-base font-medium">
                          {item.name}
                        </span>
                      </Link>
                    ))}
                  </nav>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;