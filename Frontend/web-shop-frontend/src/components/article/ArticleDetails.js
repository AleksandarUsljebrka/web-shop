import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import * as yup from "yup";
import {
  Typography,
  Container,
  TextField,
  Button,
  Box,
  Paper,
} from "@mui/material";
import useService from "../../services/useService";
import AuthContext from "../../context/AuthContext";

const validationSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  quantity: yup
    .number()
    .integer()
    .min(1, "Quantity must be at least 1")
    .required("Quantity is required"),
  price: yup
    .number()
    .positive("Price must be a positive number")
    .required("Price is required"),
  description: yup.string().required("Description is required"),
});

const ArticleDetails = () => {
  const [article, setArticle] = useState(null);
  const [fetchedData, setFetchedData] = useState(true);
  const [updatedData, setUpdatedData] = useState(false);
  const [deletedData, setDeletedData] = useState(false);
  const { name } = useParams();
  const navigate = useNavigate();
  const {
    getArticleDetailsRequest,
    updateArticleRequest,
    deleteArticleRequest,
    clearRequest,
    data,
    isLoading,
    statusCode,
    error,
  } = useService();

  useEffect(() => {
    getArticleDetailsRequest(name);
  }, [getArticleDetailsRequest, name]);

  useEffect(() => {
    if (statusCode === 200 && !error && data && fetchedData) {
      setFetchedData(false);
      setArticle({ ...data, newName: data.name });
      clearRequest();
    } else if (statusCode === 200 && !error && updatedData) {
      setUpdatedData(false);
      setFetchedData(true);
      clearRequest();
      getArticleDetailsRequest(article.newName);
      console.log("Updated");
    } else if (statusCode === 200 && !error && deletedData) {
      setDeletedData(false);
      clearRequest();
      navigate("/articles");
    } else if (statusCode !== 200 && error) {
      console.log(statusCode + "  error: " + error);
      clearRequest();
    }
  }, [
    isLoading,
    statusCode,
    error,
    data,
    clearRequest,
    updatedData,
    fetchedData,
    getArticleDetailsRequest,
    name,
  ]);
  const [formErrors, setFormErrors] = useState({});
  const handleUpdate = async (event) => {
    event.preventDefault();
    try {
      await validationSchema.validate(article, { abortEarly: false });

      setUpdatedData(true);
      updateArticleRequest({
        ...article,
        currentName: article.name,
      });
      navigate("/articles");
    } catch (errors) {
      const errorMessages = {};
      errors.inner.forEach((error) => {
        errorMessages[error.path] = error.message;
      });
      setFormErrors(errorMessages);
    }
  };

  const handleChange = (field, value) => {
    setArticle((old) => {
      return { ...old, [field]: value };
    });
  };

  return (
    <div>
      {" "}
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
        }}
      >
        <Paper>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              p: 4,
              border: "1px solid #ccc",
              borderRadius: "8px",
              maxWidth: "600px",
              width: "100%",
              boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
              backgroundColor: "#fff",
            }}
          >
            <TextField
              name="name"
              placeholder="Name"
              variant="outlined"
              value={article?.newName || ""}
              error={!!formErrors.name}
              helperText={formErrors.name}
              onChange={(e) => {
                setArticle((old) => {
                  return {
                    ...old,
                    newName: e.target.value,
                  };
                });
              }}
              sx={{ marginBottom: 2, width: "100%" }}
            />
            <TextField
              name="description"
              placeholder="Description"
              variant="outlined"
              value={article?.description || ""}
              error={!!formErrors.description}
              helperText={formErrors.description}
              onChange={(e) => {
                setArticle((old) => {
                  return { ...old, description: e.target.value };
                });
              }}
              sx={{ marginBottom: 2, width: "100%" }}
            />
            <TextField
              name="price"
              placeholder="Price"
              variant="outlined"
              type="number"
              value={article?.price || ""}
              error={!!formErrors.price}
              helperText={formErrors.price}
              onChange={(e) => {
                setArticle((old) => {
                  return { ...old, price: e.target.value };
                });
              }}
              sx={{ marginBottom: 2, width: "100%" }}
            />
            <TextField
              name="quantity"
              placeholder="Quantity"
              variant="outlined"
              type="number"
              value={article?.quantity || ""}
              error={!!formErrors.quantity}
              helperText={formErrors.quantity}
              onChange={(e) => {
                setArticle((old) => {
                  return { ...old, quantity: e.target.value };
                });
              }}
              sx={{ marginBottom: 2, width: "100%" }}
            />
            <Box>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                sx={{ width: "100%", marginTop: 2 }}
                onClick={handleUpdate}
              >
                Update
              </Button>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                sx={{ width: "100%", marginTop: 2 }}
                onClick={(event) => {
                  deleteArticleRequest(article.name);
                  setDeletedData(true);
                }}
              >
                Delete
              </Button>
            </Box>
          </Box>
        </Paper>
      </Container>
    </div>
  );
};

export default ArticleDetails;
