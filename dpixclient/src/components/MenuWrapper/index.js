import React from "react";
import "./MenuWrapper.css"

export default ({ children, width, height }) => (
    <div className="menu-center-wrapper">
        <div className="menu-wrapper" style={
            {
                maxWidth: width,
                maxHeight: height
            }
        }>
            {children}
        </div>
    </div>
)