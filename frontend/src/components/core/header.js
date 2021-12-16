import {Button, Container, Nav, Navbar} from "react-bootstrap";


export const HeaderComponent = () => {

    const logout = () => {
        sessionStorage.removeItem('token')
        window.location.reload()
    }

    return (
        <Navbar bg="light" expand="lg">
            <Container>
                <Navbar.Brand href="#home">united<b>BUDGET</b></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Text className={'justify-content-end'}>
                    <Button onClick={logout} variant={'link'}>Logout</Button>
                </Navbar.Text>
            </Container>
        </Navbar>
    )
}