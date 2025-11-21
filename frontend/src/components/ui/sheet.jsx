


import * as React from "react";
import * as SheetPrimitive from "@radix-ui/react-dialog";
import { XIcon } from "lucide-react";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

import { cn } from "@/lib/utils";

// Root
export function Sheet(props) {
  return <SheetPrimitive.Root {...props} data-slot="sheet" />;
}

// Trigger
export function SheetTrigger(props) {
  return <SheetPrimitive.Trigger {...props} data-slot="sheet-trigger" />;
}

// Close button
export function SheetClose(props) {
  return <SheetPrimitive.Close {...props} data-slot="sheet-close" />;
}

// Portal
export function SheetPortal(props) {
  return <SheetPrimitive.Portal {...props} data-slot="sheet-portal" />;
}

// Overlay
export function SheetOverlay({ className, ...props }) {
  return (
    <SheetPrimitive.Overlay
      {...props}
      data-slot="sheet-overlay"
      className={cn(
        "fixed inset-0 z-50 bg-black/50",
        "data-[state=open]:animate-in data-[state=closed]:animate-out",
        "data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0",
        className
      )}
    />
  );
}

// Content
export function SheetContent({ className, children, side = "right", ...props }) {
  return (
    <SheetPortal>
      <SheetOverlay />

      <SheetPrimitive.Content
        {...props}
        aria-describedby={undefined}
        data-slot="sheet-content"
        className={cn(
          "fixed z-50 flex flex-col gap-4 bg-background shadow-lg transition ease-in-out",
          "data-[state=open]:animate-in data-[state=closed]:animate-out",
          "data-[state=open]:duration-500 data-[state=closed]:duration-300",

          // Sides
          side === "right" &&
            "inset-y-0 right-0 h-full w-3/4 border-l data-[state=open]:slide-in-from-right data-[state=closed]:slide-out-to-right sm:max-w-sm",

          side === "left" &&
            "inset-y-0 left-0 h-full w-3/4 border-r data-[state=open]:slide-in-from-left data-[state=closed]:slide-out-to-left sm:max-w-sm",

          side === "top" &&
            "inset-x-0 top-0 h-auto border-b data-[state=open]:slide-in-from-top data-[state=closed]:slide-out-to-top",

          side === "bottom" &&
            "inset-x-0 bottom-0 h-auto border-t data-[state=open]:slide-in-from-bottom data-[state=closed]:slide-out-to-bottom",

          className
        )}
      >
        {/* Built-in invisible title to avoid Radix warnings */}
        <VisuallyHidden>
          <SheetPrimitive.Title>Sheet</SheetPrimitive.Title>
        </VisuallyHidden>

        {children}

        {/* Close button */}
        <SheetPrimitive.Close
          className="absolute right-4 top-4 rounded-xs opacity-70 transition-opacity hover:opacity-100
                     focus:outline-hidden focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background"
        >
          <XIcon className="size-4" />
          <span className="sr-only">Close</span>
        </SheetPrimitive.Close>
      </SheetPrimitive.Content>
    </SheetPortal>
  );
}

// Header
export function SheetHeader({ className, ...props }) {
  return (
    <div
      {...props}
      data-slot="sheet-header"
      className={cn("flex flex-col gap-1.5 p-4", className)}
    />
  );
}

// Footer
export function SheetFooter({ className, ...props }) {
  return (
    <div
      {...props}
      data-slot="sheet-footer"
      className={cn("mt-auto flex flex-col gap-2 p-4", className)}
    />
  );
}

// Title
export function SheetTitle({ className, ...props }) {
  return (
    <SheetPrimitive.Title
      {...props}
      data-slot="sheet-title"
      className={cn("font-semibold text-foreground", className)}
    />
  );
}

// Description
export function SheetDescription({ className, ...props }) {
  return (
    <SheetPrimitive.Description
      {...props}
      data-slot="sheet-description"
      className={cn("text-sm text-muted-foreground", className)}
    />
  );
}
















// import * as React from "react";
// import * as SheetPrimitive from "@radix-ui/react-dialog";
// import { XIcon } from "lucide-react";

// import { cn } from "@/lib/utils";

// // Root
// export function Sheet(props) {
//   return <SheetPrimitive.Root {...props} data-slot="sheet" />;
// }

// // Trigger
// export function SheetTrigger(props) {
//   return <SheetPrimitive.Trigger {...props} data-slot="sheet-trigger" />;
// }

// // Close button
// export function SheetClose(props) {
//   return <SheetPrimitive.Close {...props} data-slot="sheet-close" />;
// }

// // Portal
// export function SheetPortal(props) {
//   return <SheetPrimitive.Portal {...props} data-slot="sheet-portal" />;
// }

// // Overlay
// export function SheetOverlay({ className, ...props }) {
//   return (
//     <SheetPrimitive.Overlay
//       {...props}
//       data-slot="sheet-overlay"
//       className={cn(
//         "fixed inset-0 z-50 bg-black/50 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0",
//         className
//       )}
//     />
//   );
// }

// // Content
// export function SheetContent({ className, children, side = "right", ...props }) {
//   return (
//     <SheetPortal>
//       <SheetOverlay />
//       <SheetPrimitive.Content
//         {...props}
//         aria-describedby={undefined} // Prevent Radix warning
//         data-slot="sheet-content"
//         className={cn(
//           "fixed z-50 flex flex-col gap-4 bg-background shadow-lg transition ease-in-out data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=open]:duration-500 data-[state=closed]:duration-300",
//           side === "right" &&
//             "inset-y-0 right-0 h-full w-3/4 border-l data-[state=open]:slide-in-from-right data-[state=closed]:slide-out-to-right sm:max-w-sm",
//           side === "left" &&
//             "inset-y-0 left-0 h-full w-3/4 border-r data-[state=open]:slide-in-from-left data-[state=closed]:slide-out-to-left sm:max-w-sm",
//           side === "top" &&
//             "inset-x-0 top-0 h-auto border-b data-[state=open]:slide-in-from-top data-[state=closed]:slide-out-to-top",
//           side === "bottom" &&
//             "inset-x-0 bottom-0 h-auto border-t data-[state=open]:slide-in-from-bottom data-[state=closed]:slide-out-to-bottom",
//           className
//         )}
//       >
//         {children}

//         {/* Close button */}
//         <SheetPrimitive.Close
//           className="absolute right-4 top-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:outline-hidden focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background data-[state=open]:bg-secondary disabled:pointer-events-none"
//         >
//           <XIcon className="size-4" />
//           <span className="sr-only">Close</span>
//         </SheetPrimitive.Close>
//       </SheetPrimitive.Content>
//     </SheetPortal>
//   );
// }

// // Header
// export function SheetHeader({ className, ...props }) {
//   return (
//     <div
//       {...props}
//       data-slot="sheet-header"
//       className={cn("flex flex-col gap-1.5 p-4", className)}
//     />
//   );
// }

// // Footer
// export function SheetFooter({ className, ...props }) {
//   return (
//     <div
//       {...props}
//       data-slot="sheet-footer"
//       className={cn("mt-auto flex flex-col gap-2 p-4", className)}
//     />
//   );
// }

// // Title
// export function SheetTitle({ className, ...props }) {
//   return (
//     <SheetPrimitive.Title
//       {...props}
//       data-slot="sheet-title"
//       className={cn("font-semibold text-foreground", className)}
//     />
//   );
// }

// // Description
// export function SheetDescription({ className, ...props }) {
//   return (
//     <SheetPrimitive.Description
//       {...props}
//       data-slot="sheet-description"
//       className={cn("text-sm text-muted-foreground", className)}
//     />
//   );
// }





// import * as React from "react"
// import * as SheetPrimitive from "@radix-ui/react-dialog"
// import { XIcon } from "lucide-react"

// import { cn } from "@/lib/utils"

// function Sheet({
//   ...props
// }) {
//   return <SheetPrimitive.Root data-slot="sheet" {...props} />;
// }

// function SheetTrigger({
//   ...props
// }) {
//   return <SheetPrimitive.Trigger data-slot="sheet-trigger" {...props} />;
// }

// function SheetClose({
//   ...props
// }) {
//   return <SheetPrimitive.Close data-slot="sheet-close" {...props} />;
// }

// function SheetPortal({
//   ...props
// }) {
//   return <SheetPrimitive.Portal data-slot="sheet-portal" {...props} />;
// }

// function SheetOverlay({
//   className,
//   ...props
// }) {
//   return (
//     <SheetPrimitive.Overlay
//       data-slot="sheet-overlay"
//       className={cn(
//         "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50",
//         className
//       )}
//       {...props} />
//   );
// }

// function SheetContent({
//   className,
//   children,
//   side = "right",
//   ...props
// }) {
//   return (
//     <SheetPortal>
//       <SheetOverlay />
//       <SheetPrimitive.Content
//         data-slot="sheet-content"
//         className={cn(
//           "bg-background data-[state=open]:animate-in data-[state=closed]:animate-out fixed z-50 flex flex-col gap-4 shadow-lg transition ease-in-out data-[state=closed]:duration-300 data-[state=open]:duration-500",
//           side === "right" &&
//             "data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right inset-y-0 right-0 h-full w-3/4 border-l sm:max-w-sm",
//           side === "left" &&
//             "data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left inset-y-0 left-0 h-full w-3/4 border-r sm:max-w-sm",
//           side === "top" &&
//             "data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top inset-x-0 top-0 h-auto border-b",
//           side === "bottom" &&
//             "data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom inset-x-0 bottom-0 h-auto border-t",
//           className
//         )}
//         {...props}>
//         {children}
//         <SheetPrimitive.Close
//           className="ring-offset-background focus:ring-ring data-[state=open]:bg-secondary absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none">
//           <XIcon className="size-4" />
//           <span className="sr-only">Close</span>
//         </SheetPrimitive.Close>
//       </SheetPrimitive.Content>
//     </SheetPortal>
//   );
// }

// function SheetHeader({
//   className,
//   ...props
// }) {
//   return (
//     <div
//       data-slot="sheet-header"
//       className={cn("flex flex-col gap-1.5 p-4", className)}
//       {...props} />
//   );
// }

// function SheetFooter({
//   className,
//   ...props
// }) {
//   return (
//     <div
//       data-slot="sheet-footer"
//       className={cn("mt-auto flex flex-col gap-2 p-4", className)}
//       {...props} />
//   );
// }

// function SheetTitle({
//   className,
//   ...props
// }) {
//   return (
//     <SheetPrimitive.Title
//       data-slot="sheet-title"
//       className={cn("text-foreground font-semibold", className)}
//       {...props} />
//   );
// }

// function SheetDescription({
//   className,
//   ...props
// }) {
//   return (
//     <SheetPrimitive.Description
//       data-slot="sheet-description"
//       className={cn("text-muted-foreground text-sm", className)}
//       {...props} />
//   );
// }

// export {
//   Sheet,
//   SheetTrigger,
//   SheetClose,
//   SheetContent,
//   SheetHeader,
//   SheetFooter,
//   SheetTitle,
//   SheetDescription,
// }
