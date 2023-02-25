import Link from "next/link";
import { Container, FullContainer } from "../../common";

export default function Grid({ data, title }) {
  return (
    <FullContainer>
      <Container>
        <h2 className="elementHeading mt-12">{title}</h2>
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-2 mt-5 w-full">
          {data.map((item, index) => (
            <Link
              key={index}
              prefetch={false}
              title={item.name}
              href={item.route}
              className="serviceButton"
            >
              {item.name}
            </Link>
          ))}
        </div>
      </Container>
    </FullContainer>
  );
}
