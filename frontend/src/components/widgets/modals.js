import {Button, Form, Modal} from "react-bootstrap";
import {useEffect, useRef, useState} from "react";
import {apiHandler} from "../../modules/requests";
import {CheckBoxMultiSelect} from "./checkBoxMultiSelect";
import {getDataFromFormRef} from "../../modules/utils";

export const EditBudgetCategoryModal = ({show, handleClose, budgetCategory}) => {
    const [userList, setUserList] = useState([])
    const [checkedUsers, setCheckedUsers] = useState([])
    const form = useRef(null)

    const handleSubmit = (e) => {
        e.preventDefault()
        let data = getDataFromFormRef(form)
        data['shared_users'] = checkedUsers
        apiHandler.patchData(`budget_categories/${budgetCategory.id}/`, data).then(resp => {
            console.log(resp)
            handleClose()
        })
    }

    useEffect(() => {
        apiHandler.getData('user').then(resp => {
            setUserList(resp)
        })
        if (budgetCategory && budgetCategory.shared_users.length > 0) {
            let sharedUserArr = []
            for (let item of budgetCategory.shared_users) {
                sharedUserArr.push(item.toString())
            }
            setCheckedUsers(sharedUserArr)
            console.log(checkedUsers)
        }
    }, [budgetCategory])

    if (budgetCategory) {
        return (
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{budgetCategory.name}</Modal.Title>
                </Modal.Header>
                <Form onSubmit={(e) => handleSubmit(e)} ref={form}>
                <Modal.Body>
                        <Form.Group className="mb-3" controlId="name">
                            <Form.Label>Name</Form.Label>
                            <Form.Control defaultValue={budgetCategory.name} name={'name'} type="text" placeholder="Change name" />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="desc">
                            <Form.Label>Description</Form.Label>
                            <Form.Control defaultValue={budgetCategory.description} name={'description'} as="textarea" rows={4} type="text" placeholder="Change description" />
                        </Form.Group>

                    {userList.length > 0 && <CheckBoxMultiSelect setCheckedFields={setCheckedUsers} checkedFields={checkedUsers} options={userList} label={'username'} title={'Share to user'}/>}

                </Modal.Body>
                <Modal.Footer>
                    <Button type={'submit'} variant="primary">
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Form>
            </Modal>
        )
    } else return null
}

export const CreateBudgetCategoryModal = ({show, handleClose}) => {
    const [userList, setUserList] = useState([])
    const [checkedUsers, setCheckedUsers] = useState([])
    const form = useRef(null)

    const handleSubmit = (e) => {
        e.preventDefault()
        let data = getDataFromFormRef(form)
        data['shared_users'] = checkedUsers
        apiHandler.postData(`budget_categories/`, data).then(resp => {
            console.log(resp)
            handleClose()
        })
    }

    useEffect(() => {
        apiHandler.getData('user').then(resp => {
            setUserList(resp)
        })
    }, [])

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Add budget category</Modal.Title>
            </Modal.Header>
            <Form onSubmit={(e) => handleSubmit(e)} ref={form}>
                <Modal.Body>
                    <Form.Group className="mb-3" controlId="name">
                        <Form.Label>Name</Form.Label>
                        <Form.Control name={'name'} type="text" placeholder="Change name" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="desc">
                        <Form.Label>Description</Form.Label>
                        <Form.Control name={'description'} as="textarea" rows={4} type="text" placeholder="Change description" />
                    </Form.Group>

                    {userList.length > 0 && <CheckBoxMultiSelect setCheckedFields={setCheckedUsers} checkedFields={checkedUsers} options={userList} label={'username'} title={'Share to user'}/>}

                </Modal.Body>
                <Modal.Footer>
                    <Button type={'submit'} variant="primary">
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    )
}

export const CreateBudgetModal = ({show, handleClose, budgetCategory}) => {
    const form = useRef(null)
    const [expenses, setExpenses] = useState([])
    const [incomes, setIncomes] = useState([])

    const handleSubmit = (e) => {
        e.preventDefault()
        let data = getDataFromFormRef(form)
        data['category'] = budgetCategory.id
        apiHandler.postData(`budget/`, data).then(resp => {
            console.log(resp)
            handleClose()
        })
    }

    if (budgetCategory) {
        return (
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add budget in category: {budgetCategory.name}</Modal.Title>
                </Modal.Header>
                <Form onSubmit={(e) => handleSubmit(e)} ref={form}>
                    <Modal.Body>
                        <Form.Group className="mb-3" controlId="name">
                            <Form.Label>Name</Form.Label>
                            <Form.Control name={'name'} type="text" placeholder="Change name" />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="desc">
                            <Form.Label>Description</Form.Label>
                            <Form.Control name={'description'} as="textarea" rows={4} type="text" placeholder="Change description" />
                        </Form.Group>

                        {/*{userList.length > 0 && <CheckBoxMultiSelect setCheckedFields={setCheckedUsers} checkedFields={checkedUsers} options={userList} label={'username'} title={'Share to user'}/>}*/}

                    </Modal.Body>
                    <Modal.Footer>
                        <Button type={'submit'} variant="primary">
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        )
    } else return null
}