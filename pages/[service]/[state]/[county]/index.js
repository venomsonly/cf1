import Head from "next/head";
import { useRouter } from "next/router";
import {
  CallToActionCard,
  Footer,
  Grid,
  Nav,
  ServiceInArea,
  Services,
  ZipCity,
} from "../../../../components/containers";
import data from "../../../../json/siteData.json";

function capitalizeEachWord(mySentence) {
  const words = mySentence.split(" ");
  for (let i = 0; i < words.length; i++) {
    words[i] = words[i][0].toUpperCase() + words[i].substr(1);
  }
  return words.join(" ");
}

export default function County({
  logo_text,
  service_for_search,
  apidata,
  BASE_URL,
  map,
  middletext,
  middleTextTitle,
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
  const { service, state, county } = router.query;

  if (router.isFallback) {
    return;
    <>...</>;
  }
  const gridData = apidata.map((data) => {
    return { name: data.city_name, route: data.city_route };
  });
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
          )}
        </title>
        <meta
          name="description"
          content={meta_description
            .replaceAll("##phone##", phone)
            .replaceAll("##service##", service.replaceAll("-", " "))
            .replaceAll("##state##", state.replaceAll("-", " "))
            .replaceAll("##county##", county.replaceAll("-", " "))}
        />
        <link rel="author" href={`https://${BASE_URL}`} />
        <link rel="publisher" href={`https://${BASE_URL}`} />
        <link
          rel="canonical"
          href={`https://${BASE_URL}/${service}/${state}/${county}`}
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
        service_for_search={service_for_search}
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
        ]}
        service={service.replaceAll("-", " ")}
        area={county.replaceAll("-", " ")}
        calenderHeading={
          county.replaceAll("-", " ") + " " + service.replaceAll("-", " ")
        }
        serving={
          state.replaceAll("-", " ") + ", " + county.replaceAll("-", " ")
        }
      />
      <Services services={services} />
      <ServiceInArea
        title={middleTextTitle
          .replaceAll("##service##", service.replaceAll("-", " "))
          .replaceAll("##area##", county.replaceAll("-", " "))}
        data={middletext}
        phone={phone}
      />
      <CallToActionCard
        phone={phone}
        service={service.replaceAll("-", " ")}
        area={state.replaceAll("-", " ")}
      />
      <Grid
        title={`${service.replaceAll("-", " ")} in ${county.replaceAll(
          "-",
          " "
        )}`}
        data={gridData}
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

  // Meta County Title
  const _meta_county_title = await fetch(
    `http://${process.env["NEXT_PUBLIC_API"]}/tagtext?tag=meta_county_title&pass=${process.env["NEXT_PUBLIC_API_TOKEN"]}`
  );
  const meta_county_title = await _meta_county_title.json();

  // Meta County Description
  const _meta_county_description = await fetch(
    `http://${process.env["NEXT_PUBLIC_API"]}/tagtext?tag=meta_county_description&pass=${process.env["NEXT_PUBLIC_API_TOKEN"]}`
  );
  const meta_county_description = await _meta_county_description.json();

  // Counties Api
  const response = await fetch(
    `http://${process.env["NEXT_PUBLIC_API"]}/cities?county_name=${_county
      .toLowerCase()
      .replaceAll("-", "%20")}&pass=${process.env["NEXT_PUBLIC_API_TOKEN"]}`
  );
  const data = await response.json();

  // Geo location and phone number
  const _map = await fetch(
    `http://${process.env["NEXT_PUBLIC_API"]}/search_geo_phone?_sk=county:${params["county"]}`
  );
  const map = await _map.json();

  // Services
  const _services = await fetch(
    `http://${process.env["NEXT_PUBLIC_API"]}/taglist?pattern=service_&pass=${process.env["NEXT_PUBLIC_API_TOKEN"]}`
  );
  const services = await _services.json();

  // middleText
  const _middleTextTitle = await fetch(
    `http://${process.env["NEXT_PUBLIC_API"]}/tagtext?tag=county_text_block_title&pass=${process.env["NEXT_PUBLIC_API_TOKEN"]}`
  );
  const middleTextTitle = await _middleTextTitle.json();
  const _middletext = await fetch(
    `http://${process.env["NEXT_PUBLIC_API"]}/taglist?pattern=county_text_block_description&pass=${process.env["NEXT_PUBLIC_API_TOKEN"]}`
  );
  const middletext = await _middletext.json();

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
      let _city = data["list"][i].toLowerCase().replaceAll(" ", "-");
      let obj = {
        service_route: `/${_service}`,
        state_route: `/${_service}/${_state}`,
        county_route: `/${_service}/${_state}/${_county}`,
        city_route: `/${_service}/${_state}/${_county}/${_city}`,
        service_name: `${capitalizeEachWord(_service.replaceAll("-", " "))}`,
        state_name: `${capitalizeEachWord(_state.replaceAll("-", " "))}`,
        county_name: `${capitalizeEachWord(_county.replaceAll("-", " "))}`,
        city_name: `${capitalizeEachWord(_city.replaceAll("-", " "))}`,
      };
      data_arr.push(obj);
    }
    return {
      props: {
        map,
        apidata: data_arr,
        service_for_search: service["text"],
        phone: map["phone"] || default_phone["text"],
        meta_title: meta_county_title["text"],
        meta_description: meta_county_description["text"],
        middleTextTitle: middleTextTitle["text"],
        middletext: middletext["list"],
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
