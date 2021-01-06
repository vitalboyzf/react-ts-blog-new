import { FC } from "react";
import "./modal.css";
const Index: FC<{ show?: boolean, content?: string }> = ({ show, content }) => {
    if (show) {
        return (
            <div className={"modal-container"}>
                <p>{content}</p>
            </div>
        );
    } else {
        return null;
    }
};
Index.displayName = "Modal";
Index.defaultProps = {
    show: false,
    content: "加载中。。。"
};
export default Index;
