import Link from "next/link";
import Image from "next/image";
import { Container, FullContainer } from "../common";

export default function Footer({
  quicklinks,
  copyright,
  footertag_1,
  footertag_2,
  footertag_3,
  footertag_4,
  footertext,
}) {
  return (
    <FullContainer>
      <Container className="border-t mt-12 py-10">
        <div className="grid lg:grid-cols-3 gap-10 lg:gap-20 text-left">
          {/* Col 1 */}
          <div>
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
                alt="logo"
              />
            </Link>
            <p className="md:text-xl mt-2 font-semibold">{footertag_1}</p>
            <Image
              title="start set"
              src={`https://api15.ecommcube.com/${process.env.NEXT_PUBLIC_HOSTNAME}/img/star-set.webp`}
              height={30}
              width={150}
              className="mt-3"
              alt="logo"
            />
            <p className="mt-4">{footertext}</p>
          </div>

          {/* Col 2 */}
          <div className="flex-col flex text-center items-center">
            <p className="text-lg lg:text-2xl font-bold mb-5">{footertag_2}</p>
            <Image
              title="bank cards"
              src={`https://api15.ecommcube.com/${process.env.NEXT_PUBLIC_HOSTNAME}/img/bank-cards.webp`}
              height={100}
              width={400}
              alt="logo"
            />
            <p className="mt-10 text-left font-semibold text-xl text-gray-700">
              {footertag_3}
            </p>
            <div className="flex items-center mt-2">
              <Link
                title="Instagram"
                href="https://www.instagram.com"
                className="socialLink"
              >
                <Image
                  title="social-link"
                  src={`https://api15.ecommcube.com/${process.env.NEXT_PUBLIC_HOSTNAME}/icons/ig.png`}
                  height={20}
                  width={20}
                  alt="instagram"
                />
              </Link>
              <Link
                title="LinkedIn"
                href="https://www.linkedin.com"
                className="socialLink"
              >
                <Image
                  title="social-link"
                  src={`https://api15.ecommcube.com/${process.env.NEXT_PUBLIC_HOSTNAME}/icons/in.png`}
                  height={20}
                  width={20}
                  alt="linkedin"
                />
              </Link>
              <Link
                title="Twitter"
                href="https://www.twitter.com"
                className="socialLink"
              >
                <Image
                  title="social-link"
                  src={`https://api15.ecommcube.com/${process.env.NEXT_PUBLIC_HOSTNAME}/icons/tw.png`}
                  height={20}
                  width={20}
                  alt="twitter"
                />
              </Link>
              <Link
                title="Facebook"
                href="https://www.facebook.com"
                className="socialLink"
              >
                <Image
                  title="social-link"
                  src={`https://api15.ecommcube.com/${process.env.NEXT_PUBLIC_HOSTNAME}/icons/fb.png`}
                  height={20}
                  width={20}
                  alt="facebook"
                />
              </Link>
            </div>
          </div>

          {/* Col 3 */}
          <div>
            <p className="text-2xl font-bold">{footertag_4}</p>
            <div className="grid gap-y-1 mt-2">
              {quicklinks.map((item, index) => (
                <Link
                  key={index}
                  title={item}
                  href={`/${item.replaceAll(" ", "-")}`}
                  className="hover:text-primary capitalize transition-all"
                >
                  {item}
                </Link>
              ))}
            </div>
          </div>
        </div>
        <p className="text-center mt-12 text-gray-500">{copyright}</p>
      </Container>
    </FullContainer>
  );
}
