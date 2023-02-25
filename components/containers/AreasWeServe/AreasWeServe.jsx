import Link from "next/link";
import { Container, FullContainer } from "../../common";
import Breadcrumbs from "../Breadcrumbs";

export default function AreasWeServe({ data, breadcrumbs, service }) {
  return (
    <FullContainer>
      <Container>
        <h2 className="elementHeading mt-12">Areas We Serve</h2>
        <div className="hidden lg:block">
          <Breadcrumbs items={breadcrumbs} />
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-2 mt-5 w-full">
          {data.map((area, index) => (
            <Link
              title={area}
              href={`/${service}/${area.replace(/\s+/g, "-").toLowerCase()}`}
              key={index}
              className="serviceButton"
            >
              {area}
            </Link>
          ))}
        </div>
      </Container>
    </FullContainer>
  );
}
