import Link from "next/link";
import { ChevronDoubleRightIcon } from "@heroicons/react/24/outline";

export default function Breadcrumbs({ items = [] }) {
  return (
    <div className="flex items-center space-x-5 w-full">
      {items.map((item, index) => (
        <div key={index} className="flex capitalize justify-between">
          {index !== items.length - 1 ? (
            <Link
              title={item.title}
              href={item.href}
              className="flex items-center hover:text-primary border-transparent border-b-2 hover:border-primary transition-all"
            >
              {item.name}
              <ChevronDoubleRightIcon className="w-3" />
            </Link>
          ) : (
            <div className="flex items-center border-transparent font-semibold border-b-2 transition-all">
              {item.name}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
