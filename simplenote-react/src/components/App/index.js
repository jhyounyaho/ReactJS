//App/index.js
import React from 'react';
import './index.css';
import Header from '../Header';
import List from '../List';
import Note from '../Note';
import { generateId } from '../../utils.js'

class App extends React.Component {
    //state 선언 (state : input체크값, 버튼 활성화 상태, 체크박스 체크 여부 등 상태관리) 
    state = {
        notes: [
            {
                id: '1',
                title: 'title_심플노트에 오신걸 환영합니다.',
                contents: 'contents_심플노트 여기다 작성하세요',
                check: false
            }
        ], //앱의 노트 정보를 담은 array
        activeId: '1', //리스트에서 유저가 선택하여 활성화 된 노트의 id 기록
    }

    //이벤트 핸들러 메소드 매개변수 : id
    handelListItemClick = (id) => {
        this.setState({activeId: id}) //state 설정하는 메소드 this.state를 직접 조작하면 메소드 다시 호출X
    }

    //편집 이벤트 핸들러 매개 변수 : type, 이벤트 객체
    handleEditNote = (type, e) => {
        //새 notes array 생성
        const notes = [ ...this.state.notes ]
        //notes에서 현재 activeId와 일치하는 노트 객체 찾기
        const note = notes.find((item) => item.id === this.state.activeId)
        //객체의 속성에 값 할당, note.title or note.contents
        //유저가 입력한 값은 e.target.value 에 존재 
        //input의 onChange 와 같은 이벤트는 e.target.value를 통해 유저가 입력한 값에 접근 할수 있음.
        note[type] = e.target.value
        //notes에 새 array를 할당하여 state 변경
        this.setState({
            notes
        })
    }    

    //추가 이벤트 메소드  
    handleAddNote = () => {
        const id = generateId() //랜덤 ID 생성
        this.setState({
            notes: [
                ...this.state.notes,
                {
                    id,
                    title: '제목',
                    contents: '내용'
                }
            ],
            activeId: id
        })
    }

    //현재 선택한 노트 객제 제외하는 메소드
    handelDeleteNote = () => {
        //현재 선택한 노트를 제외한 새로운 array를 생성
        const notes =
            this.state.notes.filter((item) => item.id !== this.state.activeId)
        //새 array를 notes에 할당 
        this.setState({
            notes,
            activeId: notes.length === 0 ? null : notes[0].id //삭제할 경우 첫번째 노트 = 활성화 노트
        })
    }
    render() {
        const { notes, activeId } = this.state
        //현재 활성화 된 객체를 찾아서 activeNote 변수에 할당
        //activeId 와 일치하는 id를 가진 노트 객체를 찾음.
        const activeNote = notes.filter((item) => item.id === activeId)[0]
        return (
            <div className="app">
                <Header 
                    onAddNote={this.handleAddNote}
                    onDeleteNote={this.handelDeleteNote}
                />
                <div className="container">
                    {/* notes와 activeId를 props로 전달 
                      * props : 상위 컴포넌트 => 하위 컴포넌트에 데이터 전달하는 방법
                      * 하위 컴포넌트는 this.props를 참조하여 데이터에 접근 할 수 있음.
                      * 이때, props 데이터는 읽기 전용 따라서 절대 변경되서는 안된다.
                      * 만약, UI를 변경해야할 필요가 있다면 state를 활용해야한다.
                    */}
                    <List 
                        notes={notes} 
                        activeId={activeId} 
                        onListItemClick={this.handelListItemClick} //메소드 전달
                    />
                    {/* activeNote가 존재할 때 <Note /> 를 렌더링 
                      * note 속성에 activeNote 전달 */}
                    {
                        //노트가 하나도 없는 경우에는 <Note /> 컴포넌트 그릴 필요 없음.
                        notes.length !== 0 && 
                        <Note 
                            note={activeNote} 
                            onEditNote={this.handleEditNote} //메소드 전달 
                        />
                    }
                </div>
            </div>
        )
    }
}

export default App;