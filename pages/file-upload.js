import { useState } from "react";
import { uploadFile } from "../utils/firebase";

export default function Test() {
  const [resumeData, setResumeData] = useState(null);

  return (
    <form
      method="post"
      encType="multipart/form-data"
      onSubmit={async (e) => {
        // Prevent reload
        await e.preventDefault();

        // Get file link
        let fileLink = await uploadFile(resumeData);

        console.log(fileLink);

        if (!fileLink) {
          // TODO: proceed using axios to send the whole application data to endpoint
        }
      }}
    >
      <input
        onChange={(e) => {
          setResumeData(e.target.files[0]);
        }}
        type="file"
        required
      ></input>
      <input type="submit" required></input>
    </form>
  );
}
