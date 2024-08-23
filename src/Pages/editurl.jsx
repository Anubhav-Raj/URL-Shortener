import { useState } from "react";
import axios from "axios";

const EditUrlForm = () => {
  const urlId = "w3er";
  const [updatedUrl, setUpdatedUrl] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(
        `http://191.96.57.27:5000/api/url/${urlId}`,
        {
          updatedUrl,
        }
      );

      console.log(response.data);
      // Handle success message or any further actions
    } catch (error) {
      console.error("Error updating URL:", error);
      // Handle error
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="url"
        value={updatedUrl}
        onChange={(e) => setUpdatedUrl(e.target.value)}
        required
      />
      <button type="submit">Update URL</button>
    </form>
  );
};

export default EditUrlForm;
