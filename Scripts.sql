-- Crea DB
create database Test

-- Tablas
create table TipoProducto(
	id int identity(1,1) primary key,
	descripcion varchar(150),
	deleted bit default 0,
	created_at date
)

insert into TipoProducto(descripcion) values('Varios')
insert into TipoProducto(descripcion) values('Informática')

create table Producto (
	id int identity(1,1) primary key,
	idTipoProducto int foreign key references TipoProducto(id),
	nombre varchar(40),
	precio float not null,
	deleted bit default 0,
	created_at date 
)

create table Stock (
	id int identity(1,1) primary key,
	idProducto int foreign key references Producto(id),
	cantidad int not null,
	deleted bit default 0,
	created_at date
)

-- View


create view vw_StockProducto
as
select Prod.id as id, Prod.nombre, Prod.precio, Stock.id as id_stock, Stock.cantidad, TProd.descripcion, TProd.id as id_tipo_producto, Prod.deleted as deleted from Producto as Prod 
	inner join Stock on Stock.idProducto = Prod.id 
	inner join TipoProducto as TProd on Prod.idTipoProducto = TProd.id where Prod.deleted = 0

select * from vw_StockProducto

-- SP
-- Insert
create proc sp_InsertarProducto
	@nombre varchar(40),
	@precio float,
	@idTipoProducto int
as
insert into Producto(nombre, precio, idTipoProducto) values(@nombre, @precio, @idTipoProducto)

exec sp_insertarProducto 'Macbook Air 2022 13"6', 430.000, 2

-- Update
create proc sp_ModificarProducto
	@id int,
	@nombre varchar(40),
	@precio as float,
	@idTipoProducto int
as
update Producto Set nombre = @nombre, precio = @precio, idTipoProducto = @idTipoProducto where id = @id

exec sp_ModificarProducto 1, 'Macbook Air 2020 13"', 400.000, 2

-- Delete
create proc sp_EliminarProducto
	@id int
as
delete from Producto where id = @id

exec sp_EliminarProducto 1