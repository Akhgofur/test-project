import {  NavLink, useLocation } from "react-router-dom";
import { memo } from "react";
import { navData } from "../../utils/consts";
import { router } from "../../routes";

const Sidebar = ({ open, setOpen }) => {
  const { pathname } = useLocation();

  console.log(router);

  return (
    <div
      className={`absolute h-screen z-[10] w-full top-0 left-0 bg-[#00000075] lg:bg-transparent lg:w-1/5 lg:static ${
        open ? "block" : "hidden"
      } lg:block`}
      onClick={() => {
        setOpen(false);
      }}
    >
      <div
        className={`h-screen pb-[60px]  overflow-x-auto shrink-0 max-w-[250px] lg:max-w-full w-full  bg-primary text-white`}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div className="py-4 flex items-center justify-between px-3 lg:hidden">
          <NavLink href={"/"} className="block w-fit text-xl text-white">
            Test project
          </NavLink>
          <button
            className=" w-[30px] h-[30px] flex flex-col items-center justify-center "
            onClick={() => {
              setOpen(false);
            }}
          >
            <span className="block w-full bg-white h-[2px] -rotate-45"></span>
            <span className="block w-full bg-white h-[2px] mt-[-2px] rotate-45 "></span>
          </button>
        </div>
        <div className="py-4">
          <div className="px-2">
            {router?.map((item) => (
              <div className="group">
                <div
                  className={`block w-full   text-white text-base font-semibold px-3 py-2  `}
                  key={item.path}
                >
                  {item.name}
                </div>
                <div
                  className={`${
                    !item?.children?.find((el) => ( "/" + item?.path + (el.path ? ("/" + el.path) : "")) == pathname)
                      ? "group-hover:max-h-[1000px] max-h-0"
                      : ""
                  } pl-2 overflow-hidden flex flex-col items-start transition-all duration-500 `}
                >
                  {item?.children?.map((el) => (
                    <NavLink
                      className={`block w-full  text-base font-medium px-4 py-2 ${
                        ("/" + item?.path + (el.path ? ("/" + el.path) : "")) == pathname ? "text-mainYellow" : "text-white"
                      } `}
                      key={el.path}
                      to={item.path + (el.path ? ("/" + el.path) : "")}
                    >
                      {el.name}
                    </NavLink>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(Sidebar);
