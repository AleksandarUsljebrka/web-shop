import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const ImageUploader = ({
  label,
  onImageChange,
  image,
  setImage,
  hasSet,
}) => {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    console.log("B4 Exists");

    if (!file) return;
    console.log("Exists");
    const reader = new FileReader();
    reader.onload = () => {
      setSelectedImage(reader.result);
      onImageChange(file);
      if (hasSet) {
        setImage(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  useEffect(() => {
    if (image) {
      setSelectedImage(image);
    }
  }, [image]);

  return (
    <Box>
      {selectedImage && (
        <Box>
          <img
            src={selectedImage}
            alt="Selected"
            style={{
              maxWidth: "100%",
              maxHeight: "300px",
              marginBottom: "10px",
            }}
            key={selectedImage}
          />
        </Box>
      )}
      {!selectedImage && (
        <Typography variant="body2" color="textSecondary">
          No image selected
        </Typography>
      )}
      <input
        accept="image/*"
        type="file"
        id="image-upload"
        style={{ display: "none" }}
        onChange={handleImageUpload}
      />
      <label htmlFor="image-upload">
        <Button variant="contained" component="span">
          {label}
        </Button>
      </label>
    </Box>
  );
};

export default ImageUploader;
