import axios from "axios";

class ImageService {
  constructor() {
    this.cloudinary_baseURL = "https://api.cloudinary.com/v1_1/djzpo9g8p";
    this.cloudinary_instance = axios.create({
      baseURL: this.cloudinary_baseURL,
    });
  }

  upload = async (imgFile) => {
    const formData = new FormData();

    formData.append("file", imgFile);

    const res = await this.cloudinary_instance.post("/image/upload", formData, {
      params: {
        upload_preset: "yu703dzk",
      },
    });

    return await res.data;
  };

  delete = async (imgID) => {
    const res = await axios.delete("/api/image", {
      params: {
        id: imgID,
      },
    });
  };
}

export default ImageService;
