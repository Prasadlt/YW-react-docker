import { CiHome } from "react-icons/ci";
import { TbCertificate } from "react-icons/tb";
import { PiSignOutBold } from "react-icons/pi";
import { CiMemoPad } from "react-icons/ci";

const menuData = [
  {
    menuTitle: "Home",
    menuIconTitle: CiHome,
    menuRoles: ["contractor", "admin", "authorized person"]
  },
  {
    menuTitle: "Certificate",
    menuIconTitle: TbCertificate,
    menuRoles: ["admin", "authorized person"]
  },
  {
    menuTitle: "Contact",
    menuIconTitle: PiSignOutBold,
    menuRoles: ["contractor", "admin", "authorized person"]
  },
  {
    menuTitle: "Memo",
    menuIconTitle: CiMemoPad,
    menuRoles: ["admin", "authorized person"]
  },
  {
    menuTitle: "Handbook",
    menuIconTitle: PiSignOutBold,
    menuRoles: ["contractor", "admin", "authorized person"]
  },
  {
    menuTitle: "Handover",
    menuIconTitle: PiSignOutBold,
    menuRoles: ["contractor", "admin", "authorized person"]
  },
  {
    menuTitle: "SignOut",
    menuIconTitle: PiSignOutBold,
    menuRoles: ["contractor", "admin", "authorized person"]
  },
  {
    menuTitle: "Site",
    menuIconTitle: PiSignOutBold,
    menuRoles: ["contractor", "admin", "authorized person"]
  }
];

export default menuData;
