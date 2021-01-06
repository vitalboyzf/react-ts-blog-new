import React, { memo, useState, useEffect, useCallback, useRef } from 'react'
import { Button, message, Upload } from 'antd';
import { RouteComponentProps } from "react-router-dom";
import { UploadChangeParam } from 'antd/lib/upload';
import { UploadFile } from 'antd/lib/upload/interface';
import E from "wangeditor";
import { baseUrl } from '../../api/baseUrl';
import Editor from "../../components/editor/index";
import { beforeUpload } from '../../components/util';
import { addShortSentences, updateSentences } from "../../api/shortSentences";
import { SentenceAddSchema } from "../../schema/sentenceSchema";
import { DataType } from "./index";
import "./scss/sentence-add.scss";
export default memo(function AddSentence(props: RouteComponentProps) {
    const [imageUrl, setImageUrl] = useState("")
    const [content, setContent] = useState("");
    const editorRef = useRef<E>();
    let { content: contentState = "", imgUrl = "", key = "" } = props.location.state ? props.location.state as DataType : {};
    useEffect(() => {
        setImageUrl(imgUrl ? imgUrl : "");
    }, [imgUrl]);
    const getEditor = useCallback((editor: E) => {
        editorRef.current = editor;
    }, [])
    const onChangeContent = useCallback(() => {
        setContent(editorRef.current!.txt.text());
    }, [])
    const handleCoverPictureChange = (info: UploadChangeParam<UploadFile<any>>) => {
        if (info.file.status === 'done') {
            setImageUrl(info.file.response.url)
        }
    }
    const clearController = () => {
        setContent("");
        editorRef.current!.txt.clear();
    }
    const sendController = async () => {
        const sentence: SentenceAddSchema = { content, img_url: imageUrl }
        try {
            // 有值，修改逻辑
            if (props.location.state) {
                await updateSentences(key, sentence);
                message.success("修改成功")
            } else {
                // 添加逻辑
                await addShortSentences(sentence);
                message.success("添加成功")
            }
            props.history.push("/sentence");
        } catch (error) {
            message.error("添加失败");
        }
    }

    return (
        <div className="sentence-add">
            <Upload
                name="img"
                listType="picture-card"
                className="cover-upload"
                showUploadList={false}
                action={baseUrl + "/upload"}
                beforeUpload={beforeUpload}
                onChange={handleCoverPictureChange}>
                {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : "上传封面图"}
            </Upload>
            <Editor contentState={contentState} getEditor={getEditor} onChangeContent={onChangeContent} />
            <div className="btn">
                <Button type={"primary"} className="clear" onClick={clearController}>清理</Button>
                <Button type={"primary"} className="send" onClick={sendController}>发布</Button>
            </div>
        </div >
    )
})
