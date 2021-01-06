import "./scss/link.scss";

const linkArr = [
    {
        title: "我的github",
        url: "https://github.com/zfnb?tab=repositories"
    },
    {
        title: "照片墙",
        url: "http://49.232.250.47/coolpicture/"
    },
    {
        title: "vue版管理系统",
        url: "http://49.232.250.47/vue-manage/"
    },
    {
        title: "青青博客",
        url: "https://www.yangqq.com/"
    },
    {
        title: "井字棋游戏",
        url: "http://49.232.250.47/react-game/"
    },

    {
        title: "react管理系统",
        url: "http://49.232.250.47/react-manage/#/login"
    },
    {
        title: "俄罗斯方块游戏",
        url: "http://49.232.250.47/tetris/"
    },
    {
        title: "袁进技术博客",
        url: "http://blog.yuanjin.tech/"
    },

    {
        title: "余斗余斗",
        url: "https://www.yudouyudou.com/"
    }
];

function Link() {
    const renderArr = linkArr.map((item: any) => {
        return <a href={item.url} rel="noopener noreferrer" target={"_blank"} className={"link-item"} key={item.title}>
            {item.title}
        </a>;
    });
    return (
        <div className={"link-container"}>
            <div className="title">
                友情链接
            </div>
            {renderArr}
        </div>
    );
}

export default Link;