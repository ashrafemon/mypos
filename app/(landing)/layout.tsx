import React from "react";

const layout: React.FC<LayoutType> = ({ children }) => {
    return (
        <div>
            Landing Layout
            {children}
        </div>
    );
};

export default layout;
