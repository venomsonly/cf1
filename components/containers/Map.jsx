import { Container, FullContainer } from "../common";
import LazyIframe from "./LazyIframe";

const Map = ({
  title = "united states",
  _map_title = "united states",
  latitude,
  longitude,
}) => {
  let url = "";
  if (typeof _map_title == "string") {
    _map_title = _map_title.replaceAll(" ", "%20");
  }
  url =
    "https://www.google.com/maps/embed?pb=!1m13!1m8!1m3!1d3330470.074538309!2d" +
    longitude +
    "!3d" +
    latitude +
    "!3m2!1i1024!2i768!4f13.1!3m2!1m1!2s" +
    _map_title +
    "!5e0!3m2!1sen!2sus!4v1665662972193!5m2!1sen!2sus";
  return (
    <FullContainer>
      <Container className="mt-12">
        <LazyIframe
          title={title}
          className="w-full h-80 rounded-3xl"
          // url={url}
          url="https://maps.google.com/maps?width=520&amp;height=400&amp;hl=en&amp;q=%20+(United%20States)&amp;t=&amp;z=4&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
        />
      </Container>
    </FullContainer>
  );
};

export default Map;
