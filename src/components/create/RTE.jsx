import { Controller } from "react-hook-form";
import { Editor } from "@tinymce/tinymce-react";

const RTE = ({ name = "content", control, label }) => {
  return (
    <div>
      {label && <label className="inline-block mb-1 pl-1">{label}</label>}
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Editor
            apiKey="f72tnml1gyr25gh4femwdlbl1xwoer8q1e54j56zzxwwrhpg"
            init={{
              height: 500,
              menubar: true,
              plugins: [
                "image",
                "advlist",
                "lists",
                "link",
                "image",
                "preview",
                "anchor",
                "searchreplace",
                "visualblocks",
                "code",
                "fullscreen",
                "insertdatetime",
                "media",
                "table",
                "code",
                "help",
                "wordcount",
              ],
              toolbar:
                "undo redo | blocks | image | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help",
              content_style:
                "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
            }}
            value={field.value}
            onEditorChange={field.onChange}
          />
        )}
      />
    </div>
  );
};
export default RTE;
