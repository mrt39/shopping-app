/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { ListItemButton, ListItemIcon, ListItemText } from '@mui/material';


/*ListItemBtn - a reusable navigation component for ListItems.jsx */
export default function ListItemBtn({ icon, text, to, onClick }) {
  const listItemContent = (
    <ListItemButton onClick={onClick}>
      <ListItemIcon>
        {icon}
      </ListItemIcon>
      <ListItemText primary={text} />
    </ListItemButton>
  );

  // If a link is provided, wrap with Link component
  if (to) {
    return (
      <div className='mainListItem'>
        <Link to={to}>
          {listItemContent}
        </Link>
      </div>
    );
  }

  // Otherwise return just the button
  return listItemContent;
}