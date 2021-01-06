import { NavLink } from "react-router-dom";
import PictureLink from "../../components/picture/PictureLink";

import { parseDate } from "../../components/util";

import { BlogSchema } from "../../schema/blogSchema";
import { storeSchema } from "../../schema/storeSchema";
// redux
import { useSelector, shallowEqual } from "react-redux";
import { Spin } from "antd";
import "./scss/blog-item.scss";
const { matches: bigMatch } = window.matchMedia("(min-width:900px)");

function BlogItem(props: any) {
    // 拿到仓库中的blogs数据
    let blogs = useSelector<storeSchema, BlogSchema[]>(state => state.blogs, shallowEqual)
        // 将blog数据按照views从大到小排序 
        .sort((a, b) => {
            return b.views - a.views;
        })
        .slice(0, 5);
    let renderedItem = blogs.map((item) => {
        return <div className="blog-item" key={item._id}>
            {item.cover_picture ?
                <PictureLink width={bigMatch ? 160 : 100} height={bigMatch ? 110 : 80} picture={item.cover_picture} /> : null}
            <div className={"show-main"}>
                <div className={"title"}>{item.title}</div>
                <div className={"intro"}>{item.intro}</div>
                <div className={"footer"}>
                    <span>
                        标签：<span style={{ color: "#f90" }}>{item.tags}</span>
                    </span>
                    <span style={{ marginLeft: "15px" }}>热度：
                            <span style={{ color: "#0f0" }}>
                            {item.views}
                        </span>
                    </span>
                    <span style={{ marginLeft: "15px" }}>发布日期：
                            <span style={{ color: "#0f0" }}>
                            {parseDate(item.publish_date)}
                        </span>
                    </span>
                    <NavLink to={"/detail/" + item._id} style={{ marginLeft: "15px" }}>
                        阅读文章
                    </NavLink>
                </div>
            </div>
        </div>;
    });

    return (
        <>
            <div className="home-blog-show">
                {/* 如果spinning为true 显示loading效果 */}
                <Spin tip="加载中请稍后。。。" spinning={blogs.length === 0}>
                    {renderedItem}
                </Spin>
            </div>
        </>
    );
}


export default BlogItem;