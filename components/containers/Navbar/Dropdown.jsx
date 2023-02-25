import Link from "next/link";
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

export default function Dropdown({ data }) {
  return (
    <Menu as="div" className="relative inline-block text-left w-full lg:w-auto">
      <Menu.Button className="inline-flex hover:text-primary items-center justify-center text-4xl lg:text-base lg:px-0 w-full px-3 pt-5 lg:pt-0 pb-3 lg:pb-0 border-b lg:border-none border-primary">
        Services
        <ChevronDownIcon className="w-7 lg:w-4" aria-hidden="true" />
      </Menu.Button>  
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute lg:fixed w-full lg:w-auto lg:right-[12%] lg:left-[12%] mt-3 flex items-center justify-center rounded-xl z-50">
          <div className="relative overflow-y-scroll lg:overflow-auto h-[500px] lg:h-auto w-full shadow-2xl shadow-gray-900/50 rounded-xl bg-primary scroll-smooth text-white p-5 lg:p-7">
            <h2 className="text-2xl text-center font-semibod">Our Services</h2>
            <div className="grid grid-cols-2 lg:grid-cols-5 gap-1 gap-x-5 mt-3 w-full">
              {data.map((item, index) => (
                <Menu.Item key={index}>
                  <Link
                    className="p-2 border-b border-white/50 hover:text-black hover:bg-white transition-all"
                    href={item.toLowerCase().replaceAll(" ", "-")}
                  >
                    {item}
                  </Link>
                </Menu.Item>
              ))}
            </div>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
