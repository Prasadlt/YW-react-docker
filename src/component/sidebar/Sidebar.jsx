import { Link } from "react-router-dom";
import logo from "../../images/logoWithWhiteFont.png"; // relative path to image
import menuData from "../data/menuData";
import "./Sidebar.css";

function Sidebar() {
  const role = sessionStorage.getItem("role");

  return (
    <>
      <div>
        <img src={logo} className="img-home" alt={"logo"} />
      </div>
      <div>
        {menuData &&
          menuData.map((menu) => {
            const IconTemplate = menu?.menuIconTitle;
            const linkUrl = "/layout/" + menu?.menuTitle?.toLowerCase();
            return (
              menu?.menuRoles.includes(role?.toLowerCase()) && (
                <div className="menu-outer">
                  <Link className="link" to={linkUrl}>
                    <div className="outer-link">
                      <div className="icon-outer">
                        <IconTemplate size={"22px"} />
                      </div>
                      {menu.menuTitle}
                    </div>
                  </Link>
                </div>
              )
            );
          })}
      </div>
    </>
  );
}

export default Sidebar;
