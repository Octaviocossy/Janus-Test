USE [master]
GO
/****** Object:  Database [Test]    Script Date: 22-Nov-22 1:20:16 PM ******/
CREATE DATABASE [Test]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'Test', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL15.SQLEXPRESS\MSSQL\DATA\Test.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'Test_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL15.SQLEXPRESS\MSSQL\DATA\Test_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
 WITH CATALOG_COLLATION = DATABASE_DEFAULT
GO
ALTER DATABASE [Test] SET COMPATIBILITY_LEVEL = 150
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [Test].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [Test] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [Test] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [Test] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [Test] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [Test] SET ARITHABORT OFF 
GO
ALTER DATABASE [Test] SET AUTO_CLOSE ON 
GO
ALTER DATABASE [Test] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [Test] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [Test] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [Test] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [Test] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [Test] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [Test] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [Test] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [Test] SET  ENABLE_BROKER 
GO
ALTER DATABASE [Test] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [Test] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [Test] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [Test] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [Test] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [Test] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [Test] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [Test] SET RECOVERY SIMPLE 
GO
ALTER DATABASE [Test] SET  MULTI_USER 
GO
ALTER DATABASE [Test] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [Test] SET DB_CHAINING OFF 
GO
ALTER DATABASE [Test] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [Test] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [Test] SET DELAYED_DURABILITY = DISABLED 
GO
ALTER DATABASE [Test] SET ACCELERATED_DATABASE_RECOVERY = OFF  
GO
ALTER DATABASE [Test] SET QUERY_STORE = OFF
GO
USE [Test]
GO
/****** Object:  Table [dbo].[TipoProducto]    Script Date: 22-Nov-22 1:20:16 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[TipoProducto](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[descripcion] [varchar](150) NULL,
	[deleted] [bit] NULL,
	[created_at] [date] NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Producto]    Script Date: 22-Nov-22 1:20:16 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Producto](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[idTipoProducto] [int] NULL,
	[nombre] [varchar](40) NULL,
	[precio] [float] NOT NULL,
	[deleted] [bit] NULL,
	[created_at] [date] NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Stock]    Script Date: 22-Nov-22 1:20:16 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Stock](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[idProducto] [int] NULL,
	[cantidad] [int] NOT NULL,
	[deleted] [bit] NULL,
	[created_at] [date] NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  View [dbo].[vw_StockProducto]    Script Date: 22-Nov-22 1:20:16 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create view [dbo].[vw_StockProducto]
as
select Prod.id as id, Prod.nombre, Prod.precio, Stock.id as id_stock, Stock.cantidad, TProd.descripcion, TProd.id as id_tipo_producto, Prod.deleted as deleted from Producto as Prod 
	inner join Stock on Stock.idProducto = Prod.id 
	inner join TipoProducto as TProd on Prod.idTipoProducto = TProd.id where Prod.deleted = 0
GO
SET IDENTITY_INSERT [dbo].[Producto] ON 

INSERT [dbo].[Producto] ([id], [idTipoProducto], [nombre], [precio], [deleted], [created_at]) VALUES (40, 2, N'Monitor DELL 27''', 120000, 0, CAST(N'2022-11-22' AS Date))
INSERT [dbo].[Producto] ([id], [idTipoProducto], [nombre], [precio], [deleted], [created_at]) VALUES (41, 2, N'MacBook Air 2022 14''6', 380000, 0, CAST(N'2022-11-22' AS Date))
INSERT [dbo].[Producto] ([id], [idTipoProducto], [nombre], [precio], [deleted], [created_at]) VALUES (42, 1, N'Carpa exterior', 3600, 0, CAST(N'2022-11-22' AS Date))
SET IDENTITY_INSERT [dbo].[Producto] OFF
GO
SET IDENTITY_INSERT [dbo].[Stock] ON 

INSERT [dbo].[Stock] ([id], [idProducto], [cantidad], [deleted], [created_at]) VALUES (40, 40, 5, 0, CAST(N'2022-11-22' AS Date))
INSERT [dbo].[Stock] ([id], [idProducto], [cantidad], [deleted], [created_at]) VALUES (41, 41, 12, 0, CAST(N'2022-11-22' AS Date))
INSERT [dbo].[Stock] ([id], [idProducto], [cantidad], [deleted], [created_at]) VALUES (42, 42, 0, 0, CAST(N'2022-11-22' AS Date))
SET IDENTITY_INSERT [dbo].[Stock] OFF
GO
SET IDENTITY_INSERT [dbo].[TipoProducto] ON 

INSERT [dbo].[TipoProducto] ([id], [descripcion], [deleted], [created_at]) VALUES (1, N'Varios', 0, NULL)
INSERT [dbo].[TipoProducto] ([id], [descripcion], [deleted], [created_at]) VALUES (2, N'Informática', 0, NULL)
SET IDENTITY_INSERT [dbo].[TipoProducto] OFF
GO
ALTER TABLE [dbo].[Producto] ADD  DEFAULT ((0)) FOR [deleted]
GO
ALTER TABLE [dbo].[Stock] ADD  DEFAULT ((0)) FOR [deleted]
GO
ALTER TABLE [dbo].[TipoProducto] ADD  DEFAULT ((0)) FOR [deleted]
GO
ALTER TABLE [dbo].[Producto]  WITH CHECK ADD FOREIGN KEY([idTipoProducto])
REFERENCES [dbo].[TipoProducto] ([id])
GO
ALTER TABLE [dbo].[Stock]  WITH CHECK ADD FOREIGN KEY([idProducto])
REFERENCES [dbo].[Producto] ([id])
GO
/****** Object:  StoredProcedure [dbo].[sp_EliminarProducto]    Script Date: 22-Nov-22 1:20:16 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create proc [dbo].[sp_EliminarProducto]
	@id int
as
delete from Producto where id = @id
GO
/****** Object:  StoredProcedure [dbo].[sp_InsertarProducto]    Script Date: 22-Nov-22 1:20:16 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create proc [dbo].[sp_InsertarProducto]
	@nombre varchar(40),
	@precio float,
	@idTipoProducto int
as
insert into Producto(nombre, precio, idTipoProducto) values(@nombre, @precio, @idTipoProducto)
GO
/****** Object:  StoredProcedure [dbo].[sp_ModificarProducto]    Script Date: 22-Nov-22 1:20:16 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create proc [dbo].[sp_ModificarProducto]
	@id int,
	@nombre varchar(40),
	@precio as float,
	@idTipoProducto int
as
update Producto Set nombre = @nombre, precio = @precio, idTipoProducto = @idTipoProducto where id = @id
GO
USE [master]
GO
ALTER DATABASE [Test] SET  READ_WRITE 
GO
