import { cn } from "@/utils/cn";

type ItemsGridLayoutProps = {
  children: React.ReactNode;
  className?: string;
};

const ItemsGridLayout = ({ children, className }: ItemsGridLayoutProps) => {
  return (
    <div
      className={cn(
        "grid gap-4 w-full grid-cols-1 sm:grid-cols-2 md:grid-cols-3 2xl:grid-cols-4",
        className
      )}
    >
      {children}
    </div>
  );
};

export default ItemsGridLayout;
