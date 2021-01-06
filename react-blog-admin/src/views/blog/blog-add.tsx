import React, { useCallback, useEffect, useRef, useState } from 'react'
import { RouteComponentProps } from "react-router-dom";
import Editor from "../../components/editor"
import { Button, message, Upload } from "antd";
import WangEditor from "wangeditor";
import { addBlog, updateBlog } from "../../api/blog";
import { baseUrl } from "../../api/baseUrl";
import { BlogAddSchema } from "../../schema/blogSchema";
import { UploadChangeParam } from 'antd/lib/upload';
import { UploadFile } from 'antd/lib/upload/interface';
import { DataType } from "./index";
import { beforeUpload } from '../../components/util';
import "./scss/blog-add.scss";

export default function AddBlog(props: RouteComponentProps) {
    const [content, setContent] = useState("");
    const [intro, setIntro] = useState("");
    const [title, setTitle] = useState("")
    const [tags, setTags] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const WangEditorRef = useRef<WangEditor>();

    let { content: contentState = "",
        title: titleState = "",
        tags: tagsState = "",
        intro: introState = "",
        cover_picture = "",
        key = "",
    }
        = props.location.state ? props.location.state as DataType : {};
    useEffect(() => {
        setTitle(titleState);
        setTags(tagsState);
        setIntro(introState);
        setImageUrl(cover_picture);
    }, [titleState, tagsState, introState, cover_picture])
    const onChangeContent = useCallback((content: string) => {
        setContent(content);
    }, []);
    const getEditor = useCallback((editor: WangEditor) => {
        WangEditorRef.current = editor;
    }, []);
    const onChange = (key: "title" | "tags" | "intro", newValue: string) => {
        if (key === "title") {
            setTitle(newValue)
        } else if (key === "tags") {
            setTags(newValue);
        } else if (key === "intro") {
            setIntro(newValue);
        }
    }
    const clearController = () => {
        setContent("");
        setTitle("");
        setTags("");
        setIntro("");
        WangEditorRef.current?.txt.clear();
    }
    const sendController = async () => {
        if (!title || !tags || !intro || !content) {
            message.success("缺少重要信息，好好写！", .3);
            return;
        }
        const blog: BlogAddSchema = { title, tags, content, cover_picture: imageUrl, intro };
        try {
            if (props.location.state) {
                await updateBlog(key, blog);
                message.success("修改成功", .3);
            } else {
                // 添加逻辑
                await addBlog(blog);
                message.success("添加成功", .3);
            }

            props.history.push("/blog");
        } catch (error) {
            console.log(error);
            message.error("添加失败", .3);
        }
    }

    const handleCoverPictureChange = (info: UploadChangeParam<UploadFile<any>>) => {
        if (info.file.status === 'done') {
            setImageUrl(info.file.response.url)
        }
    }

    return (
        <div className="addBlogContainer">
            <div className="title">
                <label>
                    标题：<input value={title} onChange={(e) => onChange("title", e.target.value)} type="text" placeholder="请输入标题" />
                </label>
                <label>
                    标签：<input value={tags} onChange={(e) => onChange("tags", e.target.value)} type="text" placeholder="请输入标签名" />
                </label>
            </div>
            <div className="intro-upload">
                <div className="intro">
                    <textarea value={intro}
                        placeholder={"请介绍一下这篇博客吧!"}
                        onChange={(e) => onChange("intro", e.target.value)}
                        cols={130} rows={2} />
                </div>
                <Upload
                    name="img"
                    listType="picture-card"
                    className="cover-upload"
                    showUploadList={false}
                    action={baseUrl + "/upload"}
                    beforeUpload={beforeUpload}
                    onChange={handleCoverPictureChange}
                >
                    {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : "上传封面图"}
                </Upload>
            </div>
            <Editor contentState={contentState} getEditor={getEditor} onChangeContent={onChangeContent} />
            <div className="btn">
                <Button type={"primary"} className="clear" onClick={clearController}>清理</Button>
                <Button type={"primary"} className="send" onClick={sendController}>发布</Button>
            </div>
        </div >
    )
}
