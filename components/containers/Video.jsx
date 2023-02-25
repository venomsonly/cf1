import { Container, FullContainer } from "../common";
import LazyIframe from "./LazyIframe";

export default function Video({ video }) {
  return (
    <FullContainer>
      <Container className="mt-16">
        <LazyIframe
          className="w-full rounded-3xl h-96 lg:h-[600px] lg:border-b-2 border-black"
          url={video}
        />
      </Container>
    </FullContainer>
  );
}
