import { useEffect } from "react";
import HeadCom from "../../components/head-com/HeadCom";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { effectFetchSentence } from "../../store/saga/fetchTypes";
import "./index.scss";
import { storeSchema } from "../../schema/storeSchema";
import { SentenceSchema } from "../../schema/sentenceSchema";
import { parseDate } from "../../components/util";



function MoodEssay() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(effectFetchSentence());
    }, [dispatch]);
    const sentences = useSelector<storeSchema, SentenceSchema[]>(store => store.sentences, shallowEqual);
    const renderArr = sentences.length !== 0 && sentences.map((item: any) => {
        let parserTime = item.publish_date;
        parserTime = parseDate(parserTime);
        return <div className={"sentences-item"} key={item._id}>
            <div className={"sentences-main"}>
                <img src={item.img_url} alt="" />
                <p>{item.content}</p>
            </div>
            <span className={"publishDate"}>{parserTime}</span>
        </div>;
    }
    );
    return (
        <>
            <HeadCom title={"心情随笔"} content={"生活，总是需要一些乐趣才有动力！"} />
            <div className="sentences-container">
                {renderArr}
            </div>
        </>
    );
}


export default MoodEssay;