import { CircularProgress } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import type { AxiosError } from "axios";

import FormGenerator from "../../FormikForm";
import type { FormSchema } from "../../FormikForm/formelements";

const fetchCountries = (): Promise<FormSchema> =>
  axios.get("http://localhost:3000/formData").then((res) => res.data);

const FormPage = () => {
  const {
    data: formData,
    isLoading,
    error,
  } = useQuery<FormSchema, AxiosError>({
    queryKey: ["formSchema"],
    queryFn: fetchCountries,
  });

  if (isLoading) return <CircularProgress />;
  if (error) return <div>{error.message}</div>;
  return <FormGenerator formData={formData} />;
};

export default FormPage;
