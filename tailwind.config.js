/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: process.env.NEXT_PUBLIC_COLOR_PRIMARY,
        secondary: process.env.NEXT_PUBLIC_COLOR_SECONDARY,
      },
      gridTemplateColumns: {
        navbar: "0.4fr 1fr",
        process: "50px 1fr",
        blog: "230px 1fr",
        blogList: "150px 1fr",
        blogDetailPage: "1fr 0.5fr",
        howTo: "45px 1fr",
        mapBox: "1fr 0.5fr",
        accordian: "1fr 30px",
        zipCity: "1fr 0.1fr",
        areaTiming: "1fr 0.8fr",
        or: "1fr 25px 1fr",
        searchResult: "1fr 0.5fr",
      },
      backgroundImage: {
        banner: `url(https://api15.ecommcube.com/${process.env.NEXT_PUBLIC_HOSTNAME}/img/banner.webp)`,
        contactCard: `linear-gradient(#0001, #0001), url(https://api15.ecommcube.com/${process.env.NEXT_PUBLIC_HOSTNAME}/img/contact-background.webp)`,
        login: `url(https://api15.ecommcube.com/${process.env.NEXT_PUBLIC_HOSTNAME}/img/loginBg.jpg)`,
      },
    },
  },
};
