create database ChillnFree
go

use ChillnFree
go

create table song (
	song_id int primary key,
	name nvarchar(100),
	song_path varchar(100),
	img varchar(100),
	singer nvarchar(100)
)

insert into song values
	(1, 'First song', 'music/1.mp3', 'img/img1.jpg', 'Sõn Tùng MTP'),
	(2, 'Second song', 'music/2.mp3', 'img/img2.jpg', 'Sõn Tùng MTP'),
	(3, 'Third song', 'music/3.mp3', 'img/img3.jpg', 'Sõn Tùng MTP')


