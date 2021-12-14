import {Card, Col, Container, Row} from "react-bootstrap";
import {BudgetCategories, BudgetSingleComponent, ShareBudgetCategories} from "../widgets/budget";
import {useState} from "react";


export const HomeComponent = () => {
    const [budget, setBudget] = useState(null)
    return (
        <div>
            <Container>
                <Row>
                    <Col className={'p-3'}>
                        <BudgetCategories setBudget={setBudget}/>
                    </Col>
                    <Col className={'p-3'}>
                        <ShareBudgetCategories setBudget={setBudget}/>
                    </Col>
                </Row>
                <Row>
                    <Col className={'p-3'}>
                        <BudgetSingleComponent budget={budget}/>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}