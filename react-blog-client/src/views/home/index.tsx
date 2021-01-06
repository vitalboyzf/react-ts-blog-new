import Swiper from "../../components/swiper/Swiper";
import PictureLink from "../../components/picture/PictureLink";
import { RouteComponentProps } from "react-router-dom";
import BlogItem from "./BlogItem";
import NewBlog from "./NewBlog";
import Link from "./Link";
import { productionBaseUrl } from "../../api/baseUrl";
import "./scss/index.scss";
function Home(props: RouteComponentProps) {
    function pictureClickHandle(action: "game" | "book") {
        if (action === "game") {
            window.location.href = `${productionBaseUrl.replace(/:\d{3,4}$/, "")}/tetris/`;
        } else if (action === "book") {
            props.history.push("/book");
        }
    }

    return (
        < div className="homeWrapper">
            <div className="introduction">
                <Swiper />
                <div className={"picture"}>
                    <PictureLink
                        content={"玩游戏"}
                        picture={require("./logo/game.jpg").default}
                        onClickHandle={() => pictureClickHandle("game")} />
                    <PictureLink
                        content={"读书"}
                        picture={require("./logo/book.jpg").default}
                        onClickHandle={() => pictureClickHandle("book")}
                    />
                </div>
                <div className="about">
                    <p style={{ fontSize: "20px", fontWeight: "bold" }}> 关于博主</p>
                    <p>男，九零后，狮子座</p>
                    <p style={{ fontSize: "15px", fontWeight: "bold" }}>爱好</p>
                        打游戏，看电影,喜欢做开发，做有意义的事，做
                        爱思考的狍子~~~
                    </div>
            </div>
            <div className="hot-blog">最热文章</div>
            <BlogItem /><NewBlog push={props.history.push} />
            <Link />
        </div>
    );
}

export default Home;