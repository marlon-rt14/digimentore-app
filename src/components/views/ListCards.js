import React, { useEffect, useState, useCallback } from "react";
import { Outlet, Link } from "react-router-dom";
import { format } from "timeago.js";

// import { } from 'history';
import {
  Box,
  Container,
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
} from "@mui/material";
import { helpHttp } from "../../helpers/helpHttp";
import AlertDialogSlide from "../partials/messages/AlertDialogSlide";

export default function ListCards({ token }) {
  const urlData = "http://localhost:4000/api/saver-link/links";

  const [data, setData] = useState([]);
  const [validateData, setValidateData] = useState(null);

  const getConfig = useCallback(() => {
    const config = {
      headers: {
        "content-type": "application/json",
        authorization: token,
      },
    };
    return { config };
  }, [token]);

  useEffect(() => {
    const config = getConfig();
    // console.log(config);
    helpHttp()
      .get(urlData, config.config)
      .then((res) => {
        // console.log(res);
        setValidateData(null);
        setData(res.data);
      })
      .catch((err) => {
        setValidateData(err);
        // console.log(err);
      });
  }, [urlData, getConfig]);

  return (
    <Container maxWidth="lg" className="mt-4 ">
      <AllCards data={data} setData={setData} />
      {validateData && (
        <Typography variant="h3" color="error.main">
          Failed to fetch data
        </Typography>
      )}
      <Outlet />
    </Container>
  );
}

function AllCards({ data, setData }) {
  const [alertDialogSlide, setAlertDialogSlide] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const handleClickDelete = (item) => {
    setAlertDialogSlide(true);
    setSelectedId(item.id_link);
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          gap: 4,
          flexWrap: "wrap",
          justifyContent: "space-evenly",
        }}
      >
        {data.map((item) => (
          <Card
            sx={{ maxWidth: 345, minWidth: 300, borderRadius: 3 }}
            raised={true}
            key={item.id_link}
          >
            <CardContent>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Button
                  href={item.url}
                  sx={{ fontSize: "1.3rem" }}
                  className="text-uppercase"
                >
                  {item.title}
                </Button>
              </Box>
              <Typography sx={{ mb: 1.5 }} color="text.disabled">
                {format(item.created_at)}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {item.description}
              </Typography>
            </CardContent>
            <CardActions
              sx={{ display: "flex", justifyContent: "space-between" }}
            >
              <Button
                size="small"
                color="error"
                onClick={() => handleClickDelete(item)}
              >
                Delete
              </Button>

              <Link
                to={`/cards/${item.id_link}`}
                state={item}
                className="router-link"
              >
                <Button size="small">Update</Button>
              </Link>
            </CardActions>
          </Card>
        ))}
      </Box>
      <AlertDialogSlide
        isOpen={alertDialogSlide}
        setAlertDialogSlide={setAlertDialogSlide}
        selectedId={selectedId}
        setData={setData}
        data={data}
      />
    </>
  );
}
