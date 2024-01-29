import AdminSide from "./adminSide";
import Logo from "./logo";

export default function Footer(props) {
  return (
    <footer>
      <AdminSide></AdminSide>
      <div className="max_container">
        <Logo></Logo>
      </div>
    </footer>
  );
}
