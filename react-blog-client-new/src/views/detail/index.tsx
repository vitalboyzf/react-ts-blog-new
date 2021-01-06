import { useEffect, useRef } from "react";
import { updateBlog } from "../../api/blog";
import "./scss/index.scss";
import { parseDate } from "../../components/util";
import HeadCom from "../../components/head-com/HeadCom";
import BlogComment from "./BlogComment";
// redux
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { effectFetchBlogs } from "../../store/saga/fetchTypes";
import { storeSchema } from "../../schema/storeSchema";
import { BlogSchema, BlogAddSchema } from "../../schema/blogSchema";
function Detail(props: any) {
    const blogs = useSelector<storeSchema, BlogSchema[]>(store => store.blogs, shallowEqual);
    const dispatch = useDispatch();

    const blogRef = useRef<BlogSchema | undefined>();
    blogRef.current = blogs.find(blog => {
        return blog._id === props.match.params.id;
    });
    const blog = blogRef.current;
    useEffect(() => {
        if (blogRef.current) {
            const newBlog: BlogAddSchema = { views: blogRef.current.views + 1 };
            blogRef.current && updateBlog(props.match.params.id, newBlog).then(() => {
                // 更新仓库数据
                dispatch(effectFetchBlogs());
            });
        }
    }, [dispatch, props.match.params.id]);


    if (!blog) {
        return null;
    }
    return (
        <div className={"detail"}>
            <HeadCom title={"博文阅读"} content={"读万卷书，行万里路"} />
            <div className="title">
                {blog.title}
            </div>
            <div className="intro">
                {blog.intro}
            </div>
            <div className="content" dangerouslySetInnerHTML={{
                __html: blog.content
            }} />
            <div className={"footer"}>
                <span>
                    标签：<span style={{ color: "blue" }}>{blog.tags}</span>
                </span>
                <span style={{ marginLeft: "5vw" }}>
                    热度：<span style={{ color: "#f40" }}>{blog.views}</span>
                </span>
                <span className={"date"}>
                    发布日期：
                    <span style={{ color: "#0f0" }}>
                        {parseDate(blog.publish_date)}
                    </span>
                </span>
            </div>
            <BlogComment blogId={props.match.params.id} />
        </div>
    );
}

export default Detail;