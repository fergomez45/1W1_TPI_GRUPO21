create database veterinariatp
go
use veterinariatp
go
CREATE TABLE Especies(
	id_especie int NOT NULL,
	nombreEspecie varchar(50) NOT NULL,
	constraint pk_id_especies primary key(id_especie)
	)

	Create table Clientes
(id_cliente int identity(1,1),
nombre varchar(50) not null,
apellido varchar(50),
sexo varchar(10)not null,
dni varchar(50),
telefono varchar(50),
fechaBaja date,
motivoBaja varchar(50)
constraint pk_id_clientes primary key(id_cliente)
)

Create table Mascotas
(id_mascota int identity(1,1),
nombre varchar(50) not null,
id_especie int not null,
sexo varchar(10)not null,
anionacimiento int,
id_cliente int not null,
fechaBaja date,
motivoBaja varchar(50)
constraint pk_id_mascotas primary key(id_mascota),
constraint fk_id_especie foreign key(id_especie)
references Especies(id_especie),
constraint fk_id_cliente foreign key (id_cliente)
references Clientes(id_cliente)
)


create table Usuario
(id_usuario int identity(1,1),
nombre varchar(50),
contraseña varchar(50)
constraint pk_id_usuario primary key(id_usuario)
)

-- Insertando datos en la tabla Especies
INSERT INTO Especies (id_especie, nombreEspecie) VALUES (1, 'Perro');
INSERT INTO Especies (id_especie, nombreEspecie) VALUES (2, 'Gato');
INSERT INTO Especies (id_especie, nombreEspecie) VALUES (3, 'Iguana');
INSERT INTO Especies (id_especie, nombreEspecie) VALUES (4, 'Araña');

-- Insertando datos en la tabla Clientes
INSERT INTO Clientes (nombre, apellido, sexo) VALUES ('Carlos', 'Ramirez', 'Masculino');
INSERT INTO Clientes (nombre, apellido, sexo) VALUES ('Ana', 'Lopez', 'Femenino');
INSERT INTO Clientes (nombre, apellido, sexo) VALUES ('Luis', 'Martonez', 'Masculino');
INSERT INTO Clientes (nombre, apellido, sexo) VALUES ('Maria', 'Fernandez', 'Femenino');
INSERT INTO Clientes (nombre, apellido, sexo) VALUES ('Jose', 'Perez', 'Masculino');

-- Insertando datos en la tabla Mascotas
INSERT INTO Mascotas (nombre, id_especie, sexo, anionacimiento, id_cliente) VALUES ('Bobby', 1, 'Macho', 2018, 1);
INSERT INTO Mascotas (nombre, id_especie, sexo, anionacimiento, id_cliente) VALUES ('Mishi', 2, 'Hembra', 2020, 2);
INSERT INTO Mascotas (nombre, id_especie, sexo, anionacimiento, id_cliente) VALUES ('Iggy', 3, 'Macho', 2019, 3);
INSERT INTO Mascotas (nombre, id_especie, sexo, anionacimiento, id_cliente) VALUES ('Spidey', 4, 'Hembra', 2021, 4);
INSERT INTO Mascotas (nombre, id_especie, sexo, anionacimiento, id_cliente) VALUES ('Max', 1, 'Macho', 2017, 5);



go
create procedure SP_ACTUALIZAR_MASCOTA
	@idMascota int,
	@nombre varchar(30),
	@idEspecie int,
	@sexo varchar(30),
	@anioNacimiento int,
	@idCliente int
as
begin
	UPDATE Mascotas
	SET nombre = @nombre,
	id_especie = @idEspecie,
	sexo = @sexo,
	anionacimiento = @anioNacimiento,
	id_cliente = @idCliente
	WHERE id_mascota = @idMascota;
end
go
create procedure SP_ACTUALIZAR_CLIENTE
	@idCliente int,
	@nombre varchar(30),
	@apellido varchar(30),
	@sexo varchar(30),
	@dni varchar(50),
	@telefono varchar(50)
as
begin
	UPDATE Clientes
	SET nombre = @nombre,
	apellido = @apellido,
	sexo = @sexo,
	dni = @dni,
	telefono = @telefono
	WHERE id_cliente = @idCliente;
end
