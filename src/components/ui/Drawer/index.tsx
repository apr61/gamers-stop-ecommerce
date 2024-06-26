import { CloseOutlined } from "@ant-design/icons";
import { PropsWithChildren, forwardRef } from "react";
import Button from "../Button";
import { cn } from "@/utils/cn";

type DrawerProps = PropsWithChildren & {
  isDrawerOpen: boolean;
  closeDrawer: () => void;
  title?: string;
  className?: string;
};

const Drawer = forwardRef<HTMLDivElement, DrawerProps>(({
  children,
  isDrawerOpen,
  closeDrawer,
  title = "",
  className,
}, ref) => {
  const handleInnerClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };
  return (
    <div
      className={`
        ${
          isDrawerOpen
            ? "fixed top-0 bottom-0 left-0 right-0 opacity-100 bg-pop-over z-50"
            : ""
        }
      `}
      onClick={closeDrawer}
      ref={ref}
    >
      <div
        className={`${cn(
          `opacity-100 fixed top-0 bottom-0 right-0 max-w-[24rem] transition-all border-l border-border w-full overflow-y-auto bg-accent ${
            isDrawerOpen ? "" : "-mr-[100%]"
          }`,
          className,
        )}`}
        onClick={handleInnerClick}
      >
        <div className="flex justify-between items-center bg-accent p-4">
          <h2 className="text-lg">{title}</h2>
          <Button className="text-lg" onClick={closeDrawer} btnType="icon">
            <CloseOutlined />
          </Button>
        </div>
        <hr className="border-b border-border" />
        {children}
      </div>
    </div>
  );
})

export default Drawer;
