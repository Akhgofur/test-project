import {Link} from "react-router-dom";
import { memo } from "react";


const Header = ({ setOpen}) => {


  
    return (
      <header className="w-full bg-primary ">
        <div className="w-full px-5 py-2 flex items-center gap-4">
            <button className="lg:hidden w-[30px] h-[30px] flex flex-col items-center justify-center gap-[6px]" onClick={() => {setOpen(true)}} >
                <span className="block w-full bg-white h-[2px]"></span>
                <span className="block w-full bg-white h-[2px]"></span>
                <span className="block w-full bg-white h-[2px]"></span>
            </button>
          <Link
            href={
             "/"
            }
            className="block w-fit text-xl text-white uppercase"
          >
           Test project
          </Link>
        </div>
      </header>
    );
  }

export default memo(Header);
