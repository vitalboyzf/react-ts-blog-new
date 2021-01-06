import { useEffect, useState } from "react";
import { message, Modal, Table, Spin, Tooltip } from "antd";
import { parseDate } from "../../components/util";
import { BlogSchema } from "../../schema/blogSchema";
import { queryBlog, deleteBlog } from "../../api/blog";
import { RouteComponentProps } from "react-router-dom";
import "./scss/index.scss";

export interface DataType {
    key: string;
    content: string;
    publish_date?: string;
    views: number;
    tags: string;
    title: string;
    intro: string;
    cover_picture?: string;
}

const BackSentences = (props: RouteComponentProps) => {
    const [show, setShow] = useState(false);
    const [delId, setDelId] = useState("");
    const [fetchData, setFetchData] = useState(true);
    const [blogs, setBlogs] = useState<BlogSchema[]>([]);
    useEffect(() => {
        queryBlog().then(res => {
            setBlogs(res.data);
        })
    }, [fetchData])
    const data: DataType[] | undefined = blogs.length !== 0 ? blogs.map((blog) => {
        return {
            key: blog._id,
            content: blog.content,
            publish_date: blog.publish_date,
            views: blog.views,
            tags: blog.tags,
            title: blog.title,
            intro: blog.intro,
            cover_picture: blog.cover_picture
        };
    }) : undefined;
    const deleteBlogController = async () => {
        await deleteBlog(delId);
        message.success("删除成功", .3);
        setFetchData(!fetchData);
        setShow(false);
    }
    const closeDelModel = () => {
        setShow(false);
    }
    const openDelModel = (blogId: string) => {
        setDelId(blogId);
        setShow(true);
    }
    const updateBlog = (record: DataType) => {
        props.history.push({
            pathname: "/blog-add",
            state: record
        })
    }
    const columns = [
        {
            title: "标题",
            dataIndex: "title",
            key: "title",
            ellipsis: {
                showTitle: false
            },
            render: (content: any) => (
                <Tooltip placement="topLeft" title={content}>
                    {content}
                </Tooltip>
            )
        },
        {
            title: "标签",
            dataIndex: "tags",
            key: "tags"
        },
        {
            title: "热度",
            dataIndex: "views",
            key: "views",
            width: 80
        },
        {
            title: "内容",
            dataIndex: "content",
            key: "content",
            ellipsis: {
                showTitle: true
            },
        },
        {
            title: "发布时间",
            dataIndex: "publish_date",
            key: "publish_date",
            render: (text: any) => <span>{parseDate(text)}</span>
        },
        {
            title: "操作",
            dataIndex: "handle",
            render: (text: string, record: DataType) => {
                return <div className="btn">
                    <span className="update" onClick={() => updateBlog(record)}>修改</span>
                    <span className="delete" onClick={() => openDelModel(record.key)}>删除</span>
                </div>
            }
        }
    ];
    return (
        <div>
            <Modal
                title="删除博客！"
                visible={show}
                cancelText="取消"
                okText="确定删除"
                okType="danger"
                onOk={deleteBlogController}
                onCancel={closeDelModel}
            >
                <p>删除操作不可逆转，是否确定删除？</p>
            </Modal>
            <Spin tip="加载中，请稍后。。。" spinning={blogs.length === 0}>
                <Table tableLayout={"fixed"}
                    dataSource={data} columns={(columns)} bordered />
            </Spin>,

        </div>
    );
};

export default BackSentences;