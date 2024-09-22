import { Drawer } from "antd";
import { useNavigate } from "react-router-dom";
import { menuItems } from "~/config/main-menu";

const MobileMenu = ({ open, handleClose }) => {
  const navigate = useNavigate();
  return (
    <Drawer
      placement={"left"}
      closable={false}
      onClose={handleClose}
      open={open}
      key={"left"}
    >
      <div>
        {menuItems.map((item, index) => (
          <div
            key={index}
            onClick={() => {
              navigate(item.href);
              handleClose();
            }}
            className="border-b-[1px] border-[#ccc] p-2 mb-2"
          >
            {item?.title}
          </div>
        ))}
      </div>
    </Drawer>
  );
};

export default MobileMenu;
