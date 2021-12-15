import {useEffect, useState} from "react";
import {apiHandler} from "../../modules/requests";
import {Tab, Row, Col, ListGroup, Spinner, Button, Card, Badge} from "react-bootstrap";
import {PencilSquare, XCircle} from 'react-bootstrap-icons';
import {
    BudgetCategoryModal,
    CreateBudgetCategoryModal,
    CreateBudgetModal, CreateExpenseCategoryModal, CreateExpenseModal, CreateIncomeCategoryModal,
    CreateIncomeModal,
    EditBudgetCategoryModal, EditExpenseCategoryModal, EditIncomeCategoryModal
} from "./modals";


const IncomeExpenseSumComponent = ({incomesSum, expensesSum, incomesExpensesSumResult}) => {
    console.log(incomesSum)
    console.log(expensesSum)
    console.log(incomesExpensesSumResult)
    if (incomesSum && expensesSum) {
        return (
            <div>
                <Badge className={'sum-badge'} pill bg="success">
                    {incomesSum}
                </Badge>
                {' '}-{' '}
                <Badge className={'sum-badge'} pill bg="danger">
                    {expensesSum}
                </Badge>
                {' '}={' '}
                <Badge className={'sum-badge'} pill bg="info">
                    {incomesExpensesSumResult}
                </Badge>
            </div>
        )
    }
    if (!incomesSum && expensesSum) {
        return (
            <div>
                <Badge className={'sum-badge'} pill bg="danger">
                    {expensesSum}
                </Badge>
                {' '}={' '}
                <Badge className={'sum-badge'} pill bg="info">
                    {incomesExpensesSumResult}
                </Badge>
            </div>
        )
    }
    if (!expensesSum && incomesSum) {
        return (
            <div>
                <Badge className={'sum-badge'} pill bg="success">
                    {incomesSum}
                </Badge>
                {' '}={' '}
                <Badge className={'sum-badge'} pill bg="info">
                    {incomesExpensesSumResult}
                </Badge>
            </div>
        )
    }
    return null
}


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

    const refreshData = () => {
        apiHandler.getData('budget_categories').then(resp => {
            setBudgetCategories(resp)
            getBudgetList(selectedBudgetCategory)
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
            <EditBudgetCategoryModal refreshData={refreshData} budgetCategory={selectedBudgetCategory} show={budgetCategoryModalShow} handleClose={handleCloseBudgetCategoryModal}/>
            <CreateBudgetCategoryModal refreshData={refreshData} handleClose={handleCloseCreateBudgetCategoryModal} show={createBudgetCategoryModalShow}/>
            <CreateBudgetModal refreshData={refreshData} budgetCategory={selectedBudgetCategory} show={createBudgetModalShow} handleClose={handleCloseCreateBudgetModal}/>
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

export const BudgetSingleComponent = ({budget, setBudget, sharedStatus}) => {
    const [expenses, setExpenses] = useState(null)
    const [incomes, setIncomes] = useState(null)
    const [incomesSum, setIncomesSum] = useState(0)
    const [expensesSum, setExpensesSum] = useState(0)
    const [incomesExpensesSumResult, setIncomesExpensesSumResult] = useState(0)
    const [selectedIncomeExpenseCategory, setSelectedIECategory] = useState(null)

    const [createIncomeModalShow, setCreateIncomeModalShow] = useState(false)
    const handleCloseCreateIncomeModal = () => setCreateIncomeModalShow(false)
    const handleOpenCreateIncomeModal = () => setCreateIncomeModalShow(true)

    const [createIncomeCategoryModalShow, setCreateIncomeCategoryModalShow] = useState(false)
    const handleCloseCreateIncomeCategoryModal = () => setCreateIncomeCategoryModalShow(false)
    const handleOpenCreateIncomeCategoryModal = () => setCreateIncomeCategoryModalShow(true)

    const [createExpenseModalShow, setCreateExpenseModalShow] = useState(false)
    const handleCloseCreateExpenseModal = () => setCreateExpenseModalShow(false)
    const handleOpenCreateExpenseModal = () => setCreateExpenseModalShow(true)

    const [createExpenseCategoryModalShow, setCreateExpenseCategoryModalShow] = useState(false)
    const handleCloseCreateExpenseCategoryModal = () => setCreateExpenseCategoryModalShow(false)
    const handleOpenCreateExpenseCategoryModal = () => setCreateExpenseCategoryModalShow(true)

    const [editExpenseCategoryModalShow, setEditExpenseCategoryModalShow] = useState(false)
    const handleCloseEditExpenseCategoryModal = () => setEditExpenseCategoryModalShow(false)
    const handleOpenEditExpenseCategoryModal = (category) => {
        setSelectedIECategory(category)
        setEditExpenseCategoryModalShow(true)
    }

    const [editIncomeCategoryModalShow, setEditIncomeCategoryModalShow] = useState(false)
    const handleCloseEditIncomeCategoryModal = () => setEditIncomeCategoryModalShow(false)
    const handleOpenEditIncomeCategoryModal = (category) => {
        setSelectedIECategory(category)
        setEditIncomeCategoryModalShow(true)
    }

    useEffect(() => {
        if (budget) {
            if (budget.expenses) {
                let result = budget.expenses_detail.reduce(function (r, a) {
                    r[a.category_detail.id] = r[a.category_detail.id] || [];
                    r[a.category_detail.id].push(a);
                    return r;
                }, Object.create(null));
                setExpenses(result);
            }
            if (budget.income) {
                let result = budget.income_detail.reduce(function (r, a) {
                    r[a.category_detail.id] = r[a.category_detail.id] || [];
                    r[a.category_detail.id].push(a);
                    return r;
                }, Object.create(null));
                setIncomes(result);
            }

            const sumIncomesExpenses = () => {
                let incomesSumResult = budget.income_detail.length > 0 && budget.income_detail.map(item => parseFloat(item.amount)).reduce((prev, next) => prev + next).toFixed(2)
                setIncomesSum(incomesSumResult)
                let expensesSumResult = budget.expenses_detail.length > 0 && budget.expenses_detail.map(item => parseFloat(item.amount)).reduce((prev, next) => prev + next).toFixed(2)
                setExpensesSum(expensesSumResult)
                let sumResult = incomesSumResult - expensesSumResult
                setIncomesExpensesSumResult(sumResult.toFixed(2))
            }

            sumIncomesExpenses()
        }
    }, [budget])

    const refreshData = () => {
        apiHandler.getData(`budget/${budget.id}`).then(resp => {
            setBudget(resp)
        })
    }

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
                            <Col md={8}>
                                <Row>
                                    <Col md={4} className={'align-self-center'}>
                                        {budget.name}
                                    </Col>
                                    <Col md={8}>
                                        <IncomeExpenseSumComponent expensesSum={expensesSum} incomesSum={incomesSum} incomesExpensesSumResult={incomesExpensesSumResult}/>
                                    </Col>
                                </Row>
                            </Col>
                            {!sharedStatus &&
                            <Col md={4} className={'text-end'}>
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
                                        <Button onClick={handleOpenCreateIncomeCategoryModal} size={'sm'}>Add income category</Button>{' '}
                                        <Button onClick={handleOpenCreateIncomeModal} size={'sm'}>Add income</Button>
                                    </Col>
                                    }
                                </Row>
                                {
                                    incomes && Object.values(incomes).map(itemArr => {
                                        return (
                                            <div>
                                                <p className={'h6'}>{itemArr[0].category_detail.name} {!sharedStatus && <PencilSquare className={'clickable-icon'} onClick={() => handleOpenEditIncomeCategoryModal(itemArr[0].category_detail)}/>}</p>
                                                {
                                                    itemArr.map(item => {
                                                        return (
                                                            <Card className={'mb-2 card-toselect'} body>
                                                                <Row>
                                                                    <Col>
                                                                        {item.name}
                                                                    </Col>
                                                                    <Col className={'text-end'}>
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
                                        <Button onClick={handleOpenCreateExpenseCategoryModal} size={'sm'}>Add expense category</Button>{' '}
                                        <Button onClick={handleOpenCreateExpenseModal} size={'sm'}>Add expense</Button>
                                    </Col>
                                    }
                                </Row>
                                {
                                    expenses && Object.values(expenses).map(itemArr => {
                                        return (
                                            <div>
                                                <p className={'h6'}>{itemArr[0].category_detail.name} {!sharedStatus && <PencilSquare className={'clickable-icon'} onClick={() => handleOpenEditExpenseCategoryModal(itemArr[0].category_detail)}/>}</p>
                                                {
                                                    itemArr.map(item => {
                                                        return (
                                                            <Card className={'mb-2 card-toselect'} body>
                                                                <Row>
                                                                    <Col>
                                                                        {item.name}
                                                                    </Col>
                                                                    <Col className={'text-end'}>
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
                <CreateIncomeModal refreshData={refreshData} budget={budget} show={createIncomeModalShow} handleClose={handleCloseCreateIncomeModal}/>
                <CreateExpenseModal refreshData={refreshData} budget={budget} show={createExpenseModalShow} handleClose={handleCloseCreateExpenseModal}/>
                <CreateExpenseCategoryModal refreshData={refreshData} show={createExpenseCategoryModalShow} handleClose={handleCloseCreateExpenseCategoryModal}/>
                <CreateIncomeCategoryModal refreshData={refreshData} show={createIncomeCategoryModalShow} handleClose={handleCloseCreateIncomeCategoryModal}/>
                <EditExpenseCategoryModal refreshData={refreshData} show={editExpenseCategoryModalShow} handleClose={handleCloseEditExpenseCategoryModal} category={selectedIncomeExpenseCategory}/>
                <EditIncomeCategoryModal refreshData={refreshData} show={editIncomeCategoryModalShow} handleClose={handleCloseEditIncomeCategoryModal} category={selectedIncomeExpenseCategory}/>
            </Card>
        )
    } else return null
}