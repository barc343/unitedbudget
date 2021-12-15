import {Card, Col, Container, Row} from "react-bootstrap";
import {BudgetCategories, BudgetSingleComponent, ShareBudgetCategories} from "../widgets/budget";
import {useState} from "react";


export const HomeComponent = () => {
    const [budget, setBudget] = useState(null)
    const [sharedStatus, setSharedStatus] = useState()
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
                        <BudgetSingleComponent budget={budget} setBudget={setBudget} sharedStatus={sharedStatus}/>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}