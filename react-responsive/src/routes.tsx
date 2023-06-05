import { useRoutes } from "react-router-dom";

import Layout from "./layout";
import FormPage from "./pages/FormPage";
import NotFound from "./pages/NotFoundPage";
import Paginated from "./pages/TestTable/Paginated";
import PinInput from "./PinInput";

export default function Router() {
  return useRoutes([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Paginated />,
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
