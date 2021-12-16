import {Card, Col, Container, Row} from "react-bootstrap";
import {BudgetCategories, BudgetSingleComponent, ShareBudgetCategories} from "../widgets/budget";
import {useState} from "react";
import {apiHandler} from "../../modules/requests";
import {formatDate} from "../../modules/utils";

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

    const filterByDate = (date, filterType, contextType) => {
        if (contextType === 'expense') {
            if (filterType === 'start') {
                if (!endExpenseDate) {
                    apiHandler.getData(`expense/?budget_id=${budget.id}&start_date=${formatDate(date)}`).then(resp => {
                        setStartExpenseDate(date)
                        setBudget({...budget, expenses_detail: resp})
                    })
                } else {
                    apiHandler.getData(`expense/?budget_id=${budget.id}&start_date=${formatDate(date)}&end_date=${formatDate(endExpenseDate)}`).then(resp => {
                        setStartExpenseDate(date)
                        setBudget({...budget, expenses_detail: resp})
                    })
                }
            }
            if (filterType === 'end') {
                if (!startExpenseDate) {
                    apiHandler.getData(`expense/?budget_id=${budget.id}&end_date=${formatDate(date)}`).then(resp => {
                        setEndExpenseDate(date)
                        setBudget({...budget, expenses_detail: resp})
                    })
                } else {
                    apiHandler.getData(`expense/?budget_id=${budget.id}&start_date=${formatDate(startExpenseDate)}&end_date=${formatDate(date)}`).then(resp => {
                        setEndExpenseDate(date)
                        setBudget({...budget, expenses_detail: resp})
                    })
                }
            }
        }
        if (contextType === 'incomes') {
            if (filterType === 'start') {
                if (!endIncomeDate) {
                    apiHandler.getData(`income/?budget_id=${budget.id}&start_date=${formatDate(date)}`).then(resp => {
                        setStartIncomeDate(date)
                        setBudget({...budget, income_detail: resp})
                    })
                } else {
                    apiHandler.getData(`income/?budget_id=${budget.id}&start_date=${formatDate(date)}&end_date=${formatDate(endIncomeDate)}`).then(resp => {
                        setStartIncomeDate(date)
                        setBudget({...budget, income_detail: resp})
                    })
                }
            }
            if (filterType === 'end') {
                if (!startIncomeDate) {
                    apiHandler.getData(`income/?budget_id=${budget.id}&end_date=${formatDate(date)}`).then(resp => {
                        setEndIncomeDate(date)
                        setBudget({...budget, income_detail: resp})
                    })
                } else {
                    apiHandler.getData(`income/?budget_id=${budget.id}&start_date=${formatDate(startIncomeDate)}&end_date=${formatDate(date)}`).then(resp => {
                        setEndIncomeDate(date)
                        setBudget({...budget, income_detail: resp})
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
                        setBudget({...budget, expenses_detail: resp})
                    })
                } else {
                    apiHandler.getData(`expense/?budget_id=${budget.id}&start_amount=${amount}&end_amount=${endExpenseAmount}`).then(resp => {
                        setStartExpenseAmount(amount)
                        setBudget({...budget, expenses_detail: resp})
                    })
                }
            }
            if (filterType === 'end') {
                if (!startExpenseAmount) {
                    apiHandler.getData(`expense/?budget_id=${budget.id}&end_amount=${amount}`).then(resp => {
                        setEndExpenseAmount(amount)
                        setBudget({...budget, expenses_detail: resp})
                    })
                } else {
                    apiHandler.getData(`expense/?budget_id=${budget.id}&start_amount=${startExpenseAmount}&end_amount=${amount}`).then(resp => {
                        setEndExpenseAmount(amount)
                        setBudget({...budget, expenses_detail: resp})
                    })
                }
            }
        }
        if (contextType === 'incomes') {
            if (filterType === 'start') {
                if (!endIncomeDate) {
                    apiHandler.getData(`income/?budget_id=${budget.id}&start_amount=${amount}`).then(resp => {
                        setStartIncomeAmount(amount)
                        setBudget({...budget, income_detail: resp})
                    })
                } else {
                    apiHandler.getData(`income/?budget_id=${budget.id}&start_amount=${amount}&end_amount=${endIncomeAmount}`).then(resp => {
                        setStartIncomeAmount(amount)
                        setBudget({...budget, income_detail: resp})
                    })
                }
            }
            if (filterType === 'end') {
                if (!startIncomeDate) {
                    apiHandler.getData(`income/?budget_id=${budget.id}&end_amount=${amount}`).then(resp => {
                        setEndIncomeAmount(amount)
                        setBudget({...budget, income_detail: resp})
                    })
                } else {
                    apiHandler.getData(`income/?budget_id=${budget.id}&start_amount=${startIncomeAmount}&end_amount=${amount}`).then(resp => {
                        setEndIncomeAmount(amount)
                        setBudget({...budget, income_detail: resp})
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
                                               startIncomeAmount={startIncomeAmount} startExpenseAmount={startExpenseAmount}
                                               filterByAmount={filterByAmount} endIncomeAmount={endIncomeAmount}
                                               endExpenseAmount={endExpenseAmount}
                                               budget={budget} setBudget={setBudget}
                                               sharedStatus={sharedStatus}/>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}