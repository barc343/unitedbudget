import {Card, Col, Container, Row} from "react-bootstrap";
import {BudgetCategories, BudgetSingleComponent, ShareBudgetCategories} from "../widgets/budget";
import {useState} from "react";
import {apiHandler} from "../../modules/requests";
import {formatDate} from "../../modules/utils";
import {PaginationComponent, PaginationExpensesComponent, PaginationIncomesComponent} from "../widgets/pagination";

export const HomeComponent = () => {
    const [budget, setBudget] = useState(null)
    const [sharedStatus, setSharedStatus] = useState()

    // FILTERS
    const [startIncomeDate, setStartIncomeDate] = useState(null);
    const [startExpenseDate, setStartExpenseDate] = useState(null);

    const [endIncomeDate, setEndIncomeDate] = useState(null);
    const [endExpenseDate, setEndExpenseDate] = useState(null);

    const [startIncomeAmount, setStartIncomeAmount] = useState(null);
    const [startExpenseAmount, setStartExpenseAmount] = useState(null);

    const [endIncomeAmount, setEndIncomeAmount] = useState(null);
    const [endExpenseAmount, setEndExpenseAmount] = useState(null);

    //FILTERS END

    // PAGINATION

    const [expensesNext, setExpensesNext] = useState(false)
    const [expensesBack, setExpensesBack] = useState(false)
    const [expensesPage, setExpensesPage] = useState(1)
    const handleExpensePage = (page) => {
        setExpensesPage(page)
        filterByPage(page, 'expense')
    }

    const [incomesNext, setIncomesNext] = useState(false)
    const [incomesBack, setIncomesBack] = useState(false)
    const [incomesPage, setIncomesPage] = useState(1)
    const handleIncomePage = (page) => {
        setIncomesPage(page)
        filterByPage(page, 'income')
    }

    const filterByPage = (page, contextType) => {
        if (contextType === 'expense') {
            apiHandler.getData(`expense/?budget_id=${budget.id}&page=${page}${startExpenseDate ? '&start_date=' + formatDate(startExpenseDate) : ''}${endExpenseDate ? '&end_date=' + formatDate(endExpenseDate) : ''}${startExpenseAmount ? '&start_amount=' + formatDate(startExpenseAmount) : ''}${endExpenseAmount ? '&start_amount=' + formatDate(endExpenseAmount) : ''}`).then(resp => {
                setBudget({...budget, expenses_detail: resp.results})
                if (resp.next) {
                    setExpensesNext(true)
                }
                if (resp.previous) {
                    setExpensesBack(true)
                }
            })
        }
        if (contextType === 'income') {
            apiHandler.getData(`expense/?budget_id=${budget.id}&page=${page}${startIncomeDate ? '&start_date=' + formatDate(startIncomeDate) : ''}${endIncomeDate ? '&end_date=' + formatDate(endIncomeDate) : ''}${startIncomeAmount ? '&start_amount=' + formatDate(startIncomeAmount) : ''}${endIncomeAmount ? '&start_amount=' + formatDate(endIncomeAmount) : ''}`).then(resp => {
                setBudget({...budget, income_detail: resp.results})
                if (resp.next) {
                    setIncomesNext(true)
                }
                if (resp.previous) {
                    setIncomesBack(true)
                }
            })
        }
    }

    // END PAGINATION

    const filterByDate = (date, filterType, contextType) => {
        if (contextType === 'expense') {
            if (filterType === 'start') {
                if (!endExpenseDate) {
                    apiHandler.getData(`expense/?budget_id=${budget.id}&page=${expensesPage}&start_date=${formatDate(date)}`).then(resp => {
                        setStartExpenseDate(date)
                        setBudget({...budget, expenses_detail: resp.results})
                        if (resp.next) {
                            setExpensesNext(true)
                        }
                        if (resp.previous) {
                            setExpensesBack(true)
                        }
                    })
                } else {
                    apiHandler.getData(`expense/?budget_id=${budget.id}&start_date=${formatDate(date)}&end_date=${formatDate(endExpenseDate)}`).then(resp => {
                        setStartExpenseDate(date)
                        setBudget({...budget, expenses_detail: resp.results})
                    })
                }
            }
            if (filterType === 'end') {
                if (!startExpenseDate) {
                    apiHandler.getData(`expense/?budget_id=${budget.id}&end_date=${formatDate(date)}`).then(resp => {
                        setEndExpenseDate(date)
                        setBudget({...budget, expenses_detail: resp.results})
                    })
                } else {
                    apiHandler.getData(`expense/?budget_id=${budget.id}&start_date=${formatDate(startExpenseDate)}&end_date=${formatDate(date)}`).then(resp => {
                        setEndExpenseDate(date)
                        setBudget({...budget, expenses_detail: resp.results})
                    })
                }
            }
        }
        if (contextType === 'incomes') {
            if (filterType === 'start') {
                if (!endIncomeDate) {
                    apiHandler.getData(`income/?budget_id=${budget.id}&start_date=${formatDate(date)}`).then(resp => {
                        setStartIncomeDate(date)
                        setBudget({...budget, income_detail: resp.results})
                    })
                } else {
                    apiHandler.getData(`income/?budget_id=${budget.id}&start_date=${formatDate(date)}&end_date=${formatDate(endIncomeDate)}`).then(resp => {
                        setStartIncomeDate(date)
                        setBudget({...budget, income_detail: resp.results})
                    })
                }
            }
            if (filterType === 'end') {
                if (!startIncomeDate) {
                    apiHandler.getData(`income/?budget_id=${budget.id}&end_date=${formatDate(date)}`).then(resp => {
                        setEndIncomeDate(date)
                        setBudget({...budget, income_detail: resp.results})
                    })
                } else {
                    apiHandler.getData(`income/?budget_id=${budget.id}&start_date=${formatDate(startIncomeDate)}&end_date=${formatDate(date)}`).then(resp => {
                        setEndIncomeDate(date)
                        setBudget({...budget, income_detail: resp.results})
                    })
                }
            }
        }
    }

    const filterByAmount = (amount, filterType, contextType) => {
        if (contextType === 'expense') {
            if (filterType === 'start') {
                if (!endExpenseAmount) {
                    apiHandler.getData(`expense/?budget_id=${budget.id}&start_amount=${amount}`).then(resp => {
                        setStartExpenseAmount(amount)
                        setBudget({...budget, expenses_detail: resp.results})
                    })
                } else {
                    apiHandler.getData(`expense/?budget_id=${budget.id}&start_amount=${amount}&end_amount=${endExpenseAmount}`).then(resp => {
                        setStartExpenseAmount(amount)
                        setBudget({...budget, expenses_detail: resp.results})
                    })
                }
            }
            if (filterType === 'end') {
                if (!startExpenseAmount) {
                    apiHandler.getData(`expense/?budget_id=${budget.id}&end_amount=${amount}`).then(resp => {
                        setEndExpenseAmount(amount)
                        setBudget({...budget, expenses_detail: resp.results})
                    })
                } else {
                    apiHandler.getData(`expense/?budget_id=${budget.id}&start_amount=${startExpenseAmount}&end_amount=${amount}`).then(resp => {
                        setEndExpenseAmount(amount)
                        setBudget({...budget, expenses_detail: resp.results})
                    })
                }
            }
        }
        if (contextType === 'incomes') {
            if (filterType === 'start') {
                if (!endIncomeDate) {
                    apiHandler.getData(`income/?budget_id=${budget.id}&start_amount=${amount}`).then(resp => {
                        setStartIncomeAmount(amount)
                        setBudget({...budget, income_detail: resp.results})
                    })
                } else {
                    apiHandler.getData(`income/?budget_id=${budget.id}&start_amount=${amount}&end_amount=${endIncomeAmount}`).then(resp => {
                        setStartIncomeAmount(amount)
                        setBudget({...budget, income_detail: resp.results})
                    })
                }
            }
            if (filterType === 'end') {
                if (!startIncomeDate) {
                    apiHandler.getData(`income/?budget_id=${budget.id}&end_amount=${amount}`).then(resp => {
                        setEndIncomeAmount(amount)
                        setBudget({...budget, income_detail: resp.results})
                    })
                } else {
                    apiHandler.getData(`income/?budget_id=${budget.id}&start_amount=${startIncomeAmount}&end_amount=${amount}`).then(resp => {
                        setEndIncomeAmount(amount)
                        setBudget({...budget, income_detail: resp.results})
                    })
                }
            }
        }
    }

    return (
        <div>
            <Container>
                <Row>
                    <Col className={'p-3'}>
                        <BudgetCategories setBudget={setBudget} setSharedStatus={setSharedStatus}/>
                    </Col>
                    <Col className={'p-3'}>
                        <ShareBudgetCategories setBudget={setBudget} setSharedStatus={setSharedStatus}/>
                    </Col>
                </Row>
                <Row>
                    <Col className={'p-3'}>
                        <BudgetSingleComponent startIncomeDate={startIncomeDate} startExpenseDate={startExpenseDate}
                                               filterByDate={filterByDate} endIncomeDate={endIncomeDate}
                                               endExpenseDate={endExpenseDate}
                                               startIncomeAmount={startIncomeAmount}
                                               startExpenseAmount={startExpenseAmount}
                                               filterByAmount={filterByAmount} endIncomeAmount={endIncomeAmount}
                                               endExpenseAmount={endExpenseAmount}
                                               budget={budget} setBudget={setBudget}
                                               sharedStatus={sharedStatus}/>
                    </Col>
                </Row>
                <Row className={'mb-3'}>
                    <Col>
                        <PaginationIncomesComponent incomesPage={incomesPage} handleIncomePage={handleExpensePage}
                                                    incomesNext={incomesNext} incomesBack={incomesBack}/>
                    </Col>
                    <Col>
                        <PaginationExpensesComponent expensesPage={expensesPage} handleExpensePage={handleExpensePage}
                                                     expensesNext={expensesNext} expensesBack={expensesBack}/>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}