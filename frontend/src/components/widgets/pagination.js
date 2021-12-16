import {Button, Col, Row} from "react-bootstrap";
import {ArrowLeft, ArrowRight} from "react-bootstrap-icons";


export const PaginationExpensesComponent = ({expensesNext, expensesBack, expensesPage, handleExpensePage}) => {
    return (
        <Row>
            <Col>
                {expensesBack &&
                    <Button onClick={() => handleExpensePage(expensesPage - 1, 'expense')} variant={'light'}><ArrowLeft/></Button>
                }
            </Col>
            <Col className={'text-end'}>
                {expensesNext &&
                    <Button onClick={() => handleExpensePage(expensesPage + 1, 'expense')} variant={'light'}><ArrowRight/></Button>
                }
            </Col>
        </Row>
    )
}

export const PaginationIncomesComponent = ({incomesNext, incomesBack, incomesPage, handleIncomePage}) => {
    return (
        <Row>
            <Col>
                {incomesBack &&
                <Button onClick={() => handleIncomePage(incomesPage - 1, 'expense')} variant={'light'}><ArrowLeft/></Button>
                }
            </Col>
            <Col className={'text-end'}>
                {incomesNext &&
                <Button onClick={() => handleIncomePage(incomesPage + 1, 'expense')} variant={'light'}><ArrowRight/></Button>
                }
            </Col>
        </Row>
    )
}