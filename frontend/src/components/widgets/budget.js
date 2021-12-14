import {useEffect, useState} from "react";
import {apiHandler} from "../../modules/requests";
import {Tab, Row, Col, ListGroup, Spinner, Button, Card} from "react-bootstrap";
import _ from 'lodash'


export const BudgetCategories = ({setBudget}) => {
    const [budgetCategories, setBudgetCategories] = useState([])
    const [budgets, setBudgets] = useState([])

    useEffect(() => {
        apiHandler.getData('budget_categories').then(resp => {
            setBudgetCategories(resp)
        })
    }, [])

    const getBudgetList = (category_id) => {
        apiHandler.getData(`budget/?category=${category_id}`).then(resp => {
            setBudgets(resp)
        })
    }

    return (
        <Card>
            <Card.Body>
                <Card.Title>
                    BUDGET CATEGORIES LIST:
                </Card.Title>
                <Card.Text>
                    <Tab.Container id="list-group-tabs-example">
                        <Row>
                            {budgetCategories.map(item => {
                                return (
                                    <>
                                        <Col sm={4}>
                                            <ListGroup>
                                                <ListGroup.Item onClick={() => getBudgetList(item.id)} action href={`#${item.name}`}>
                                                    {item.name}
                                                </ListGroup.Item>
                                            </ListGroup>
                                        </Col>
                                        <Col sm={8}>
                                            <Tab.Content>
                                                <Tab.Pane eventKey={`#${item.name}`}>
                                                    {budgets
                                                        ?
                                                        budgets.map(budget => {
                                                            return (
                                                                <Card onClick={() => setBudget(budget)} className={'mb-2 card-toselect'} body>{budget.name}</Card>
                                                            )
                                                        })
                                                        :
                                                        <Spinner animation="grow" />
                                                    }
                                                </Tab.Pane>
                                            </Tab.Content>
                                        </Col>
                                    </>
                                )
                            })}
                        </Row>
                    </Tab.Container>
                </Card.Text>
            </Card.Body>
        </Card>
    )
}

export const ShareBudgetCategories = ({setBudget}) => {
    const [budgetCategories, setBudgetCategories] = useState([])
    const [budgets, setBudgets] = useState([])

    useEffect(() => {
        apiHandler.getData('shared_budget_categories').then(resp => {
            setBudgetCategories(resp)
        })
    }, [])

    const getBudgetList = (category_id) => {
        apiHandler.getData(`budget/?category=${category_id}`).then(resp => {
            setBudgets(resp)
        })
    }


    return (
        <Card>
            <Card.Body>
                <Card.Title>
                    SHARED BUDGET CATEGORIES LIST:
                </Card.Title>
                <Card.Text>
                    <Tab.Container id="list-group-tabs-example">
                        <Row>
                            {budgetCategories.map(item => {
                                return (
                                    <>
                                        <Col sm={4}>
                                            <ListGroup>
                                                <ListGroup.Item onClick={() => getBudgetList(item.id)} action href={`#${item.name}`}>
                                                    {item.name}
                                                </ListGroup.Item>
                                            </ListGroup>
                                        </Col>
                                        <Col sm={8}>
                                            <Tab.Content>
                                                <Tab.Pane eventKey={`#${item.name}`}>
                                                    {budgets
                                                        ?
                                                        budgets.map(budget => {
                                                            return (
                                                                <Card onClick={() => setBudget(budget)} className={'mb-2 card-toselect'} body>{budget.name}</Card>
                                                            )
                                                        })
                                                        :
                                                        <Spinner animation="grow" />
                                                    }
                                                </Tab.Pane>
                                            </Tab.Content>
                                        </Col>
                                    </>
                                )
                            })}
                        </Row>
                    </Tab.Container>
                </Card.Text>
            </Card.Body>
        </Card>
    )
}

export const BudgetSingleComponent = ({budget}) => {
    const [expenses, setExpenses] = useState(null)
    const [incomes, setIncomes] = useState(null)

    useEffect(() => {
        if (budget) {
            if (budget.expenses) {
                let result = budget.expenses.reduce(function (r, a) {
                    r[a.category.id] = r[a.category.id] || [];
                    r[a.category.id].push(a);
                    return r;
                }, Object.create(null));
                setExpenses(result);
            }
            if (budget.income) {
                let result = budget.income.reduce(function (r, a) {
                    r[a.category.id] = r[a.category.id] || [];
                    r[a.category.id].push(a);
                    return r;
                }, Object.create(null));
                setIncomes(result);
            }
        }
    }, [budget])

    if (budget) {
        return (
            <Card className={'text-start'}>
                <Card.Body>
                    <Card.Title>
                        {budget.name}
                    </Card.Title>
                    <hr/>
                    <Card.Text>
                        <Row>
                            <Col>
                                <Card.Title>Incomes</Card.Title>
                                {
                                    incomes && Object.values(incomes).map(itemArr => {
                                        return itemArr.map(item => {
                                            return (
                                                <Card className={'mb-2 card-toselect'} body>
                                                    <Row>
                                                        <Col>
                                                            {item.name}
                                                        </Col>
                                                        <Col>
                                                            {item.amount} $
                                                        </Col>
                                                    </Row>
                                                </Card>
                                            )
                                        })
                                    })
                                }
                            </Col>
                            <Col>
                                <Card.Title>Expenses</Card.Title>
                                {
                                    expenses && Object.values(expenses).map(itemArr => {
                                        return itemArr.map(item => {
                                            return (
                                                <Card className={'mb-2 card-toselect'} body>
                                                    <Row>
                                                        <Col>
                                                            {item.name}
                                                        </Col>
                                                        <Col>
                                                            {item.amount} $
                                                        </Col>
                                                    </Row>
                                                </Card>
                                            )
                                        })
                                    })
                                }
                            </Col>
                        </Row>
                    </Card.Text>
                </Card.Body>
            </Card>
        )
    } else return null
}