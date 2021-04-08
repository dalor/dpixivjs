import React from "react";
import "./MenuWrapper.css"

export default ({ children, width, height, big }) => (
    <div className="menu-center-wrapper" style={!big ? { height: "100%" } : { marginTop: "20px" }}>
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