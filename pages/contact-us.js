import Head from "next/head";
import { Container, FullContainer } from "../components/common";
import { Footer, Nav, Services } from "../components/containers";
import data from "../json/siteData.json";

export default function contactUs({
  BASE_URL,
  phone,
  services,
  meta_title,
  meta_description,
  footertag_1,
  footertag_2,
  footertag_3,
  footertag_4,
  footertext,
  quicklinks,
  copyright,
}) {
  return (
    <div className="text-center">
      <Head>
        <title>{meta_title}</title>
        <meta name="description" content={meta_description} />
        <meta charSet="UTF-8" />
        <meta name="theme-color" content="#008DE5" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="robots" content="noindex" />
        <link rel="author" href={`https://${BASE_URL}`} />
        <link rel="publisher" href={`https://${BASE_URL}`} />
        <link rel="canonical" href={`https://${BASE_URL}/contact-us`} />
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
        <Container>
          <h1 className="elementHeading mt-3">Contact Us</h1>
          <p className="mt-5">
            <span className="text-primary font-bold mr-1">Address: </span>
            {data.contact.address}{" "}
          </p>
          <p className="mt-2">
            <span className="text-primary font-bold mr-1">Hours: </span>
            {data.contact.hours}{" "}
          </p>
          <p className="mt-2">
            <span className="text-primary font-bold mr-1">Phone: </span>
            {phone}{" "}
          </p>
        </Container>
        <Services services={services} />
        <Footer
          footertext={footertext}
          footertag_1={footertag_1}
          footertag_2={footertag_2}
          footertag_3={footertag_3}
          footertag_4={footertag_4}
          quicklinks={quicklinks}
          copyright={copyright}
        />
      </FullContainer>
    </div>
  );
}

export async function getServerSideProps() {
  // Meta contact Title
  const _meta_contact_title = await fetch(
    `http://${process.env["NEXT_PUBLIC_API"]}/tagtext?tag=meta_contact_title&pass=${process.env["NEXT_PUBLIC_API_TOKEN"]}`
  );
  const meta_contact_title = await _meta_contact_title.json();

  // Meta contact Description
  const _meta_contact_description = await fetch(
    `http://${process.env["NEXT_PUBLIC_API"]}/tagtext?tag=meta_contact_description&pass=${process.env["NEXT_PUBLIC_API_TOKEN"]}`
  );
  const meta_contact_description = await _meta_contact_description.json();

  // Services
  const _services = await fetch(
    `http://${process.env["NEXT_PUBLIC_API"]}/taglist?pattern=service_&pass=${process.env["NEXT_PUBLIC_API_TOKEN"]}`
  );
  const services = await _services.json();

  // default phone number
  const _defaultPhone = await fetch(
    `http://${process.env["NEXT_PUBLIC_API"]}/tagtext?tag=default_phone&pass=${process.env["NEXT_PUBLIC_API_TOKEN"]}`
  );
  const default_phone = await _defaultPhone.json();

  // Logo Text
  const _logo_text = await fetch(
    `http://${process.env["NEXT_PUBLIC_API"]}/tagtext?tag=logo_text&pass=${process.env["NEXT_PUBLIC_API_TOKEN"]}`
  );
  const logo_text = await _logo_text.json();

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
      meta_title: meta_contact_title["text"],
      meta_description: meta_contact_description["text"],
      phone: default_phone["text"],
      services: services["list"],
      logo_text: logo_text["text"],
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
