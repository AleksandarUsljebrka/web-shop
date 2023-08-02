import { React, useEffect, useState} from 'react'
import * as yup from "yup";
import {
    Typography,
    Container,
    TextField,
    Button,
    Box,
   
  } from "@mui/material";
  import useService from "../../services/useService";

const validationSchema = yup.object().shape({
    name: yup.string().required('Name is required'),
    quantity: yup.number().integer().min(1, 'Quantity must be at least 1').required('Quantity is required'),
    price: yup.number().positive('Price must be a positive number').required('Price is required'),
    description: yup.string().required('Description is required'),
  });
  
const NewArticle = () => {
    const { newArticleRequest, clearRequest, isLoading, error, statusCode } =
    useService();

    const [formData, setFormData] = useState({
        name: "",
        description: "",
        quantity: 1,
        price: 1
      });
      const [formErrors, setFormErrors] = useState({});

      const handleSubmit = async (event) => {
        event.preventDefault();
        try {
          await validationSchema(formData, { abortEarly: false });
          console.log(formData)
          newArticleRequest(formData);
    
          console.log("Article added");
        } catch (errors) {
          console.log(formData)
    
          const errorMessages = {};
          errors.inner.forEach((error) => {
            errorMessages[error.path] = error.message;
          });
          setFormErrors(errorMessages);
        }
      };
    
      const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({
          ...formData,
          [name]: value,
        });
        console.log(value);
      };
    return (
        <div> <Container
        sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        }}
    >
        <Box
        component="form"
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit}
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
        <Typography variant="h5" gutterBottom>
            New Article
        </Typography>
        <TextField
            name="name"
            label="Name"
            variant="outlined"
            value={formData.name}
            onChange={handleChange}
            error={!!formErrors.name}
            helperText={formErrors.name}
            sx={{ marginBottom: 2, width: "100%" }}
        />
        <TextField
            name="description"
            label="Description"
            variant="outlined"
            value={formData.description}
            onChange={handleChange}
            error={!!formErrors.description}
            helperText={formErrors.description}
            sx={{ marginBottom: 2, width: "100%" }}
        />
        <TextField
            name="price"
            label="Price"
            variant="outlined"
            type ="number"
            value={formData.price}
            onChange={handleChange}
            error={!!formErrors.price}
            helperText={formErrors.price}
            sx={{ marginBottom: 2, width: "100%" }}
        />
         <TextField
            name="quantity"
            label="Quantity"
            variant="outlined"
            type="number"
            value={formData.quantity}
            onChange={handleChange}
            error={!!formErrors.quantity}
            helperText={formErrors.quantity}
            sx={{ marginBottom: 2, width: "100%" }}
        />
        <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ width: "100%", marginTop: 2 }}
        >
            Add Article
        </Button>
        
        </Box>
    </Container>
    </div>
  )
}

export default NewArticle