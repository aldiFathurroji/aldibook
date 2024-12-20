import { Children } from "react";
export default function MainLayout({children}) {
    return (
         <div className="flex flex-col min-h-screen bg-green-700 justify-beetwen item-center">
            {children}
         </div>
        
    );
}