//List/index.js
import React from 'react'
import './index.css'
import ListItem from '../ListItem'

class List extends React.Component {
    render() {
        //notes데이터를 props로 전달 받음.
        const { 
            notes, 
            activeId, 
            onListItemClick //App 컴포넌트에서 전달 받은 이벤트 핸들러 
        } = this.props
        return (
            <div className="list">
                {notes.map((item) => {
                    const { id, title, contents } = item
                    return (
                        <ListItem 
                            key={id}
                            id={id}
                            active={id === activeId}
                            title={title}
                            contents={contents}
                            onClick={() => onListItemClick(id)} //메소드 전달
                        />
                        /*
                        * ListItem 컴포넌트에서 onClick 호출 =>
                        * () => onListItemClick(id) 호출  
                        * App 컴포넌트의 handelListItemClick 호출됨.
                        * 자식 => 부모 
                        */
                    )
                })}
            </div>
        )
    }
}

export default List;