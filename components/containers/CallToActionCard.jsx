import { ContactButton, Container, FullContainer } from "../common";

export default function CallToActionCard({ phone, area, service }) {
  return (
    <FullContainer>
      <Container className="bg-contactCard rounded-3xl p-10 lg:p-12 mt-16">
        <h2 className="text-white mb-10 elementHeading   md:w-7/12">
          Call us for immidiate assistance with {service} services in{" "}
          <span className="capitalize">{area}</span>.
        </h2>
        <ContactButton data={phone} />
      </Container>
    </FullContainer>
  );
}
