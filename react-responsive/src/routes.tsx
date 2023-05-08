import { useRoutes } from "react-router-dom";

import FormGenerator from "./FormikForm";
import testData from "./FormikForm/async-fields.json";
import Layout from "./layout";
import NotFound from "./pages/NotFoundPage";
import PinInput from "./PinInput";

export default function Router() {
  return useRoutes([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <FormGenerator formData={testData} />,
          index: true,
        },
        {
          path: "app",
          element: (
            <PinInput
              length={6}
              // eslint-disable-next-line no-console
              handlePinChange={(pin: string) => console.log(pin)}
            />
          ),
        },
      ],
    },
    {
      path: "*",
      element: <NotFound />,
    },
  ]);
}
