import Header from "./Header";
import SideBar from "./SideBar";

const DefaultLayout = ({ children }) => {
  return (
    <div className="flex flex-row bg-neutral-100 h-screen w-screen overflow-hidden">
      <SideBar />
      <div className="flex flex-col w-full">
        <Header />
        <div className="flex-grow overflow-y-auto">{children}</div>
      </div>
    </div>
  );
};

export default DefaultLayout;
