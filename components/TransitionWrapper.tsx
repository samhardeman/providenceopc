// components/TransitionWrapper.tsx
"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function TransitionWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [prevPath, setPrevPath] = useState(pathname);

  // Update our "previous path" memory after the render happens
  useEffect(() => {
    setPrevPath(pathname);
  }, [pathname]);

  // Only animate if we are ON the main page, or if we just came FROM the main page
  const isMainPage = pathname === "/";
  const wasMainPage = prevPath === "/";
  const shouldAnimate = isMainPage || wasMainPage;

  return (
    <motion.div
      key={pathname}
      // If we shouldn't animate, set initial to false (which instantly shows it at 100% opacity)
      initial={shouldAnimate ? { opacity: 0 } : false}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      className="flex-grow flex flex-col"
    >
      {children}
    </motion.div>
  );
}
