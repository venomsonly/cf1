import Image from "next/image";
import { Container, FullContainer } from "../common";
import Link from "next/link";

export default function Services({ services }) {
  return (
    <FullContainer>
      <Container className="w-11/12 md:w-9/12 mt-10">
        <h2 className="elementHeading">Services We Offer</h2>
        <div className="w-full">
          {services.map((item, index) => (
            <Link
              key={index}
              prefetch={false}
              href={`/${item.replaceAll(" ", "-")}`}
              title={item}
            >
              <button className="rounded-full m-1 p-3 px-6 serviceButton bg-gray-100 border-none">
                {item}
              </button>
            </Link>
          ))}
        </div>
        <div className="hidden lg:grid grid-cols-5 gap-3 items-center mt-10">
          <Image
            title="service image"
            height={250}
            width={250}
            src={`https://api15.ecommcube.com/${process.env.NEXT_PUBLIC_HOSTNAME}/img/1.webp`}
            alt="img1"
          />
          <Image
            title="service image"
            height={250}
            width={250}
            src={`https://api15.ecommcube.com/${process.env.NEXT_PUBLIC_HOSTNAME}/img/2.webp`}
            alt="img2"
          />
          <Image
            title="service image"
            height={250}
            width={250}
            src={`https://api15.ecommcube.com/${process.env.NEXT_PUBLIC_HOSTNAME}/img/3.webp`}
            alt="img3"
          />
          <Image
            title="service image"
            height={250}
            width={250}
            src={`https://api15.ecommcube.com/${process.env.NEXT_PUBLIC_HOSTNAME}/img/4.webp`}
            alt="img4"
          />
          <Image
            title="service image"
            height={250}
            width={250}
            src={`https://api15.ecommcube.com/${process.env.NEXT_PUBLIC_HOSTNAME}/img/5.webp`}
            alt="img5"
          />
        </div>
      </Container>
    </FullContainer>
  );
}
