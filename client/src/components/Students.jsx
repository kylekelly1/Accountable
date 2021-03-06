import React from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
// import Modal from 'react-bootstrap/Modal';
import Modal from './Modal.jsx';
import StudentModal from './newStudentModal.jsx';

class Students extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      students: [],
      name: '',
      parentName: '',
      parentPhone: '',
      parentEmail: '',
    };
    this.addStudents = this.addStudents.bind(this);
    this.changeStudentData = this.changeStudentData.bind(this);
    this.getStudents = this.getStudents.bind(this);
    this.addComment = this.addComment.bind(this);
    this.showCommentHistory = this.showCommentHistory.bind(this);
    this.toggleStudents = this.toggleStudents.bind(this);
    this.changeStudentState = this.changeStudentState.bind(this);
  }

  // get student data based on class ID, load it into students array on comp mount

  componentDidMount() {
    this.getStudents()
      .then((data) => {
        this.setState({
          students: data.data,
        });
      });
  }
  getStudents() {
    return axios.get('/students', {
      params: {
        classID: this.props.classID,
      }
    });
  }


  changeStudentState(data) {
    this.setState({
      students: data,
    });
  }

  // add students to database
  addStudents() {
    const { name, parentName, parentEmail, parentPhone } = this.state;
    axios.post('/students', {
      name,
      parentName,
      email: parentEmail,
      phone: parentPhone,
      classID: this.props.classID,
    });
  }


  // capture student data
  changeStudentData(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  addComment(e) {
    // when button is clicked,
    // get student in that row and set state of current student to that student
    const studentID = parseInt(e.target.name);
    this.state.students.map((student) => {
      if (student.id === studentID) {
        this.setState({
          currentStudent: student,
        }, function () {
          this.setState({
            renderCommentForm: !this.state.renderCommentForm,
          });
        });
      }
    });
  }

  showCommentHistory(e) {
    let studentID = parseInt(e.target.name);
    // set the state of currentStudent
    // pass down to commenthistory
    // render comment history
    this.state.students.map((student) => {
      if (student.id === studentID) {
        this.setState({
          currentStudent: student,
        }, function () {
          this.setState({
            renderCommentHistory: !this.state.renderCommentHistory,
          });
        });
      }
    });
  }

  toggleStudents() {
    this.setState({
      studentView: !this.state.studentView
    });
  }


  render() {
    return (
      <div>
        <div className="studentListTitle">
          <h4>Students in {this.props.className}</h4>
        </div>
        <div className="addStudentContainer">
          <StudentModal studentChange={this.changeStudentState} classID={this.props.classID} />
        </div>
        <div className="backButt">
          <button onClick={(event) => { this.props.changeState(); this.props.showList(); }} className="btn btn-sm">Back</button>
        </div>
        <div className="studentListDiv">
          <table className="table table-hover table-sm table-condensed">
            <thead className="thead-dark">
              <tr>
                <th className="tableName">Name</th>
                <th className="tableGuardian">Guardian</th>
                <th className="tablePhone">Phone</th>
                <th className="tableEmail">Email</th>
                <th className="tableComments">Comments</th>
              </tr>
            </thead>
            <tbody>
              {
                this.state.students.map((student) => {
                  return (
                    <tr className="student-row">
                      <td>{student.name || 'N/A'}</td>
                      <td>{student.parentName || 'no parent name'}</td>
                      <td>{student.phone || 'no phone number'}</td>
                      <td>{student.email || 'no email'}</td>
                      <Modal currentStudent={student} name={student.name} />
                    </tr>
                  );
                })
              }
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}


export default Students;