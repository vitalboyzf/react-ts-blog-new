import { FC, ReactElement } from "react";
import "./pager.scss";

interface IPagerProps {
    current: number
    limit?: number
    total: number
    panelNumber?: number
    onChangePage: (newPage: number) => void
}
const Pager: FC<IPagerProps> = (props) => {
    const { current, limit, total, onChangePage, panelNumber } = props;
    // 计算总页数
    const calcAllPage = Math.ceil(total / limit!);
    function pageChange(newPage: number) {
        onChangePage && onChangePage(newPage);
    }
    // 获取最展示小数字
    function getMinNumber() {
        let min = current - Math.floor(panelNumber! / 2);
        if (min < 1) {
            min = 1;
        }
        return min;
    }
    // 获取最大展示数字
    function getMaxNumber(minNumber: number) {
        let max = minNumber - 1 + panelNumber!;
        if (max > calcAllPage) {
            max = calcAllPage;
        }
        return max;
    }
    const minNumber = getMinNumber();
    const maxNumber = getMaxNumber(minNumber);
    const residueItem: ReactElement[] = [];
    for (let i = minNumber; i <= maxNumber; i++) {
        residueItem.push(<span onClick={() => {
            pageChange(i);
        }} key={i}
            className={current === i ? "active item" : "item"}>{i}
        </span>);
    }
    return (
        <div className={"pager-container"}>
            <div onClick={() => {
                pageChange && pageChange(1);
            }} className={current === 1 ? "item disable" : "item start"}>首页</div>
            <div onClick={() => {
                pageChange && pageChange(current - 1);
            }} className={current === 1 ? "item disable" : "item prev"}>上一页</div>
            {residueItem}
            <div onClick={() => {
                pageChange && pageChange(current + 1);
            }} className={current === calcAllPage ? "item disable" : "item prev"}>下一页</div>
            <div onClick={() => {
                pageChange && pageChange(calcAllPage);
            }} className={current === calcAllPage ? "item disable" : "item prev"}>尾页</div>
        </div>
    );
};
export default Pager;
Pager.defaultProps = {
    limit: 5,
    panelNumber: 5
};

