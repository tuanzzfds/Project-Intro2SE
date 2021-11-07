create database DB_DATH1;
go

use DB_DATH1;
go

create table KhachHang (
	MaKH varchar(6) primary key,
	Ho nvarchar(6),
	Ten nvarchar(20),
	NgSinh date,
	SoNha varchar(10),
	Duong nvarchar(30),
	Phuong nvarchar(30),
	Quan nvarchar(15),
	TPho nvarchar(20),
	DienThoai varchar(10)
);

create table HoaDon (
	MaHD varchar(6) primary key,
	MaKH varchar(6) foreign key (MaKH) references KhachHang(MaKH),
	NgayLap datetime,
	TongTien int 
);

create table SanPham (
	MaSP varchar(5) primary key,
	TenSP nvarchar(20),
	SoLuongTon int,
	Mota nvarchar(50),
	Gia int
);

create table CT_HoaDon (
	MaHD varchar(6) foreign key (MaHD) references HoaDon(MaHD),
	MaSP varchar(5) foreign key (MaSP) references SanPham(MaSP),
	SoLuong smallint,
	GiaBan int,
	GiaGiam int, 
	ThanhTien int,
	constraint PK_CTHD primary key (MaHD, MaSP)
);
go

ALTER TABLE CT_HoaDon
ADD CONSTRAINT CK_GiaGiam CHECK (GiaGiam < GiaBan);	
go

update CT_HoaDon
set GiaBan = (select SanPham.Gia from SanPham
		where SanPham.MaSP = CT_HoaDon.MaSP);
go

--Thành tiền CTHD= (Số lượng * (Giá bán-Giá giảm))
CREATE Trigger tinh_thanh_tien on CT_HoaDon
for insert, update
as
begin
	update CT_HoaDon
	set ThanhTien=i.SoLuong*(i.GiaBan-i.GiaGiam)
	from INSERTED i 
	where i.MaHD=CT_HoaDon.MaHD and i.MaSP=CT_HoaDon.MaSP;

end
GO

create trigger insert_CTHD 
on CT_HoaDon
FOR INSERT
AS 
BEGIN
	update HoaDon 
	set HoaDon.TongTien= (select sum (ct.ThanhTien)
	from INSERTED i join CT_HoaDon ct on i.MaHD=ct.MaHD
	group by ct.MaHD )
	from INSERTED i
	where HoaDon.MaHD=i.MaHD
END
GO

create trigger insert_hoadon on HoaDon
for insert
as
begin
	update HoaDon
	set TongTien = 0
	from inserted i
	where i.MaHD = HoaDon.MaHD
end
go

create trigger delete_CTHD 
on CT_HoaDon
FOR Delete
AS 
BEGIN
	
	declare @thanhtien int, @mahd varchar(6)
	select @thanhtien = d.ThanhTien, @mahd = d.MaHD
	from deleted d join SanPham sp on d.MaSP= sp.MaSP
	

	update HoaDon
	Set TongTien = TongTien - d.ThanhTien
	from deleted d join SanPham sp on d.MaSP = sp.MaSP
	where HoaDon.MaHD = d.MaHD
END
GO

create trigger update_CTHD on CT_HoaDon
for update
as
begin
	declare @thanhtien int, @mahd varchar(6)
	select @thanhtien = d.ThanhTien, @mahd = d.MaHD
	from deleted d join SanPham sp on d.MaSP= sp.MaSP
	

	update HoaDon
	Set TongTien = TongTien - d.ThanhTien
	from deleted d join SanPham sp on d.MaSP = sp.MaSP
	where HoaDon.MaHD = d.MaHD

	update HoaDon 
	set HoaDon.TongTien= (select sum (ct.ThanhTien)
	from INSERTED i join CT_HoaDon ct on i.MaHD=ct.MaHD
	group by ct.MaHD )
	from INSERTED i
	where HoaDon.MaHD=i.MaHD
end

CREATE PROCEDURE [dbo].[GetInvoiceStatistic]
	@y date
AS
BEGIN
	SELECT  month(hd.NgayLap) AS 'Month',SUM(CAST(hd.TongTien AS BIGINT)) AS [Total]
	from HoaDon hd
	where year(hd.NgayLap)=year(@y)
	--where year(hd.NgayLap)='2021'
	group by month(hd.NgayLap)
	order by Month
END

--drop PROCEDURE GetInvoiceStatistic
--EXEC GetInvoiceStatistic @y='2021'


