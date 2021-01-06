import { message, Modal, Table } from "antd";
import React, { useState, useEffect } from "react";
import { parseDate } from "../../components/util";
import { SentenceSchema } from "../../schema/sentenceSchema";
import { RouteComponentProps } from "react-router-dom";
import { getSentences, deleteSentences } from "../../api/shortSentences";
import "./scss/index.scss";

export interface DataType {
    key: string,
    name: string,
    content: string,
    publishDate?: string,
    imgUrl: string
}
const BackSentences = (props: RouteComponentProps) => {
    const [sentences, setSentences] = useState<SentenceSchema[]>([]);
    const [show, setShow] = useState(false);
    const [delId, setDelId] = useState("");
    const [fetchData, setFetchData] = useState(true);
    useEffect(() => {
        getSentences().then(res => {
            setSentences(res.data);
        })
    }, [fetchData])

    const openDelModel = (id: string) => {
        setDelId(id);
        setShow(true);
    }
    const closeDelModel = () => {
        setShow(false);
    }
    const deleteSentence = async () => {
        try {
            await deleteSentences(delId)
            message.success("删除成功");
            setShow(false);
            setFetchData(!fetchData);
        } catch (error) {
            message.error("删除失败");
        }
    }
    const updateSentence = (record: DataType) => {
        props.history.push({
            pathname: "/sentence-add",
            state: record
        })
    }
    const data: DataType[] = sentences.map((item) => {
        return {
            key: item._id,
            name: item.content,
            content: item.content,
            publishDate: item.publish_date,
            imgUrl: item.img_url
        };
    });
    return (
        <div>
            <Table dataSource={data} bordered>
                <Table.Column ellipsis={true} align={"center"} key="name" title="内容" dataIndex="name" />
                <Table.Column ellipsis={true} align={"center"} key="imgUrl" title="图片" dataIndex="imgUrl" />
                <Table.Column ellipsis={true} render={(text: string) => {
                    return parseDate(text);
                }} align={"center"} key="publishDate" title="发布日期" dataIndex="publishDate" />
                <Table.Column ellipsis={true} render={(text: string, record: DataType) => {
                    return <div className="btn">
                        <span className="update" onClick={() => updateSentence(record)}>修改</span>
                        <span className="delete" onClick={() => openDelModel(record.key)}>删除</span>
                    </div>
                }} align={"center"} key="publishDate" title="操作" dataIndex="publishDate" />
            </Table>
            <Modal
                title="删除优秀小短句！"
                visible={show}
                cancelText="取消"
                okText="确定删除"
                okType="danger"
                onOk={deleteSentence}
                onCancel={closeDelModel}
            >
                <p>删除操作不可逆转，是否确定删除？</p>
            </Modal>
        </div>
    );
};

export default BackSentences;