import { MouseEvent, useState } from "react";
import { Box, IconButton, Menu, MenuItem } from "@mui/material";
import { ACTIONS, Nullable } from "@customTypes";
import { categoryActions } from "@constants";
import { useAppDispatch } from "@hooks/reduxHooks";
import { setCategoryDialog } from "@store/reducers/dialog.reducer";

import MoreVertIcon from "@mui/icons-material/MoreVert";

interface CategoryProps {
  id?: number
}

const Category = ({ id }: CategoryProps) => {
  const dispatch = useAppDispatch();
  const [anchorEl, setAnchorEl] = useState<Nullable<HTMLElement>>(null);
  const open = Boolean(anchorEl);

  const handleOpen = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (type: ACTIONS) => {
    dispatch(setCategoryDialog({isOpen: true, id, type}))
    setAnchorEl(null);
  };

  return (
    <Box>
      <IconButton onClick={handleOpen}>
        <MoreVertIcon />
      </IconButton>

      <Menu anchorEl={anchorEl} open={open} onClose={() => setAnchorEl(null)}>
        {categoryActions.map((action) => (
          <MenuItem key={action.type} onClick={() => handleClose(action.type)}>
            {action.label}
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
};

export default Category;
