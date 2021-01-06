import { useEffect, useState } from "react";
import "./index.scss";
import HeadCom from "../../components/head-com/HeadCom";
import { queryBooks } from "../../api/book";
interface bookSchema {
    title: string;
    url: string;
    img: string;
}
function Book() {
    const [books, setBooks] = useState<bookSchema[]>([]);
    useEffect(() => {
        queryBooks().then(res => {
            setBooks(res.data);
        });
    }, []);
    const renderArr = books.map((book) => {
        return <div className={"book-item"} key={book.title} onClick={() => {
            window.location.href = book.url;
        }}>
            <img src={book.img} alt={book.title} />
            <div className={"title"}>{book.title}</div>
        </div>;
    });
    return (
        <>
            <HeadCom title={"读书"} content={"前人走过的路，便是捷径"} />
            <div className={"book-container"}>
                {renderArr}
            </div>
        </>
    );
}

export default Book;