import { Link, useNavigate } from "react-router-dom";

export default function Logo({ click }) {
  return (
    <div className="logo">
      <Link to="/" onClick={click}>
        MP
      </Link>
    </div>
  );
}
