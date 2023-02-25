import Head from "next/head";
import Link from "next/link";
import { Container, FullContainer } from "../../components/common";
import { Breadcrumbs, Footer, Nav } from "../../components/containers";

export default function Blog({
  blog,
  services,
  BASE_URL,
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
  const blogs = blog.map((data) => {
    const item = JSON.parse(data);
    return {
      title: item.title,
      description: item.description,
      image: item.image,
      created_at: item.created_at,
      href: item.href,
    };
  });

  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <title>{meta_title}</title>
        <meta name="description" content={meta_description} />
        <link rel="author" href={`https://${BASE_URL}`} />
        <link rel="publisher" href={`https://${BASE_URL}`} />
        <link rel="canonical" href={`https://${BASE_URL}/blog`} />
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
      <FullContainer>
        <div className="hidden lg:block mt-2">
          <Breadcrumbs
            items={[
              {
                name: "Home",
                href: "/",
              },
              {
                name: "Blog",
                href: "/blog",
              },
            ]}
          />
        </div>
        <h1 className="elementHeading text-primary mt-5">Our Blogs</h1>
        <Container className="mt-12">
          <div className="lg:w-10/12">
            {blogs.map((blog, index) => (
              <div
                key={index}
                className="w-full grid lg:grid-cols-blog items-center gap-5 mb-7"
              >
                <Link
                  title={blog.title}
                  href={`/blog/${blog.href}`}
                  className="overflow-hidden rounded-xl"
                >
                  <div
                    style={{ backgroundImage: `url(${blog.image})` }}
                    className="p-10 bg-cover bg-center transition-all hover:scale-105 cursor-pointer h-52"
                  ></div>
                </Link>
                <div>
                  <h4 className="elementHeading2">{blog.title}</h4>
                  <p className="text-gray-600 mt-2">
                    {blog.description.slice(0, 150)}...
                  </p>
                  <p className="text-gray-400 text-sm mt-5">
                    {new Date(blog.created_at).toLocaleDateString("en-US", {
                      dateStyle: "long",
                    })}
                  </p>
                  <button className="text-sm btnPrimarySmall mt-2">
                    <Link
                      title="Click to read blog"
                      href={`/blog/${blog.href}`}
                    >
                      Read Blog
                    </Link>
                  </button>
                </div>
              </div>
            ))}
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
    </>
  );
}

export async function getServerSideProps() {
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

  // Blogs List
  const _blog_title = await fetch(
    `http://${process.env["NEXT_PUBLIC_API"]}/taglist?pattern=blog_title&pass=${process.env["NEXT_PUBLIC_API_TOKEN"]}`
  );
  const blog_title = await _blog_title.json();

  return {
    props: {
      blog: blog_title["list"],
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
