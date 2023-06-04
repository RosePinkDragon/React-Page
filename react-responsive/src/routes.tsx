import { useRoutes } from "react-router-dom";

import Layout from "./layout";
import FormPage from "./pages/FormPage";
import NotFound from "./pages/NotFoundPage";
import TestTable from "./pages/TestTable";
import PinInput from "./PinInput";
import TestPage2 from "./pages/TestTable/TestTable";

export default function Router() {
  return useRoutes([
    {
      path: "/",
      element: <Layout />,
      children: [
        // {
        //   path: "/",
        //   element: <TestTable />,
        //   index: true,
        // },
        {
          path: "/",
          element: <TestPage2 />,
          index: true,
        },
        {
          path: "/123",
          element: <FormPage />,
          // index: true,
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
