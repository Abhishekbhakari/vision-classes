import * as React from "react";
import * as SeparatorPrimitive from "@radix-ui/react-separator";
import { cn } from "../Helper/utils";

const Separator = React.forwardRef((props, ref) => {
  const { 
    className, 
    orientation = "horizontal", 
    decorative = true, 
    ...rest 
  } = props;

  return (
    <SeparatorPrimitive.Root
      ref={ref}
      decorative={decorative}
      orientation={orientation}
      className={cn(
        "shrink-0 bg-gray-200 dark:bg-gray-700",
        orientation === "horizontal" ? "h-[1px] w-full" : "h-full w-[1px]",
        className
      )}
      {...rest}
    />
  );
});

// Important: Set displayName for React DevTools
Separator.displayName = SeparatorPrimitive.Root.displayName;

export { Separator };
