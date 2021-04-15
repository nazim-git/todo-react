import React from 'react'
import { Row, InputGroup, InputGroupText, InputGroupAddon, Input, Button, FormGroup, ListGroup, ListGroupItem, Badge } from 'reactstrap'
const Todolist = (props) => {
    return <React.Fragment>
        {props.todos.length > 0 && (
            <Row className="d-flex justify-content-center">
                <Badge className="w-75 pt-2 pb-2" color="light">{props.title}
                    {" "}<Badge color="dark">{props.todos.length}</Badge>
                </Badge>
            </Row>
        )}
        <Row className="d-flex justify-content-center">
            <ListGroup className="w-75">
                {
                    props.todos.map(({ text, completed, _id }) =>
                        <ListGroupItem key={`todo-list-${_id}`}>
                            <InputGroup>
                                <InputGroupAddon addonType="prepend">
                                    <InputGroupText>
                                        <FormGroup check>
                                            <Input type="checkbox" style={{ transform: "scale(2)", marginTop:-5 }} checked={completed} onChange={() => {
                                                props.updateTodo({ completed: !completed }, _id)
                                            }} />
                                        </FormGroup>
                                    </InputGroupText>
                                </InputGroupAddon>
                                <Input type="text" value={text} onChange={(e) => props.updateTodo({ text: e.target.value }, _id)} />
                                <Button color="danger" size="sm" active onClick={() => props.deleteTodo(_id)}>Remove Todo</Button>
                            </InputGroup>
                        </ListGroupItem>)
                }
            </ListGroup>
        </Row>
    </React.Fragment>
}
export default Todolist