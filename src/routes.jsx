import { DefaultLayout } from "./layouts";
import { ComicItem } from "./components";
import {
  Login,
  Comment,
  Comic,
  User,
  Chapter,
  Unauthorized,
  DashBoard,
} from "./pages";
const publicRoutes = [
  { path: "/login", component: Login, layout: null },
  {
    path: "/",
    component: Login,
    layout: null,
  },
  {
    path: "/unauthorized",
    component: Unauthorized,
    layout: null,
  },
];

const privateRoutes = [
  {
    path: "/dashboard",
    component: DashBoard,
  },
  {
    path: "/comment",
    component: Comment,
  },
  {
    path: "/comic",
    component: Comic,
  },
  {
    path: "/chapter/:comicId",
    component: Chapter,
  },
  {
    path: "/user",
    component: User,
  },
];

export { publicRoutes, privateRoutes };
