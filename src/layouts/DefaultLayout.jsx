import Footer from "./Footer";
import Header from "./Header";
import SideBar from "./SideBar";
const DefaultLayout = ({ children }) => {
  return (
    <div className="flex flex-row bg-neutral-100 h-screen w-screen overflow-hidden">
      <SideBar />
      <div className="w-full h-auto">
        <Header />
        <div>{children}</div>
      </div>
    </div>
  );
};

export default DefaultLayout;
