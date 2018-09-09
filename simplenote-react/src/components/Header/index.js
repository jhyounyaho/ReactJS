//Header/index.js
import React from 'react';
import './index.css'

class Header extends React.Component {
    render () {
        const { onAddNote, onDeleteNote } = this.props 
        return (
            <div className="header">
                <div className="title">
                    <span>
                        <a href="https://github.com/jhyounyaho" target="_blank">혜윤 심플노트</a>
                    </span>
                </div>
                <div className="buttons">
                    {/* onAddNote를 추가 버튼의 onClick 이벤트에 작성 */ }
                    <button onClick={onAddNote}>추가</button>
                    {/* onDeleteNote를 삭제 버튼의 onClick 이벤트에 작성 */}
                    <button onClick={onDeleteNote}>삭제</button>
                </div>
            </div>
        )
    }
}

export default Header;