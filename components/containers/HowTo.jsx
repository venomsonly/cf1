import { Container, FullContainer } from "../common";

export default function HowTo({ data, service, componentTitle, des }) {
  return (
    <FullContainer className="bg-gray-100 lg:bg-transparent mt-12">
      <Container className="bg-gray-100 text-gray-900 px-0 py-12 lg:px-10 rounded-3xl">
        <h2 className="elementHeading">{componentTitle}</h2>
        <p className="text-lg mt-2 font-semibold">{des}</p>
        <div className="mt-5">
          {data.map((item, index) => (
            <div
              key={index}
              className="mb-7 lg:mb-3 grid gap-1 lg:gap-2 grid-cols-howTo text-left"
            >
              <div className="p-2 flex items-center justify-center text-xl bg-white rounded-full text-gray-900 font-bold shadow-md shadow-black/25 w-10 lg:w-11 h-10 lg:h-11">
                {index + 1}
              </div>
              <p className="mt-1">{item.replaceAll("##service##", service)}</p>
            </div>
          ))}
        </div>
      </Container>
    </FullContainer>
  );
}
