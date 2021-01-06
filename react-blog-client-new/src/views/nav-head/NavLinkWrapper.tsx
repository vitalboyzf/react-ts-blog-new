import { memo } from "react";
import { NavLink } from "react-router-dom";
interface Iprops {
    isMin?: boolean;
}
export default memo(function NavLinkWrapper(props: Iprops) {
    return (
        <div className="nav-link">
            <NavLink to="/home">首页 </NavLink>
            <NavLink to="/technical-articles">技术文章</NavLink>
            <NavLink to="/book">读书</NavLink>
            <NavLink to="/mode-essay">心情随笔</NavLink>
            <NavLink to="/about">关于我</NavLink>
            <NavLink to="/message-board">留言板</NavLink>
            {props.isMin && <NavLink to="/person">个人中心</NavLink>}
        </div>
    );
});
