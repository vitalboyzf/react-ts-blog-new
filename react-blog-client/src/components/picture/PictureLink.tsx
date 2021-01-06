import { ReactNode } from "react";
import "./index.scss";

interface Iprops {
    content?: string
    width?: number
    height?: number
    picture?: string
    children?: ReactNode
    onClickHandle?: () => void
}

function PictureLink(props: Iprops) {
    return (
        <div className={"picture-container"} style={{
            width: props.width,
            height: props.height,
            minWidth: 0
        }}>
            <span>{props.content}</span>
            {props.picture ? <img onClick={() => {
                props.onClickHandle && props.onClickHandle();
            }
            } src={props.picture} alt="" /> : null}
        </div>
    );
}

export default PictureLink;