import { useState, ChangeEvent } from "react";
import { NavLink } from "react-router-dom";
// api
import { queryBlogByKey } from "../../api/blog";
// redux schema
import { useSelector, shallowEqual } from "react-redux";
import { BlogSchema } from "../../schema/blogSchema";
import { storeSchema } from "../../schema/storeSchema";

import { parseDate } from "../../components/util";
// components
import PictureLink from "../../components/picture/PictureLink";
import { Button, Spin } from "antd";

import HeadCom from "../../components/head-com/HeadCom";
import "./index.scss";


function TechnicalArticles() {
    const [title, setTitle] = useState("");
    const [tags, setTags] = useState("");
    const [virtualBlog, setVirtualBlog] = useState<BlogSchema[] | null>(null);
    const blogs = useSelector<storeSchema, BlogSchema[]>(store => store.blogs, shallowEqual);
    // 事件处理函数
    function changeTitle(e: ChangeEvent<HTMLInputElement>) {
        setTitle(e.target.value);
    }
    function changeTags(e: ChangeEvent<HTMLInputElement>) {
        setTags(e.target.value);
    }

    function searchClickController() {
        if (!title && !tags) {
            setVirtualBlog(null);
        }
        queryBlogByKey(title, tags).then(res => {
            setVirtualBlog(res.data);
        });
    }
    const { matches: bigScreen } = window.matchMedia("(min-width:900px)");
    const renderedItem = (virtualBlog || blogs).map((blog) => {
        return <div className="blog-item" key={blog._id}>
            {blog.cover_picture ? <PictureLink width={bigScreen ? 160 : 100} height={bigScreen ? 110 : 80} picture={blog.cover_picture} /> : null}
            <div className={"show-main"}>
                <div className={"title"}>{blog.title}</div>
                <div className={"intro"}>{blog.intro}</div>
                <div className={"footer"}>
                    标签：<span style={{ color: "#f90" }}>{blog.tags}</span>
                    <span style={{ marginLeft: "30px" }}>
                        <span>热度：</span>
                        <span style={{ color: "#0f0" }}>
                            {blog.views}
                        </span>
                    </span>
                    <span style={{ marginLeft: "30px" }}>
                        发布日期：
                        <span style={{ color: "#0f0" }}>
                            {parseDate(blog.publish_date)}
                        </span>
                    </span>
                    <NavLink to={"/detail/" + blog._id} style={{ marginLeft: "30px" }}>
                        阅读文章
                    </NavLink>
                </div>
            </div>
        </div>;
    });



    return (
        <div className="technicalArticleWrapper">
            <HeadCom title={"博客文章"} content={"最好的年华，做最想做的事吧！"} />
            <div className="search">
                <input type="text" value={title} onChange={changeTitle} placeholder={"请输入文章标题"} />
                <input type="text" value={tags} onChange={changeTags} placeholder={"请输入文章标签"} />
                <Button type={"primary"} onClick={searchClickController}>搜索</Button>
            </div>
            <div className="blog-show">
                <Spin tip="加载中请稍后。。。" spinning={blogs.length === 0}>
                    {renderedItem}
                </Spin>

            </div>
            {/* /.blog */}
        </div>
    );
}


export default TechnicalArticles;