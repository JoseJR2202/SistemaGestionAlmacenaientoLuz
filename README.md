# Sistema de Gestion, Almacenamiento y Manejo de informacion del centro experimental de estudios Latinoamericano (CEELA)

En este proyecto se realizo una propuesta de sistema que cumpla las necesidades del centro experimental de estudios Latinoamericano (CEELA), de manera de cumplir requerimientos como:

- Crear una aplicación que maneje tres niveles, que solo tenga acceso estudiantes y personal de la universidad
- Permitir a los investigadores publicar trabajos de investigación
- Colocar los trabajos publicados por los investigadores en una etapa de espera hasta que sean aprobados por un administrador
- Permitir la creación y programación de reuniones tipo Zoom entre investigadores y/o administradores
- Crear módulo de biblioteca para buscar y visualizar los trabajos de investigación, artículo, revistas, entre otros proyectos de investigación
- Permitir dejar comentarios acerca de los proyectos de investigación publicados
- Permitir dejar comentarios acerca de las reuniones programadas (función no válida para los estudiantes)
- Permitir reprogramar las reuniones (solo válido para el creador de la reunión, investigador o administrador)

Este proyecto fue divido en tres modulos:

-Servidor: Realizado en nodeJS con Typescript, agregando la mayor cantidad de seguridad y rendimiento mediante el uso de middleware como helmet y compression, ademas de la creacion de distintas funciones de verificacion propias.

-Cliente: Realizado en ReactJS.

-Videollamadas: usando WebRTC, simplePeer y SocketIO.
