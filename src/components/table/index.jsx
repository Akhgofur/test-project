import { memo } from "react";

const Table = ({ head, children }) => {
  return (
    <div className="w-full">
      <table className="w-full border relative">
        {head}
        <tbody>{children}</tbody>
      </table>
    </div>
  );
};

export default memo(Table);
