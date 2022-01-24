import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { helpHttp } from "../../../helpers/helpHttp";

import { useNavigate } from "react-router-dom";
import { ToastMessage } from "./CollapseMessage";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialogSlide({
  isOpen,
  setAlertDialogSlide,
  selectedId,
  setData,
  data,
}) {
  const [toastMsg, setToastMsg] = React.useState(false);

  let url = "http://localhost:4000/api/saver-link/links/";
  const navigate = useNavigate();

  const handleClose = () => {
    setAlertDialogSlide(false);
  };

  const handleClickDelete = () => {
    // console.log(selectedId);
    helpHttp()
      .del(url + selectedId)
      .then((res) => {
        console.log(res);
        handleClose();
        setToastMsg(false);
        setData(data.filter((item) => item.id_link !== res.id_link));
        navigate("/cards");
      })
      .catch((err) => {
        console.log(err);
        handleClose();
        setToastMsg(true);
      });
  };

  return (
    <div>
      {toastMsg && (
        <ToastMessage
          open={toastMsg}
          setCollapseMsg={setToastMsg}
          message="An error occurred while deleting the data.  :("
        />
      )}

      <Dialog
        open={isOpen}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Are you sure to delete this Card?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Deleting this card data cannot be recovered.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="error">
            Disagree
          </Button>
          <Button onClick={handleClickDelete}>Agree</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
