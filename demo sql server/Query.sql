use DB_DATH1
go

-----Truy vấn-----

--Cho danh sách các hoá đơn lập trong năm 2020
select *
from HoaDon 
where year(NgayLap)='2020'
--Cho danh sách các khách hàng ở TPHCM
select *
from KhachHang
where TPho like N'TP.HCM';
--Cho danh sách các sản phẩm có giá trong một khoảng từ....đến
declare @min_value as int
declare @max_value as int

set @min_value = 1000
set @max_value = 10000

select*
from SanPham
where Gia >= @min_value and Gia <= @max_value;

--Cho danh sách các sản phẩm có số lượng tồn <100
select*
from SanPham
where SoLuongTon < 100;

--Cho danh sách các sản phẩm bán chạy nhất (số lượng bán nhiều nhất)

select sp.MaSP,sp.TenSP,sum(chd.SoLuong) as total
from SanPham sp, CT_HoaDon chd
where chd.MaSP = sp.MaSP
group by sp.MaSP,sp.TenSP
having sum(chd.SoLuong) >= ALL (select sum(chd1.SoLuong) as total
	from SanPham sp1, CT_HoaDon chd1
	where chd1.MaSP = sp1.MaSP
	group by sp1.MaSP,sp1.TenSP)

--Cho danh sách các sản phẩm có doanh thu cao nhất

select sp.MaSP,sp.TenSP,sum(chd.ThanhTien) as total
from SanPham sp, CT_HoaDon chd
where chd.MaSP = sp.MaSP
group by sp.MaSP,sp.TenSP
having sum(chd.ThanhTien) >= ALL (select sum(chd1.ThanhTien) as total
	from SanPham sp1, CT_HoaDon chd1
	where chd1.MaSP = sp1.MaSP
	group by sp1.MaSP,sp1.TenSP)

