import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./slider.css";

export default function Slider2(props) {
  const setting = props.setting;

  return <Slider {...setting}>{props.children}</Slider>;
}
