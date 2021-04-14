import React from 'react'
import { Row, InputGroup, InputGroupText, InputGroupAddon, Input, Col, Card, CardBody, Button, FormGroup, ListGroup, ListGroupItem, Badge, Label } from 'reactstrap'
const Todolist = (props) => {
    return <React.Fragment>
        <h4 className="d-flex justify-content-center">{props.title}</h4>
        <Row className="d-flex justify-content-center">
            <ListGroup className="w-75">
                {
                    props.todos.map(({ text, completed, _id }) =>
                        <ListGroupItem key={`todo-list-${_id}`} className="justify-content-between">
                            <InputGroup>
                                <InputGroupAddon addonType="prepend">
                                    <InputGroupText>
                                        <FormGroup check>
                                            <Input type="checkbox" checked={completed} onChange={() => {
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