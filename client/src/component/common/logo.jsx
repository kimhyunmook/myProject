import { Link, useNavigate } from "react-router-dom";

export default function Logo({ click }) {
  return (
    <div className="logo">
      <a href="/" onClick={click}>
        MP
      </a>
    </div>
  );
}
