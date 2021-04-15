import React from "react"
import axios from "axios"
import { Row, InputGroup, InputGroupText, InputGroupAddon, Input, Col, Card, CardBody, Button, FormGroup, ListGroup, ListGroupItem, Badge, Label, CardHeader } from "reactstrap"
import Todolist from "./TodoList"
const serverURL = "https://nazimtodo.herokuapp.com"
export default class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            todos: [],
            todo: { text: "", completed: false },
            loading: false
        }
    }
    componentDidMount = _ => {
        this.getAllTodos()
    }
    getAllTodos = async () => {
        let todos = await axios.get(`${serverURL}/todos`)
        this.setState({ todos: todos.data, todo: { text: "", completed: false } })
    }
    addNewTodo = (todo) => {
        axios.post(`${serverURL}/addTodo`, todo)
            .then(() => { alert("todo added"); this.getAllTodos() })
            .catch(err => alert(err + ""))
    }
    deleteTodo = (todo_id) => {
        this.setState({
            todos: this.state.todos.filter(todo => {
                return todo._id !== todo_id
            })
        }, () => {
            axios.delete(`${serverURL}/deleteTodo/${todo_id}`)
                .then(() => alert("todo deleted"))
                .catch(err => alert(err + ""))
        })
    }
    updateTodo = (updatedObject, todo_id) => {
        this.setState({
            todos: this.state.todos.map(todo => {
                if (todo._id === todo_id) {
                    todo = { ...todo, ...updatedObject }
                }
                return todo
            })
        }, () => {
            axios.post(`${serverURL}/updateTodo/${todo_id}`, updatedObject)
                .then(() => { console.log("todo updated") })
                .catch(err => alert(err + ""))
        })

    }
    render() {
        return (
            <React.Fragment>
                <h1 className="ml-auto mr-auto">Todo App</h1>
                <hr />
                <Row className="d-flex justify-content-center">
                    <Card className="w-75">
                        <CardHeader>
                            Add New ToDo
                        </CardHeader>
                        <CardBody>
                            <FormGroup>
                                <InputGroup>
                                    <InputGroupAddon addonType="prepend">
                                        <InputGroupText>Text</InputGroupText>
                                    </InputGroupAddon>
                                    <Input type="text" value={this.state.todo.text} onChange={(e) => this.setState({
                                        todo: { ...this.state.todo.text, text: e.target.value }
                                    })} />
                                </InputGroup>
                            </FormGroup>
                            {this.state.todo.text &&
                                <InputGroup className="d-flex justify-content-end">
                                    <Button disabled={this.state.loading} color="success" size="md" active onClick={() => this.addNewTodo({ ...this.state.todo })}>Add ToDo</Button>
                                </InputGroup>}
                        </CardBody>
                    </Card>
                </Row>
                <Todolist
                    title="Todo"
                    todos={this.state.todos.filter(todo => !todo.completed)}
                    deleteTodo={this.deleteTodo}
                    updateTodo={this.updateTodo}
                />
                <Todolist
                    title="Completed"
                    todos={this.state.todos.filter(todo => todo.completed)}
                    updateTodo={this.updateTodo}
                    deleteTodo={this.deleteTodo}
                />
            </React.Fragment>
        )
    }
}