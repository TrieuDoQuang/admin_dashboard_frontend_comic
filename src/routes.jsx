import {
  Login,
  Comment,
  Comic,
  User,
  ComicDetail,
  Unauthorized,
} from "./pages";
const publicRoutes = [
  { path: "/login", component: Login, layout: null },
  { path: "/", component: Login, layout: null },
  {
    path: "/unauthorized",
    component: Unauthorized,
  },
];

const privateRoutes = [
  {
    path: "/comment",
    component: Comment,
  },
  {
    path: "/comic",
    component: Comic,
  },
  {
    path: "/comic-detail/:comicId",
    component: ComicDetail,
  },
  {
    path: "/user",
    component: User,
  },
];

export { publicRoutes, privateRoutes };
