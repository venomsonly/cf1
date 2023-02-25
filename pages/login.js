import Head from "next/head";
import Image from "next/image";
import { Container, FullContainer, InputField } from "../components/common";
import { Footer, Nav } from "../components/containers";
import Link from "next/link";

export default function login({
  BASE_URL,
  meta_title,
  meta_description,
  phone,
  services,
  footertag_1,
  footertag_2,
  footertag_3,
  footertag_4,
  footertext,
  quicklinks,
  copyright,
}) {
  return (
    <div>
      <Head>
        <title>{meta_title}</title>
        <meta name="description" content={meta_description} />
        <meta charSet="UTF-8" />
        <meta name="theme-color" content="#008DE5" />
        <meta name="robots" content="noindex" />
        <link rel="author" href={BASE_URL} />
        <link rel="publisher" href={BASE_URL} />
        <link rel="canonical" href={`${BASE_URL}login`} />
        <link rel="manifest" href="/manifest.json" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href={`https://api15.ecommcube.com/${BASE_URL}/apple-touch-icon.png`}
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href={`https://api15.ecommcube.com/${BASE_URL}/favicon-32x32.png`}
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href={`https://api15.ecommcube.com/${BASE_URL}/favicon-16x16.png`}
        />
      </Head>
      <Nav phone={phone} services={services} />
      <FullContainer>
        <Container className="py-12">
          <div className="grid lg:grid-cols-2 w-full lg:gap-16">
            <div className="bg-login bg-cover bg-center"></div>
            <form className="flex items-center justify-center flex-col">
              <h1 className="elementHeading mb-5">Login Here</h1>
              <InputField
                label="Email"
                type="email"
                placeholder="Enter your email address"
              />
              <InputField
                label="Password"
                type="Password here"
                placeholder="Enter your email address"
              />

              {/* Submit Button */}
              <input
                className="loginFormField mb-4 mt-3 bg-primary text-white"
                type="submit"
                value="Login"
              />

              <div className="flex justify-between text-center items-center w-full">
                <span className="bg-gray-500 flex-1 h[2px] w-40"></span>
                or
                <span className="bg-gray-500 flex-1 h[2px] w-40"></span>
              </div>

              {/* Google SignIn */}
              <button className="loginFormField mt-4 bg-white hover:shadow-gray-300 flex items-center justify-center">
                <span>
                  <Image
                    height={25}
                    width={25}
                    src={`https://api15.ecommcube.com/${process.env.NEXT_PUBLIC_HOSTNAME}/img/googleIcon.png`}
                    className="mr-2"
                    alt="Google Icon"
                  />
                </span>
                Login with Google
              </button>

              <div className="text-center mt-7">
                Not a memeber yet?{" "}
                <span>
                  <Link className="text-primary ml-2" href="/signup">
                    Create Account
                  </Link>{" "}
                </span>
              </div>
            </form>
          </div>
        </Container>
      </FullContainer>
      <Footer
        footertext={footertext}
        footertag_1={footertag_1}
        footertag_2={footertag_2}
        footertag_3={footertag_3}
        footertag_4={footertag_4}
        quicklinks={quicklinks}
        copyright={copyright}
      />
    </div>
  );
}

export async function getServerSideProps() {
  // Logo Text
  const _logo_text = await fetch(
    `http://${process.env["NEXT_PUBLIC_API"]}/tagtext?tag=logo_text&pass=${process.env["NEXT_PUBLIC_API_TOKEN"]}`
  );
  const logo_text = await _logo_text.json();

  // Meta contact Title
  const _meta_signup_title = await fetch(
    `http://${process.env["NEXT_PUBLIC_API"]}/tagtext?tag=meta_signup_title&pass=${process.env["NEXT_PUBLIC_API_TOKEN"]}`
  );
  const meta_signup_title = await _meta_signup_title.json();

  // Meta contact Description
  const _meta_signup_description = await fetch(
    `http://${process.env["NEXT_PUBLIC_API"]}/tagtext?tag=meta_signup_description&pass=${process.env["NEXT_PUBLIC_API_TOKEN"]}`
  );
  const meta_signup_description = await _meta_signup_description.json();

  // default phone number
  const _defaultPhone = await fetch(
    `http://${process.env["NEXT_PUBLIC_API"]}/tagtext?tag=default_phone&pass=${process.env["NEXT_PUBLIC_API_TOKEN"]}`
  );
  const default_phone = await _defaultPhone.json();

  // Services
  const _services = await fetch(
    `http://${process.env["NEXT_PUBLIC_API"]}/taglist?pattern=service_&pass=${process.env["NEXT_PUBLIC_API_TOKEN"]}`
  );
  const services = await _services.json();

  // Footer
  const _footertag_1 = await fetch(
    `http://${process.env["NEXT_PUBLIC_API"]}/tagtext?tag=footertag_1&pass=${process.env["NEXT_PUBLIC_API_TOKEN"]}`
  );
  const footertag_1 = await _footertag_1.json();
  const _footertag_2 = await fetch(
    `http://${process.env["NEXT_PUBLIC_API"]}/tagtext?tag=footertag_2&pass=${process.env["NEXT_PUBLIC_API_TOKEN"]}`
  );
  const footertag_2 = await _footertag_2.json();
  const _footertag_3 = await fetch(
    `http://${process.env["NEXT_PUBLIC_API"]}/tagtext?tag=footertag_3&pass=${process.env["NEXT_PUBLIC_API_TOKEN"]}`
  );
  const footertag_3 = await _footertag_3.json();
  const _footertag_4 = await fetch(
    `http://${process.env["NEXT_PUBLIC_API"]}/tagtext?tag=footertag_4&pass=${process.env["NEXT_PUBLIC_API_TOKEN"]}`
  );
  const footertag_4 = await _footertag_4.json();
  const _footertext = await fetch(
    `http://${process.env["NEXT_PUBLIC_API"]}/tagtext?tag=footertext&pass=${process.env["NEXT_PUBLIC_API_TOKEN"]}`
  );
  const footertext = await _footertext.json();
  const _quicklinks = await fetch(
    `http://${process.env["NEXT_PUBLIC_API"]}/taglist?pattern=quicklinks&pass=${process.env["NEXT_PUBLIC_API_TOKEN"]}`
  );
  const quicklinks = await _quicklinks.json();
  const _copyright = await fetch(
    `http://${process.env["NEXT_PUBLIC_API"]}/tagtext?tag=copyright&pass=${process.env["NEXT_PUBLIC_API_TOKEN"]}`
  );
  const copyright = await _copyright.json();

  return {
    props: {
      logo_text: logo_text["text"],
      meta_title: meta_signup_title["text"],
      meta_description: meta_signup_description["text"],
      phone: default_phone["text"],
      services: services["list"],
      footertag_1: footertag_1["text"],
      footertag_2: footertag_2["text"],
      footertag_3: footertag_3["text"],
      footertag_4: footertag_4["text"],
      footertext: footertext["text"],
      quicklinks: quicklinks["list"],
      copyright: copyright["text"],
      BASE_URL: process.env.NEXT_PUBLIC_HOSTNAME,
    },
  };
}
