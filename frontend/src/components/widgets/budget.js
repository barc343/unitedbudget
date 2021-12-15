import {useEffect, useState} from "react";
import {apiHandler} from "../../modules/requests";
import {Tab, Row, Col, ListGroup, Spinner, Button, Card} from "react-bootstrap";
import {PencilSquare, XCircle} from 'react-bootstrap-icons';
import {BudgetCategoryModal, CreateBudgetCategoryModal, CreateBudgetModal, EditBudgetCategoryModal} from "./modals";


export const BudgetCategories = ({setBudget, setSharedStatus}) => {
    const [budgetCategories, setBudgetCategories] = useState([])
    const [budgets, setBudgets] = useState([])

    const [selectedBudgetCategory, setSelectedBudgetCategory] = useState(null)
    const [budgetCategoryModalShow, setBudgetCategoryModalShow] = useState(false)
    const handleCloseBudgetCategoryModal = () => setBudgetCategoryModalShow(false)
    const handleOpenBudgetCategoryModal = () => setBudgetCategoryModalShow(true)

    const [createBudgetCategoryModalShow, setCreateBudgetCategoryModalShow] = useState(false)
    const handleCloseCreateBudgetCategoryModal = () => setCreateBudgetCategoryModalShow(false)
    const handleOpenCreateBudgetCategoryModal = () => setCreateBudgetCategoryModalShow(true)

    const [createBudgetModalShow, setCreateBudgetModalShow] = useState(false)
    const handleCloseCreateBudgetModal = () => setCreateBudgetModalShow(false)
    const handleOpenCreateBudgetModal = () => setCreateBudgetModalShow(true)

    useEffect(() => {
        apiHandler.getData('budget_categories').then(resp => {
            setBudgetCategories(resp)
        })
    }, [])

    const getBudgetList = (category) => {
        apiHandler.getData(`budget/?category=${category.id}`).then(resp => {
            setBudgets(resp)
            setSelectedBudgetCategory(category)
        })
    }

    const handleSetBudget = (budget) => {
        setBudget(budget)
        setSharedStatus(false)
    }

    return (
        <Card>
            <Card.Body>
                <Row className={'mb-3'}>
                    <Col>
                        <Card.Title>
                            BUDGET CATEGORIES LIST:
                        </Card.Title>
                    </Col>
                    <Col>
                        <Col className={'text-end'}>
                            <Button onClick={handleOpenCreateBudgetCategoryModal} size={'sm'}>Add budget category</Button>
                        </Col>
                    </Col>
                </Row>
                <Card.Text>
                    <Tab.Container id="list-group-tabs-example">
                        <Row>
                            {budgetCategories.map(item => {
                                return (
                                    <>
                                        <Col sm={4}>
                                            <ListGroup>
                                                <ListGroup.Item className={'mb-2'} onClick={() => getBudgetList(item)} action href={`#${item.name}`}>
                                                    {item.name} <a onClick={() => handleOpenBudgetCategoryModal(item)} className={'float-end text-white'}><PencilSquare/></a>
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
                                                                <Card onClick={() => handleSetBudget(budget)} className={'mb-2 card-toselect'} body>{budget.name}</Card>
                                                            )
                                                        })
                                                        :
                                                        <Spinner animation="grow" />
                                                    }
                                                    <Button variant={'link'} onClick={handleOpenCreateBudgetModal} body>add new budget</Button>
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
            <EditBudgetCategoryModal budgetCategory={selectedBudgetCategory} show={budgetCategoryModalShow} handleClose={handleCloseBudgetCategoryModal}/>
            <CreateBudgetCategoryModal handleClose={handleCloseCreateBudgetCategoryModal} show={createBudgetCategoryModalShow}/>
            <CreateBudgetModal budgetCategory={selectedBudgetCategory} show={createBudgetModalShow} handleClose={handleCloseCreateBudgetModal}/>
        </Card>
    )
}

export const ShareBudgetCategories = ({setBudget, setSharedStatus}) => {
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

    const handleSetBudget = (budget) => {
        setBudget(budget)
        setSharedStatus(true)
    }


    return (
        <Card>
            <Card.Body>
                <Row className={'mb-3'}>
                    <Col>
                        <Card.Title>
                            SHARED BUDGET CATEGORIES LIST:
                        </Card.Title>
                    </Col>
                </Row>
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
                                                                <Card onClick={() => handleSetBudget(budget)} className={'mb-2 card-toselect'} body>{budget.name}</Card>
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

export const BudgetSingleComponent = ({budget, sharedStatus}) => {
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

    const deleteBudget = () => {
        if (window.confirm('Are you sure you want to delete this budget?')) {
            apiHandler.deleteData(`budget/${budget.id}`).then(resp => {
                alert('successfully deleted')
            })
        } else {
            console.log('Budget was not deleted.');
        }
    }

    if (budget) {
        return (
            <Card className={'text-start'}>
                <Card.Body>
                    <Card.Title>
                        <Row>
                            <Col>
                                {budget.name}
                            </Col>
                            {!sharedStatus &&
                            <Col className={'text-end'}>
                                <Button onClick={deleteBudget} size={'sm'} variant={"danger"}><XCircle/></Button>
                            </Col>
                            }
                        </Row>
                    </Card.Title>
                    <hr/>
                    <Card.Text>
                        <Row>
                            <Col>
                                <Row className={'mb-2'}>
                                    <Col>
                                        <Card.Title>Incomes</Card.Title>
                                    </Col>
                                    {!sharedStatus &&
                                    <Col className={'text-end'}>
                                        <Button size={'sm'}>Add income</Button>
                                    </Col>
                                    }
                                </Row>
                                {
                                    incomes && Object.values(incomes).map(itemArr => {
                                        return (
                                            <div>
                                                <p className={'h6'}>{itemArr[0].category.name}</p>
                                                {
                                                    itemArr.map(item => {
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
                                                }
                                            </div>
                                        )
                                    })
                                }
                            </Col>
                            <Col>
                                <Row className={'mb-2'}>
                                    <Col>
                                        <Card.Title>Expenses</Card.Title>
                                    </Col>
                                    {!sharedStatus &&
                                    <Col className={'text-end'}>
                                        <Button size={'sm'}>Add expense</Button>
                                    </Col>
                                    }
                                </Row>
                                {
                                    expenses && Object.values(expenses).map(itemArr => {
                                        return (
                                            <div>
                                                <p className={'h6'}>{itemArr[0].category.name}</p>
                                                {
                                                    itemArr.map(item => {
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
                                                }
                                            </div>
                                        )
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