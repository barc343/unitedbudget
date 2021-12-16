import {Button, FloatingLabel, Form, Modal} from "react-bootstrap";
import {useEffect, useRef, useState} from "react";
import {apiHandler} from "../../modules/requests";
import {CheckBoxMultiSelect} from "./checkBoxMultiSelect";
import {getDataFromFormRef} from "../../modules/utils";

export const EditBudgetCategoryModal = ({show, handleClose, budgetCategory, refreshData}) => {
    const [userList, setUserList] = useState([])
    const [checkedUsers, setCheckedUsers] = useState([])
    const form = useRef(null)

    const handleSubmit = (e) => {
        e.preventDefault()
        let data = getDataFromFormRef(form)
        data['shared_users'] = checkedUsers
        apiHandler.patchData(`budget_categories/${budgetCategory.id}/`, data).then(resp => {
            refreshData()
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

export const CreateBudgetCategoryModal = ({show, handleClose, refreshData}) => {
    const [userList, setUserList] = useState([])
    const [checkedUsers, setCheckedUsers] = useState([])
    const form = useRef(null)

    const handleSubmit = (e) => {
        e.preventDefault()
        let data = getDataFromFormRef(form)
        data['shared_users'] = checkedUsers
        apiHandler.postData(`budget_categories/`, data).then(resp => {
            refreshData()
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

export const CreateBudgetModal = ({show, handleClose, budgetCategory, refreshData}) => {
    const form = useRef(null)
    const [expenses, setExpenses] = useState([])
    const [incomes, setIncomes] = useState([])

    const handleSubmit = (e) => {
        e.preventDefault()
        let data = getDataFromFormRef(form)
        data['category'] = budgetCategory.id
        apiHandler.postData(`budget/`, data).then(resp => {
            refreshData()
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

export const CreateIncomeModal = ({show, handleClose, budget, refreshData}) => {
    const form = useRef(null)
    const [incomeCategories, setIncomeCategories] = useState([])
    const [selectedCategory, setSelectedCategory] = useState(null)

    const handleSubmit = (e) => {
        e.preventDefault()
        let data = getDataFromFormRef(form)
        if (selectedCategory) {
            data['category'] = selectedCategory
        }
        let existingIncomes = budget.income
        apiHandler.postData(`income/`, data).then(resp => {
            existingIncomes.push(resp.id)
            let income_data = {'income': existingIncomes}
            if (resp.hasOwnProperty('id')) {
                apiHandler.patchData(`budget/${budget.id}/`, income_data).then(resp2 => {
                    handleClose()
                    refreshData()
                })
            }
        })
    }

    useEffect(() => {
        apiHandler.getData('income_categories').then(resp => {
            setIncomeCategories(resp)
        })
    }, [refreshData])

    if (budget) {
        return (
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add income in budget: {budget.name}</Modal.Title>
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

                        <Form.Group className="mb-3" controlId="desc">
                            <Form.Label>Amount</Form.Label>
                            <Form.Control name={'amount'} rows={4} type="text" placeholder="Change amount" />
                        </Form.Group>

                        <FloatingLabel controlId="floatingSelect" label="Select income category">
                            <Form.Select onChange={(e) => setSelectedCategory(e.target.value)}>
                                <option value={null}>---</option>
                                {incomeCategories.length > 0 && incomeCategories.map(item => {
                                    return (
                                        <option value={item.id}>{item.name}</option>
                                    )
                                })}
                            </Form.Select>
                        </FloatingLabel>

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

export const CreateExpenseModal = ({show, handleClose, budget, refreshData}) => {
    const form = useRef(null)
    const [expenseCategories, setExpenseCategories] = useState([])
    const [selectedCategory, setSelectedCategory] = useState(null)

    const handleSubmit = (e) => {
        e.preventDefault()
        let data = getDataFromFormRef(form)
        if (selectedCategory) {
            data['category'] = selectedCategory
        }
        let existingExpenses = budget.expenses
        apiHandler.postData(`expense/`, data).then(resp => {
            existingExpenses.push(resp.id)
            let expense_data = {'expenses': existingExpenses}
            if (resp.hasOwnProperty('id')) {
                apiHandler.patchData(`budget/${budget.id}/`, expense_data).then(resp2 => {
                    handleClose()
                    refreshData()
                })
            }
        })
    }

    useEffect(() => {
        apiHandler.getData('expense_categories').then(resp => {
            setExpenseCategories(resp)
        })
    }, [refreshData])

    if (budget) {
        return (
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add expense in budget: {budget.name}</Modal.Title>
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

                        <Form.Group className="mb-3" controlId="desc">
                            <Form.Label>Amount</Form.Label>
                            <Form.Control name={'amount'} rows={4} type="text" placeholder="Change amount" />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="desc">
                            <Form.Label>Date</Form.Label>
                            <Form.Control name={'date'} rows={4} type="date" placeholder="Select date" />
                        </Form.Group>

                        <FloatingLabel controlId="floatingSelect" label="Select income category">
                            <Form.Select onChange={(e) => setSelectedCategory(e.target.value)}>
                                <option value={null}>---</option>
                                {expenseCategories.length > 0 && expenseCategories.map(item => {
                                    return (
                                        <option value={item.id}>{item.name}</option>
                                    )
                                })}
                            </Form.Select>
                        </FloatingLabel>

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

export const CreateExpenseCategoryModal = ({show, handleClose, refreshData}) => {
    const form = useRef(null)

    const handleSubmit = (e) => {
        e.preventDefault()
        let data = getDataFromFormRef(form)
        apiHandler.postData(`expense_categories/`, data).then(resp => {
            refreshData()
            handleClose()
        })
    }

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Add expense category</Modal.Title>
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

}

export const CreateIncomeCategoryModal = ({show, handleClose, refreshData}) => {
    const form = useRef(null)

    const handleSubmit = (e) => {
        e.preventDefault()
        let data = getDataFromFormRef(form)
        apiHandler.postData(`income_categories/`, data).then(resp => {
            refreshData()
            handleClose()
        })
    }

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Add income category</Modal.Title>
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

}

export const EditIncomeCategoryModal = ({show, handleClose, category, refreshData}) => {
    const form = useRef(null)

    const handleSubmit = (e) => {
        e.preventDefault()
        let data = getDataFromFormRef(form)
        apiHandler.patchData(`income_categories/${category.id}/`, data).then(resp => {
            refreshData()
            handleClose()
        })
    }

    if (category) {
        return (
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit income category: {category.name}</Modal.Title>
                </Modal.Header>
                <Form onSubmit={(e) => handleSubmit(e)} ref={form}>
                    <Modal.Body>
                        <Form.Group className="mb-3" controlId="name">
                            <Form.Label>Name</Form.Label>
                            <Form.Control defaultValue={category.name} name={'name'} type="text" placeholder="Change name" />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="desc">
                            <Form.Label>Description</Form.Label>
                            <Form.Control defaultValue={category.description} name={'description'} as="textarea" rows={4} type="text" placeholder="Change description" />
                        </Form.Group>

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

export const EditExpenseCategoryModal = ({show, handleClose, category, refreshData}) => {
    const form = useRef(null)

    const handleSubmit = (e) => {
        e.preventDefault()
        let data = getDataFromFormRef(form)
        apiHandler.patchData(`expense_categories/${category.id}/`, data).then(resp => {
            handleClose()
            refreshData()
        })
    }

    if (category) {
        return (
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit expense category: {category.name}</Modal.Title>
                </Modal.Header>
                <Form onSubmit={(e) => handleSubmit(e)} ref={form}>
                    <Modal.Body>
                        <Form.Group className="mb-3" controlId="name">
                            <Form.Label>Name</Form.Label>
                            <Form.Control defaultValue={category.name} name={'name'} type="text" placeholder="Change name" />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="desc">
                            <Form.Label>Description</Form.Label>
                            <Form.Control defaultValue={category.description} name={'description'} as="textarea" rows={4} type="text" placeholder="Change description" />
                        </Form.Group>

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