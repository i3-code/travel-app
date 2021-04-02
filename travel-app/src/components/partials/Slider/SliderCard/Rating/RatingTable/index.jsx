import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import { useTranslation } from 'react-i18next';
import Rating from '@material-ui/lab/Rating';

const useStyles = makeStyles({
  table: {
    minWidth: 300,
  },
});

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

export default function RatingTable({ open, handleClose, getScores }) {
  const classes = useStyles();
  const { t } = useTranslation();
  return (
    <Dialog onClose={handleClose} open={open} fullWidth>
      <DialogTitle onClose={handleClose}>
        {t('PAGE_RATING.MARKS')}
      </DialogTitle>
      <DialogContent dividers>
        <TableContainer component={Paper}>
          <Table className={classes.table} size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <StyledTableCell>{t('SIGNUP.USERNAME')}</StyledTableCell>
                <StyledTableCell>{t('PAGE_RATING.MARKS')}</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {getScores.map((scoreRecord) => {
                return (
                  <TableRow key={scoreRecord.username}>
                  <TableCell >{scoreRecord.username}</TableCell>
                  <TableCell>
                    <Rating value={scoreRecord.value} readOnly />
                  </TableCell>
                </TableRow>
                );
              })}
              {(!getScores.length) &&
                <TableRow>
                  <TableCell>-------</TableCell>
                  <TableCell>-------</TableCell>
                </TableRow>
              }
            </TableBody>
          </Table>
        </TableContainer>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}
