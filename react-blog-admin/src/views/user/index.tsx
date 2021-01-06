import React, { useEffect, useState } from "react";
import { deleteUser, queryAllUser } from "../../api/user";
import { message, Modal, Table, Tooltip } from "antd";

const columns = [
    {
        title: "用户名",
        dataIndex: "name",
        key: "name"
    },
    {
        title: "用户身份",
        dataIndex: "identity",
        key: "identity",
        ellipsis: {
            showTitle: false
        },
        render: (content: any) => (
            <Tooltip placement="topLeft" title={content}>
                {content}
            </Tooltip>
        )
    }
];

function User() {
    const [user, setUser] = useState([]);
    const [show, setShow] = useState(false);
    const [delId, setDelId] = useState("");

    useEffect(() => {
        queryAllUser().then((res: any) => {
            setUser(res);
        });
    }, [show]);
    const data = user.map((item: any) => {
        return {
            key: item._id,
            identity: item.identity,
            name: item.name
        };
    });
    return (
        <div>
            <Modal
                title="删除用户！"
                visible={show}
                cancelText="取消"
                okText="确定删除"
                okType="danger"
                onOk={() => {
                    deleteUser(delId).then((res: any) => {
                        message.success("删除成功", .3);
                        setShow(false);
                    });
                }}
                onCancel={() => {
                    setShow(false);
                }}
            >
                <p>删除操作不可逆转，是否确定删除？</p>
            </Modal>
            <Table tableLayout={"fixed"} onRow={record => {
                return {
                    onClick: event => {
                        setDelId(record.key);
                        setShow(true);
                    } // 点击行
                };
            }}
                dataSource={data} columns={columns} bordered />
        </div>
    );
}

export default User;