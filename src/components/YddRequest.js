import React, { useState } from 'react'
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import ClearIcon from '@material-ui/icons/Clear';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import HourglassEmptyIcon from '@material-ui/icons/HourglassEmpty';
import AutorenewIcon from '@material-ui/icons/Autorenew';
import DoneIcon from '@material-ui/icons/Done';
import ErrorIcon from '@material-ui/icons/Error';
import YddItemList from './YddItemList'
import { makeStyles } from '@material-ui/core/styles';
import YouTubeIcon from '@material-ui/icons/YouTube';
import SubscriptionsIcon from '@material-ui/icons/Subscriptions';
import DeleteRequestModal from './DeleteRequestModal';

const useRowStyles = makeStyles({
  root: {
    '& > *': {
      // borderBottom: 'unset',
      padding: '5px'
    },
  },
});


export default function YddRequest(props) {
  const {url, status, progress, items, title, type, uploader } = props.request;
  const [isDeleteRequestModalOpen, setDeleteRequestModalOpen] = useState(false);
  const [isRowOpen, setRowOpen] = useState(false);
  const classes = useRowStyles();

  const ProgressText = () => {
    return status > 0 && status < 3 ? (` [${progress.toFixed(2)}%]`) : '';
  }

  const TitleText = () => {
    return title == null ? url : `${title} [${uploader}]`;
  }

  const ItemsRow = () => {
    return type === 'video' ? (<TableRow />) : (
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={isRowOpen} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <YddItemList items={items} onDelete={props.onDelete} onItemDelete={props.onItemDelete}/>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    )
  }

  function RequestIcon() {
    return type === 'video' ? <YouTubeIcon /> : <SubscriptionsIcon />;
  }

  function StatusIcon() {
    if (status > 0 && status < 3)
      return <AutorenewIcon />;
    else if (status === 0)
      return <HourglassEmptyIcon />;
    else if (status === 3)
      return <DoneIcon />;
    else
      return <ErrorIcon />;
  }

  function ExpandableButtonCell() {
    return type === 'video' ? (<TableCell />) : (
      <TableCell style={{ width: '30px' }}>
        <IconButton aria-label="expand row" size="small" onClick={() => setRowOpen(!isRowOpen)}>
          {isRowOpen ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
        </IconButton>
      </TableCell>
    );
  }

  return (
    <>
      <TableRow className={classes.root}>
        <ExpandableButtonCell />
        <TableCell style={{ width: '30px' }}><StatusIcon /></TableCell>
        <TableCell style={{ width: '30px' }}><RequestIcon /></TableCell>
        <TableCell component="th" scope="row"><ProgressText /> <TitleText /></TableCell>
        <TableCell align="right">
          <IconButton onClick={(event) => setDeleteRequestModalOpen(true)} color="secondary"><ClearIcon /></IconButton>
        </TableCell>
      </TableRow>
      <ItemsRow />
      <DeleteRequestModal open={isDeleteRequestModalOpen} request={props.request} onDelete={props.onDelete} onCancel={()=>setDeleteRequestModalOpen(false)}/>
    </>
  )
}
