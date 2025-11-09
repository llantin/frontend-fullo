import { userDropdownItems } from '@/layouts/components/data';
import { useLogout } from "@/features/auth/hooks/useAuth";
import { Link } from "react-router";
import { Fragment } from 'react';
import { Dropdown, DropdownDivider, DropdownItem, DropdownMenu, DropdownToggle } from 'react-bootstrap';
import { TbChevronDown } from 'react-icons/tb';
import user3 from '@/assets/images/users/user-9.jpg';
const UserProfile = () => {
  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;
  const logout = useLogout();

  return (
    <div className="topbar-item nav-user">
      <Dropdown align="end">
        <DropdownToggle
          as={"a"}
          className="topbar-link dropdown-toggle drop-arrow-none px-2"
        >
          <img
            src={user3}
            width="32"
            height="32"
            className="rounded-circle me-lg-2 d-flex"
            alt="user-image"
          />
          <div className="d-lg-flex align-items-center gap-1 d-none">
            <h5 className="my-0">{user.person.name}</h5>
            <TbChevronDown className="align-middle" />
          </div>
        </DropdownToggle>

        <DropdownMenu className="dropdown-menu-end">
          {userDropdownItems.map((item, idx) => (
            <Fragment key={idx}>
              {item.isHeader ? (
                <div className="dropdown-header noti-title">
                  <h6 className="text-overflow m-0">{item.label}</h6>
                </div>
              ) : item.isDivider ? (
                <DropdownDivider />
              ) : (
                <DropdownItem
                  as={item.url ? Link : "button"}
                  to={item.url ?? ""}
                  className={item.class}
                  onClick={
                    item.label === "Cerrar sesión" ? logout : undefined
                  }
                >
                  {item.icon && (
                    <item.icon className="me-2 fs-17 align-middle" />
                  )}
                  <span className="align-middle">{item.label}</span>
                </DropdownItem>
              )}
            </Fragment>
          ))}
        </DropdownMenu>
      </Dropdown>
    </div>
  );
};
export default UserProfile;