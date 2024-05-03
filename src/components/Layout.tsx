import React from "react";

export default function Layout({ children }: React.PropsWithChildren) {
    return <div className="bg-black text-white text-4xl tracking-wider font-semibold font-mono min-h-screen">{children}</div>;
}