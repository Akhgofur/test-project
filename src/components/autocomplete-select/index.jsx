import { Autocomplete, TextField } from "@mui/material";
import { memo } from "react";

const AutoCompleteSelect = ({ className, optionLabel = (el) => el.name , optionValue = (el) => el.id, options = [], onChange = () => {}, value = null, label = "" }) => {
  return (
    <div className={`max-w-[300px] w-full ${className}`}>
      <Autocomplete
        disablePortal
        value={value}
        onChange={onChange}
        id="combo-box-demo"
        options={options}
        getOptionKey={optionValue}
        getOptionLabel={optionLabel}
        fullWidth
        renderInput={(params) => <TextField {...params} label={label} />}
      />
    </div>
  );
};


export default memo(AutoCompleteSelect)