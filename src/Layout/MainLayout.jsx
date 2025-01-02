import { Children } from "react";
export default function MainLayout({children}) {
    return (
         <div className="flex flex-col min-h-screen bg-gray-100">
            {children}
         </div>
    );
}