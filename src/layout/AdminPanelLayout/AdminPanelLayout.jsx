import "./AdminPanleLayout.css";
import { Container, Row, Col, Offcanvas, Accordion } from "react-bootstrap";
import Header from "../../components/Header";
import { NavLink, Outlet } from "react-router-dom";
import { IoHomeOutline } from "react-icons/io5";
import { IoPersonOutline } from "react-icons/io5";
import { useState } from "react";
import { FaS } from "react-icons/fa6";

function AdminPanelLayout() {
  const [showMobileSidebar, setShowMobileSidebar] = useState(false);

  /* Functions */
  const toggleSideBarHandler = () => {
    setShowMobileSidebar(prev => !prev);
  };

  return (
    <>
      <Header onSidbarToggler={toggleSideBarHandler} />
      <Container fluid>
        <Row className="panel-wrapper mt-3">
          <Col xs="auto" className="d-none d-lg-block">
            <div className="sidebar shadow rounded p-3 min-vh-100">
              <ul className="nav flex-column">
                <li className="nav-item">
                  <NavLink className={({ isActive }) => `nav-link d-flex align-items-center gap-2 ${isActive ? "text-primary text-capitalize" : "text-muted"}`} to="/panel/dashboard">
                    <IoHomeOutline />
                    <span>dashboard</span>
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className={({ isActive }) => `nav-link d-flex align-items-center gap-2 ${isActive ? "text-primary text-capitalize" : "text-muted"}`} to="/panel/users">
                    <IoPersonOutline></IoPersonOutline>
                    <span>users</span>
                  </NavLink>
                </li>
              </ul>
            </div>
          </Col>
          <Col>
            <div className="main">
              <Outlet />
            </div>
          </Col>
        </Row>
      </Container>

      {/* Sidebar Offcanase */}
      <Offcanvas show={showMobileSidebar} onHide={() => setShowMobileSidebar(false)}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Offcanvas</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <ul className="nav flex-column">
            <li className="nav-item">
              <NavLink className="nav-link text-capitalize" to="/">
                home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className={({ isActive }) => `nav-link d-flex align-items-center gap-2 ${isActive ? "text-primary text-capitalize" : "text-muted"}`} to="/register">
                register
              </NavLink>
            </li>
            <Accordion flush>
              <Accordion.Item>
                <Accordion.Header>panel</Accordion.Header>
                <Accordion.Body>
                  <li className="nav-item">
                    <NavLink className={({ isActive }) => `nav-link d-flex align-items-center gap-2 ${isActive ? "text-primary text-capitalize" : "text-muted"}`} to="/panel/dashboard">
                      <IoHomeOutline />
                      <span>dashboard</span>
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className={({ isActive }) => `nav-link d-flex align-items-center gap-2 ${isActive ? "text-primary text-capitalize" : "text-muted"}`} to="/panel/users">
                      <IoPersonOutline></IoPersonOutline>
                      <span>users</span>
                    </NavLink>
                  </li>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </ul>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default AdminPanelLayout;
