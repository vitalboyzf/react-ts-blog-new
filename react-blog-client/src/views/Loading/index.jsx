import React from "react";
import "./index.css";
export default function index() {
    return (
        <div className={"loading"}>
            <div className="logo">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
            </div>
            <h1 className={"info"}>
                <span>加</span>
                <span>载</span>
                <span>中</span>
                <span>请</span>
                <span>稍</span>
                <span>后</span>
            </h1>
        </div>
    );
}