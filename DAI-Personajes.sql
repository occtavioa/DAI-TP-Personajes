USE [master]
GO
/****** Object:  Database [DAI-Personajes]    Script Date: 19/5/2023 10:56:30 ******/
CREATE DATABASE [DAI-Personajes]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'DAI-Personajes', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL14.MSSQLSERVER\MSSQL\DATA\DAI-Personajes.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'DAI-Personajes_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL14.MSSQLSERVER\MSSQL\DATA\DAI-Personajes_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
GO
ALTER DATABASE [DAI-Personajes] SET COMPATIBILITY_LEVEL = 140
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [DAI-Personajes].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [DAI-Personajes] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [DAI-Personajes] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [DAI-Personajes] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [DAI-Personajes] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [DAI-Personajes] SET ARITHABORT OFF 
GO
ALTER DATABASE [DAI-Personajes] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [DAI-Personajes] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [DAI-Personajes] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [DAI-Personajes] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [DAI-Personajes] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [DAI-Personajes] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [DAI-Personajes] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [DAI-Personajes] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [DAI-Personajes] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [DAI-Personajes] SET  DISABLE_BROKER 
GO
ALTER DATABASE [DAI-Personajes] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [DAI-Personajes] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [DAI-Personajes] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [DAI-Personajes] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [DAI-Personajes] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [DAI-Personajes] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [DAI-Personajes] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [DAI-Personajes] SET RECOVERY FULL 
GO
ALTER DATABASE [DAI-Personajes] SET  MULTI_USER 
GO
ALTER DATABASE [DAI-Personajes] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [DAI-Personajes] SET DB_CHAINING OFF 
GO
ALTER DATABASE [DAI-Personajes] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [DAI-Personajes] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [DAI-Personajes] SET DELAYED_DURABILITY = DISABLED 
GO
EXEC sys.sp_db_vardecimal_storage_format N'DAI-Personajes', N'ON'
GO
ALTER DATABASE [DAI-Personajes] SET QUERY_STORE = OFF
GO
USE [DAI-Personajes]
GO
/****** Object:  User [personajes]    Script Date: 19/5/2023 10:56:30 ******/
CREATE USER [personajes] FOR LOGIN [personajes] WITH DEFAULT_SCHEMA=[dbo]
GO
/****** Object:  User [alumno]    Script Date: 19/5/2023 10:56:30 ******/
CREATE USER [alumno] FOR LOGIN [alumno] WITH DEFAULT_SCHEMA=[dbo]
GO
ALTER ROLE [db_owner] ADD MEMBER [personajes]
GO
/****** Object:  Table [dbo].[Peliculas]    Script Date: 19/5/2023 10:56:30 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Peliculas](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Imagen] [nvarchar](50) NULL,
	[Titulo] [nvarchar](50) NOT NULL,
	[FechaCreacion] [date] NULL,
	[Calificacion] [float] NULL,
 CONSTRAINT [PK_Peliculas] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[PersonajePorPelicula]    Script Date: 19/5/2023 10:56:30 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[PersonajePorPelicula](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[IdPersonaje] [int] NOT NULL,
	[IdPelicula] [int] NOT NULL,
 CONSTRAINT [PK_PersonajePorPelicula] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Personajes]    Script Date: 19/5/2023 10:56:30 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Personajes](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Imagen] [varchar](50) NULL,
	[Nombre] [varchar](50) NOT NULL,
	[Edad] [int] NULL,
	[Peso] [decimal](18, 0) NULL,
	[Historia] [varchar](250) NULL,
 CONSTRAINT [PK_Personajes] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
SET IDENTITY_INSERT [dbo].[Peliculas] ON 

INSERT [dbo].[Peliculas] ([Id], [Imagen], [Titulo], [FechaCreacion], [Calificacion]) VALUES (1, NULL, N'The Avengers', CAST(N'2012-05-27' AS Date), NULL)
INSERT [dbo].[Peliculas] ([Id], [Imagen], [Titulo], [FechaCreacion], [Calificacion]) VALUES (3, NULL, N'Avengers: Endgame', CAST(N'2023-05-19' AS Date), NULL)
SET IDENTITY_INSERT [dbo].[Peliculas] OFF
GO
SET IDENTITY_INSERT [dbo].[PersonajePorPelicula] ON 

INSERT [dbo].[PersonajePorPelicula] ([Id], [IdPersonaje], [IdPelicula]) VALUES (1, 1, 1)
INSERT [dbo].[PersonajePorPelicula] ([Id], [IdPersonaje], [IdPelicula]) VALUES (2, 1, 2)
INSERT [dbo].[PersonajePorPelicula] ([Id], [IdPersonaje], [IdPelicula]) VALUES (3, 4, 1)
INSERT [dbo].[PersonajePorPelicula] ([Id], [IdPersonaje], [IdPelicula]) VALUES (4, 4, 2)
INSERT [dbo].[PersonajePorPelicula] ([Id], [IdPersonaje], [IdPelicula]) VALUES (5, 5, 1)
INSERT [dbo].[PersonajePorPelicula] ([Id], [IdPersonaje], [IdPelicula]) VALUES (7, 5, 2)
INSERT [dbo].[PersonajePorPelicula] ([Id], [IdPersonaje], [IdPelicula]) VALUES (8, 7, 1)
INSERT [dbo].[PersonajePorPelicula] ([Id], [IdPersonaje], [IdPelicula]) VALUES (9, 7, 2)
SET IDENTITY_INSERT [dbo].[PersonajePorPelicula] OFF
GO
SET IDENTITY_INSERT [dbo].[Personajes] ON 

INSERT [dbo].[Personajes] ([Id], [Imagen], [Nombre], [Edad], [Peso], [Historia]) VALUES (1, NULL, N'Iron-man', NULL, NULL, NULL)
INSERT [dbo].[Personajes] ([Id], [Imagen], [Nombre], [Edad], [Peso], [Historia]) VALUES (3, NULL, N'Spiderman', NULL, NULL, NULL)
INSERT [dbo].[Personajes] ([Id], [Imagen], [Nombre], [Edad], [Peso], [Historia]) VALUES (4, N'thor.jpg', N'Thor', 40, CAST(80 AS Decimal(18, 0)), N'historia')
INSERT [dbo].[Personajes] ([Id], [Imagen], [Nombre], [Edad], [Peso], [Historia]) VALUES (5, NULL, N'Hulk', NULL, NULL, NULL)
INSERT [dbo].[Personajes] ([Id], [Imagen], [Nombre], [Edad], [Peso], [Historia]) VALUES (7, NULL, N'capitan america', NULL, NULL, NULL)
SET IDENTITY_INSERT [dbo].[Personajes] OFF
GO
USE [master]
GO
ALTER DATABASE [DAI-Personajes] SET  READ_WRITE 
GO
