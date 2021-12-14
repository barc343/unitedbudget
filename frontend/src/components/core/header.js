import {Button, Container, Nav, Navbar} from "react-bootstrap";


export const HeaderComponent = () => {

    const logout = () => {
        sessionStorage.removeItem('token')
        window.location.reload()
    }

    return (
        <Navbar bg="light" expand="lg">
            <Container>
                <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="#home">Home</Nav.Link>
                        <Nav.Link href="#link">Link</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
                <Navbar.Text className={'justify-content-end'}>
                    <Button onClick={logout} variant={'link'}>Logout</Button>
                </Navbar.Text>
            </Container>
        </Navbar>
    )
}