import React, { useState } from "react";

// import { useParams, useLocation } from "react-router-dom";
import { Link, useNavigate } from "react-router-dom";

import {
  Container,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Button,
  Avatar,
  TextField,
} from "@mui/material";

import logo from "../../logo.svg";
import { helpHttp } from "../../helpers/helpHttp";
// import CollapseMessage from "../../partials/messages/CollapseMessage";
import { ToastMessage } from "../partials/messages/CollapseMessage";

const initalCard = {
  title: "",
  url: "",
  description: "",
};

export default function AddCard({ token }) {
  let url = "http://localhost:4000/api/saver-link/links";

  const [currentCard, setCurrentCard] = useState(initalCard);
  const [collapseMsg, setCollapseMsg] = useState(false);
  // const cardId = useParams();

  const navigate = useNavigate();

  const options = {
    contentType: "application/json",
    data: currentCard,
    headers: {
      authorization: token,
    },
  };

  const handleChange = (e) => {
    setCurrentCard({ ...currentCard, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    helpHttp()
      .post(url, options)
      .then((res) => {
        setCollapseMsg(false);
        console.log(res);
        navigate("/cards");
      })
      .catch((err) => {
        setCollapseMsg(true);
        console.log(err);
      });
  };

  return (
    <Container maxWidth="sm" className="mt-4">
      {collapseMsg && (
        <ToastMessage
          open={collapseMsg}
          setCollapseMsg={setCollapseMsg}
          message="Has ocurred an error to save data.  :("
        />
      )}
      <Card
        sx={{
          maxWidth: 400,
          margin: "auto",
          px: 1.5,
          py: 0.5,
          borderRadius: 4,
        }}
        raised={true}
      >
        <CardHeader
          avatar={<Avatar src={logo} sx={{ height: 56, width: 56 }} />}
          title="Add New Link"
          titleTypographyProps={{ fontSize: "1.5rem", textAlign: "center" }}
          // subheader="Use your Digimentore account"
          // subheaderTypographyProps={{ variant: "subtitle1" }}
          sx={{ flexDirection: "column" }}
        />
        <CardContent>
          <TextField
            label="Title"
            variant="outlined"
            fullWidth
            margin="dense"
            autoFocus
            name="title"
            value={currentCard.title}
            onChange={(e) => handleChange(e)}
          />

          <TextField
            label="URL"
            variant="outlined"
            fullWidth
            margin="dense"
            name="url"
            value={currentCard.url}
            onChange={(e) => handleChange(e)}
          />
          <TextField
            id="outlined-multiline-static"
            label="Enter description"
            variant="outlined"
            fullWidth
            margin="dense"
            multiline
            rows={4}
            name="description"
            value={currentCard.description}
            onChange={(e) => handleChange(e)}
          />
        </CardContent>
        <CardActions sx={{ display: "flex", justifyContent: "space-between" }}>
          <Link to="/cards" className="router-link">
            <Button size="medium" color="error">
              Cancel
            </Button>
          </Link>
          <Button size="large" variant="contained" onClick={() => handleSave()}>
            Save
          </Button>
        </CardActions>
      </Card>
    </Container>
  );
}
