import { Container, FullContainer } from "../../common";
import Breadcrumbs from "../Breadcrumbs";
import Link from "next/link";
import SearchBox from "../../common/SearchBox";
import Image from "next/image";

export default function ZipCity({
  service_for_search,
  service,
  area,
  breadcrumbs,
  calenderHeading,
  serving,
  phone,
}) {
  return (
    <FullContainer>
      <Container className="lg:text-left ">
        <div className="w-full flex lg:flex-row flex-col justify-between items-center mt-2">
          <div className="hidden lg:block border-b-2 pb-1">
            <Breadcrumbs items={breadcrumbs} />
          </div>
          <div className="rounded-full lg:bg-gray-100 lg:p-3 lg:w-96 w-full">
            <SearchBox
              service={service_for_search}
              className="rounded-xl lg:rounded-full shadow-black/20"
              buttonStyle="p-3 px-5 lg:rounded-full flex items-center justify-center"
            />
          </div>
        </div>
        <div className="w-full mt-7 lg:mt-0">
          <div>
            <h1 className="elementHeading text-3xl">
              <span>{service}</span> serving the {area} area
            </h1>
            <p className="mt-3 text-gray-700 lg:pr-10">
              Thank you for using our FREE{" "}
              <span className="capitalize">{service}</span> service. Below you
              will find the best <span className="capitalize">{service}</span>{" "}
              Quotes in our network that serve {area}. If you would like to
              search again please enter a zip code.
            </p>
          </div>
        </div>

        {/* Area Timing Here */}
        <div className="w-full p-8 mt-5 lg:mt-7 grid lg:grid-cols-areaTiming gap-10 backdrop-blur-sm border-2 rounded-lg">
          <div>
            <h2 className="elementHeading">{calenderHeading}</h2>
            <h3 className="text-lg mt-1 capitalize">
              <span className="mr-2 font-bold">Serving:</span>
              {serving}
            </h3>
            <div className="max-w-md grid rounded-md lg:grid-cols-7 mt-3 text-lg border-2 text-gray-700 p-5">
              <div className="flex space-y-1 justify-between flex-row lg:flex-col items-center">
                <p className="font-semibold">Mon</p>
                <p>24hr</p>
              </div>
              <div className="flex space-y-1 justify-between flex-row lg:flex-col items-center">
                <p className="font-semibold">Tue</p>
                <p>24hr</p>
              </div>
              <div className="flex space-y-1 justify-between flex-row lg:flex-col items-center">
                <p className="font-semibold">Wed</p>
                <p>24hr</p>
              </div>
              <div className="flex space-y-1 justify-between flex-row lg:flex-col items-center">
                <p className="font-semibold">Thu</p>
                <p>24hr</p>
              </div>
              <div className="flex space-y-1 justify-between flex-row lg:flex-col items-center">
                <p className="font-semibold">Fri</p>
                <p>24hr</p>
              </div>
              <div className="flex space-y-1 justify-between flex-row lg:flex-col items-center">
                <p className="font-semibold">Sat</p>
                <p>24hr</p>
              </div>
              <div className="flex space-y-1 justify-between flex-row lg:flex-col items-center">
                <p className="font-semibold">Sun</p>
                <p>24hr</p>
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-center px-7 bg-gray-100 rounded-md text-gray-900  ">
            <Link
              className="lg:ml-2 text-4xl mt-2 font-extrabold"
              href={`tel:${phone}`}
            >
              <span className="text-2xl font-bold">Call Us: </span>
              {phone}
            </Link>{" "}
            <div className="flex justify-between">
              <Image
                src={`https://api15.ecommcube.com/${process.env.NEXT_PUBLIC_HOSTNAME}/img/emergency.png`}
                height={100}
                width={200}
                alt="emergency"
                className="mt-3"
              />
              <div className="flex items-center gap-1 font-bold">
                <Image
                  src={`https://api15.ecommcube.com/${process.env.NEXT_PUBLIC_HOSTNAME}/img/star-set.webp`}
                  height={30}
                  width={120}
                  className=""
                  alt="logo"
                />
                5.0
              </div>
            </div>
          </div>
        </div>

        <p className="elementHeading text-3xl text-center mt-12">
          Opening doors for people every day! Central Dispatch:{" "}
          <Link className="lg:ml-1 text-primary" href={`tel:${phone}`}>
            {phone}
          </Link>{" "}
        </p>
      </Container>
    </FullContainer>
  );
}
