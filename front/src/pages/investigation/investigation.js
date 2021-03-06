import React, { useState } from 'react';
import Navbar from '../../component/navBar';
import { Row, Col, Container } from 'react-bootstrap';
import Table from '../../component/table';
import { headProyect } from '../../schemas/schemaHeadTable';
import header from '../../img/investigation3.jpg';
import Image from '../../component/image';
import { fieldSearchProyect } from '../../schemas/schemaField';
import { jsonSearchProyect } from '../../schemas/schemaForm';
import { schemaSearchProyect } from '../../schemas/schemaValidation';
import Forms from '../../component/form';
import { useNavigate } from 'react-router-dom';
import { filterProyect } from '../../utils/proyects.comm';

const Investigation = () => {
  const navigate = useNavigate();
  const [proyects, setProyects] = useState([{ id: 0, titulo: '', extra: '' }]);

  const submitFilterProyect = async (valores, { resetForm }) => {
    resetForm();
    console.log(valores);
    const { titulo, escuela, facultad } = valores;
    const result = await filterProyect({
      titulo: titulo,
      escuela: escuela,
      facultad: facultad,
    });
    console.log(result);
    switch (result.status) {
      case 200: {
        setProyects(
          result.data.map((row) => {
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

  return (
    <Container
      fluid={true}
      style={{ width: '85%', backgroundColor: '#B2BABB', paddingTop: 100 }}
    >
      <Row>
        <Navbar />
      </Row>
      <Row>
        <Image src={header} text='Proyectos de investigacion' />
      </Row>
      <br />
      <br />
      <Row>
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Perferendis
          autem at laboriosam explicabo corrupti obcaecati dignissimos,
          assumenda odio alias asperiores earum aut quas voluptas reiciendis
          illo quo ab sapiente, totam culpa debitis dicta magnam sit nam.
          Repellendus dolore quasi debitis qui pariatur ea reiciendis
          voluptatum, impedit velit harum neque! Nemo aliquid sed numquam
          consequatur minima quos repellendus a suscipit libero aut dolorem
          voluptatem possimus placeat mollitia maxime sunt nihil, adipisci harum
          ipsum at officiis nisi accusamus? Soluta voluptas distinctio veniam
          corrupti, fuga quaerat perspiciatis alias omnis, dolorum officia vero
          exercitationem vitae hic nesciunt tenetur animi culpa eaque odio, ab
          ullam magnam accusantium aspernatur velit sequi. Ad quidem eligendi
          omnis ducimus repellendus. Nemo sint, vero quasi est qui officiis
          dicta quam, possimus, sunt odit omnis! Quo aperiam recusandae adipisci
          consequuntur molestias totam dolorem odio, excepturi facilis saepe
          quia vitae dicta asperiores, illo, architecto ipsa fugiat quod
          corporis. Officia similique distinctio ex numquam nobis consectetur
          quidem aspernatur recusandae nesciunt non. Dolore at adipisci animi
          modi totam obcaecati architecto omnis cum debitis tempora repellendus
          nam praesentium eius dolorem, earum, ab veniam maiores quo in. Dolorum
          suscipit adipisci repellat esse accusamus neque quidem exercitationem
          aliquid odit totam vel, aliquam quis libero, sequi laborum corporis.{' '}
        </p>
      </Row>
      <br />
      <br />
      <Row className='justify-content-center'>
        <Col xs='auto'>
          <h3>Buscador de Proyectos de Investigacion</h3>
        </Col>
      </Row>
      <br />
      <Forms
        jsonfield={fieldSearchProyect}
        jsonform={jsonSearchProyect}
        jsonValidation={schemaSearchProyect}
        submit={submitFilterProyect}
      />
      <br />
      <Row className='justify-content-center'>
        <Table
          pagination={true}
          head={headProyect}
          contend={proyects}
          onClickButton={(row) => {
            navigate(`/investigaciones/detail/${row.original.id}`);
          }}
        />
      </Row>
    </Container>
  );
};

export default Investigation;
