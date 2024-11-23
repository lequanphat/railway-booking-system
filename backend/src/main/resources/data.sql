-- Data for table `users`
-- Password: 123456
INSERT INTO users (id, email, name, password, provider, user_role, is_verified, is_deleted) VALUES (1, "user@gmail.com", "Tran Nhat Sinh", "$2a$10$4UBL7hzqFHLNRswL67ffR.V25uGBD1WnnEGwv6Wlk.cMnlJmGjmnu", "EMAIL", "USER", 1, 0)^;

INSERT INTO users (id, email, name, password, provider, user_role, is_verified, is_deleted) VALUES (2, "admin@gmail.com", "Le Quan Phat", "$2a$10$4UBL7hzqFHLNRswL67ffR.V25uGBD1WnnEGwv6Wlk.cMnlJmGjmnu", "EMAIL", "ADMIN", 1, 0)^;

-- Data for table `person_types`

INSERT INTO person_types (id, name, description, percentage, parent_id) VALUES
    (1,'Người Việt Nam', 'Công dân có quốc tịch Việt Nam', 10,null)^;

INSERT INTO person_types (id, name, description, percentage, parent_id) VALUES
    (2,'Người Nước Ngoài', 'Người nước ngoài đang sinh sống và làm việc tại Việt Nam', 0,null)^;

INSERT INTO person_types (id, name,description, percentage, parent_id) VALUES
    (3,'Trẻ em', 'Trẻ em dưới 6 tuổi không cần phải mua vé, trẻ em từ 6 tuổi đến 10 tuổi được mua vé trẻ em', 5,1)^;

INSERT INTO person_types (id, name,description, percentage, parent_id) VALUES
    (4,'Người lớn', 'abc', 0,1)^;

INSERT INTO person_types (id, name, description, percentage, parent_id) VALUES
    (5,'Người cao tuổi', 'Người cao tuổi (người từ 60 tuổi trở lên) được hưởng chính sách giảm giá theo quy định của Tổng công ty Đường sắt Việt Nam.', 5,1)^;

INSERT INTO person_types (id, name, description, percentage, parent_id) VALUES
    (6,'Đoàn viên công đoàn', 'Đoàn viên công đoàn (phải có Thẻ Đoàn viên hợp lệ mang kèm khi đi tàu) được hưởng chính sách ưu đãi giảm giá theo quy định của Tổng công ty Đường sắt Việt Nam.', 5,1)^;

INSERT INTO person_types (id, name, description, percentage, parent_id) VALUES
    (7,'Trẻ em', 'Trẻ em dưới 6 tuổi không cần phải mua vé, trẻ em từ 6 tuổi đến 10 tuổi được mua vé trẻ em', 5,2)^;

INSERT INTO person_types (id, name, description, percentage, parent_id) VALUES
    (8,'Người lớn', 'abc',  0,2)^;


-- Data for table `provinces`
INSERT INTO provinces (id, name) VALUES (1, "An Giang")^;
INSERT INTO provinces (id, name) VALUES (2, "Bà Rịa - Vũng Tàu")^;
INSERT INTO provinces (id, name) VALUES (3, "Bắc Giang")^;
INSERT INTO provinces (id, name) VALUES (4, "Bắc Kạn")^;
INSERT INTO provinces (id, name) VALUES (5, "Bạc Liêu")^;
INSERT INTO provinces (id, name) VALUES (6, "Bắc Ninh")^;
INSERT INTO provinces (id, name) VALUES (7, "Bến Tre")^;
INSERT INTO provinces (id, name) VALUES (8, "Bình Dương")^;
INSERT INTO provinces (id, name) VALUES (9, "Bình Phước")^;
INSERT INTO provinces (id, name) VALUES (10, "Bình Thuận")^;
INSERT INTO provinces (id, name) VALUES (11, "Bình Định")^;
INSERT INTO provinces (id, name) VALUES (12, "Cà Mau")^;
INSERT INTO provinces (id, name) VALUES (13, "Cần Thơ")^;
INSERT INTO provinces (id, name) VALUES (14, "Cao Bằng")^;
INSERT INTO provinces (id, name) VALUES (15, "Gia Lai")^;
INSERT INTO provinces (id, name) VALUES (16, "Hà Giang")^;
INSERT INTO provinces (id, name) VALUES (17, "Hà Nam")^;
INSERT INTO provinces (id, name) VALUES (18, "Hà Nội")^;
INSERT INTO provinces (id, name) VALUES (19, "Hà Tĩnh")^;
INSERT INTO provinces (id, name) VALUES (20, "Hải Dương")^;
INSERT INTO provinces (id, name) VALUES (21, "Hải Phòng")^;
INSERT INTO provinces (id, name) VALUES (22, "Hậu Giang")^;
INSERT INTO provinces (id, name) VALUES (23, "Hồ Chí Minh")^;
INSERT INTO provinces (id, name) VALUES (24, "Hoà Bình")^;
INSERT INTO provinces (id, name) VALUES (25, "Hưng Yên")^;
INSERT INTO provinces (id, name) VALUES (26, "Khánh Hòa")^;
INSERT INTO provinces (id, name) VALUES (27, "Kiên Giang")^;
INSERT INTO provinces (id, name) VALUES (28, "Kon Tum")^;
INSERT INTO provinces (id, name) VALUES (29, "Lai Châu")^;
INSERT INTO provinces (id, name) VALUES (30, "Lâm Đồng")^;
INSERT INTO provinces (id, name) VALUES (31, "Lạng Sơn")^;
INSERT INTO provinces (id, name) VALUES (32, "Lào Cai")^;
INSERT INTO provinces (id, name) VALUES (33, "Long An")^;
INSERT INTO provinces (id, name) VALUES (34, "Nam Định")^;
INSERT INTO provinces (id, name) VALUES (35, "Nghệ An")^;
INSERT INTO provinces (id, name) VALUES (36, "Ninh Bình")^;
INSERT INTO provinces (id, name) VALUES (37, "Ninh Thuận")^;
INSERT INTO provinces (id, name) VALUES (38, "Phú Thọ")^;
INSERT INTO provinces (id, name) VALUES (39, "Phú Yên")^;
INSERT INTO provinces (id, name) VALUES (40, "Quảng Bình")^;
INSERT INTO provinces (id, name) VALUES (41, "Quảng Nam")^;
INSERT INTO provinces (id, name) VALUES (42, "Quảng Ngãi")^;
INSERT INTO provinces (id, name) VALUES (43, "Quảng Ninh")^;
INSERT INTO provinces (id, name) VALUES (44, "Quảng Trị")^;
INSERT INTO provinces (id, name) VALUES (45, "Sóc Trăng")^;
INSERT INTO provinces (id, name) VALUES (46, "Sơn La")^;
INSERT INTO provinces (id, name) VALUES (47, "Tây Ninh")^;
INSERT INTO provinces (id, name) VALUES (48, "Thái Bình")^;
INSERT INTO provinces (id, name) VALUES (49, "Thái Nguyên")^;
INSERT INTO provinces (id, name) VALUES (50, "Thanh Hóa")^;
INSERT INTO provinces (id, name) VALUES (51, "Thừa Thiên Huế")^;
INSERT INTO provinces (id, name) VALUES (52, "Tiền Giang")^;
INSERT INTO provinces (id, name) VALUES (53, "Trà Vinh")^;
INSERT INTO provinces (id, name) VALUES (54, "Tuyên Quang")^;
INSERT INTO provinces (id, name) VALUES (55, "Vĩnh Long")^;
INSERT INTO provinces (id, name) VALUES (56, "Vĩnh Phúc")^;
INSERT INTO provinces (id, name) VALUES (57, "Yên Bái")^;
INSERT INTO provinces (id, name) VALUES (58, "Đà Nẵng")^;
INSERT INTO provinces (id, name) VALUES (59, "Đắk Lắk")^;
INSERT INTO provinces (id, name) VALUES (60, "Đắk Nông")^;
INSERT INTO provinces (id, name) VALUES (61, "Điện Biên")^;
INSERT INTO provinces (id, name) VALUES (62, "Đồng Nai")^;
INSERT INTO provinces (id, name) VALUES (63, "Đồng Tháp")^;

-- Data for table `stations`
-- Ho Chi Minh
INSERT INTO stations (id, name, province_id) VALUES (1, "Sài Gòn", 23)^;
-- Quang Ngai
INSERT INTO stations (id, name, province_id) VALUES (2, "Quảng Ngãi", 42)^;
INSERT INTO stations (id, name, province_id) VALUES (3, "Đức Phổ", 42)^;
-- Da Nang
INSERT INTO stations (id, name, province_id) VALUES (4, "Đà Nẵng", 58)^;
INSERT INTO stations (id, name, province_id) VALUES (5, "Kim Liên", 58)^;
-- Ha Noi
INSERT INTO stations (id, name, province_id) VALUES (6, "Hà Nội", 18)^;
INSERT INTO stations (id, name, province_id) VALUES (7, "Giáp Bát", 18)^;
INSERT INTO stations (id, name, province_id) VALUES (8, "Văn Điền", 18)^;
INSERT INTO stations (id, name, province_id) VALUES (9, "Phú Diễn", 18)^;
INSERT INTO stations (id, name, province_id) VALUES (10, "Phường Mỗ", 18)^;
INSERT INTO stations (id, name, province_id) VALUES (11, "Gia Lâm", 18)^;
INSERT INTO stations (id, name, province_id) VALUES (12, "Long Biên", 18)^;
INSERT INTO stations (id, name, province_id) VALUES (13, "Yên Viên", 18)^;
INSERT INTO stations (id, name, province_id) VALUES (14, "Cổ Loa", 18)^;
INSERT INTO stations (id, name, province_id) VALUES (15, "Đông Anh", 18)^;
INSERT INTO stations (id, name, province_id) VALUES (16, "Thạch Lỗi", 18)^;
INSERT INTO stations (id, name, province_id) VALUES (17, "Đa Phúc", 18)^;
INSERT INTO stations (id, name, province_id) VALUES (18, "Trung Giã", 18)^;
INSERT INTO stations (id, name, province_id) VALUES (19, "Thị Cầu", 18)^;
-- Khanh Hoa
INSERT INTO stations (id, name, province_id) VALUES (20, "Đại Lãnh", 26)^;
INSERT INTO stations (id, name, province_id) VALUES (21, "Tu Bông", 26)^;
INSERT INTO stations (id, name, province_id) VALUES (22, "Giã", 26)^;
INSERT INTO stations (id, name, province_id) VALUES (23, "Ninh Hòa", 26)^;
INSERT INTO stations (id, name, province_id) VALUES (24, "Nha Trang", 26)^;
INSERT INTO stations (id, name, province_id) VALUES (25, "Ngã Ba", 26)^;
-- Hai duong
INSERT INTO stations (id, name, province_id) VALUES (26, "Cẩm Giàng", 20)^;
INSERT INTO stations (id, name, province_id) VALUES (27, "Chí Linh", 20)^;
INSERT INTO stations (id, name, province_id) VALUES (28, "Hải Dương", 20)^;
INSERT INTO stations (id, name, province_id) VALUES (29, "Phú Thái", 20)^;
-- Hue
INSERT INTO stations (id, name, province_id) VALUES (30, "Phò Trạch", 51)^;
INSERT INTO stations (id, name, province_id) VALUES (31, "Hiền Sỹ", 51)^;
INSERT INTO stations (id, name, province_id) VALUES (32, "Văn Xá", 51)^;
INSERT INTO stations (id, name, province_id) VALUES (33, "Huế", 51)^;
INSERT INTO stations (id, name, province_id) VALUES (34, "Cầu Hai", 51)^;
INSERT INTO stations (id, name, province_id) VALUES (35, "Lăng Cô", 51)^;
INSERT INTO stations (id, name, province_id) VALUES (36, "An Hoà", 51)^;
-- Nghe An
INSERT INTO stations (id, name, province_id) VALUES (37, "Cầu Giát", 35)^;
INSERT INTO stations (id, name, province_id) VALUES (38, "Chợ Sy", 35)^;
INSERT INTO stations (id, name, province_id) VALUES (39, "Vinh", 35)^;
INSERT INTO stations (id, name, province_id) VALUES (40, "Yên Xuân", 35)^;
-- Hai Phong
INSERT INTO stations (id, name, province_id) VALUES (41, "Hải Phòng", 21)^;
INSERT INTO stations (id, name, province_id) VALUES (42, "Thượng Lý", 21)^;
-- Nam Dinh
INSERT INTO stations (id, name, province_id) VALUES (43, "Nam Định", 34)^;
-- Quang Binh
INSERT INTO stations (id, name, province_id) VALUES (44, "La Khê", 40)^;
INSERT INTO stations (id, name, province_id) VALUES (45, "Tân Ấp", 40)^;
INSERT INTO stations (id, name, province_id) VALUES (46, "Đồng Chuối", 40)^;
INSERT INTO stations (id, name, province_id) VALUES (47, "Kim Lũ", 40)^;
INSERT INTO stations (id, name, province_id) VALUES (48, "Đồng Lê", 40)^;
INSERT INTO stations (id, name, province_id) VALUES (49, "Ngọc Lâm", 40)^;
INSERT INTO stations (id, name, province_id) VALUES (50, "Lạc Sơn", 40)^;
INSERT INTO stations (id, name, province_id) VALUES (51, "Minh Lệ", 40)^;
INSERT INTO stations (id, name, province_id) VALUES (52, "Ngân Sơn", 40)^;
INSERT INTO stations (id, name, province_id) VALUES (53, "Thọ Lộc", 40)^;
INSERT INTO stations (id, name, province_id) VALUES (54, "Hoàn Lão", 40)^;
INSERT INTO stations (id, name, province_id) VALUES (55, "Lạc Giao", 40)^;
INSERT INTO stations (id, name, province_id) VALUES (56, "Phúc Tự", 40)^;
INSERT INTO stations (id, name, province_id) VALUES (57, "Đồng Hới", 40)^;
INSERT INTO stations (id, name, province_id) VALUES (58, "Lệ Kỳ", 40)^;
INSERT INTO stations (id, name, province_id) VALUES (59, "Long Đại", 40)^;
INSERT INTO stations (id, name, province_id) VALUES (60, "Mỹ Đức", 40)^;
INSERT INTO stations (id, name, province_id) VALUES (61, "Phú Hoà", 40)^;
INSERT INTO stations (id, name, province_id) VALUES (62, "Mỹ Trạch", 40)^;
INSERT INTO stations (id, name, province_id) VALUES (63, "Thượng Lâm", 40)^;
INSERT INTO stations (id, name, province_id) VALUES (64, "Minh Cẩm", 40)^;
-- Phu Yen
INSERT INTO stations (id, name, province_id) VALUES (65, "Phước Lãnh", 39)^;
INSERT INTO stations (id, name, province_id) VALUES (66, "La Hai", 39)^;
INSERT INTO stations (id, name, province_id) VALUES (67, "Tuy Hòa", 39)^;
INSERT INTO stations (id, name, province_id) VALUES (68, "Đông Tác", 39)^;
INSERT INTO stations (id, name, province_id) VALUES (69, "Phú Hiệp", 39)^;
-- Thanh Hoa
INSERT INTO stations (id, name, province_id) VALUES (70, "Thanh Hóa", 50)^;
INSERT INTO stations (id, name, province_id) VALUES (71, "Bỉm Sơn", 50)^;
INSERT INTO stations (id, name, province_id) VALUES (72, "Minh Khôi", 50)^;
-- Binh Thuan
INSERT INTO stations (id, name, province_id) VALUES (73, "Sông Mao", 10)^;
INSERT INTO stations (id, name, province_id) VALUES (74, "Phan Thiết", 10)^;
INSERT INTO stations (id, name, province_id) VALUES (75, "Ma Lâm", 10)^;
INSERT INTO stations (id, name, province_id) VALUES (76, "Bình Thuận", 10)^;
INSERT INTO stations (id, name, province_id) VALUES (77, "Suối Kiết", 10)^;
INSERT INTO stations (id, name, province_id) VALUES (78, "Gia Huynh", 10)^;
-- Binh Dinh
INSERT INTO stations (id, name, province_id) VALUES (79, "Bồng Sơn", 11)^;
INSERT INTO stations (id, name, province_id) VALUES (80, "Văn Phú", 11)^;
INSERT INTO stations (id, name, province_id) VALUES (81, "Quy Nhơn", 11)^;
INSERT INTO stations (id, name, province_id) VALUES (82, "Diêu Trì", 11)^;
INSERT INTO stations (id, name, province_id) VALUES (83, "Vân Canh", 11)^;
-- Phu Tho
INSERT INTO stations (id, name, province_id) VALUES (84, "Việt Trì", 38)^;
INSERT INTO stations (id, name, province_id) VALUES (85, "Phủ Đức", 38)^;
INSERT INTO stations (id, name, province_id) VALUES (86, "Tiên Kiên", 38)^;
INSERT INTO stations (id, name, province_id) VALUES (87, "Phú Thọ", 38)^;
INSERT INTO stations (id, name, province_id) VALUES (88, "Chí Phủ", 38)^;
INSERT INTO stations (id, name, province_id) VALUES (89, "Vũ Ẻn", 38)^;
INSERT INTO stations (id, name, province_id) VALUES (90, "Ấm Thượng", 38)^;
INSERT INTO stations (id, name, province_id) VALUES (91, "Đoan Thượng", 38)^;
-- Ha Tinh
INSERT INTO stations (id, name, province_id) VALUES (92, "Yên Trung", 19)^;
INSERT INTO stations (id, name, province_id) VALUES (93, "Đức Lạc", 19)^;
INSERT INTO stations (id, name, province_id) VALUES (94, "Yên Duệ", 19)^;
INSERT INTO stations (id, name, province_id) VALUES (95, "Hoà Duyệt", 19)^;
INSERT INTO stations (id, name, province_id) VALUES (96, "Thanh Luyện", 19)^;
INSERT INTO stations (id, name, province_id) VALUES (97, "Chu Lễ", 19)^;
INSERT INTO stations (id, name, province_id) VALUES (98, "Hương Phố", 19)^;
INSERT INTO stations (id, name, province_id) VALUES (99, "Phúc Trạch", 19)^;
-- Lâm Đồng
INSERT INTO stations (id, name, province_id) VALUES (100, "Đà Lạt", 30)^;
INSERT INTO stations (id, name, province_id) VALUES (101, "Trại Mát", 30)^;
-- Hà Nam
INSERT INTO stations (id, name, province_id) VALUES (102, "Phủ Lý", 17)^;
-- Ninh Bình
INSERT INTO stations (id, name, province_id) VALUES (103, "Ninh Bình", 36)^;
-- Bình Dương
INSERT INTO stations (id, name, province_id) VALUES (104, "Dĩ An", 8)^;
INSERT INTO stations (id, name, province_id) VALUES (105, "Sóng Thần", 8)^;
-- Đồng Nai
INSERT INTO stations (id, name, province_id) VALUES (106, "Biên Hòa", 62)^;
INSERT INTO stations (id, name, province_id) VALUES (107, "Long Khánh", 62)^;
INSERT INTO stations (id, name, province_id) VALUES (108, "Gia Ray", 62)^;
-- Lào Cai
INSERT INTO stations (id, name, province_id) VALUES (109, "Lào Cai", 32)^;
INSERT INTO stations (id, name, province_id) VALUES (110, "Bảo Hà", 32)^;
INSERT INTO stations (id, name, province_id) VALUES (111, "Thái Văn", 32)^;
INSERT INTO stations (id, name, province_id) VALUES (112, "Phố Lu", 32)^;
INSERT INTO stations (id, name, province_id) VALUES (113, "Thái Niên", 32)^;
INSERT INTO stations (id, name, province_id) VALUES (114, "Lào Cai", 32)^;
-- Yên Bái
INSERT INTO stations (id, name, province_id) VALUES (115, "Yên Bái", 57)^;
INSERT INTO stations (id, name, province_id) VALUES (116, "Cổ Phúc", 57)^;
INSERT INTO stations (id, name, province_id) VALUES (117, "Ngòi Hóp", 57)^;
INSERT INTO stations (id, name, province_id) VALUES (118, "Mậu A", 57)^;
INSERT INTO stations (id, name, province_id) VALUES (119, "Trái Hút", 57)^;
INSERT INTO stations (id, name, province_id) VALUES (120, "Lâm Giang", 57)^;
INSERT INTO stations (id, name, province_id) VALUES (121, "Lang Khay", 57)^;
INSERT INTO stations (id, name, province_id) VALUES (122, "Lang Thíp", 57)^;
-- Lạng Sơn
INSERT INTO stations (id, name, province_id) VALUES (123, "Voi Xô", 31)^;
INSERT INTO stations (id, name, province_id) VALUES (124, "Phố Vị", 31)^;
INSERT INTO stations (id, name, province_id) VALUES (125, "Bắc Lệ", 31)^;
INSERT INTO stations (id, name, province_id) VALUES (126, "Sông Hoá", 31)^;
INSERT INTO stations (id, name, province_id) VALUES (127, "Chi Lăng", 31)^;
INSERT INTO stations (id, name, province_id) VALUES (128, "Đồng Mỏ", 31)^;
INSERT INTO stations (id, name, province_id) VALUES (129, "Bắc Thuỷ", 31)^;
INSERT INTO stations (id, name, province_id) VALUES (130, "Bản Thí", 31)^;
INSERT INTO stations (id, name, province_id) VALUES (131, "Yên Trạch", 31)^;
INSERT INTO stations (id, name, province_id) VALUES (132, "Lạng Sơn", 31)^;
INSERT INTO stations (id, name, province_id) VALUES (133, "Đồng Đăng", 31)^;
-- Thái Nguyên
INSERT INTO stations (id, name, province_id) VALUES (134, "Thái Nguyên", 49)^;
INSERT INTO stations (id, name, province_id) VALUES (135, "Lương Sơn", 49)^;
INSERT INTO stations (id, name, province_id) VALUES (136, "Lưu Xá", 49)^;
INSERT INTO stations (id, name, province_id) VALUES (137, "Phổ Yên", 49)^;
INSERT INTO stations (id, name, province_id) VALUES (138, "Quán Triều", 49)^;
-- Quảng Ninh
INSERT INTO stations (id, name, province_id) VALUES (139, "Hạ Long", 43)^;
INSERT INTO stations (id, name, province_id) VALUES (140, "Đông Triều", 43)^;
INSERT INTO stations (id, name, province_id) VALUES (141, "Mạo Khê", 43)^;
INSERT INTO stations (id, name, province_id) VALUES (142, "Nam Khê", 43)^;
INSERT INTO stations (id, name, province_id) VALUES (143, "Uông Bí", 43)^;
INSERT INTO stations (id, name, province_id) VALUES (144, "Yên Cư", 43)^;
INSERT INTO stations (id, name, province_id) VALUES (145, "Yên Dưỡng", 43)^;
INSERT INTO stations (id, name, province_id) VALUES (146, "Bàn Cờ", 43)^;
-- Bắc Giang
INSERT INTO stations (id, name, province_id) VALUES (147, "Bắc Giang", 3)^;
INSERT INTO stations (id, name, province_id) VALUES (148, "Sen Hồ", 3)^;
INSERT INTO stations (id, name, province_id) VALUES (149, "Phố Tráng", 3)^;
INSERT INTO stations (id, name, province_id) VALUES (150, "Lan Mẫu", 3)^;
INSERT INTO stations (id, name, province_id) VALUES (151, "Bảo Sơn", 3)^;
INSERT INTO stations (id, name, province_id) VALUES (152, "Cẩm Lý", 3)^;
INSERT INTO stations (id, name, province_id) VALUES (153, "Kép", 3)^;
-- Vĩnh Phúc
INSERT INTO stations (id, name, province_id) VALUES (154, "Vĩnh Yên", 56)^;
INSERT INTO stations (id, name, province_id) VALUES (155, "Phúc Yên", 56)^;
-- Bắc Ninh
INSERT INTO stations (id, name, province_id) VALUES (156, "Bắc Ninh", 6)^;
INSERT INTO stations (id, name, province_id) VALUES (157, "Từ Sơn", 6)^;
INSERT INTO stations (id, name, province_id) VALUES (158, "Lim", 6)^;
-- Quảng Trị
INSERT INTO stations (id, name, province_id) VALUES (159, "Quảng Trị", 44)^;
INSERT INTO stations (id, name, province_id) VALUES (160, "Sa Lung", 44)^;
INSERT INTO stations (id, name, province_id) VALUES (161, "Tiên An", 44)^;
INSERT INTO stations (id, name, province_id) VALUES (162, "Hà Thanh", 44)^;
INSERT INTO stations (id, name, province_id) VALUES (163, "Đông Hà", 44)^;
INSERT INTO stations (id, name, province_id) VALUES (164, "Quảng Trị", 44)^;
INSERT INTO stations (id, name, province_id) VALUES (165, "Vĩnh Thuỷ", 44)^;
INSERT INTO stations (id, name, province_id) VALUES (166, "Diên Sanh", 44)^;
INSERT INTO stations (id, name, province_id) VALUES (167, "Mỹ Chánh", 44)^;
-- Quảng Nam
INSERT INTO stations (id, name, province_id) VALUES (168, "Tam Kỳ", 41)^;
INSERT INTO stations (id, name, province_id) VALUES (169, "Trà Kiệu", 41)^;
INSERT INTO stations (id, name, province_id) VALUES (170, "Phú Cang", 41)^;
INSERT INTO stations (id, name, province_id) VALUES (171, "Núi Thành", 41)^;
-- Ninh Thuận
INSERT INTO stations (id, name, province_id) VALUES (172, "Tháp Chàm", 37)^;
INSERT INTO stations (id, name, province_id) VALUES (173, "Cà Ná", 37)^;

-- Route
INSERT INTO routes (id, name) VALUES (1, "Sài Gòn - Hà Nội")^;
INSERT INTO routes (id, name) VALUES (2, "Hà Nội - Sài Gòn")^;

INSERT INTO routes (id, name) VALUES (3, "Sài Gòn - Đà Nẵng")^;
INSERT INTO routes (id, name) VALUES (4, "Đà Nẵng - Sài Gòn")^;

INSERT INTO routes (id, name) VALUES (5, "Hà Nội - Đà Nẵng")^;
INSERT INTO routes (id, name) VALUES (6, "Đà Nẵng - Hà Nội")^;

INSERT INTO routes (id, name) VALUES (7, "Hà Nội - Vinh")^;
INSERT INTO routes (id, name) VALUES (8, "Vinh - Hà Nội")^;


INSERT INTO routes (id, name) VALUES (9, "Sài Gòn - Quy Nhơn")^;
INSERT INTO routes (id, name) VALUES (10, "Quy Nhơn - Sài Gòn")^;

INSERT INTO routes (id, name) VALUES (11, "Sài Gòn - Nha Trang")^;
INSERT INTO routes (id, name) VALUES (12, "Nha Trang - Sài Gòn")^;

INSERT INTO routes (id, name) VALUES (13, "Sài Gòn - Phan Thiết")^;
INSERT INTO routes (id, name) VALUES (14, "Phan Thiết - Sài Gòn")^;

-- Carriage Layout
INSERT INTO carriage_layout (active, floors, row_count, id, name) VALUES (NULL, 1, 4, 1, "Ngồi mềm điều hòa")^;
INSERT INTO carriage_layout (active, floors, row_count, id, name) VALUES (NULL, 1, 3, 2, "Giường nằm khoang 6 điều hòa")^;
INSERT INTO carriage_layout (active, floors, row_count, id, name) VALUES (NULL, 1, 2, 3, "GIường nằm khoang 4 điều hòa")^;
INSERT INTO carriage_layout (active, floors, row_count, id, name) VALUES  (NULL, 1, 4, 4, "Ghế phụ, không điều hòa")^;

-- Seat Type
INSERT INTO seat_type(id, name, description, code, original_price_per_km, active) VALUES (1,
                                                                                          "Ghế ngồi cứng, không điều hòa", "Giá rẻ nhất, phù hợp với chặn ngắn, gỗ cứng, mức tiện nghi kém, không phù hợp với người già và trẻ em, không có điều hòa.",
                                                                                          "NCKDH",
                                                                                          1000,
                                                                                          1)^;

INSERT INTO seat_type(id, name, description, code, original_price_per_km, active) VALUES (2,
                                                                                          "Ghế ngồi cứng, có điều hòa", "Giá rẻ nhất, phù hợp với chặn ngắn, gỗ cứng, mức tiện nghi kém, không phù hợp với người già và trẻ em, có điều hòa.",
                                                                                          "NCCDH",
                                                                                          1100,
                                                                                          1)^;

INSERT INTO seat_type(id, name, description, code, original_price_per_km, active) VALUES (3,
                                                                                          "Ghế ngồi mềm, không điều hòa", "Giá và chất lượng tầm trung, tương đối rộng rãi, có thể điều chỉnh nghiên 15 độ để nghỉ ngơi, phù hợp với lộ trình kéo dài dưới 6 tiếng, không có điều hòa.",
                                                                                          "NMKDH",
                                                                                          1150,
                                                                                          1)^;

INSERT INTO seat_type(id, name, description, code, original_price_per_km, active) VALUES (4,
                                                                                          "Ghế ngồi mềm, có điều hòa", "Giá và chất lượng tầm trung, tương đối rộng rãi, có thể điều chỉnh nghiên 15 độ để nghỉ ngơi, phù hợp với lộ trình kéo dài dưới 6 tiếng, có điều hòa.",
                                                                                          "NMCDH",
                                                                                          1200,
                                                                                          1)^;

INSERT INTO seat_type(id, name, description, code, original_price_per_km, active) VALUES (5,
                                                                                          "Giường nằm khoang 4", "Giá vé cao, đầy đủ tiện nghi: điều hòa, chăn, ga gối đệm, ổ điện, nước uống miễn phí, không gian riêng tư, phù hợp với chuyến đi xa, đi qua đêm",
                                                                                          "GK4",
                                                                                          2200,
                                                                                          1)^;

INSERT INTO seat_type(id, name, description, code, original_price_per_km, active) VALUES (6,
                                                                                          "Giường nằm khoang 6", "Giá vé phải chăng, diện tích hẹp hơn so với khoang 4, khó ngồi thẳng vì chiều cao hạn chế của trần tàu, trang bị chăn gối nệm để hành khách nghỉ ngơi thoải mái, phù hợp với chuyến đi xa, đi qua đêm",
                                                                                          "GK6",
                                                                                          1600,
                                                                                          1)^;

INSERT INTO seat_type(id, name, description, code, original_price_per_km, active) VALUES (7,
                                                                                          "Giường nằm khoang 2 VIP", "Giá vé cao nhất trong các loại vé tàu hỏa, được phục vụ nước uống và bữa ăn miễn phí, không gian cực kì rộng rãi, đảm bảo tính riêng tư tuyệt đối, nội thất tốt nhất, hiện đại nhất, số lượng ít nên khó mua được vé",
                                                                                          "GK2V",
                                                                                          4000,
                                                                                          1)^;

INSERT INTO seat_type(id, name, description, code, original_price_per_km, active) VALUES (8,
                                                                                          "Ghế phụ", "Giá thành rẻ nhất, dễ dàng đặt vé, ghế nhựa cứng, không thoải mái cho việc nghỉ ngơi, không có không gian để cất hành lý, không được cung cấp các tiện nghi như các loại ghế tàu hỏa khác",
                                                                                          "GP",
                                                                                          800,
                                                                                          1)^;

-- Seats
INSERT INTO seat (position, carriage_layout_id, id, seat_type_id) VALUES (1, 1, 1, 4)^;
INSERT INTO seat (position, carriage_layout_id, id, seat_type_id) VALUES (2, 1, 2, 4)^;
INSERT INTO seat (position, carriage_layout_id, id, seat_type_id) VALUES (3, 1, 3, 4)^;
INSERT INTO seat (position, carriage_layout_id, id, seat_type_id) VALUES (4, 1, 4, 4)^;
INSERT INTO seat (position, carriage_layout_id, id, seat_type_id) VALUES (5, 1, 5, 4)^;
INSERT INTO seat (position, carriage_layout_id, id, seat_type_id) VALUES (6, 1, 6, 4)^;
INSERT INTO seat (position, carriage_layout_id, id, seat_type_id) VALUES (7, 1, 7, 4)^;
INSERT INTO seat (position, carriage_layout_id, id, seat_type_id) VALUES (8, 1, 8, 4)^;
INSERT INTO seat (position, carriage_layout_id, id, seat_type_id) VALUES (9, 1, 9, 4)^;
INSERT INTO seat (position, carriage_layout_id, id, seat_type_id) VALUES (10, 1, 10, 4)^;
INSERT INTO seat (position, carriage_layout_id, id, seat_type_id) VALUES (11, 1, 11, 4)^;
INSERT INTO seat (position, carriage_layout_id, id, seat_type_id) VALUES (12, 1, 12, 4)^;
INSERT INTO seat (position, carriage_layout_id, id, seat_type_id) VALUES (13, 1, 13, 4)^;
INSERT INTO seat (position, carriage_layout_id, id, seat_type_id) VALUES (14, 1, 14, 4)^;
INSERT INTO seat (position, carriage_layout_id, id, seat_type_id) VALUES (15, 1, 15, 4)^;
INSERT INTO seat (position, carriage_layout_id, id, seat_type_id) VALUES (16, 1, 16, 4)^;
INSERT INTO seat (position, carriage_layout_id, id, seat_type_id) VALUES (17, 1, 17, 4)^;
INSERT INTO seat (position, carriage_layout_id, id, seat_type_id) VALUES (18, 1, 18, 4)^;
INSERT INTO seat (position, carriage_layout_id, id, seat_type_id) VALUES (19, 1, 19, 4)^;
INSERT INTO seat (position, carriage_layout_id, id, seat_type_id) VALUES (20, 1, 20, 4)^;
INSERT INTO seat (position, carriage_layout_id, id, seat_type_id) VALUES (1, 2, 21, 6)^;
INSERT INTO seat (position, carriage_layout_id, id, seat_type_id) VALUES (2, 2, 22, 6)^;
INSERT INTO seat (position, carriage_layout_id, id, seat_type_id) VALUES (3, 2, 23, 6)^;
INSERT INTO seat (position, carriage_layout_id, id, seat_type_id) VALUES (4, 2, 24, 6)^;
INSERT INTO seat (position, carriage_layout_id, id, seat_type_id) VALUES (5, 2, 25, 6)^;
INSERT INTO seat (position, carriage_layout_id, id, seat_type_id) VALUES (6, 2, 26, 6)^;
INSERT INTO seat (position, carriage_layout_id, id, seat_type_id) VALUES (7, 2, 27, 6)^;
INSERT INTO seat (position, carriage_layout_id, id, seat_type_id) VALUES (8, 2, 28, 6)^;
INSERT INTO seat (position, carriage_layout_id, id, seat_type_id) VALUES (9, 2, 29, 6)^;
INSERT INTO seat (position, carriage_layout_id, id, seat_type_id) VALUES (10, 2, 30, 6)^;
INSERT INTO seat (position, carriage_layout_id, id, seat_type_id) VALUES (11, 2, 31, 6)^;
INSERT INTO seat (position, carriage_layout_id, id, seat_type_id) VALUES (12, 2, 32, 6)^;
INSERT INTO seat (position, carriage_layout_id, id, seat_type_id) VALUES (13, 2, 33, 6)^;
INSERT INTO seat (position, carriage_layout_id, id, seat_type_id) VALUES (14, 2, 34, 6)^;
INSERT INTO seat (position, carriage_layout_id, id, seat_type_id) VALUES (15, 2, 35, 6)^;
INSERT INTO seat (position, carriage_layout_id, id, seat_type_id) VALUES (16, 2, 36, 6)^;
INSERT INTO seat (position, carriage_layout_id, id, seat_type_id) VALUES (17, 2, 37, 6)^;
INSERT INTO seat (position, carriage_layout_id, id, seat_type_id) VALUES (18, 2, 38, 6)^;
INSERT INTO seat (position, carriage_layout_id, id, seat_type_id) VALUES (1, 3, 39, 5)^;
INSERT INTO seat (position, carriage_layout_id, id, seat_type_id) VALUES (2, 3, 40, 5)^;
INSERT INTO seat (position, carriage_layout_id, id, seat_type_id) VALUES (3, 3, 41, 5)^;
INSERT INTO seat (position, carriage_layout_id, id, seat_type_id) VALUES (4, 3, 42, 5)^;
INSERT INTO seat (position, carriage_layout_id, id, seat_type_id) VALUES (5, 3, 43, 5)^;
INSERT INTO seat (position, carriage_layout_id, id, seat_type_id) VALUES (6, 3, 44, 5)^;
INSERT INTO seat (position, carriage_layout_id, id, seat_type_id) VALUES (7, 3, 45, 5)^;
INSERT INTO seat (position, carriage_layout_id, id, seat_type_id) VALUES (8, 3, 46, 5)^;
INSERT INTO seat (position, carriage_layout_id, id, seat_type_id) VALUES (9, 3, 47, 5)^;
INSERT INTO seat (position, carriage_layout_id, id, seat_type_id) VALUES (10, 3, 48, 5)^;
INSERT INTO seat (position, carriage_layout_id, id, seat_type_id) VALUES (11, 3, 49, 5)^;
INSERT INTO seat (position, carriage_layout_id, id, seat_type_id) VALUES (12, 3, 50, 5)^;
INSERT INTO seat (position, carriage_layout_id, id, seat_type_id) VALUES (1, 4, 51, 8)^;
INSERT INTO seat (position, carriage_layout_id, id, seat_type_id) VALUES (2, 4, 52, 8)^;
INSERT INTO seat (position, carriage_layout_id, id, seat_type_id) VALUES (3, 4, 53, 8)^;
INSERT INTO seat (position, carriage_layout_id, id, seat_type_id) VALUES (4, 4, 54, 8)^;
INSERT INTO seat (position, carriage_layout_id, id, seat_type_id) VALUES (5, 4, 55, 8)^;
INSERT INTO seat (position, carriage_layout_id, id, seat_type_id) VALUES (6, 4, 56, 8)^;
INSERT INTO seat (position, carriage_layout_id, id, seat_type_id) VALUES (7, 4, 57, 8)^;
INSERT INTO seat (position, carriage_layout_id, id, seat_type_id) VALUES (8, 4, 58, 8)^;
INSERT INTO seat (position, carriage_layout_id, id, seat_type_id) VALUES (9, 4, 59, 8)^;
INSERT INTO seat (position, carriage_layout_id, id, seat_type_id) VALUES (10, 4, 60, 8)^;
INSERT INTO seat (position, carriage_layout_id, id, seat_type_id) VALUES (11, 4, 61, 8)^;
INSERT INTO seat (position, carriage_layout_id, id, seat_type_id) VALUES (12, 4, 62, 8)^;
INSERT INTO seat (position, carriage_layout_id, id, seat_type_id) VALUES (13, 4, 63, 8)^;
INSERT INTO seat (position, carriage_layout_id, id, seat_type_id) VALUES (14, 4, 64, 8)^;
INSERT INTO seat (position, carriage_layout_id, id, seat_type_id) VALUES (15, 4, 65, 8)^;
INSERT INTO seat (position, carriage_layout_id, id, seat_type_id) VALUES (16, 4, 66, 8)^;
INSERT INTO seat (position, carriage_layout_id, id, seat_type_id) VALUES (17, 4, 67, 8)^;
INSERT INTO seat (position, carriage_layout_id, id, seat_type_id) VALUES (18, 4, 68, 8)^;
INSERT INTO seat (position, carriage_layout_id, id, seat_type_id) VALUES (19, 4, 69, 8)^;
INSERT INTO seat (position, carriage_layout_id, id, seat_type_id) VALUES (20, 4, 70, 8)^;




-- Trains
INSERT INTO trains(id, name, route_id, is_active) VALUES (1, "SE1", 2, 1)^;
INSERT INTO trains(id, name, route_id, is_active) VALUES (2, "SE2", 1, 1)^;
INSERT INTO trains(id, name, route_id, is_active) VALUES (3, "SE3", 2, 1)^;
INSERT INTO trains(id, name, route_id, is_active) VALUES (4, "SE4", 1, 1)^;
INSERT INTO trains(id, name, route_id, is_active) VALUES (5, "SE5", 2, 1)^;
INSERT INTO trains(id, name, route_id, is_active) VALUES (6, "SE6", 1, 1)^;
INSERT INTO trains(id, name, route_id, is_active) VALUES (7, "SE7", 2, 1)^;
INSERT INTO trains(id, name, route_id, is_active) VALUES (8, "SE8", 1, 1)^;


-- SG - DN
INSERT INTO trains(id, name, route_id, is_active) VALUES (9, "SE21", 4, 1)^;
INSERT INTO trains(id, name, route_id, is_active) VALUES (10, "SE22", 3, 1)^;

-- HN - Vinh
INSERT INTO trains(id, name, route_id, is_active) VALUES (11, "NA1", 7, 1)^;
INSERT INTO trains(id, name, route_id, is_active) VALUES (12, "NA2", 8, 1)^;

-- HN - DN
INSERT INTO trains(id, name, route_id, is_active) VALUES (13, "SE19", 5, 1)^;
INSERT INTO trains(id, name, route_id, is_active) VALUES (14, "SE20", 6, 1)^;

-- SG - Nha Trang
INSERT INTO trains(id, name, route_id, is_active) VALUES (16, "SNT1", 12, 1)^;
INSERT INTO trains(id, name, route_id, is_active) VALUES (17, "SNT2", 11, 1)^;

-- SG - Phan Thiết
INSERT INTO trains(id, name, route_id, is_active) VALUES (20, "SPT1", 13, 1)^;
INSERT INTO trains(id, name, route_id, is_active) VALUES (21, "SPT2", 14, 1)^;

-- Carriages
-- for train 01
INSERT INTO carriage (id, position, carriage_layout_id, train_id) VALUES (1, 1, 1, 1)^;
INSERT INTO carriage (id, position, carriage_layout_id, train_id) VALUES (2, 2, 1, 1)^;
INSERT INTO carriage (id, position, carriage_layout_id, train_id) VALUES (3, 3, 1, 1)^;
INSERT INTO carriage (id, position, carriage_layout_id, train_id) VALUES (4, 4, 2, 1)^;
INSERT INTO carriage (id, position, carriage_layout_id, train_id) VALUES (5, 5, 3, 1)^;
INSERT INTO carriage (id, position, carriage_layout_id, train_id) VALUES (6, 6, 4, 1)^;

-- for train 02
INSERT INTO carriage (id, position, carriage_layout_id, train_id) VALUES (7, 1, 1, 2)^;
INSERT INTO carriage (id, position, carriage_layout_id, train_id) VALUES (8, 2, 1, 2)^;
INSERT INTO carriage (id, position, carriage_layout_id, train_id) VALUES (9, 3, 1, 2)^;
INSERT INTO carriage (id, position, carriage_layout_id, train_id) VALUES (10, 4, 2, 2)^;
INSERT INTO carriage (id, position, carriage_layout_id, train_id) VALUES (11, 5, 3, 2)^;
INSERT INTO carriage (id, position, carriage_layout_id, train_id) VALUES (12, 6, 4, 2)^;

-- for train 03
INSERT INTO carriage (id, position, carriage_layout_id, train_id) VALUES (13, 1, 1, 3)^;
INSERT INTO carriage (id, position, carriage_layout_id, train_id) VALUES (14, 2, 1, 3)^;
INSERT INTO carriage (id, position, carriage_layout_id, train_id) VALUES (15, 3, 1, 3)^;
INSERT INTO carriage (id, position, carriage_layout_id, train_id) VALUES (16, 4, 2, 3)^;
INSERT INTO carriage (id, position, carriage_layout_id, train_id) VALUES (17, 5, 3, 3)^;
INSERT INTO carriage (id, position, carriage_layout_id, train_id) VALUES (18, 6, 4, 3)^;

-- for train 04
INSERT INTO carriage (id, position, carriage_layout_id, train_id) VALUES (19, 1, 1, 4)^;
INSERT INTO carriage (id, position, carriage_layout_id, train_id) VALUES (20, 2, 1, 4)^;
INSERT INTO carriage (id, position, carriage_layout_id, train_id) VALUES (21, 3, 1, 4)^;
INSERT INTO carriage (id, position, carriage_layout_id, train_id) VALUES (22, 4, 2, 4)^;
INSERT INTO carriage (id, position, carriage_layout_id, train_id) VALUES (23, 5, 3, 4)^;
INSERT INTO carriage (id, position, carriage_layout_id, train_id) VALUES (24, 6, 4, 4)^;

-- for train 05
INSERT INTO carriage (id, position, carriage_layout_id, train_id) VALUES (25, 1, 1, 5)^;
INSERT INTO carriage (id, position, carriage_layout_id, train_id) VALUES (26, 2, 1, 5)^;
INSERT INTO carriage (id, position, carriage_layout_id, train_id) VALUES (27, 3, 1, 5)^;
INSERT INTO carriage (id, position, carriage_layout_id, train_id) VALUES (28, 4, 2, 5)^;
INSERT INTO carriage (id, position, carriage_layout_id, train_id) VALUES (29, 5, 3, 5)^;
INSERT INTO carriage (id, position, carriage_layout_id, train_id) VALUES (30, 6, 4, 5)^;

-- for train 06
INSERT INTO carriage (id, position, carriage_layout_id, train_id) VALUES (31, 1, 1, 6)^;
INSERT INTO carriage (id, position, carriage_layout_id, train_id) VALUES (32, 2, 1, 6)^;
INSERT INTO carriage (id, position, carriage_layout_id, train_id) VALUES (33, 3, 1, 6)^;
INSERT INTO carriage (id, position, carriage_layout_id, train_id) VALUES (34, 4, 2, 6)^;
INSERT INTO carriage (id, position, carriage_layout_id, train_id) VALUES (35, 5, 3, 6)^;
INSERT INTO carriage (id, position, carriage_layout_id, train_id) VALUES (36, 6, 4, 6)^;

-- for train 07
INSERT INTO carriage (id, position, carriage_layout_id, train_id) VALUES (37, 1, 1, 7)^;
INSERT INTO carriage (id, position, carriage_layout_id, train_id) VALUES (38, 2, 1, 7)^;
INSERT INTO carriage (id, position, carriage_layout_id, train_id) VALUES (39, 3, 1, 7)^;
INSERT INTO carriage (id, position, carriage_layout_id, train_id) VALUES (40, 4, 2, 7)^;
INSERT INTO carriage (id, position, carriage_layout_id, train_id) VALUES (41, 5, 3, 7)^;
INSERT INTO carriage (id, position, carriage_layout_id, train_id) VALUES (42, 6, 4, 7)^;

-- for train 08
INSERT INTO carriage (id, position, carriage_layout_id, train_id) VALUES (43, 1, 1, 8)^;
INSERT INTO carriage (id, position, carriage_layout_id, train_id) VALUES (44, 2, 1, 8)^;
INSERT INTO carriage (id, position, carriage_layout_id, train_id) VALUES (45, 3, 1, 8)^;
INSERT INTO carriage (id, position, carriage_layout_id, train_id) VALUES (46, 4, 2, 8)^;
INSERT INTO carriage (id, position, carriage_layout_id, train_id) VALUES (47, 5, 3, 8)^;
INSERT INTO carriage (id, position, carriage_layout_id, train_id) VALUES (48, 6, 4, 8)^;

-- for train 09
INSERT INTO carriage (id, position, carriage_layout_id, train_id) VALUES (49, 1, 1, 9)^;
INSERT INTO carriage (id, position, carriage_layout_id, train_id) VALUES (50, 2, 1, 9)^;
INSERT INTO carriage (id, position, carriage_layout_id, train_id) VALUES (51, 3, 1, 9)^;
INSERT INTO carriage (id, position, carriage_layout_id, train_id) VALUES (52, 4, 2, 9)^;
INSERT INTO carriage (id, position, carriage_layout_id, train_id) VALUES (53, 5, 3, 9)^;
INSERT INTO carriage (id, position, carriage_layout_id, train_id) VALUES (54, 6, 4, 9)^;

-- for train 10
INSERT INTO carriage (id, position, carriage_layout_id, train_id) VALUES (55, 1, 1, 10)^;
INSERT INTO carriage (id, position, carriage_layout_id, train_id) VALUES (56, 2, 1, 10)^;
INSERT INTO carriage (id, position, carriage_layout_id, train_id) VALUES (57, 3, 1, 10)^;
INSERT INTO carriage (id, position, carriage_layout_id, train_id) VALUES (58, 4, 2, 10)^;
INSERT INTO carriage (id, position, carriage_layout_id, train_id) VALUES (59, 5, 3, 10)^;
INSERT INTO carriage (id, position, carriage_layout_id, train_id) VALUES (60, 6, 4, 10)^;

-- for train 11
INSERT INTO carriage (id, position, carriage_layout_id, train_id) VALUES (61, 1, 1, 11)^;
INSERT INTO carriage (id, position, carriage_layout_id, train_id) VALUES (62, 2, 1, 11)^;
INSERT INTO carriage (id, position, carriage_layout_id, train_id) VALUES (63, 3, 1, 11)^;
INSERT INTO carriage (id, position, carriage_layout_id, train_id) VALUES (64, 4, 2, 11)^;
INSERT INTO carriage (id, position, carriage_layout_id, train_id) VALUES (65, 5, 3, 11)^;
INSERT INTO carriage (id, position, carriage_layout_id, train_id) VALUES (66, 6, 4, 11)^;

-- for train 12
INSERT INTO carriage (id, position, carriage_layout_id, train_id) VALUES (67, 1, 1, 12)^;
INSERT INTO carriage (id, position, carriage_layout_id, train_id) VALUES (68, 2, 1, 12)^;
INSERT INTO carriage (id, position, carriage_layout_id, train_id) VALUES (69, 3, 1, 12)^;
INSERT INTO carriage (id, position, carriage_layout_id, train_id) VALUES (70, 4, 2, 12)^;
INSERT INTO carriage (id, position, carriage_layout_id, train_id) VALUES (71, 5, 3, 12)^;
INSERT INTO carriage (id, position, carriage_layout_id, train_id) VALUES (72, 6, 4, 12)^;

-- for train 13
INSERT INTO carriage (id, position, carriage_layout_id, train_id) VALUES (73, 1, 1, 13)^;
INSERT INTO carriage (id, position, carriage_layout_id, train_id) VALUES (74, 2, 1, 13)^;
INSERT INTO carriage (id, position, carriage_layout_id, train_id) VALUES (75, 3, 1, 13)^;
INSERT INTO carriage (id, position, carriage_layout_id, train_id) VALUES (76, 4, 2, 13)^;
INSERT INTO carriage (id, position, carriage_layout_id, train_id) VALUES (77, 5, 3, 13)^;
INSERT INTO carriage (id, position, carriage_layout_id, train_id) VALUES (78, 6, 4, 13)^;

-- for train 14
INSERT INTO carriage (id, position, carriage_layout_id, train_id) VALUES (79, 1, 1, 14)^;
INSERT INTO carriage (id, position, carriage_layout_id, train_id) VALUES (80, 2, 1, 14)^;
INSERT INTO carriage (id, position, carriage_layout_id, train_id) VALUES (81, 3, 1, 14)^;
INSERT INTO carriage (id, position, carriage_layout_id, train_id) VALUES (82, 4, 2, 14)^;
INSERT INTO carriage (id, position, carriage_layout_id, train_id) VALUES (83, 5, 3, 14)^;
INSERT INTO carriage (id, position, carriage_layout_id, train_id) VALUES (84, 6, 4, 14)^;

-- seat price
INSERT INTO seat_price (original_price_per_km, id, seat_type_id, train_id) VALUES (1000, 1, 1, 1)^;
INSERT INTO seat_price (original_price_per_km, id, seat_type_id, train_id) VALUES (1100, 2, 2, 1)^;
INSERT INTO seat_price (original_price_per_km, id, seat_type_id, train_id) VALUES (1150, 3, 3, 1)^;
INSERT INTO seat_price (original_price_per_km, id, seat_type_id, train_id) VALUES (1200, 4, 4, 1)^;
INSERT INTO seat_price (original_price_per_km, id, seat_type_id, train_id) VALUES (2200, 5, 5, 1)^;
INSERT INTO seat_price (original_price_per_km, id, seat_type_id, train_id) VALUES (1600, 6, 6, 1)^;
INSERT INTO seat_price (original_price_per_km, id, seat_type_id, train_id) VALUES (4000, 7, 7, 1)^;
INSERT INTO seat_price (original_price_per_km, id, seat_type_id, train_id) VALUES (800, 8, 8, 1)^;

INSERT INTO seat_price (original_price_per_km, id, seat_type_id, train_id) VALUES (1000, 9, 1, 2)^;
INSERT INTO seat_price (original_price_per_km, id, seat_type_id, train_id) VALUES (1100, 10, 2, 2)^;
INSERT INTO seat_price (original_price_per_km, id, seat_type_id, train_id) VALUES (1150, 11, 3, 2)^;
INSERT INTO seat_price (original_price_per_km, id, seat_type_id, train_id) VALUES (1200, 12, 4, 2)^;
INSERT INTO seat_price (original_price_per_km, id, seat_type_id, train_id) VALUES (2200, 13, 5, 2)^;
INSERT INTO seat_price (original_price_per_km, id, seat_type_id, train_id) VALUES (1600, 14, 6, 2)^;
INSERT INTO seat_price (original_price_per_km, id, seat_type_id, train_id) VALUES (4000, 15, 7, 2)^;
INSERT INTO seat_price (original_price_per_km, id, seat_type_id, train_id) VALUES (800, 16, 8, 2)^;

INSERT INTO seat_price (original_price_per_km, id, seat_type_id, train_id) VALUES (1000, 17, 1, 3)^;
INSERT INTO seat_price (original_price_per_km, id, seat_type_id, train_id) VALUES (1100, 18, 2, 3)^;
INSERT INTO seat_price (original_price_per_km, id, seat_type_id, train_id) VALUES (1150, 19, 3, 3)^;
INSERT INTO seat_price (original_price_per_km, id, seat_type_id, train_id) VALUES (1200, 20, 4, 3)^;
INSERT INTO seat_price (original_price_per_km, id, seat_type_id, train_id) VALUES (2200, 21, 5, 3)^;
INSERT INTO seat_price (original_price_per_km, id, seat_type_id, train_id) VALUES (1600, 22, 6, 3)^;
INSERT INTO seat_price (original_price_per_km, id, seat_type_id, train_id) VALUES (4000, 23, 7, 3)^;
INSERT INTO seat_price (original_price_per_km, id, seat_type_id, train_id) VALUES (800, 24, 8, 3)^;

INSERT INTO seat_price (original_price_per_km, id, seat_type_id, train_id) VALUES (1000, 25, 1, 4)^;
INSERT INTO seat_price (original_price_per_km, id, seat_type_id, train_id) VALUES (1100, 26, 2, 4)^;
INSERT INTO seat_price (original_price_per_km, id, seat_type_id, train_id) VALUES (1150, 27, 3, 4)^;
INSERT INTO seat_price (original_price_per_km, id, seat_type_id, train_id) VALUES (1200, 28, 4, 4)^;
INSERT INTO seat_price (original_price_per_km, id, seat_type_id, train_id) VALUES (2200, 29, 5, 4)^;
INSERT INTO seat_price (original_price_per_km, id, seat_type_id, train_id) VALUES (1600, 30, 6, 4)^;
INSERT INTO seat_price (original_price_per_km, id, seat_type_id, train_id) VALUES (4000, 31, 7, 4)^;
INSERT INTO seat_price (original_price_per_km, id, seat_type_id, train_id) VALUES (800, 32, 8, 4)^;

INSERT INTO seat_price (original_price_per_km, id, seat_type_id, train_id) VALUES (1000, 33, 1, 5)^;
INSERT INTO seat_price (original_price_per_km, id, seat_type_id, train_id) VALUES (1100, 34, 2, 5)^;
INSERT INTO seat_price (original_price_per_km, id, seat_type_id, train_id) VALUES (1150, 35, 3, 5)^;
INSERT INTO seat_price (original_price_per_km, id, seat_type_id, train_id) VALUES (1200, 36, 4, 5)^;
INSERT INTO seat_price (original_price_per_km, id, seat_type_id, train_id) VALUES (2200, 37, 5, 5)^;
INSERT INTO seat_price (original_price_per_km, id, seat_type_id, train_id) VALUES (1600, 38, 6, 5)^;
INSERT INTO seat_price (original_price_per_km, id, seat_type_id, train_id) VALUES (4000, 39, 7, 5)^;
INSERT INTO seat_price (original_price_per_km, id, seat_type_id, train_id) VALUES (800, 40, 8, 5)^;

INSERT INTO seat_price (original_price_per_km, id, seat_type_id, train_id) VALUES (1000, 41, 1, 6)^;
INSERT INTO seat_price (original_price_per_km, id, seat_type_id, train_id) VALUES (1100, 42, 2, 6)^;
INSERT INTO seat_price (original_price_per_km, id, seat_type_id, train_id) VALUES (1150, 43, 3, 6)^;
INSERT INTO seat_price (original_price_per_km, id, seat_type_id, train_id) VALUES (1200, 44, 4, 6)^;
INSERT INTO seat_price (original_price_per_km, id, seat_type_id, train_id) VALUES (2200, 45, 5, 6)^;
INSERT INTO seat_price (original_price_per_km, id, seat_type_id, train_id) VALUES (1600, 46, 6, 6)^;
INSERT INTO seat_price (original_price_per_km, id, seat_type_id, train_id) VALUES (4000, 47, 7, 6)^;
INSERT INTO seat_price (original_price_per_km, id, seat_type_id, train_id) VALUES (800, 48, 8, 6)^;

INSERT INTO seat_price (original_price_per_km, id, seat_type_id, train_id) VALUES (1000, 49, 1, 7)^;
INSERT INTO seat_price (original_price_per_km, id, seat_type_id, train_id) VALUES (1100, 50, 2, 7)^;
INSERT INTO seat_price (original_price_per_km, id, seat_type_id, train_id) VALUES (1150, 51, 3, 7)^;
INSERT INTO seat_price (original_price_per_km, id, seat_type_id, train_id) VALUES (1200, 52, 4, 7)^;
INSERT INTO seat_price (original_price_per_km, id, seat_type_id, train_id) VALUES (2200, 53, 5, 7)^;
INSERT INTO seat_price (original_price_per_km, id, seat_type_id, train_id) VALUES (1600, 54, 6, 7)^;
INSERT INTO seat_price (original_price_per_km, id, seat_type_id, train_id) VALUES (4000, 55, 7, 7)^;
INSERT INTO seat_price (original_price_per_km, id, seat_type_id, train_id) VALUES (800, 56, 8, 7)^;

INSERT INTO seat_price (original_price_per_km, id, seat_type_id, train_id) VALUES (1000, 57, 1, 8)^;
INSERT INTO seat_price (original_price_per_km, id, seat_type_id, train_id) VALUES (1100, 58, 2, 8)^;
INSERT INTO seat_price (original_price_per_km, id, seat_type_id, train_id) VALUES (1150, 59, 3, 8)^;
INSERT INTO seat_price (original_price_per_km, id, seat_type_id, train_id) VALUES (1200, 60, 4, 8)^;
INSERT INTO seat_price (original_price_per_km, id, seat_type_id, train_id) VALUES (2200, 61, 5, 8)^;
INSERT INTO seat_price (original_price_per_km, id, seat_type_id, train_id) VALUES (1600, 62, 6, 8)^;
INSERT INTO seat_price (original_price_per_km, id, seat_type_id, train_id) VALUES (4000, 63, 7, 8)^;
INSERT INTO seat_price (original_price_per_km, id, seat_type_id, train_id) VALUES (800, 64, 8, 8)^;

INSERT INTO seat_price (original_price_per_km, id, seat_type_id, train_id) VALUES (1000, 65, 1, 9)^;
INSERT INTO seat_price (original_price_per_km, id, seat_type_id, train_id) VALUES (1100, 66, 2, 9)^;
INSERT INTO seat_price (original_price_per_km, id, seat_type_id, train_id) VALUES (1150, 67, 3, 9)^;
INSERT INTO seat_price (original_price_per_km, id, seat_type_id, train_id) VALUES (1200, 68, 4, 9)^;
INSERT INTO seat_price (original_price_per_km, id, seat_type_id, train_id) VALUES (2200, 69, 5, 9)^;
INSERT INTO seat_price (original_price_per_km, id, seat_type_id, train_id) VALUES (1600, 70, 6, 9)^;
INSERT INTO seat_price (original_price_per_km, id, seat_type_id, train_id) VALUES (4000, 71, 7, 9)^;
INSERT INTO seat_price (original_price_per_km, id, seat_type_id, train_id) VALUES (800, 72, 8, 9)^;

INSERT INTO seat_price (original_price_per_km, id, seat_type_id, train_id) VALUES (1000, 73, 1, 10)^;
INSERT INTO seat_price (original_price_per_km, id, seat_type_id, train_id) VALUES (1100, 74, 2, 10)^;
INSERT INTO seat_price (original_price_per_km, id, seat_type_id, train_id) VALUES (1150, 75, 3, 10)^;
INSERT INTO seat_price (original_price_per_km, id, seat_type_id, train_id) VALUES (1200, 76, 4, 10)^;
INSERT INTO seat_price (original_price_per_km, id, seat_type_id, train_id) VALUES (2200, 77, 5, 10)^;
INSERT INTO seat_price (original_price_per_km, id, seat_type_id, train_id) VALUES (1600, 78, 6, 10)^;
INSERT INTO seat_price (original_price_per_km, id, seat_type_id, train_id) VALUES (4000, 79, 7, 10)^;
INSERT INTO seat_price (original_price_per_km, id, seat_type_id, train_id) VALUES (800, 80, 8, 10)^;

INSERT INTO seat_price (original_price_per_km, id, seat_type_id, train_id) VALUES (1000, 81, 1, 11)^;
INSERT INTO seat_price (original_price_per_km, id, seat_type_id, train_id) VALUES (1100, 82, 2, 11)^;
INSERT INTO seat_price (original_price_per_km, id, seat_type_id, train_id) VALUES (1150, 83, 3, 11)^;
INSERT INTO seat_price (original_price_per_km, id, seat_type_id, train_id) VALUES (1200, 84, 4, 11)^;
INSERT INTO seat_price (original_price_per_km, id, seat_type_id, train_id) VALUES (2200, 85, 5, 11)^;
INSERT INTO seat_price (original_price_per_km, id, seat_type_id, train_id) VALUES (1600, 86, 6, 11)^;
INSERT INTO seat_price (original_price_per_km, id, seat_type_id, train_id) VALUES (4000, 87, 7, 11)^;
INSERT INTO seat_price (original_price_per_km, id, seat_type_id, train_id) VALUES (800, 88, 8, 11)^;

INSERT INTO seat_price (original_price_per_km, id, seat_type_id, train_id) VALUES (1000, 89, 1, 12)^;
INSERT INTO seat_price (original_price_per_km, id, seat_type_id, train_id) VALUES (1100, 90, 2, 12)^;
INSERT INTO seat_price (original_price_per_km, id, seat_type_id, train_id) VALUES (1150, 91, 3, 12)^;
INSERT INTO seat_price (original_price_per_km, id, seat_type_id, train_id) VALUES (1200, 92, 4, 12)^;
INSERT INTO seat_price (original_price_per_km, id, seat_type_id, train_id) VALUES (2200, 93, 5, 12)^;
INSERT INTO seat_price (original_price_per_km, id, seat_type_id, train_id) VALUES (1600, 94, 6, 12)^;
INSERT INTO seat_price (original_price_per_km, id, seat_type_id, train_id) VALUES (4000, 95, 7, 12)^;
INSERT INTO seat_price (original_price_per_km, id, seat_type_id, train_id) VALUES (800, 96, 8, 12)^;

INSERT INTO seat_price (original_price_per_km, id, seat_type_id, train_id) VALUES (1000, 97, 1, 13)^;
INSERT INTO seat_price (original_price_per_km, id, seat_type_id, train_id) VALUES (1100, 98, 2, 13)^;
INSERT INTO seat_price (original_price_per_km, id, seat_type_id, train_id) VALUES (1150, 99, 3, 13)^;
INSERT INTO seat_price (original_price_per_km, id, seat_type_id, train_id) VALUES (1200, 100, 4, 13)^;
INSERT INTO seat_price (original_price_per_km, id, seat_type_id, train_id) VALUES (2200, 101, 5, 13)^;
INSERT INTO seat_price (original_price_per_km, id, seat_type_id, train_id) VALUES (1600, 102, 6, 13)^;
INSERT INTO seat_price (original_price_per_km, id, seat_type_id, train_id) VALUES (4000, 103, 7, 13)^;
INSERT INTO seat_price (original_price_per_km, id, seat_type_id, train_id) VALUES (800, 104, 8, 13)^;

INSERT INTO seat_price (original_price_per_km, id, seat_type_id, train_id) VALUES (1000, 105, 1, 14)^;
INSERT INTO seat_price (original_price_per_km, id, seat_type_id, train_id) VALUES (1100, 106, 2, 14)^;
INSERT INTO seat_price (original_price_per_km, id, seat_type_id, train_id) VALUES (1150, 107, 3, 14)^;
INSERT INTO seat_price (original_price_per_km, id, seat_type_id, train_id) VALUES (1200, 108, 4, 14)^;
INSERT INTO seat_price (original_price_per_km, id, seat_type_id, train_id) VALUES (2200, 109, 5, 14)^;
INSERT INTO seat_price (original_price_per_km, id, seat_type_id, train_id) VALUES (1600, 110, 6, 14)^;
INSERT INTO seat_price (original_price_per_km, id, seat_type_id, train_id) VALUES (4000, 111, 7, 14)^;
INSERT INTO seat_price (original_price_per_km, id, seat_type_id, train_id) VALUES (800, 112, 8, 14)^;

-- Route Segment
-- SE1
INSERT INTO route_segments(train_id, station_id, arrival_time, departure_time, day_number, distance) VALUES (1, 6, "20:55","20:55",0, 0)^;
INSERT INTO route_segments(train_id, station_id, arrival_time, departure_time, day_number, distance) VALUES (1, 102, "21:56","21:59",0, 56)^;
INSERT INTO route_segments(train_id, station_id, arrival_time, departure_time, day_number, distance) VALUES (1, 43, "22:32","22:35",0, 87)^;
INSERT INTO route_segments(train_id, station_id, arrival_time, departure_time, day_number, distance) VALUES (1, 103, "23:07","23:10",0, 115)^;
INSERT INTO route_segments(train_id, station_id, arrival_time, departure_time, day_number, distance) VALUES (1, 70, "00:12","00:15",1, 175)^;
INSERT INTO route_segments(train_id, station_id, arrival_time, departure_time, day_number, distance) VALUES (1, 39, "02:34","02:41",1, 319)^;
INSERT INTO route_segments(train_id, station_id, arrival_time, departure_time, day_number, distance) VALUES (1, 92, "03:07","03:10",1, 340)^;
INSERT INTO route_segments(train_id, station_id, arrival_time, departure_time, day_number, distance) VALUES (1, 98, "04:06","04:09",1, 387)^;
INSERT INTO route_segments(train_id, station_id, arrival_time, departure_time, day_number, distance) VALUES (1, 48, "05:15","05:18",1, 436)^;
INSERT INTO route_segments(train_id, station_id, arrival_time, departure_time, day_number, distance) VALUES (1, 57, "06:53","07:05",1, 522)^;
INSERT INTO route_segments(train_id, station_id, arrival_time, departure_time, day_number, distance) VALUES (1, 163, "08:45","08:48",1, 622)^;
INSERT INTO route_segments(train_id, station_id, arrival_time, departure_time, day_number, distance) VALUES (1, 33, "09:59","10:04",1, 688)^;
INSERT INTO route_segments(train_id, station_id, arrival_time, departure_time, day_number, distance) VALUES (1, 4, "12:32","12:47",1, 791)^;
INSERT INTO route_segments(train_id, station_id, arrival_time, departure_time, day_number, distance) VALUES (1, 168, "14:17","14:20",1, 865)^;
INSERT INTO route_segments(train_id, station_id, arrival_time, departure_time, day_number, distance) VALUES (1, 2, "15:25","15:30",1, 928)^;
INSERT INTO route_segments(train_id, station_id, arrival_time, departure_time, day_number, distance) VALUES (1, 82, "18:18","18:31",1, 1096)^;
INSERT INTO route_segments(train_id, station_id, arrival_time, departure_time, day_number, distance) VALUES (1, 67, "20:20","20:23",1, 1198)^;
INSERT INTO route_segments(train_id, station_id, arrival_time, departure_time, day_number, distance) VALUES (1, 24, "22:35","22:42",1, 1315)^;
INSERT INTO route_segments(train_id, station_id, arrival_time, departure_time, day_number, distance) VALUES (1, 76, "03:06","03:11",2, 1551)^;
INSERT INTO route_segments(train_id, station_id, arrival_time, departure_time, day_number, distance) VALUES (1, 106, "05:53","05:56",2, 1697)^;
INSERT INTO route_segments(train_id, station_id, arrival_time, departure_time, day_number, distance) VALUES (1, 104, "06:09","06:12",2, 1707)^;
INSERT INTO route_segments(train_id, station_id, arrival_time, departure_time, day_number, distance) VALUES (1, 1, "06:50","06:50",2, 1726)^;
--SE2
INSERT INTO route_segments(train_id, station_id, arrival_time, departure_time, day_number, distance) VALUES (2, 1, "20:35","20:35",0, 0)^;
INSERT INTO route_segments(train_id, station_id, arrival_time, departure_time, day_number, distance) VALUES (2, 104, "21:02","21:05",0, 19)^;
INSERT INTO route_segments(train_id, station_id, arrival_time, departure_time, day_number, distance) VALUES (2, 106, "21:18","21:21",0, 29)^;
INSERT INTO route_segments(train_id, station_id, arrival_time, departure_time, day_number, distance) VALUES (2, 76, "23:59","00:04",1, 175)^;
INSERT INTO route_segments(train_id, station_id, arrival_time, departure_time, day_number, distance) VALUES (2, 24, "03:48","03:56",1, 411)^;
INSERT INTO route_segments(train_id, station_id, arrival_time, departure_time, day_number, distance) VALUES (2, 67, "06:03","06:06",1, 528)^;
INSERT INTO route_segments(train_id, station_id, arrival_time, departure_time, day_number, distance) VALUES (2, 82, "08:05","08:17",1, 630)^;
INSERT INTO route_segments(train_id, station_id, arrival_time, departure_time, day_number, distance) VALUES (2, 2, "11:02","11:07",1, 798)^;
INSERT INTO route_segments(train_id, station_id, arrival_time, departure_time, day_number, distance) VALUES (2, 168, "12:12","12:15",1, 861)^;
INSERT INTO route_segments(train_id, station_id, arrival_time, departure_time, day_number, distance) VALUES (2, 4, "13:40","13:55",1, 935)^;
INSERT INTO route_segments(train_id, station_id, arrival_time, departure_time, day_number, distance) VALUES (2, 33, "16:19","16:24",1, 1038)^;
INSERT INTO route_segments(train_id, station_id, arrival_time, departure_time, day_number, distance) VALUES (2, 163, "17:32","17:35",1, 1104)^;
INSERT INTO route_segments(train_id, station_id, arrival_time, departure_time, day_number, distance) VALUES (2, 57, "19:18","19:30",1, 1204)^;
INSERT INTO route_segments(train_id, station_id, arrival_time, departure_time, day_number, distance) VALUES (2, 48, "21:07","21:10",1, 1290)^;
INSERT INTO route_segments(train_id, station_id, arrival_time, departure_time, day_number, distance) VALUES (2, 98, "22:13","22:16",1, 1339)^;
INSERT INTO route_segments(train_id, station_id, arrival_time, departure_time, day_number, distance) VALUES (2, 92, "23:11","23:14",1, 1386)^;
INSERT INTO route_segments(train_id, station_id, arrival_time, departure_time, day_number, distance) VALUES (2, 39, "23:40","23:47",1, 1407)^;
INSERT INTO route_segments(train_id, station_id, arrival_time, departure_time, day_number, distance) VALUES (2, 70, "02:33","02:40",2, 1551)^;
INSERT INTO route_segments(train_id, station_id, arrival_time, departure_time, day_number, distance) VALUES (2, 103, "03:43","03:46",2, 1611)^;
INSERT INTO route_segments(train_id, station_id, arrival_time, departure_time, day_number, distance) VALUES (2, 43, "04:18","04:21",2, 1639)^;
INSERT INTO route_segments(train_id, station_id, arrival_time, departure_time, day_number, distance) VALUES (2, 102, "04:53","04:56",2, 1670)^;
INSERT INTO route_segments(train_id, station_id, arrival_time, departure_time, day_number, distance) VALUES (2, 6, "06:00","06:00",2, 1726)^;
--SE3
INSERT INTO route_segments(train_id, station_id, arrival_time, departure_time, day_number, distance) VALUES (3, 6, "19:20","19:20",0, 0)^;
INSERT INTO route_segments(train_id, station_id, arrival_time, departure_time, day_number, distance) VALUES (3, 102, "20:20","20:23",0, 56)^;
INSERT INTO route_segments(train_id, station_id, arrival_time, departure_time, day_number, distance) VALUES (3, 43, "20:56","20:59",0, 87)^;
INSERT INTO route_segments(train_id, station_id, arrival_time, departure_time, day_number, distance) VALUES (3, 103, "21:31","21:34",0, 115)^;
INSERT INTO route_segments(train_id, station_id, arrival_time, departure_time, day_number, distance) VALUES (3, 70, "22:38","22:41",0, 175)^;
INSERT INTO route_segments(train_id, station_id, arrival_time, departure_time, day_number, distance) VALUES (3, 39, "01:17","01:24",1, 319)^;
INSERT INTO route_segments(train_id, station_id, arrival_time, departure_time, day_number, distance) VALUES (3, 48, "03:49","03:52",1, 436)^;
INSERT INTO route_segments(train_id, station_id, arrival_time, departure_time, day_number, distance) VALUES (3, 57, "05:29","05:41",1, 522)^;
INSERT INTO route_segments(train_id, station_id, arrival_time, departure_time, day_number, distance) VALUES (3, 163, "07:25","07:28",1, 622)^;
INSERT INTO route_segments(train_id, station_id, arrival_time, departure_time, day_number, distance) VALUES (3, 33, "08:40","08:45",1, 688)^;
INSERT INTO route_segments(train_id, station_id, arrival_time, departure_time, day_number, distance) VALUES (3, 4, "11:14","11:29",1, 791)^;
INSERT INTO route_segments(train_id, station_id, arrival_time, departure_time, day_number, distance) VALUES (3, 169, "12:20","12:23",1, 825)^;
INSERT INTO route_segments(train_id, station_id, arrival_time, departure_time, day_number, distance) VALUES (3, 168, "13:05","13:08",1, 865)^;
INSERT INTO route_segments(train_id, station_id, arrival_time, departure_time, day_number, distance) VALUES (3, 2, "14:17","14:22",1, 928)^;
INSERT INTO route_segments(train_id, station_id, arrival_time, departure_time, day_number, distance) VALUES (3, 79, "15:54","15:57",1, 1017)^;
INSERT INTO route_segments(train_id, station_id, arrival_time, departure_time, day_number, distance) VALUES (3, 82, "17:16","17:28",1, 1096)^;
INSERT INTO route_segments(train_id, station_id, arrival_time, departure_time, day_number, distance) VALUES (3, 67, "19:18","19:21",1, 1198)^;
INSERT INTO route_segments(train_id, station_id, arrival_time, departure_time, day_number, distance) VALUES (3, 24, "21:32","21:39",1, 1315)^;
INSERT INTO route_segments(train_id, station_id, arrival_time, departure_time, day_number, distance) VALUES (3, 172, "23:15","23:18",1, 1408)^;
INSERT INTO route_segments(train_id, station_id, arrival_time, departure_time, day_number, distance) VALUES (3, 76, "01:53","01:58",2, 1551)^;
INSERT INTO route_segments(train_id, station_id, arrival_time, departure_time, day_number, distance) VALUES (3, 107, "03:47","03:50",2, 1649)^;
INSERT INTO route_segments(train_id, station_id, arrival_time, departure_time, day_number, distance) VALUES (3, 106, "04:50","04:53",2, 1697)^;
INSERT INTO route_segments(train_id, station_id, arrival_time, departure_time, day_number, distance) VALUES (3, 104, "05:06","05:09",2, 1707)^;
INSERT INTO route_segments(train_id, station_id, arrival_time, departure_time, day_number, distance) VALUES (3, 1, "05:45","05:45",2, 1726)^;
--SE4
INSERT INTO route_segments(train_id, station_id, arrival_time, departure_time, day_number, distance) VALUES (4, 1, "19:00","19:00",0, 0)^;
INSERT INTO route_segments(train_id, station_id, arrival_time, departure_time, day_number, distance) VALUES (4, 104, "19:29","19:32",0, 19)^;
INSERT INTO route_segments(train_id, station_id, arrival_time, departure_time, day_number, distance) VALUES (4, 106, "19:45","19:48",0, 29)^;
INSERT INTO route_segments(train_id, station_id, arrival_time, departure_time, day_number, distance) VALUES (4, 107, "20:48","20:51",0, 77)^;
INSERT INTO route_segments(train_id, station_id, arrival_time, departure_time, day_number, distance) VALUES (4, 76, "22:36","22:41",0, 175)^;
INSERT INTO route_segments(train_id, station_id, arrival_time, departure_time, day_number, distance) VALUES (4, 24, "02:29","02:36",1, 411)^;
INSERT INTO route_segments(train_id, station_id, arrival_time, departure_time, day_number, distance) VALUES (4, 67, "04:44","04:47",1, 528)^;
INSERT INTO route_segments(train_id, station_id, arrival_time, departure_time, day_number, distance) VALUES (4, 82, "06:40","06:52",1, 630)^;
INSERT INTO route_segments(train_id, station_id, arrival_time, departure_time, day_number, distance) VALUES (4, 79, "08:13","08:16",1, 709)^;
INSERT INTO route_segments(train_id, station_id, arrival_time, departure_time, day_number, distance) VALUES (4, 2, "09:48","09:53",1, 798)^;
INSERT INTO route_segments(train_id, station_id, arrival_time, departure_time, day_number, distance) VALUES (4, 168, "11:09","11:12",1, 861)^;
INSERT INTO route_segments(train_id, station_id, arrival_time, departure_time, day_number, distance) VALUES (4, 169, "11:51","11:54",1, 901)^;
INSERT INTO route_segments(train_id, station_id, arrival_time, departure_time, day_number, distance) VALUES (4, 4, "12:42","12:57",1, 935)^;
INSERT INTO route_segments(train_id, station_id, arrival_time, departure_time, day_number, distance) VALUES (4, 33, "15:27","15:32",1, 1038)^;
INSERT INTO route_segments(train_id, station_id, arrival_time, departure_time, day_number, distance) VALUES (4, 163, "16:44","16:47",1, 1104)^;
INSERT INTO route_segments(train_id, station_id, arrival_time, departure_time, day_number, distance) VALUES (4, 57, "18:37","18:49",1, 1204)^;
INSERT INTO route_segments(train_id, station_id, arrival_time, departure_time, day_number, distance) VALUES (4, 48, "20:28","20:31",1, 1290)^;
INSERT INTO route_segments(train_id, station_id, arrival_time, departure_time, day_number, distance) VALUES (4, 98, "21:36","21:39",1, 1339)^;
INSERT INTO route_segments(train_id, station_id, arrival_time, departure_time, day_number, distance) VALUES (4, 92, "22:35","22:38",1, 1386)^;
INSERT INTO route_segments(train_id, station_id, arrival_time, departure_time, day_number, distance) VALUES (4, 39, "23:04","23:11",1, 1407)^;
INSERT INTO route_segments(train_id, station_id, arrival_time, departure_time, day_number, distance) VALUES (4, 70, "01:59","02:03",2, 1551)^;
INSERT INTO route_segments(train_id, station_id, arrival_time, departure_time, day_number, distance) VALUES (4, 103, "03:09","03:12",2, 1611)^;
INSERT INTO route_segments(train_id, station_id, arrival_time, departure_time, day_number, distance) VALUES (4, 43, "03:47","03:50",2, 1639)^;
INSERT INTO route_segments(train_id, station_id, arrival_time, departure_time, day_number, distance) VALUES (4, 102, "04:28","04:31",2, 1670)^;
INSERT INTO route_segments(train_id, station_id, arrival_time, departure_time, day_number, distance) VALUES (4, 6, "05:40","05:40",2, 1726)^;
--SE5
INSERT INTO route_segments(train_id, station_id, arrival_time, departure_time, day_number, distance) VALUES (5, 6, "15:30","15:30",0, 0)^;
INSERT INTO route_segments(train_id, station_id, arrival_time, departure_time, day_number, distance) VALUES (5, 102, "16:30","16:33",0, 56)^;
INSERT INTO route_segments(train_id, station_id, arrival_time, departure_time, day_number, distance) VALUES (5, 43, "17:06","17:11",0, 87)^;
INSERT INTO route_segments(train_id, station_id, arrival_time, departure_time, day_number, distance) VALUES (5, 103, "17:43","17:46",0, 115)^;
INSERT INTO route_segments(train_id, station_id, arrival_time, departure_time, day_number, distance) VALUES (5, 71, "18:18","18:21",0, 141)^;
INSERT INTO route_segments(train_id, station_id, arrival_time, departure_time, day_number, distance) VALUES (5, 70, "18:55","18:58",0, 175)^;
INSERT INTO route_segments(train_id, station_id, arrival_time, departure_time, day_number, distance) VALUES (5, 72, "19:19","19:22",0, 197)^;
INSERT INTO route_segments(train_id, station_id, arrival_time, departure_time, day_number, distance) VALUES (5, 38, "20:43","20:46",0, 279)^;
INSERT INTO route_segments(train_id, station_id, arrival_time, departure_time, day_number, distance) VALUES (5, 39, "21:30","21:37",0, 319)^;
INSERT INTO route_segments(train_id, station_id, arrival_time, departure_time, day_number, distance) VALUES (5, 92, "22:03","22:06",0, 340)^;
INSERT INTO route_segments(train_id, station_id, arrival_time, departure_time, day_number, distance) VALUES (5, 98, "23:29","23:32",0, 387)^;
INSERT INTO route_segments(train_id, station_id, arrival_time, departure_time, day_number, distance) VALUES (5, 48, "00:40","00:43",1, 436)^;
INSERT INTO route_segments(train_id, station_id, arrival_time, departure_time, day_number, distance) VALUES (5, 57, "02:20","02:32",1, 522)^;
INSERT INTO route_segments(train_id, station_id, arrival_time, departure_time, day_number, distance) VALUES (5, 163, "04:14","04:17",1, 622)^;
INSERT INTO route_segments(train_id, station_id, arrival_time, departure_time, day_number, distance) VALUES (5, 33, "05:34","05:39",1, 688)^;
INSERT INTO route_segments(train_id, station_id, arrival_time, departure_time, day_number, distance) VALUES (5, 4, "08:30","08:51",1, 791)^;
INSERT INTO route_segments(train_id, station_id, arrival_time, departure_time, day_number, distance) VALUES (5, 169, "09:49","09:52",1, 825)^;
INSERT INTO route_segments(train_id, station_id, arrival_time, departure_time, day_number, distance) VALUES (5, 168, "10:31","10:34",1, 865)^;
INSERT INTO route_segments(train_id, station_id, arrival_time, departure_time, day_number, distance) VALUES (5, 171, "11:04","11:07",1, 890)^;
INSERT INTO route_segments(train_id, station_id, arrival_time, departure_time, day_number, distance) VALUES (5, 2, "12:10","12:18",1, 928)^;
INSERT INTO route_segments(train_id, station_id, arrival_time, departure_time, day_number, distance) VALUES (5, 3, "13:03","13:06",1, 968)^;
INSERT INTO route_segments(train_id, station_id, arrival_time, departure_time, day_number, distance) VALUES (5, 79, "13:55","13:58",1, 1017)^;
INSERT INTO route_segments(train_id, station_id, arrival_time, departure_time, day_number, distance) VALUES (5, 82, "15:17","15:29",1, 1096)^;
INSERT INTO route_segments(train_id, station_id, arrival_time, departure_time, day_number, distance) VALUES (5, 67, "17:29","17:32",1, 1198)^;
INSERT INTO route_segments(train_id, station_id, arrival_time, departure_time, day_number, distance) VALUES (5, 7, "18:39","18:42",1, 1254)^;
INSERT INTO route_segments(train_id, station_id, arrival_time, departure_time, day_number, distance) VALUES (5, 23, "19:11","19:26",1, 1281)^;
INSERT INTO route_segments(train_id, station_id, arrival_time, departure_time, day_number, distance) VALUES (5, 24, "20:05","20:19",1, 1315)^;
INSERT INTO route_segments(train_id, station_id, arrival_time, departure_time, day_number, distance) VALUES (5, 172, "22:13","22:16",1, 1408)^;
INSERT INTO route_segments(train_id, station_id, arrival_time, departure_time, day_number, distance) VALUES (5, 73, "23:31","23:45",1, 1484)^;
INSERT INTO route_segments(train_id, station_id, arrival_time, departure_time, day_number, distance) VALUES (5, 76, "01:14","01:19",2, 1551)^;
INSERT INTO route_segments(train_id, station_id, arrival_time, departure_time, day_number, distance) VALUES (5, 107, "03:18","03:21",2, 1649)^;
INSERT INTO route_segments(train_id, station_id, arrival_time, departure_time, day_number, distance) VALUES (5, 106, "04:21","04:24",2, 1697)^;
INSERT INTO route_segments(train_id, station_id, arrival_time, departure_time, day_number, distance) VALUES (5, 104, "04:37","04:40",2, 1707)^;
INSERT INTO route_segments(train_id, station_id, arrival_time, departure_time, day_number, distance) VALUES (5, 1, "05:18","05:18",2, 1726)^;
--SE6
INSERT INTO route_segments(train_id, station_id, arrival_time, departure_time, day_number, distance) VALUES (6, 1, "15:00","15:00",0, 0)^;
INSERT INTO route_segments(train_id, station_id, arrival_time, departure_time, day_number, distance) VALUES (6, 104, "15:29","15:32",0, 19)^;
INSERT INTO route_segments(train_id, station_id, arrival_time, departure_time, day_number, distance) VALUES (6, 106, "15:45","15:48",0, 29)^;
INSERT INTO route_segments(train_id, station_id, arrival_time, departure_time, day_number, distance) VALUES (6, 107, "16:48","16:51",0, 77)^;
INSERT INTO route_segments(train_id, station_id, arrival_time, departure_time, day_number, distance) VALUES (6, 77, "17:39","17:42",0, 123)^;
INSERT INTO route_segments(train_id, station_id, arrival_time, departure_time, day_number, distance) VALUES (6, 76, "18:41","18:46",0, 175)^;
INSERT INTO route_segments(train_id, station_id, arrival_time, departure_time, day_number, distance) VALUES (6, 73, "19:49","19:52",0, 242)^;
INSERT INTO route_segments(train_id, station_id, arrival_time, departure_time, day_number, distance) VALUES (6, 172, "21:06","21:09",0, 318)^;
INSERT INTO route_segments(train_id, station_id, arrival_time, departure_time, day_number, distance) VALUES (6, 24, "23:21","23:28",0, 411)^;
INSERT INTO route_segments(train_id, station_id, arrival_time, departure_time, day_number, distance) VALUES (6, 23, "00:10","00:13",1, 445)^;
INSERT INTO route_segments(train_id, station_id, arrival_time, departure_time, day_number, distance) VALUES (6, 67, "01:49","01:52",1, 528)^;
INSERT INTO route_segments(train_id, station_id, arrival_time, departure_time, day_number, distance) VALUES (6, 82, "03:45","03:57",1, 630)^;
INSERT INTO route_segments(train_id, station_id, arrival_time, departure_time, day_number, distance) VALUES (6, 79, "05:27","05:30",1, 709)^;
INSERT INTO route_segments(train_id, station_id, arrival_time, departure_time, day_number, distance) VALUES (6, 3, "06:19","06:22",1, 758)^;
INSERT INTO route_segments(train_id, station_id, arrival_time, departure_time, day_number, distance) VALUES (6, 2, "07:07","07:12",1, 798)^;
INSERT INTO route_segments(train_id, station_id, arrival_time, departure_time, day_number, distance) VALUES (6, 171, "07:53","07:56",1, 836)^;
INSERT INTO route_segments(train_id, station_id, arrival_time, departure_time, day_number, distance) VALUES (6, 168, "08:26","08:30",1, 861)^;
INSERT INTO route_segments(train_id, station_id, arrival_time, departure_time, day_number, distance) VALUES (6, 169, "09:20","09:23",1, 901)^;
INSERT INTO route_segments(train_id, station_id, arrival_time, departure_time, day_number, distance) VALUES (6, 4, "10:10","10:30",1, 935)^;
INSERT INTO route_segments(train_id, station_id, arrival_time, departure_time, day_number, distance) VALUES (6, 33, "13:38","13:43",1, 1038)^;
INSERT INTO route_segments(train_id, station_id, arrival_time, departure_time, day_number, distance) VALUES (6, 163, "14:53","14:56",1, 1104)^;
INSERT INTO route_segments(train_id, station_id, arrival_time, departure_time, day_number, distance) VALUES (6, 62, "15:55","15:58",1, 1161)^;
INSERT INTO route_segments(train_id, station_id, arrival_time, departure_time, day_number, distance) VALUES (6, 57, "16:53","17:05",1, 1204)^;
INSERT INTO route_segments(train_id, station_id, arrival_time, departure_time, day_number, distance) VALUES (6, 48, "18:44","18:47",1, 1290)^;
INSERT INTO route_segments(train_id, station_id, arrival_time, departure_time, day_number, distance) VALUES (6, 98, "19:52","19:55",1, 1339)^;
INSERT INTO route_segments(train_id, station_id, arrival_time, departure_time, day_number, distance) VALUES (6, 92, "20:51","20:54",1, 1386)^;
INSERT INTO route_segments(train_id, station_id, arrival_time, departure_time, day_number, distance) VALUES (6, 39, "21:20","21:33",1, 1407)^;
INSERT INTO route_segments(train_id, station_id, arrival_time, departure_time, day_number, distance) VALUES (6, 38, "22:17","22:20",1, 1447)^;
INSERT INTO route_segments(train_id, station_id, arrival_time, departure_time, day_number, distance) VALUES (6, 72, "00:08","00:11",2, 1529)^;
INSERT INTO route_segments(train_id, station_id, arrival_time, departure_time, day_number, distance) VALUES (6, 70, "00:44","00:47",2, 1551)^;
INSERT INTO route_segments(train_id, station_id, arrival_time, departure_time, day_number, distance) VALUES (6, 71, "01:22","01:25",2, 1585)^;
INSERT INTO route_segments(train_id, station_id, arrival_time, departure_time, day_number, distance) VALUES (6, 103, "01:58","02:01",2, 1611)^;
INSERT INTO route_segments(train_id, station_id, arrival_time, departure_time, day_number, distance) VALUES (6, 43, "02:35","02:38",2, 1639)^;
INSERT INTO route_segments(train_id, station_id, arrival_time, departure_time, day_number, distance) VALUES (6, 102, "03:11","03:14",2, 1670)^;
INSERT INTO route_segments(train_id, station_id, arrival_time, departure_time, day_number, distance) VALUES (6, 6, "04:35","04:35",2, 1726)^;
--SE7
INSERT INTO route_segments(train_id, station_id, arrival_time, departure_time, day_number, distance) VALUES (7, 6, "06:10","06:10",0, 0)^;
INSERT INTO route_segments(train_id, station_id, arrival_time, departure_time, day_number, distance) VALUES (7, 102, "07:12","07:15",0, 56)^;
INSERT INTO route_segments(train_id, station_id, arrival_time, departure_time, day_number, distance) VALUES (7, 43, "07:48","07:51",0, 87)^;
INSERT INTO route_segments(train_id, station_id, arrival_time, departure_time, day_number, distance) VALUES (7, 103, "08:23","08:26",0, 115)^;
INSERT INTO route_segments(train_id, station_id, arrival_time, departure_time, day_number, distance) VALUES (7, 71, "08:58","09:01",0, 141)^;
INSERT INTO route_segments(train_id, station_id, arrival_time, departure_time, day_number, distance) VALUES (7, 70, "09:35","09:38",0, 175)^;
INSERT INTO route_segments(train_id, station_id, arrival_time, departure_time, day_number, distance) VALUES (7, 72, "09:59","10:03",0, 197)^;
INSERT INTO route_segments(train_id, station_id, arrival_time, departure_time, day_number, distance) VALUES (7, 38, "11:23","11:26",0, 279)^;
INSERT INTO route_segments(train_id, station_id, arrival_time, departure_time, day_number, distance) VALUES (7, 39, "12:10","12:17",0, 319)^;
INSERT INTO route_segments(train_id, station_id, arrival_time, departure_time, day_number, distance) VALUES (7, 92, "12:43","12:46",0, 340)^;
INSERT INTO route_segments(train_id, station_id, arrival_time, departure_time, day_number, distance) VALUES (7, 98, "13:43","13:46",0, 387)^;
INSERT INTO route_segments(train_id, station_id, arrival_time, departure_time, day_number, distance) VALUES (7, 48, "14:52","14:55",0, 436)^;
INSERT INTO route_segments(train_id, station_id, arrival_time, departure_time, day_number, distance) VALUES (7, 51, "15:50","15:53",0, 482)^;
INSERT INTO route_segments(train_id, station_id, arrival_time, departure_time, day_number, distance) VALUES (7, 57, "16:37","16:56",0, 522)^;
INSERT INTO route_segments(train_id, station_id, arrival_time, departure_time, day_number, distance) VALUES (7, 60, "17:29","17:32",0, 551)^;
INSERT INTO route_segments(train_id, station_id, arrival_time, departure_time, day_number, distance) VALUES (7, 62, "18:07","18:10",0, 565)^;
INSERT INTO route_segments(train_id, station_id, arrival_time, departure_time, day_number, distance) VALUES (7, 163, "19:18","19:21",0, 622)^;
INSERT INTO route_segments(train_id, station_id, arrival_time, departure_time, day_number, distance) VALUES (7, 33, "20:33","20:38",0, 688)^;
INSERT INTO route_segments(train_id, station_id, arrival_time, departure_time, day_number, distance) VALUES (7, 4, "23:07","23:27",0, 791)^;
INSERT INTO route_segments(train_id, station_id, arrival_time, departure_time, day_number, distance) VALUES (7, 168, "00:48","00:51",1, 865)^;
INSERT INTO route_segments(train_id, station_id, arrival_time, departure_time, day_number, distance) VALUES (7, 2, "02:00","02:05",1, 928)^;
INSERT INTO route_segments(train_id, station_id, arrival_time, departure_time, day_number, distance) VALUES (7, 82, "04:54","05:06",1, 1096)^;
INSERT INTO route_segments(train_id, station_id, arrival_time, departure_time, day_number, distance) VALUES (7, 66, "06:16","06:21",1, 1154)^;
INSERT INTO route_segments(train_id, station_id, arrival_time, departure_time, day_number, distance) VALUES (7, 67, "07:22","07:25",1, 1198)^;
INSERT INTO route_segments(train_id, station_id, arrival_time, departure_time, day_number, distance) VALUES (7, 7, "08:32","08:35",1, 1254)^;
INSERT INTO route_segments(train_id, station_id, arrival_time, departure_time, day_number, distance) VALUES (7, 23, "09:04","09:07",1, 1281)^;
INSERT INTO route_segments(train_id, station_id, arrival_time, departure_time, day_number, distance) VALUES (7, 24, "09:46","09:53",1, 1315)^;
INSERT INTO route_segments(train_id, station_id, arrival_time, departure_time, day_number, distance) VALUES (7, 172, "11:29","11:32",1, 1408)^;
INSERT INTO route_segments(train_id, station_id, arrival_time, departure_time, day_number, distance) VALUES (7, 76, "13:56","14:01",1, 1551)^;
INSERT INTO route_segments(train_id, station_id, arrival_time, departure_time, day_number, distance) VALUES (7, 77, "15:01","15:09",1, 1603)^;
INSERT INTO route_segments(train_id, station_id, arrival_time, departure_time, day_number, distance) VALUES (7, 107, "16:00","16:03",1, 1649)^;
INSERT INTO route_segments(train_id, station_id, arrival_time, departure_time, day_number, distance) VALUES (7, 106, "17:18","17:21",1, 1697)^;
INSERT INTO route_segments(train_id, station_id, arrival_time, departure_time, day_number, distance) VALUES (7, 104, "17:34","17:37",1, 1707)^;
INSERT INTO route_segments(train_id, station_id, arrival_time, departure_time, day_number, distance) VALUES (7, 1, "18:10","18:10",1, 1726)^;
--SE8
INSERT INTO route_segments(train_id, station_id, arrival_time, departure_time, day_number, distance) VALUES (8, 1, "06:00","06:00",0, 0)^;
INSERT INTO route_segments(train_id, station_id, arrival_time, departure_time, day_number, distance) VALUES (8, 104, "06:29","06:32",0, 19)^;
INSERT INTO route_segments(train_id, station_id, arrival_time, departure_time, day_number, distance) VALUES (8, 106, "06:45","06:48",0, 29)^;
INSERT INTO route_segments(train_id, station_id, arrival_time, departure_time, day_number, distance) VALUES (8, 107, "07:48","07:51",0, 77)^;
INSERT INTO route_segments(train_id, station_id, arrival_time, departure_time, day_number, distance) VALUES (8, 77, "08:39","08:43",0, 123)^;
INSERT INTO route_segments(train_id, station_id, arrival_time, departure_time, day_number, distance) VALUES (8, 76, "09:41","09:46",0, 175)^;
INSERT INTO route_segments(train_id, station_id, arrival_time, departure_time, day_number, distance) VALUES (8, 172, "12:01","12:04",0, 318)^;
INSERT INTO route_segments(train_id, station_id, arrival_time, departure_time, day_number, distance) VALUES (8, 24, "13:39","13:59",0, 411)^;
INSERT INTO route_segments(train_id, station_id, arrival_time, departure_time, day_number, distance) VALUES (8, 23, "14:41","14:44",0, 445)^;
INSERT INTO route_segments(train_id, station_id, arrival_time, departure_time, day_number, distance) VALUES (8, 7, "15:12","15:15",0, 472)^;
INSERT INTO route_segments(train_id, station_id, arrival_time, departure_time, day_number, distance) VALUES (8, 67, "16:17","16:21",0, 528)^;
INSERT INTO route_segments(train_id, station_id, arrival_time, departure_time, day_number, distance) VALUES (8, 66, "17:16","17:20",0, 572)^;
INSERT INTO route_segments(train_id, station_id, arrival_time, departure_time, day_number, distance) VALUES (8, 82, "18:29","18:41",0, 630)^;
INSERT INTO route_segments(train_id, station_id, arrival_time, departure_time, day_number, distance) VALUES (8, 79, "20:03","20:06",0, 709)^;
INSERT INTO route_segments(train_id, station_id, arrival_time, departure_time, day_number, distance) VALUES (8, 2, "21:48","21:53",0, 798)^;
INSERT INTO route_segments(train_id, station_id, arrival_time, departure_time, day_number, distance) VALUES (8, 168, "23:02","23:05",0, 861)^;
INSERT INTO route_segments(train_id, station_id, arrival_time, departure_time, day_number, distance) VALUES (8, 4, "00:36","00:56",1, 935)^;
INSERT INTO route_segments(train_id, station_id, arrival_time, departure_time, day_number, distance) VALUES (8, 33, "03:28","03:34",1, 1038)^;
INSERT INTO route_segments(train_id, station_id, arrival_time, departure_time, day_number, distance) VALUES (8, 163, "04:46","04:49",1, 1104)^;
INSERT INTO route_segments(train_id, station_id, arrival_time, departure_time, day_number, distance) VALUES (8, 60, "06:06","06:15",1, 1175)^;
INSERT INTO route_segments(train_id, station_id, arrival_time, departure_time, day_number, distance) VALUES (8, 57, "06:50","07:02",1, 1204)^;
INSERT INTO route_segments(train_id, station_id, arrival_time, departure_time, day_number, distance) VALUES (8, 51, "07:48","07:51",1, 1244)^;
INSERT INTO route_segments(train_id, station_id, arrival_time, departure_time, day_number, distance) VALUES (8, 48, "08:46","08:49",1, 1290)^;
INSERT INTO route_segments(train_id, station_id, arrival_time, departure_time, day_number, distance) VALUES (8, 98, "09:54","09:57",1, 1339)^;
INSERT INTO route_segments(train_id, station_id, arrival_time, departure_time, day_number, distance) VALUES (8, 92, "10:53","10:56",1, 1386)^;
INSERT INTO route_segments(train_id, station_id, arrival_time, departure_time, day_number, distance) VALUES (8, 39, "11:22","11:29",1, 1407)^;
INSERT INTO route_segments(train_id, station_id, arrival_time, departure_time, day_number, distance) VALUES (8, 38, "12:32","12:35",1, 1447)^;
INSERT INTO route_segments(train_id, station_id, arrival_time, departure_time, day_number, distance) VALUES (8, 72, "14:12","14:15",1, 1529)^;
INSERT INTO route_segments(train_id, station_id, arrival_time, departure_time, day_number, distance) VALUES (8, 70, "14:38","14:41",1, 1551)^;
INSERT INTO route_segments(train_id, station_id, arrival_time, departure_time, day_number, distance) VALUES (8, 71, "15:16","15:19",1, 1585)^;
INSERT INTO route_segments(train_id, station_id, arrival_time, departure_time, day_number, distance) VALUES (8, 103, "16:09","16:12",1, 1611)^;
INSERT INTO route_segments(train_id, station_id, arrival_time, departure_time, day_number, distance) VALUES (8, 43, "16:48","17:08",1, 1639)^;
INSERT INTO route_segments(train_id, station_id, arrival_time, departure_time, day_number, distance) VALUES (8, 102, "17:49","17:52",1, 1670)^;
INSERT INTO route_segments(train_id, station_id, arrival_time, departure_time, day_number, distance) VALUES (8, 6, "19:12","19:12",1, 1726)^;
--SE21
INSERT INTO route_segments(train_id, station_id, arrival_time, departure_time, day_number, distance) VALUES (9, 4, "08:00","08:00",0, 0)^;
INSERT INTO route_segments(train_id, station_id, arrival_time, departure_time, day_number, distance) VALUES (9, 169, "08:43","08:46",0, 34)^;
INSERT INTO route_segments(train_id, station_id, arrival_time, departure_time, day_number, distance) VALUES (9, 168, "09:24","09:27",0, 74)^;
INSERT INTO route_segments(train_id, station_id, arrival_time, departure_time, day_number, distance) VALUES (9, 171, "09:57","10:00",0, 99)^;
INSERT INTO route_segments(train_id, station_id, arrival_time, departure_time, day_number, distance) VALUES (9, 2, "10:58","11:04",0, 137)^;
INSERT INTO route_segments(train_id, station_id, arrival_time, departure_time, day_number, distance) VALUES (9, 3, "11:49","11:52",0, 177)^;
INSERT INTO route_segments(train_id, station_id, arrival_time, departure_time, day_number, distance) VALUES (9, 79, "12:41","12:44",0, 226)^;
INSERT INTO route_segments(train_id, station_id, arrival_time, departure_time, day_number, distance) VALUES (9, 82, "14:03","14:15",0, 305)^;
INSERT INTO route_segments(train_id, station_id, arrival_time, departure_time, day_number, distance) VALUES (9, 66, "15:14","15:17",0, 363)^;
INSERT INTO route_segments(train_id, station_id, arrival_time, departure_time, day_number, distance) VALUES (9, 67, "16:10","16:19",0, 407)^;
INSERT INTO route_segments(train_id, station_id, arrival_time, departure_time, day_number, distance) VALUES (9, 7, "17:23","17:26",0, 463)^;
INSERT INTO route_segments(train_id, station_id, arrival_time, departure_time, day_number, distance) VALUES (9, 23, "17:55","17:58",0, 490)^;
INSERT INTO route_segments(train_id, station_id, arrival_time, departure_time, day_number, distance) VALUES (9, 24, "18:36","18:56",0, 524)^;
INSERT INTO route_segments(train_id, station_id, arrival_time, departure_time, day_number, distance) VALUES (9, 172, "20:32","20:35",0, 617)^;
INSERT INTO route_segments(train_id, station_id, arrival_time, departure_time, day_number, distance) VALUES (9, 73, "21:59","22:02",0, 693)^;
INSERT INTO route_segments(train_id, station_id, arrival_time, departure_time, day_number, distance) VALUES (9, 76, "23:31","23:36",0, 760)^;
INSERT INTO route_segments(train_id, station_id, arrival_time, departure_time, day_number, distance) VALUES (9, 107, "02:10","02:13",1, 858)^;
INSERT INTO route_segments(train_id, station_id, arrival_time, departure_time, day_number, distance) VALUES (9, 106, "03:24","03:27",1, 906)^;
INSERT INTO route_segments(train_id, station_id, arrival_time, departure_time, day_number, distance) VALUES (9, 104, "03:40","03:43",1, 916)^;
INSERT INTO route_segments(train_id, station_id, arrival_time, departure_time, day_number, distance) VALUES (9, 1, "04:20","04:20",1, 935)^;
--SE22
INSERT INTO route_segments(train_id, station_id, arrival_time, departure_time, day_number, distance) VALUES (10, 1, "10:20","10:20",0, 0)^;
INSERT INTO route_segments(train_id, station_id, arrival_time, departure_time, day_number, distance) VALUES (10, 104, "10:48","10:53",0, 19)^;
INSERT INTO route_segments(train_id, station_id, arrival_time, departure_time, day_number, distance) VALUES (10, 106, "11:06","11:09",0, 29)^;
INSERT INTO route_segments(train_id, station_id, arrival_time, departure_time, day_number, distance) VALUES (10, 107, "12:09","12:12",0, 77)^;
INSERT INTO route_segments(train_id, station_id, arrival_time, departure_time, day_number, distance) VALUES (10, 76, "14:23","14:28",0, 175)^;
INSERT INTO route_segments(train_id, station_id, arrival_time, departure_time, day_number, distance) VALUES (10, 73, "15:30","15:34",0, 242)^;
INSERT INTO route_segments(train_id, station_id, arrival_time, departure_time, day_number, distance) VALUES (10, 172, "16:48","16:51",0, 318)^;
INSERT INTO route_segments(train_id, station_id, arrival_time, departure_time, day_number, distance) VALUES (10, 24, "18:33","18:40",0, 411)^;
INSERT INTO route_segments(train_id, station_id, arrival_time, departure_time, day_number, distance) VALUES (10, 23, "19:24","19:28",0, 445)^;
INSERT INTO route_segments(train_id, station_id, arrival_time, departure_time, day_number, distance) VALUES (10, 7, "19:57","20:00",0, 472)^;
INSERT INTO route_segments(train_id, station_id, arrival_time, departure_time, day_number, distance) VALUES (10, 67, "21:17","21:20",0, 528)^;
INSERT INTO route_segments(train_id, station_id, arrival_time, departure_time, day_number, distance) VALUES (10, 66, "22:15","22:18",0, 572)^;
INSERT INTO route_segments(train_id, station_id, arrival_time, departure_time, day_number, distance) VALUES (10, 82, "23:21","23:33",0, 630)^;
INSERT INTO route_segments(train_id, station_id, arrival_time, departure_time, day_number, distance) VALUES (10, 79, "01:01","01:04",1, 709)^;
INSERT INTO route_segments(train_id, station_id, arrival_time, departure_time, day_number, distance) VALUES (10, 3, "02:00","02:07",1, 758)^;
INSERT INTO route_segments(train_id, station_id, arrival_time, departure_time, day_number, distance) VALUES (10, 2, "03:02","03:07",1, 798)^;
INSERT INTO route_segments(train_id, station_id, arrival_time, departure_time, day_number, distance) VALUES (10, 171, "03:49","03:52",1, 836)^;
INSERT INTO route_segments(train_id, station_id, arrival_time, departure_time, day_number, distance) VALUES (10, 168, "04:23","04:26",1, 861)^;
INSERT INTO route_segments(train_id, station_id, arrival_time, departure_time, day_number, distance) VALUES (10, 169, "05:05","05:08",1, 901)^;
INSERT INTO route_segments(train_id, station_id, arrival_time, departure_time, day_number, distance) VALUES (10, 4, "05:55","05:55",1, 935)^;
--NA1 - 11
INSERT INTO route_segments(train_id, station_id, arrival_time, departure_time, day_number, distance) VALUES (11, 6, "21:50","21:50",0, 0)^;
INSERT INTO route_segments(train_id, station_id, arrival_time, departure_time, day_number, distance) VALUES (11, 38, "04:30","04:34",1, 279)^;
INSERT INTO route_segments(train_id, station_id, arrival_time, departure_time, day_number, distance) VALUES (11, 39, "05:50","05:50",1, 319)^;
--NA2 - 12
INSERT INTO route_segments(train_id, station_id, arrival_time, departure_time, day_number, distance) VALUES (12, 39, "22:15","22:15",0, 0)^;
INSERT INTO route_segments(train_id, station_id, arrival_time, departure_time, day_number, distance) VALUES (12, 38, "23:00","23:03",0, 40)^;
INSERT INTO route_segments(train_id, station_id, arrival_time, departure_time, day_number, distance) VALUES (12, 6, "05:20","05:20",1, 319)^;
--SE19 - 13
INSERT INTO route_segments(train_id, station_id, arrival_time, departure_time, day_number, distance) VALUES (13, 6, "19:40","19:40",0, 0)^;
INSERT INTO route_segments(train_id, station_id, arrival_time, departure_time, day_number, distance) VALUES (13, 43, "21:13","21:16",0, 87)^;
INSERT INTO route_segments(train_id, station_id, arrival_time, departure_time, day_number, distance) VALUES (13, 103, "21:48","21:51",0, 115)^;
INSERT INTO route_segments(train_id, station_id, arrival_time, departure_time, day_number, distance) VALUES (13, 70, "22:58","23:01",0, 175)^;
INSERT INTO route_segments(train_id, station_id, arrival_time, departure_time, day_number, distance) VALUES (13, 39, "01:38","01:45",1, 319)^;
INSERT INTO route_segments(train_id, station_id, arrival_time, departure_time, day_number, distance) VALUES (13, 57, "05:53","06:05",1, 522)^;
INSERT INTO route_segments(train_id, station_id, arrival_time, departure_time, day_number, distance) VALUES (13, 163, "07:58","08:01",1, 622)^;
INSERT INTO route_segments(train_id, station_id, arrival_time, departure_time, day_number, distance) VALUES (13, 33, "09:13","09:20",1, 688)^;
INSERT INTO route_segments(train_id, station_id, arrival_time, departure_time, day_number, distance) VALUES (13, 4, "11:58","11:58",1, 791)^;
--SE20 - 14
INSERT INTO route_segments(train_id, station_id, arrival_time, departure_time, day_number, distance) VALUES (14, 4, "18:05","18:05",0, 0)^;
INSERT INTO route_segments(train_id, station_id, arrival_time, departure_time, day_number, distance) VALUES (14, 33, "20:36","20:41",0, 103)^;
INSERT INTO route_segments(train_id, station_id, arrival_time, departure_time, day_number, distance) VALUES (14, 163, "21:51","21:54",0, 169)^;
INSERT INTO route_segments(train_id, station_id, arrival_time, departure_time, day_number, distance) VALUES (14, 57, "23:43","23:55",0, 269)^;
INSERT INTO route_segments(train_id, station_id, arrival_time, departure_time, day_number, distance) VALUES (14, 39, "05:11","05:18",1, 472)^;
INSERT INTO route_segments(train_id, station_id, arrival_time, departure_time, day_number, distance) VALUES (14, 70, "07:47","07:50",1, 616)^;
INSERT INTO route_segments(train_id, station_id, arrival_time, departure_time, day_number, distance) VALUES (14, 103, "09:14","09:17",1, 676)^;
INSERT INTO route_segments(train_id, station_id, arrival_time, departure_time, day_number, distance) VALUES (14, 43, "09:51","09:54",1, 704)^;
INSERT INTO route_segments(train_id, station_id, arrival_time, departure_time, day_number, distance) VALUES (14, 102, "10:27","10:30",1, 735)^;
INSERT INTO route_segments(train_id, station_id, arrival_time, departure_time, day_number, distance) VALUES (14, 6, "11:40","11:40",1, 791)^;

-- Seed schedule
CALL SeedSchedules('2024-10-26', '2025-02-28', 1, '1111111')^;
CALL SeedSchedules('2024-10-26', '2025-02-28', 2, '1111111')^;
CALL SeedSchedules('2024-10-26', '2025-02-28', 3, '1111111')^;
CALL SeedSchedules('2024-10-26', '2025-02-28', 4, '1111111')^;
CALL SeedSchedules('2024-10-26', '2025-02-28', 5, '1111111')^;
CALL SeedSchedules('2024-10-26', '2025-02-28', 6, '1111111')^;
CALL SeedSchedules('2024-10-26', '2025-02-28', 7, '1111111')^;
CALL SeedSchedules('2024-10-26', '2025-02-28', 8, '1111111')^;
CALL SeedSchedules('2024-10-26', '2025-02-28', 9, '1111111')^;
CALL SeedSchedules('2024-10-26', '2025-02-28', 10, '1111111')^;


