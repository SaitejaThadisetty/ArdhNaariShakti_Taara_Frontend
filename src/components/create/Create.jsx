import "./create.css";
import { IoIosAddCircleOutline } from "react-icons/io";
import { useState, useContext, useRef } from "react";
import { Context } from "../../context/Context";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import RTE from "./RTE";

export const Create = () => {
  const [file, setFile] = useState(null);
  const { user } = useContext(Context);
  const navigate = useNavigate();
  const fileInputRef = useRef(null); // ✅ reference for hidden input

  const { register, handleSubmit, control } = useForm({
    defaultValues: {
      title: "",
      content: "",
    },
  });

  const onSubmit = async (data) => {
    const newPost = {
      username: user.username,
      title: data.title,
      desc: data.content,
    };

    if (file) {
      const uploadData = new FormData();
      const filename = Date.now() + file.name;
      uploadData.append("name", filename);
      uploadData.append("file", file);
      newPost.photo = filename;

      try {
        await axios.post(
          "https://taara-backend.onrender.com/upload",
          uploadData
        );
      } catch (error) {
        console.error(error);
      }
    }

    try {
      await axios.post("https://taara-backend.onrender.com/posts", newPost);
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section className="newPost">
      <div className="container">
        <div className="content-box">
          {/* Preview */}
          {/* {file && (
            <div className="img">
              <img src={URL.createObjectURL(file)} alt="preview" />
            </div>
          )} */}

          <h2>Create a Blog Post</h2>

          <form onSubmit={handleSubmit(onSubmit)}>
            <input type="text" placeholder="Title" {...register("title")} />

            <RTE name="content" control={control} label="Post Content" />

            {/* Image Preview BELOW content */}
            {file && (
              <div className="preview-box">
                <img src={URL.createObjectURL(file)} alt="preview" />
              </div>
            )}

            <input
              type="file"
              id="inputfile"
              ref={fileInputRef}
              style={{ display: "none" }}
              onChange={(e) => setFile(e.target.files[0])}
            />

            <div className="file-actions">
              <button
                type="button"
                className="add-image-btn"
                onClick={() => fileInputRef.current.click()}
              >
                <IoIosAddCircleOutline size={20} /> Add Image
              </button>
            </div>

            <button className="button">Create Post</button>
          </form>
        </div>
      </div>
    </section>
  );
};
