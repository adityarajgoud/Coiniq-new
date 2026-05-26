import { toast } from "react-toastify";

export const handleAxiosError = (error, context = "Something went wrong") => {
  if (error.response) {
    if (error.response.status === 429) {
      toast.error(`${context}: API Rate Limit Exceeded (429) 🚫`);
    } else if (error.response.status >= 500) {
      toast.error(`${context}: Server Error (${error.response.status}) 💥`);
    } else {
      toast.error(
        `${context}: ${error.response.status} ${error.response.statusText}`,
      );
    }
  } else if (error.request) {
    toast.error(`${context}: No response from server ❌`);
  } else {
    toast.error(`${context}: ${error.message}`);
  }

  console.error("Axios Error:", error);
};
