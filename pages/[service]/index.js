import Head from "next/head";
import { useRouter } from "next/router";
import {
  Accordian,
  Banner,
  CallToActionCard,
  Footer,
  Grid,
  HowTo,
  Nav,
  ServiceInArea,
  Services,
} from "../../components/containers";

function capitalizeEachWord(mySentence) {
  const words = mySentence.split(" ");

  for (let i = 0; i < words.length; i++) {
    words[i] = words[i][0].toUpperCase() + words[i].substr(1);
  }
  return words.join(" ");
}

export default function Service({
  banner_text_1,
  banner_text_2,
  middletext,
  middleTextTitle,
  faqs,
  faqstitle,
  faqsdescription,
  phone,
  apidata,
  services,
  BASE_URL,
  meta_title,
  meta_description,
  howto,
  howtoTitle,
  howtoDescription,
  footertag_1,
  footertag_2,
  footertag_3,
  footertag_4,
  footertext,
  quicklinks,
  copyright,
}) {
  const router = useRouter();
  const { service } = router.query;

  if (router.isFallback) {
    return;
    <>...</>;
  }
  const gridData = apidata.map((data) => {
    return { name: data.name, route: data.route };
  });

  const faq_options = faqs.map((data) => {
    const item = JSON.parse(data);
    return { question: item.question, answer: item.answer };
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
          )}
        </title>
        <meta
          name="description"
          content={meta_description.replaceAll("##phone##", phone)}
        />
        <link rel="author" href={`https://${BASE_URL}`} />
        <link rel="publisher" href={`https://${BASE_URL}`} />
        <link rel="canonical" href={`https://${BASE_URL}/${service}`} />
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
      <Banner
        service={service}
        phone={phone}
        banner_text_1={banner_text_1.replaceAll(
          "##service##",
          service.replaceAll("-", " ")
        )}
        banner_text_2={banner_text_2}
        backgroundImage={service.replaceAll("-", " ")}
      />
      <Services services={services} />
      <ServiceInArea
        title={middleTextTitle.replaceAll(
          "##service##",
          service.replaceAll("-", " ")
        )}
        data={middletext}
        phone={phone}
      />
      <HowTo
        service={service.replaceAll("-", " ")}
        componentTitle={howtoTitle.replaceAll(
          "##service##",
          service.replaceAll("-", " ")
        )}
        des={howtoDescription}
        data={howto}
      />
      <Accordian
        options={faq_options}
        componentTitle={faqstitle}
        des={faqsdescription}
      />
      <CallToActionCard
        phone={phone}
        service={service.replaceAll("-", " ")}
        area="united states"
      />
      <Grid
        title={`${service.replaceAll("-", " ")} in United States`}
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

export async function getStaticPaths(context) {
  const response = await fetch(
    `http://${process.env["NEXT_PUBLIC_API"]}/taglist?pattern=service_&pass=${process.env["NEXT_PUBLIC_API_TOKEN"]}`
  );
  const data = await response.json();
  const paths = data["list"].map((item) => {
    return {
      params: { service: `${item.replaceAll(" ", "-")}` },
    };
  });
  return {
    paths,
    fallback: true,
  };
}

export async function getStaticProps(context) {
  const { params } = context;
  // Meta Service Title
  const _meta_keyword_title = await fetch(
    `http://${process.env["NEXT_PUBLIC_API"]}/tagtext?tag=meta_keyword_title&pass=${process.env["NEXT_PUBLIC_API_TOKEN"]}`
  );
  const meta_keyword_title = await _meta_keyword_title.json();

  // Meta Service Description
  const _meta_keyword_description = await fetch(
    `http://${process.env["NEXT_PUBLIC_API"]}/tagtext?tag=meta_keyword_description&pass=${process.env["NEXT_PUBLIC_API_TOKEN"]}`
  );
  const meta_keyword_description = await _meta_keyword_description.json();

  const response = await fetch(
    `http://${process.env["NEXT_PUBLIC_API"]}/states?pass=${process.env["NEXT_PUBLIC_API_TOKEN"]}`
  );
  const data = await response.json();

  // BANNER TEXT
  const _banner_text_1 = await fetch(
    `http://${process.env["NEXT_PUBLIC_API"]}/tagtext?tag=banner_text_1&pass=${process.env["NEXT_PUBLIC_API_TOKEN"]}`
  );
  const banner_text_1 = await _banner_text_1.json();
  const _banner_text_2 = await fetch(
    `http://${process.env["NEXT_PUBLIC_API"]}/tagtext?tag=banner_text_2&pass=${process.env["NEXT_PUBLIC_API_TOKEN"]}`
  );
  const banner_text_2 = await _banner_text_2.json();

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

  // FAQs
  const _faqs = await fetch(
    `http://${process.env["NEXT_PUBLIC_API"]}/taglist?pattern=faqs&pass=${process.env["NEXT_PUBLIC_API_TOKEN"]}`
  );
  const faqs = await _faqs.json();
  // FAQs Title
  const _faqstitle = await fetch(
    `http://${process.env["NEXT_PUBLIC_API"]}/tagtext?tag=faqComponentTitle&pass=${process.env["NEXT_PUBLIC_API_TOKEN"]}`
  );
  const faqstitle = await _faqstitle.json();
  // FAQs Description
  const _faqsdescription = await fetch(
    `http://${process.env["NEXT_PUBLIC_API"]}/tagtext?tag=faqComponentDescription&pass=${process.env["NEXT_PUBLIC_API_TOKEN"]}`
  );
  const faqsdescription = await _faqsdescription.json();

  // middleText
  const _middleTextTitle = await fetch(
    `http://${process.env["NEXT_PUBLIC_API"]}/tagtext?tag=home_text_block_title&pass=${process.env["NEXT_PUBLIC_API_TOKEN"]}`
  );
  const middleTextTitle = await _middleTextTitle.json();
  const _middletext = await fetch(
    `http://${process.env["NEXT_PUBLIC_API"]}/taglist?pattern=home_text_block_description&pass=${process.env["NEXT_PUBLIC_API_TOKEN"]}`
  );
  const middletext = await _middletext.json();

  // How To
  const _howto = await fetch(
    `http://${process.env["NEXT_PUBLIC_API"]}/taglist?pattern=howto&pass=${process.env["NEXT_PUBLIC_API_TOKEN"]}`
  );
  const howto = await _howto.json();
  // How To Title
  const _howToComponentTitle = await fetch(
    `http://${process.env["NEXT_PUBLIC_API"]}/tagtext?tag=howToComponentTitle&pass=${process.env["NEXT_PUBLIC_API_TOKEN"]}`
  );
  const howToComponentTitle = await _howToComponentTitle.json();
  // How To Title
  const _howToComponentDescription = await fetch(
    `http://${process.env["NEXT_PUBLIC_API"]}/tagtext?tag=howToComponentDescription&pass=${process.env["NEXT_PUBLIC_API_TOKEN"]}`
  );
  const howToComponentDescription = await _howToComponentDescription.json();

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
      let obj = {
        name: capitalizeEachWord(data["list"][i]),
        route: `/${params.service}/${data["list"][i].replaceAll(" ", "-")}`,
      };
      data_arr.push(obj);
    }
    return {
      props: {
        apidata: data_arr,
        services: services["list"],
        middleTextTitle: middleTextTitle["text"],
        middletext: middletext["list"],
        faqs: faqs["list"],
        faqstitle: faqstitle["text"],
        faqsdescription: faqsdescription["text"],
        banner_text_1: banner_text_1["text"],
        banner_text_2: banner_text_2["text"],
        howto: howto["list"],
        howtoTitle: howToComponentTitle["text"],
        howtoDescription: howToComponentDescription["text"],
        phone: default_phone["text"],
        quicklinks: quicklinks["list"],
        meta_title: meta_keyword_title["text"],
        meta_description: meta_keyword_description["text"],
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
      revalidate: 1,
    };
  }
}
