import Head from "next/head";
import { useRouter } from "next/router";
import { Footer, Nav, ZipCity } from "../../../../../../components/containers";

function capitalizeEachWord(mySentence) {
  const words = mySentence.split(" ");
  for (let i = 0; i < words.length; i++) {
    words[i] = words[i][0].toUpperCase() + words[i].substr(1);
  }
  return words.join(" ");
}

export default function Zip({
  service_for_search,
  BASE_URL,
  services,
  phone,
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
  const router = useRouter();
  const { service, state, county, city, zip } = router.query;

  if (router.isFallback) {
    return;
    <>...</>;
  }

  return (
    <div className="text-center">
      <Head>
        <meta charSet="UTF-8" />
        <title>
          {capitalizeEachWord(
            meta_title
              .replaceAll("##phone##", phone)
              .replaceAll("##service##", service.replaceAll("-", " "))
              .replaceAll("##state##", state.replaceAll("-", " "))
              .replaceAll("##county##", county.replaceAll("-", " "))
              .replaceAll("##city##", city.replaceAll("-", " "))
              .replaceAll("##zip##", zip)
          )}
        </title>
        <meta
          name="description"
          content={meta_description
            .replaceAll("##phone##", phone)
            .replaceAll("##service##", service.replaceAll("-", " "))
            .replaceAll("##state##", state.replaceAll("-", " "))
            .replaceAll("##county##", county.replaceAll("-", " "))
            .replaceAll("##city##", city.replaceAll("-", " "))
            .replaceAll("##zip##", zip)}
        />
        <link rel="author" href={`https://${BASE_URL}`} />
        <link rel="publisher" href={`https://${BASE_URL}`} />
        <link
          rel="canonical"
          href={`https://${BASE_URL}/${service}/${state}/${county}/${city}/${zip}`}
        />
        <meta name="robots" content="noindex" />
        <meta name="theme-color" content="#008DE5" />
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
      <ZipCity
        phone={phone}
        service={service.replaceAll("-", " ")}
        service_for_search={service_for_search}
        area={zip.replaceAll("-", " ")}
        calenderHeading={
          city.replaceAll("-", " ") + " " + service.replaceAll("-", " ")
        }
        serving={city.replaceAll("-", " ") + ", " + zip.replaceAll("-", " ")}
        breadcrumbs={[
          {
            name: `${service.replaceAll("-", " ")}`,
            href: `/${service}`,
          },
          {
            name: `${state.replaceAll("-", " ")}`,
            href: `/${service}/${state}`,
          },
          {
            name: `${county.replaceAll("-", " ")}`,
            href: `/${service}/${state}/${county}`,
          },
          {
            name: `${city.replaceAll("-", " ")}`,
            href: `/${service}/${state}/${county}/${city}`,
          },
          {
            name: `${zip.replaceAll("-", " ")}`,
            href: `/${service}/${state}/${county}/${city}/${zip}`,
          },
        ]}
      />
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
export async function getStaticPaths() {
  return {
    paths: [],
    fallback: true,
  };
}
export async function getStaticProps(context) {
  const { params } = context;
  const _service = params["service"].toLowerCase().replaceAll(" ", "-");
  const _state = params["state"].toLowerCase().replaceAll(" ", "-");
  const _county = params["county"].toLowerCase().replaceAll(" ", "-");
  const _city = params["city"].toLowerCase().replaceAll(" ", "-");

  // https://api15.ecommcube.com/_1apidata/tagtext?tag=service_0&pass=billy
  // service for search
  const service_ = await fetch(
    `http://${process.env["NEXT_PUBLIC_API"]}/tagtext?tag=service_0&pass=${process.env["NEXT_PUBLIC_API_TOKEN"]}`
  );
  const service = await service_.json();

  // Logo Text
  const _logo_text = await fetch(
    `http://${process.env["NEXT_PUBLIC_API"]}/tagtext?tag=logo_text&pass=${process.env["NEXT_PUBLIC_API_TOKEN"]}`
  );
  const logo_text = await _logo_text.json();

  // Meta zip Title
  const _meta_zip_title = await fetch(
    `http://${process.env["NEXT_PUBLIC_API"]}/tagtext?tag=meta_zip_title&pass=${process.env["NEXT_PUBLIC_API_TOKEN"]}`
  );
  const meta_zip_title = await _meta_zip_title.json();

  // Meta zip Description
  const _meta_zip_description = await fetch(
    `http://${process.env["NEXT_PUBLIC_API"]}/tagtext?tag=meta_zip_description&pass=${process.env["NEXT_PUBLIC_API_TOKEN"]}`
  );
  const meta_zip_description = await _meta_zip_description.json();

  const response = await fetch(
    `http://${process.env["NEXT_PUBLIC_API"]}/zips?city_name=${_city
      .toLowerCase()
      .replaceAll("-", "%20")}&pass=${process.env["NEXT_PUBLIC_API_TOKEN"]}`
  );
  const data = await response.json();

  // https://a1.ecommcube.com/_apidata/search_geo_phone?_sk=state:california
  // Geo location and phone number
  const _map = await fetch(
    `http://${process.env["NEXT_PUBLIC_API"]}/search_geo_phone?_sk=zip:${params["zip"]}`
  );
  const map = await _map.json();

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

  // default phone number
  const _defaultPhone = await fetch(
    `http://${process.env["NEXT_PUBLIC_API"]}/tagtext?tag=default_phone&pass=${process.env["NEXT_PUBLIC_API_TOKEN"]}`
  );
  const default_phone = await _defaultPhone.json();

  if (data["list"].length == 0) {
    return {
      redirect: {
        permanent: false,
        destination: "/404",
        status: 404,
      },
    };
  } else {
    let data_arr = [];
    for (let i = 0; i < data["list"].length; i++) {
      let _zip = data["list"][i].toLowerCase().replaceAll(" ", "-");
      let obj = {
        service_route: `/${_service}`,
        state_route: `/${_service}/${_state}`,
        county_route: `/${_service}/${_state}/${_county}`,
        city_route: `/${_service}/${_state}/${_county}/${_city}`,
        zip_route: `/${_service}/${_state}/${_county}/${_city}/${_zip}`,
        service_name: `${capitalizeEachWord(_service.replaceAll("-", " "))}`,
        state_name: `${capitalizeEachWord(_state.replaceAll("-", " "))}`,
        county_name: `${capitalizeEachWord(_county.replaceAll("-", " "))}`,
        city_name: `${capitalizeEachWord(_city.replaceAll("-", " "))}`,
        zip_name: `${_zip}`,
      };
      data_arr.push(obj);
    }

    return {
      props: {
        map,
        service_for_search: service["text"],
        phone: map["phone"] || default_phone["text"],
        apidata: data_arr,
        meta_title: meta_zip_title["text"],
        meta_description: meta_zip_description["text"],
        logo_text: logo_text["text"],
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
      revalidate: 1,
    };
  }
}
