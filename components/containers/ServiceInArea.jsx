import { ContactButton, Container, FullContainer } from "../common";

export default function ServiceInArea({ title, data, phone }) {
  return (
    <FullContainer>
      <Container>
        <h2 className="elementHeading mt-10">{title}</h2>
        {data.map((item, index) => (
          <p key={index} className="mt-3 mb-3">
            {item}
          </p>
        ))}
        <ContactButton className="mt-5" data={phone} />
      </Container>
    </FullContainer>
  );
}
