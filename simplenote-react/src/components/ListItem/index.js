//ListItem/index.js
import React from 'react';
import './index.css';

class ListItem extends React.Component {
    render() {
        //<List /> 데이터를 props로 전달 받음.
        const { active, title, contents, onClick } = this.props
        return (
            <div 
                className={active ? "list-item active" : "list-item"}
                onClick={onClick} //onClick 이벤트 발생시 전달 받은 onClick() 호출
            >
                <div className="title">{title ? title : '제목'}</div>
                <div className="list-item-contents">{contents ? contents : "내용"}</div>
            </div>
        )
    }
}

export default ListItem;