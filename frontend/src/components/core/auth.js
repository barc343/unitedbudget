import {Button, Card, Container, Form} from "react-bootstrap";
import {useState} from "react";
import {apiHandler} from "../../modules/requests";

const RegisterComponent = ({setRegister}) => {
    const [login, setLogin] = useState(null)
    const [email, setEmail] = useState(null)
    const [pass, setPass] = useState(null)

    const registerUser = (e) => {
        e.preventDefault()
        apiHandler.registerUser({'email': email, 'username': login, 'password': pass}).then(resp => {
            if (resp.hasOwnProperty('email')) {
                alert('User registered successfully')
                setRegister(false)
            } else {
                alert(resp)
            }
            // window.location.reload()
        })
    }

    return (
        <Container className={'mt-5'}>
            <Card style={{ width: '30rem', 'margin': '0 auto' }}>
                <Card.Body>
                    <h2>Register Page <Button onClick={() => setRegister(false)} size={'sm'} variant={'light'}>Login</Button></h2>
                    <hr/>
                    <div className={'text-start'}>
                        <Form onSubmit={(e) => registerUser(e)}>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Username</Form.Label>
                                <Form.Control required onChange={(e) => setLogin(e.target.value)} type="text" placeholder="Enter nickname" />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control required onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Enter email" />
                                <Form.Text className="text-muted">
                                    We'll never share your email with anyone else.
                                </Form.Text>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control required onChange={(e) => setPass(e.target.value)} type="password" placeholder="Password" />
                            </Form.Group>
                            <Button variant="primary" type="submit">
                                Submit
                            </Button>
                        </Form>
                    </div>
                </Card.Body>
            </Card>
        </Container>
    )
}

const LoginComponent = ({setRegister, setToken}) => {
    const [login, setLogin] = useState(null)
    const [pass, setPass] = useState(null)

    const loginUser = (e) => {
        e.preventDefault()
        apiHandler.loginUser({'username': login, 'password': pass}).then(resp => {
            if (resp.hasOwnProperty('access')) {
                sessionStorage.setItem('token', JSON.stringify(resp))
                setToken(resp)
                window.location.reload()
            } else alert('Incorrect login data')
            // window.location.reload()
        })
    }

    return (
        <Container className={'mt-5'}>
            <Card style={{ width: '30rem', 'margin': '0 auto' }}>
                <Card.Body>
                    <h2>Login Page <Button onClick={() => setRegister(true)} size={'sm'} variant={'light'}>Register</Button></h2>
                    <hr/>
                    <div className={'text-start'}>
                        <Form onSubmit={(e) => loginUser(e)}>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Username</Form.Label>
                                <Form.Control onChange={(e) => setLogin(e.target.value)} type="text" placeholder="Enter username" />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control onChange={(e) => setPass(e.target.value)} type="password" placeholder="Password" />
                            </Form.Group>
                            <Button variant="primary" type="submit">
                                Submit
                            </Button>
                        </Form>
                    </div>
                </Card.Body>
            </Card>
        </Container>
    )
}

export const AuthComponent = ({setToken}) => {
    const [register, setRegister] = useState(false)

    if (register) {
        return <RegisterComponent setRegister={setRegister}/>
    } else {
        return <LoginComponent setRegister={setRegister} setToken={setToken}/>
    }
}