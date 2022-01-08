import React, { useState, useEffect } from 'react';
import Navbar from '../../component/navBar';
import { Row, Col, Container, Button, Stack, Modal } from 'react-bootstrap';
import Table from '../../component/table';
import { headProyect } from '../../schemas/schemaHeadTable';
import { FaUserCircle } from 'react-icons/fa';
import { FiLogOut } from 'react-icons/fi';
import { fieldChangeKey } from '../../schemas/schemaField';
import { jsonChangeKey } from '../../schemas/schemaForm';
import { schemaChangeKey } from '../../schemas/schemaValidation';
import Forms from '../../component/form';
import { useNavigate } from 'react-router-dom';
import { detailUser, changePassword } from '../../utils/user.comm';
import { getCommentsUser } from '../../utils/proyects.comm';
import { logout } from '../../utils/session.comm';

const Profile = () => {
  const [name, setName] = useState('');
  const [CI, setCI] = useState(0);
  const [email, setEmail] = useState('');
  const [faculty, setFaculty] = useState('');
  const [school, setSchool] = useState('');
  // const [password, setPassword]= useState('');
  const [proyects, setProyects] = useState([{ id: 0, titulo: '', extra: '' }]);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const getLogout = async () => {
    const result = await logout();
    switch (result.status) {
      case 200: {
        alert('Cerrando sesion...');
        sessionStorage.removeItem('auth');
        sessionStorage.removeItem('acceso');
        navigate('/login');
        break;
      }
      case 400: {
        alert(
          'Por seguridad su sesion a finalizado, por favor vuevla a ingresar'
        );
        sessionStorage.removeItem('auth');
        sessionStorage.removeItem('acceso');
        navigate('/login');
        break;
      }
      default: {
      }
    }
  };

  const setDetail = async () => {
    const result = await detailUser();
    switch (result.status) {
      case 200: {
        const { correo, cedula, nombre, tipo_usuario, escuela, facultad } =
          result.usuario;
        setName(nombre);
        setEmail(correo);
        setCI(cedula);
        setSchool(escuela);
        setFaculty(facultad);
        console.log(tipo_usuario);
        break;
      }
      case 400: {
        alert(
          'Por seguridad su sesion a finalizado, por favor vuevla a ingresar'
        );
        sessionStorage.removeItem('auth');
        sessionStorage.removeItem('acceso');
        navigate('/login');
        break;
      }
      default: {
      }
    }
  };

  const getProyects = async () => {
    const result = await getCommentsUser();
    switch (result.status) {
      case 200: {
        setProyects(
          result.comments.map((row) => {
            return {
              id: row.id,
              titulo: row.titulo,
              extra: row.escuela,
            };
          })
        );
        break;
      }
      case 400: {
        alert(
          'Por seguridad su sesion a finalizado, por favor vuevla a ingresar'
        );
        sessionStorage.removeItem('auth');
        sessionStorage.removeItem('acceso');
        navigate('/login');
        break;
      }
      default: {
      }
    }
  };

  const changeKey = async (valores, { resetForm }) => {
    resetForm();
    const result = await changePassword({
      clave: valores.clave,
      confirmarClave: valores.confirmarClave,
    });
    switch (result.status) {
      case 200: {
        alert(result.message);
        setShowModal(false);
        break;
      }
      case 400: {
        alert(
          'Por seguridad su sesion a finalizado, por favor vuevla a ingresar'
        );
        sessionStorage.removeItem('auth');
        sessionStorage.removeItem('acceso');
        navigate('/login');
        break;
      }
      default: {
      }
    }
  };

  useEffect(() => {
    setDetail();
    getProyects();
    // eslint-disable-next-line
  }, []);

  return (
    <Container
      fluid={true}
      style={{ width: '85%', backgroundColor: '#B2BABB' }}
    >
      <Row>
        <Navbar stop={true} />
      </Row>
      <br />
      <br />
      <br />
      <Row className='justify-content-center'>
        <Col xs='auto'>
          <FaUserCircle size='200' />
          <br />
          <Button variant='danger' onClick={getLogout}>
            Cerrar sesion <FiLogOut />
          </Button>
        </Col>
        <Col xs='auto'>
          <p>
            <strong>Nombre:</strong> {name}
          </p>
          <p>
            <strong>Cedula:</strong> {CI}
          </p>
          <p>
            <strong>Correo:</strong> {email}
          </p>
          <p>
            <strong>Facultad:</strong> {school}
          </p>
          <p>
            <strong>Escuela:</strong> {faculty}
          </p>
          <Button variant='primary' onClick={() => setShowModal(true)}>
            Cambiar clave
          </Button>
        </Col>
        {sessionStorage.getItem('acceso') !== 'Estudiante' ? ( //si es distinto de estudiante
          <>
            <Col xs='auto'>
              <section>
                <Stack gap={2}>
                  <Button
                    variant='primary'
                    onClick={() => navigate('/investigaciones/publicar')}
                  >
                    Publicar investigacion
                  </Button>
                  <Button
                    variant='primary'
                    onClick={() => navigate('/reuniones/crear')}
                  >
                    Crear Reunion
                  </Button>
                  <Button
                    variant='primary'
                    onClick={() => navigate('/reuniones/proximas')}
                  >
                    Proximas Reuniones
                  </Button>
                  <Button
                    variant='primary'
                    onClick={() => navigate('/perfil/buzon')}
                  >
                    Buzon
                  </Button>
                  {sessionStorage.getItem('acceso') === 'Administrador' ? (
                    <>
                      <Button
                        variant='primary'
                        onClick={() => navigate('/perfil/solicitudes')}
                      >
                        Solicitudes
                      </Button>
                    </>
                  ) : (
                    <></>
                  )}
                </Stack>
              </section>
            </Col>
          </>
        ) : (
          <></>
        )}
      </Row>
      <br />
      <br />
      <Row className='justify-content-center'>
        <Col xs='auto'>
          <h2>Ultimos proyectos comentados</h2>
        </Col>
      </Row>
      <br />
      <Row className='justify-content-center'>
        <Table
          head={headProyect}
          contend={proyects}
          onClickButton={(row) => {
            navigate(`/investigaciones/detail/${row.original.id}`);
          }}
        />
      </Row>
      <Modal
        show={showModal}
        onHide={() => {
          setShowModal(false);
        }}
        aria-labelledby='contained-modal-title-vcenter'
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id='contained-modal-title-vcenter'>
            MODIFICAR CLAVE
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Forms
            jsonfield={fieldChangeKey}
            jsonform={jsonChangeKey}
            jsonValidation={schemaChangeKey}
            submit={changeKey}
          />
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default Profile;
