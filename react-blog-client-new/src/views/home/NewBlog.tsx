import "./scss/new-blog.scss";
import { useSelector, shallowEqual } from "react-redux";
import { BlogSchema } from "../../schema/blogSchema";
import { storeSchema } from "../../schema/storeSchema";
function NewBlog(props: any) {
    const blogs = useSelector<storeSchema, BlogSchema[]>(state => state.blogs, shallowEqual).slice(0, 8);
    const renderArr = blogs && blogs.map((item, index) => {
        return <div onClick={() => {
            props.push(`/detail/${item._id}`);
        }} className={"item"} key={item._id}>
            <span>{index + 1}.</span> {item.title}
        </div>;
    });
    return (
        <div className={"home-new-blog"}>
            <div className="title">最新文章</div>
            <div className={"item-container"}>
                {renderArr}
            </div>
        </div>
    );
}

export default NewBlog;