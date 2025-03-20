import { Header } from "@/components/header";
import React from "react";

type AppLayoutProps = {
  children: React.JSX.Element;
};

export default function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="max-w-[1382px] min-h-screen container mx-auto px-4 flex flex-col">
      <Header />
      <main className="flex-1">{children}</main>
    </div>
  );
}
