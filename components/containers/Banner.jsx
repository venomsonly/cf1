import { PhoneIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import Link from "next/link";
import { Container, FullContainer } from "../common";
import SearchBox from "../common/SearchBox";

export default function Banner({
  service,
  backgroundImage,
  phone,
  banner_text_1,
  banner_text_2,
}) {
  return (
    <FullContainer>
      <Container className="bg-banner lg:bg-center bg-left relative rounded-3xl overflow-hidden p-7 lg:px-16">
        {/* <Image
          title="banner image"
          src="https://api15.ecommcube.com/towingnearme.us/banners/towing.webp"
          alt="banner-image"
          priority={true}
          // height={400}
          // width={400}
          fill={true}
          loading="eager"
          className="-z-10 absolute"
        /> */}
        <div className="my-8 mb-12 lg:text-left w-full grid lg:grid-cols-2 text-white">
          <div>
            <Link
              className="text-primary px-5 py-2 lg:px-0 lg:text-white bg-white ml-auto lg:ml-0 mr-auto lg:bg-transparent rounded-full w-fit flex items-center text-left gap-3"
              title="Click to call us"
              href={`tel:${phone}`}
            >
              <span className="p-2 roundedfull lg:bg-white text-primary rounded-lg hidden lg:block">
                <PhoneIcon
                  title="phone icon"
                  alt="phone icon"
                  className="h-6"
                />
              </span>
              <span className="text-center lg:text-left">
                <p className="uppercase text-sm lg:text-base font-bold">
                  Call Us
                </p>
                <p className="text-xl lg:-mt-1 font-bold">{phone}</p>
              </span>
            </Link>
            <h1 className="text-4xl mt-5 drop-shadow-lg capitalize leading-10 lg:text-5xl max-w-2xl font-extrabold">
              {banner_text_1}
            </h1>
            <p className="text-2xl lg:text-3xl font-semibold my-5 lg:my-7 flex flex-col lg:flex-row items-center">
              {banner_text_2}
              <Link
                title="Click to call"
                className="lg:ml-2 text-3xl"
                href={`tel:${phone}`}
              >
                {phone}
              </Link>{" "}
            </p>
            <div className="lg:w-10/12">
              <SearchBox
                service={service}
                className="p-2 rounded-full"
                buttonStyle="py-3 rounded-full"
                buttonText="Search"
              />
            </div>
          </div>
          <div></div>
        </div>
      </Container>
    </FullContainer>
  );
}
