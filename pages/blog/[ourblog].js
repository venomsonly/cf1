import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { Container, FullContainer } from "../../components/common";
import { Footer, Nav } from "../../components/containers";
import MarkdownIt from "markdown-it";
import { useEffect, useState } from "react";

function capitalizeEachWord(mySentence) {
  const words = mySentence.split(" ");

  for (let i = 0; i < words.length; i++) {
    words[i] = words[i][0].toUpperCase() + words[i].substr(1);
  }
  return words.join(" ");
}

export default function BlogDetail({
  bloglist,
  phone,
  BASE_URL,
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
  const router = useRouter();
  const { ourblog } = router.query;
  const [blogData, setBlogData] = useState("");

  const blogs = bloglist.map((data) => {
    const item = JSON.parse(data);
    return {
      id: item.id,
      title: item.title,
      description: item.description,
      image: item.image,
      created_at: item.created_at,
      href: item.href,
    };
  });
  const blog = blogs.find(
    (blog) => blog.href.split(/[\n|\r|?]/).join("") === ourblog
  );

  const style = {
    backgroundImage: `linear-gradient(#0005, #0005),url(${blog.image}.webp)`,
    "@media screen and (maxWidth: 500px)": {
      background: "none",
    },
  };

  useEffect(() => {
    async function fetchData() {
      const res = await fetch(
        `https://${process.env["NEXT_PUBLIC_API"]}/tagtext?tag=blog_description_${blog.id}&pass=${process.env["NEXT_PUBLIC_API_TOKEN"]}`
      );
      const data = await res.json();
      setBlogData(data);
    }
    fetchData();
  }, [blog]);

  const markdownIt = new MarkdownIt();
  const content = markdownIt.render(`${blogData["text"]}`);

  return (
    <div>
      <Head>
        <meta charSet="UTF-8" />
        <title>{capitalizeEachWord(blog.title) + meta_title}</title>
        <meta name="description" content={meta_description} />
        <link rel="author" href={`https://${BASE_URL}`} />
        <link rel="publisher" href={`https://${BASE_URL}`} />
        <link rel="canonical" href={`https://${BASE_URL}/blog/${blog.href}`} />
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
      <FullContainer className="text-center">
        <div className="container max-w-screen-xl rounded-3xl bg-transparent text-white relative">
          <div className="w-full h-full bg-white absolute rounded-3xl top-0 flex items-center justify-center overflow-hidden">
            <video
              className="hidden md:block top-0 left-0 bottom-0 right-0 w-full bg-transparent"
              autoPlay
              muted
              playsInline
              loop
            >
              <source src="/bannerVideo.mp4" type="video/mp4" />
            </video>
          </div>
          <div
            style={style}
            className={`w-full bannerBg bg-cover bg-center rounded-3xl z-10 p-7 h-full flex flex-col items-center justify-center`}
          >
            <div className="mt-16 mb-20 flex items-center justify-center flex-col">
              <h1 className="elementHeading max-w-xl text-white">
                {blog.title}
              </h1>
            </div>
          </div>
        </div>
        <Container className="mt-8">
          <div className="w-full grid lg:grid-cols-blogDetailPage gap-10 text-left">
            <div>
              <div dangerouslySetInnerHTML={{ __html: content }} />
            </div>
            <div>
              {blogs.map((blog, index) => (
                <div
                  key={index}
                  className="w-full grid lg:grid-cols-blogList gap-3 mb-6"
                >
                  <Link
                    title={blog.title}
                    href={`/blog/${blog.href}`}
                    className="overflow-hidden rounded-lg"
                  >
                    <div
                      style={{ backgroundImage: `url(${blog.image})` }}
                      className="p-10 bg-cover bg-center transition-all hover:scale-110 cursor-pointer bg-primary h-56 lg:h-full"
                    ></div>
                  </Link>
                  <div className="space-y-2">
                    <h3 className="text-lg lg:text-base font-bold">
                      {blog.title}
                    </h3>
                    <p className="text-gray-600 mt-2 lg:hidden">
                      {blog.description.slice(0, 100)}...
                    </p>
                    <p className="text-gray-400 text-sm">
                      {new Date(blog.created_at).toLocaleDateString("en-US", {
                        dateStyle: "long",
                      })}
                    </p>
                    <button className="text-sm btnPrimarySmall">
                      <Link href={`/blog/${blog.href}`}>Read Blog</Link>
                    </button>
                  </div>
                </div>
              ))}
              <button className="w-full flex">
                <Link
                  title="Read all blogs"
                  className="text-center w-full bg-gray-100 hover:bg-gray-200 transition-all rounded-md px-6 py-3"
                  href="/blog"
                >
                  Read all blogs
                </Link>
              </button>
            </div>
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

export async function getServerSideProps({ params }) {
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

  // Meta blog Title
  const _meta_blog_title = await fetch(
    `http://${process.env["NEXT_PUBLIC_API"]}/tagtext?tag=meta_blog_title&pass=${process.env["NEXT_PUBLIC_API_TOKEN"]}`
  );
  const meta_blog_title = await _meta_blog_title.json();

  // Meta blog Description
  const _meta_blog_description = await fetch(
    `http://${process.env["NEXT_PUBLIC_API"]}/tagtext?tag=meta_blog_description&pass=${process.env["NEXT_PUBLIC_API_TOKEN"]}`
  );
  const meta_blog_description = await _meta_blog_description.json();

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

  const _blog_title = await fetch(
    `http://${process.env["NEXT_PUBLIC_API"]}/taglist?pattern=blog_title&pass=${process.env["NEXT_PUBLIC_API_TOKEN"]}`
  );
  const blog_title = await _blog_title.json();

  return {
    props: {
      bloglist: blog_title["list"],
      phone: default_phone["text"],
      services: services["list"],
      meta_title: meta_blog_title["text"],
      meta_description: meta_blog_description["text"],
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
