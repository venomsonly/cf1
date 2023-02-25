import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { Container, FullContainer } from "../common";

export default function index({ componentTitle, options, des }) {
  return (
    <FullContainer className="mt-12 lg:mt-16">
      <Container className="text-gray-900">
        <h2 className="elementHeading mb-2">{componentTitle}</h2>
        <p className="text-lg">{des}</p>
        <div className="flex flex-col items-center w-full mt-5">
          {options.map((item, key) => {
            return (
              <Menu
                key={key}
                as="div"
                className="relative inline-block text-left w-full max-w-3xl mb-2"
              >
                <div>
                  <Menu.Button className="w-full grid grid-cols-accordian items-center rounded-lg bg-gray-100 border text-left p-3 px-5">
                    {item.question}
                    <ChevronDownIcon className="h-5 w-5 ml-5" />
                  </Menu.Button>
                </div>

                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-1000"
                  enterFrom="transform opacity-0 translate-y-50"
                  enterTo="transform opacity-100 translate-y-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="bg-gray-50 rounded-b-lg">
                    <div className="flex flex-col items-center h-full">
                      <div className="w-full p-5 flex items-center justify-between">
                        {item.answer}
                      </div>
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>
            );
          })}
        </div>
      </Container>
    </FullContainer>
  );
}
