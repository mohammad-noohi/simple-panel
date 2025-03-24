/* Pages Components */
import AdminPanelLayout from "./layout/AdminPanelLayout/AdminPanelLayout";
import AppLayout from "./layout/AppLayout";
import Home from "./pages/Home";
import Register from "./pages/Register";
import ProtectRoute from "./components/ProtectRoute";
import Dashboard from "./pages/admin/Dashboard";
import Users from "./pages/admin/Users";

const routes = [
  {
    path: "/",
    element: <AppLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "/register", element: <Register /> },
    ],
  },
  {
    path: "/panel",
    element: <ProtectRoute />,
    children: [
      {
        element: <AdminPanelLayout />,
        children: [
          { path: "dashboard", element: <Dashboard /> },
          { path: "users", element: <Users /> },
        ],
      },
    ],
  },
];

export default routes;

/* 

بعد از اینکه این فصل رو تموم کردم نیازه که یه مرور روی کل مباحث داشته باشم

باید با چت جی پی تی کل مبحث فرم ها و کار با همه ی تگ های توی فرم تمرین کنم تا کامل یادبگیرم و سوالات مختلفی بپرسم

بیا این پروژه رو با همون روشی که چت جی تی گفته بزن و یه دیزاین خفن و ساختار بندی اصولی و خفن داشته باش دقیقا مثل همونی که بود که ملکه ی ذهنت بشه

*/
