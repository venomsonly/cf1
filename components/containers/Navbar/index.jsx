import {
  Bars3Icon,
  EllipsisVerticalIcon,
  MapPinIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import Dropdown from "./Dropdown";
import { ContactButton, Container, FullContainer } from "../../common";

const navItems = [
  { name: "home", path: "/" },
  { name: "contact us", path: "/contact-us" },
  { name: "blog", path: "/blog" },
];

const Navbar = ({ phone, services }) => {
  const [sidebar, openSidebar] = useState(false);
  const handleSidebar = () => {
    openSidebar(!sidebar);
  };

  return (
    <FullContainer>
      <Container>
        <div className="flex z-20 justify-between lg:grid grid-cols-navbar w-full items-center py-3">
          {/* Logo */}
          <Link
            title="Logo"
            href="/"
            className="flex items-center text-primary"
          >
            <Image
              title="logo"
              src={`https://api15.ecommcube.com/${process.env.NEXT_PUBLIC_HOSTNAME}/img/logo.webp`}
              height={50}
              width={275}
              className="h-auto"
              alt="logo"
            />
          </Link>

          {/* Get Listed Button */}
          <div className="text-right hidden justify-end lg:flex items-center">
            <Link
              target="_blank"
              title="map link"
              // href={`https://www.google.com/maps/place/${service}+service+in+${_map_title}/@${latitude},${longitude},13z`}
              href="https://www.google.com/maps/place/TowingNearMe+United+States/@37.303061,-95.692936,4z/data=!4m5!3m4!1s0x54eab584e432360b:0x1c3bb99243deb742!8m2!3d37.09024!4d-95.712891?hl=en"
            >
              <MapPinIcon
                title="map icon"
                alt="map icon"
                className="mr-3 -mt-2 h-8 text-red-500"
              />
            </Link>
            <p className="mr-3 font-semibold">Are you a service provide?</p>
            <Link
              title="Login"
              className="px-3 py-2 rounded-lg hover:bg-gray-100"
              href="/login"
            >
              Log In
            </Link>
            <Link
              title="Create Account"
              className="px-3 py-2 rounded-lg hover:bg-gray-100"
              href="/signup"
            >
              Create Account
            </Link>
            <Image
              title="Industry Image Icon"
              src={`https://api15.ecommcube.com/${process.env.NEXT_PUBLIC_HOSTNAME}/img/truck.webp`}
              height="50"
              width="120"
              alt="Industry Image Icon"
              className="mx-3"
            />

            <div className="navDropdownButton relative">
              <div className="navDropdown flex-col w-[200px] items-center absolute top-0 right-0 mt-5 p-2 bg-white rounded-md capitalize shadow-xl shadow-black/25">
                {navItems.map((item, index) => (
                  <Link
                    key={index}
                    title={item.name}
                    className="px-4 py-2 hover:rounded border-b text-left hover:bg-gray-100 w-full transition-all"
                    href={item.path}
                  >
                    {item.name}
                  </Link>
                ))}
                <button className="servicesButton px-4 py-2 rounded hover:bg-gray-100 w-full text-left transition-all">
                  Services
                  <div className="servicesDropdown absolute lg:fixed w-full lg:w-auto lg:right-[5%] lg:left-[5%] mt-2 flex items-center justify-center rounded-xl z-50">
                    <div className="relative h-[500px] lg:h-auto w-full shadow-2xl shadow-gray-900/50 rounded-lg bg-white scroll-smooth text-black p-5 lg:p-7">
                      <Image
                        title="polygon icon"
                        src={`https://api15.ecommcube.com/${process.env.NEXT_PUBLIC_HOSTNAME}/icons/polygon.png`}
                        height={25}
                        width={25}
                        alt="polygon"
                        className="absolute top-0 right-0 -mt-[20px] mr-16"
                      />
                      <div className="grid grid-cols-2 lg:grid-cols-5 gap-1 gap-x-4 w-full">
                        {services.map((item, index) => (
                          <Link
                            key={index}
                            title={item}
                            className="p-2 border-b border-black/25 text-sm hover:bg-gray-100 hover:rounded transition-all"
                            href={item.replaceAll(" ", "-")}
                          >
                            {item}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                </button>
              </div>
              <EllipsisVerticalIcon
                title="dots icon"
                alt="dots icon"
                className="h-6 cursor-pointer"
              />
            </div>
          </div>
          <Bars3Icon
            onClick={handleSidebar}
            className="text-primary h-8 lg:hidden"
          />
        </div>
      </Container>

      {/* NavBar Phone */}
      {sidebar && (
        <div className="lg:hidden fixed z-20 top-0 left-0 px-8 py-5 h-screen text-center bg-white w-full flex flex-col items-center">
          <div className="flex justify-between lg:grid grid-cols-3 w-full items-center mb-10">
            {/* Logo */}
            <Link
              title="Logo"
              href="/"
              className="flex items-center text-primary"
            >
              <Image
                title="logo image"
                src={`https://api15.ecommcube.com/${process.env.NEXT_PUBLIC_HOSTNAME}/img/logo.webp`}
                height={50}
                width={275}
                alt="logo"
              />
            </Link>
            <XMarkIcon
              onClick={handleSidebar}
              className="text-primary h-8 lg:hidden"
            />
          </div>
          <Link title="Home" className="navLink" href="/">
            Home
          </Link>
          <Dropdown data={services} />
          <Link title="Blogs" className="navLink" href="/blog">
            Blogs
          </Link>
          <Link title="Contact Us" className="navLink" href="/contact-us">
            Contact Us
          </Link>
          <Link title="Login" className="navLink" href="/login">
            Login
          </Link>
          <Link title="Create Account" className="navLink" href="/signup">
            Create Account
          </Link>
          <span className="mt-10 flex justify-center w-full">
            <ContactButton
              className="w-full text-xl btnPrimary text-white"
              data={phone}
            />
          </span>
        </div>
      )}
    </FullContainer>
  );
};

export default Navbar;
