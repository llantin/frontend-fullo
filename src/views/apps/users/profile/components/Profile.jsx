import user3 from '@/assets/images/users/user-9.jpg';
import usFlag from '@/assets/images/flags/us.svg';
import { Button, Card, CardBody, Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from 'react-bootstrap';
import { Link } from "react-router";
import { TbBrandX, TbPhone, TbBriefcase, TbDotsVertical, TbLink, TbMail, TbMapPin, TbSchool, TbUsers, TbWorld } from 'react-icons/tb';
import { LuDribbble, LuFacebook, LuInstagram, LuLinkedin, LuYoutube } from 'react-icons/lu';
const Profile = () => {
    const storedUser = localStorage.getItem('user');
    const user = storedUser ? JSON.parse(storedUser) : null;
    return <Card className="card-top-sticky">
        <CardBody>
            <div className="d-flex align-items-center mb-4">
                <div className="me-3 position-relative">
                    <img src={user3} alt="avatar" className="rounded-circle" width={72} height={72} />
                </div>
                <div>
                    <h5 className="mb-0 d-flex align-items-center">
                        <Link to="" className="link-reset">{user.person.name + " " + user.person.last_name}</Link>
                    </h5>
                    <p className="text-muted mb-2">{user.role.name}</p>
                </div>
                {/* <div className="ms-auto">
                    <Dropdown>
                        <DropdownToggle className="btn btn-icon btn-ghost-light text-muted drop-arrow-none" data-bs-toggle="dropdown">
                            <TbDotsVertical className="fs-xl" />
                        </DropdownToggle>
                        <DropdownMenu align={'end'} className="dropdown-menu-end">
                            <li><DropdownItem>Edit Profile</DropdownItem></li>
                            <li><DropdownItem className="text-danger">Report</DropdownItem></li>
                        </DropdownMenu>
                    </Dropdown>
                </div> */}
            </div>
            <div>
                <div className="d-flex align-items-center gap-2 mb-2">
                    <div className="avatar-sm text-bg-light bg-opacity-75 d-flex align-items-center justify-content-center rounded-circle">
                        <TbUsers className="fs-xl" />
                    </div>
                    <p className="mb-0 fs-sm">Nombre de usuario: <span className="text-dark fw-semibold">{user.username}</span></p>
                </div>
                <div className="d-flex align-items-center gap-2 mb-2">
                    <div className="avatar-sm text-bg-light bg-opacity-75 d-flex align-items-center justify-content-center rounded-circle">
                        <TbMail className="fs-xl" />
                    </div>
                    <p className="mb-0 fs-sm">Correo: <Link to="mailto:hello@example.com" className="text-primary fw-semibold">{user.person.email}</Link>
                    </p>
                </div>
                <div className="d-flex align-items-center gap-2 mb-2">
                    <div className="avatar-sm text-bg-light bg-opacity-75 d-flex align-items-center justify-content-center rounded-circle">
                        <TbPhone className="fs-xl" />
                    </div>
                    <p className="mb-0 fs-sm">Telefono: <Link to={`https://wa.me/${user.person.phone}`} className="text-primary fw-semibold">{user.person.phone}</Link>
                    </p>
                </div>
            </div>
            {/* <h4 className="card-title mb-3 mt-4">Skills</h4>
            <div className="d-flex flex-wrap gap-1">
                <Button variant='light' size='sm'>Product Design</Button>
                <Button variant='light' size='sm'>UI/UX</Button>
                <Button variant='light' size='sm'>Tailwind CSS</Button>
                <Button variant='light' size='sm'>Bootstrap</Button>
                <Button variant='light' size='sm'>React.js</Button>
                <Button variant='light' size='sm'>Next.js</Button>
                <Button variant='light' size='sm'>Vue.js</Button>
                <Button variant='light' size='sm'>Figma</Button>
                <Button variant='light' size='sm'>Design Systems</Button>
                <Button variant='light' size='sm'>Template Authoring</Button>
                <Button variant='light' size='sm'>Responsive Design</Button>
                <Button variant='light' size='sm'>Component Libraries</Button>
            </div> */}
        </CardBody>
    </Card>;
};
export default Profile;