-- Data for table `users`
-- Password: 123456
INSERT INTO users (id, email, name, password, provider, user_role, is_verified, is_deleted) VALUES (1, "user@gmail.com", "Tran Nhat Sinh", "$2a$10$4UBL7hzqFHLNRswL67ffR.V25uGBD1WnnEGwv6Wlk.cMnlJmGjmnu", "EMAIL", "USER", 1, 0);

INSERT INTO users (id, email, name, password, provider, user_role, is_verified, is_deleted) VALUES (2, "admin@gmail.com", "Le Quan Phat", "$2a$10$4UBL7hzqFHLNRswL67ffR.V25uGBD1WnnEGwv6Wlk.cMnlJmGjmnu", "EMAIL", "ADMIN", 1, 0);


-- Data for table `provinces`
INSERT INTO provinces (id, name) VALUES (1, "An Giang");
INSERT INTO provinces (id, name) VALUES (2, "Bà Rịa - Vũng Tàu");
INSERT INTO provinces (id, name) VALUES (3, "Bắc Giang");
INSERT INTO provinces (id, name) VALUES (4, "Bắc Kạn");
INSERT INTO provinces (id, name) VALUES (5, "Bạc Liêu");
INSERT INTO provinces (id, name) VALUES (6, "Bắc Ninh");
INSERT INTO provinces (id, name) VALUES (7, "Bến Tre");
INSERT INTO provinces (id, name) VALUES (8, "Bình Dương");
INSERT INTO provinces (id, name) VALUES (9, "Bình Phước");
INSERT INTO provinces (id, name) VALUES (10, "Bình Thuận");
INSERT INTO provinces (id, name) VALUES (11, "Bình Định");
INSERT INTO provinces (id, name) VALUES (12, "Cà Mau");
INSERT INTO provinces (id, name) VALUES (13, "Cần Thơ");
INSERT INTO provinces (id, name) VALUES (14, "Cao Bằng");
INSERT INTO provinces (id, name) VALUES (15, "Gia Lai");
INSERT INTO provinces (id, name) VALUES (16, "Hà Giang");
INSERT INTO provinces (id, name) VALUES (17, "Hà Nam");
INSERT INTO provinces (id, name) VALUES (18, "Hà Nội");
INSERT INTO provinces (id, name) VALUES (19, "Hà Tĩnh");
INSERT INTO provinces (id, name) VALUES (20, "Hải Dương");
INSERT INTO provinces (id, name) VALUES (21, "Hải Phòng");
INSERT INTO provinces (id, name) VALUES (22, "Hậu Giang");
INSERT INTO provinces (id, name) VALUES (23, "Hồ Chí Minh");
INSERT INTO provinces (id, name) VALUES (24, "Hoà Bình");
INSERT INTO provinces (id, name) VALUES (25, "Hưng Yên");
INSERT INTO provinces (id, name) VALUES (26, "Khánh Hòa");
INSERT INTO provinces (id, name) VALUES (27, "Kiên Giang");
INSERT INTO provinces (id, name) VALUES (28, "Kon Tum");
INSERT INTO provinces (id, name) VALUES (29, "Lai Châu");
INSERT INTO provinces (id, name) VALUES (30, "Lâm Đồng");
INSERT INTO provinces (id, name) VALUES (31, "Lạng Sơn");
INSERT INTO provinces (id, name) VALUES (32, "Lào Cai");
INSERT INTO provinces (id, name) VALUES (33, "Long An");
INSERT INTO provinces (id, name) VALUES (34, "Nam Định");
INSERT INTO provinces (id, name) VALUES (35, "Nghệ An");
INSERT INTO provinces (id, name) VALUES (36, "Ninh Bình");
INSERT INTO provinces (id, name) VALUES (37, "Ninh Thuận");
INSERT INTO provinces (id, name) VALUES (38, "Phú Thọ");
INSERT INTO provinces (id, name) VALUES (39, "Phú Yên");
INSERT INTO provinces (id, name) VALUES (40, "Quảng Bình");
INSERT INTO provinces (id, name) VALUES (41, "Quảng Nam");
INSERT INTO provinces (id, name) VALUES (42, "Quảng Ngãi");
INSERT INTO provinces (id, name) VALUES (43, "Quảng Ninh");
INSERT INTO provinces (id, name) VALUES (44, "Quảng Trị");
INSERT INTO provinces (id, name) VALUES (45, "Sóc Trăng");
INSERT INTO provinces (id, name) VALUES (46, "Sơn La");
INSERT INTO provinces (id, name) VALUES (47, "Tây Ninh");
INSERT INTO provinces (id, name) VALUES (48, "Thái Bình");
INSERT INTO provinces (id, name) VALUES (49, "Thái Nguyên");
INSERT INTO provinces (id, name) VALUES (50, "Thanh Hóa");
INSERT INTO provinces (id, name) VALUES (51, "Thừa Thiên Huế");
INSERT INTO provinces (id, name) VALUES (52, "Tiền Giang");
INSERT INTO provinces (id, name) VALUES (53, "Trà Vinh");
INSERT INTO provinces (id, name) VALUES (54, "Tuyên Quang");
INSERT INTO provinces (id, name) VALUES (55, "Vĩnh Long");
INSERT INTO provinces (id, name) VALUES (56, "Vĩnh Phúc");
INSERT INTO provinces (id, name) VALUES (57, "Yên Bái");
INSERT INTO provinces (id, name) VALUES (58, "Đà Nẵng");
INSERT INTO provinces (id, name) VALUES (59, "Đắk Lắk");
INSERT INTO provinces (id, name) VALUES (60, "Đắk Nông");
INSERT INTO provinces (id, name) VALUES (61, "Điện Biên");
INSERT INTO provinces (id, name) VALUES (62, "Đồng Nai");
INSERT INTO provinces (id, name) VALUES (63, "Đồng Tháp");

-- Data for table `stations`
-- Ho Chi Minh
INSERT INTO stations (id, name, province_id) VALUES (1, "Sài Gòn", 23);
-- Quang Ngai
INSERT INTO stations (id, name, province_id) VALUES (2, "Quảng Ngãi", 42);
INSERT INTO stations (id, name, province_id) VALUES (3, "Đức Phổ", 42);
-- Da Nang
INSERT INTO stations (id, name, province_id) VALUES (4, "Đà Nẵng", 58);
INSERT INTO stations (id, name, province_id) VALUES (5, "Kim Liên", 58);
-- Ha Noi
INSERT INTO stations (id, name, province_id) VALUES (6, "Hà Nội", 18);
INSERT INTO stations (id, name, province_id) VALUES (7, "Giáp Bát", 18);
INSERT INTO stations (id, name, province_id) VALUES (8, "Văn Điền", 18);
INSERT INTO stations (id, name, province_id) VALUES (9, "Phú Diễn", 18);
INSERT INTO stations (id, name, province_id) VALUES (10, "Phường Mỗ", 18);
INSERT INTO stations (id, name, province_id) VALUES (11, "Gia Lâm", 18);
INSERT INTO stations (id, name, province_id) VALUES (12, "Long Biên", 18);
INSERT INTO stations (id, name, province_id) VALUES (13, "Yên Viên", 18);
INSERT INTO stations (id, name, province_id) VALUES (14, "Cổ Loa", 18);
INSERT INTO stations (id, name, province_id) VALUES (15, "Đông Anh", 18);
INSERT INTO stations (id, name, province_id) VALUES (16, "Thạch Lỗi", 18);
INSERT INTO stations (id, name, province_id) VALUES (17, "Đa Phúc", 18);
INSERT INTO stations (id, name, province_id) VALUES (18, "Trung Giã", 18);
INSERT INTO stations (id, name, province_id) VALUES (19, "Thị Cầu", 18);
-- Khanh Hoa
INSERT INTO stations (id, name, province_id) VALUES (20, "Đại Lãnh", 26);
INSERT INTO stations (id, name, province_id) VALUES (21, "Tu Bông", 26);
INSERT INTO stations (id, name, province_id) VALUES (22, "Giã", 26);
INSERT INTO stations (id, name, province_id) VALUES (23, "Ninh Hòa", 26);
INSERT INTO stations (id, name, province_id) VALUES (24, "Nha Trang", 26);
INSERT INTO stations (id, name, province_id) VALUES (25, "Ngã Ba", 26);
-- Hai duong
INSERT INTO stations (id, name, province_id) VALUES (26, "Cẩm Giàng", 20);
INSERT INTO stations (id, name, province_id) VALUES (27, "Chí Linh", 20);
INSERT INTO stations (id, name, province_id) VALUES (28, "Hải Dương", 20);
INSERT INTO stations (id, name, province_id) VALUES (29, "Phú Thái", 20);
-- Hue
INSERT INTO stations (id, name, province_id) VALUES (30, "Phò Trạch", 51);
INSERT INTO stations (id, name, province_id) VALUES (31, "Hiền Sỹ", 51);
INSERT INTO stations (id, name, province_id) VALUES (32, "Văn Xá", 51);
INSERT INTO stations (id, name, province_id) VALUES (33, "Huế", 51);
INSERT INTO stations (id, name, province_id) VALUES (34, "Cầu Hai", 51);
INSERT INTO stations (id, name, province_id) VALUES (35, "Lăng Cô", 51);
INSERT INTO stations (id, name, province_id) VALUES (36, "An Hoà", 51);
-- Nghe An
INSERT INTO stations (id, name, province_id) VALUES (37, "Cầu Giát", 35);
INSERT INTO stations (id, name, province_id) VALUES (38, "Chợ Sy", 35);
INSERT INTO stations (id, name, province_id) VALUES (39, "Vinh", 35);
INSERT INTO stations (id, name, province_id) VALUES (40, "Yên Xuân", 35);
-- Hai Phong
INSERT INTO stations (id, name, province_id) VALUES (41, "Hải Phòng", 21);
INSERT INTO stations (id, name, province_id) VALUES (42, "Thượng Lý", 21);
-- Nam Dinh
INSERT INTO stations (id, name, province_id) VALUES (43, "Nam Định", 34);
-- Quang Binh
INSERT INTO stations (id, name, province_id) VALUES (44, "La Khê", 40);
INSERT INTO stations (id, name, province_id) VALUES (45, "Tân Ấp", 40);
INSERT INTO stations (id, name, province_id) VALUES (46, "Đồng Chuối", 40);
INSERT INTO stations (id, name, province_id) VALUES (47, "Kim Lũ", 40);
INSERT INTO stations (id, name, province_id) VALUES (48, "Đồng Lê", 40);
INSERT INTO stations (id, name, province_id) VALUES (49, "Ngọc Lâm", 40);
INSERT INTO stations (id, name, province_id) VALUES (50, "Lạc Sơn", 40);
INSERT INTO stations (id, name, province_id) VALUES (51, "Minh Lệ", 40);
INSERT INTO stations (id, name, province_id) VALUES (52, "Ngân Sơn", 40);
INSERT INTO stations (id, name, province_id) VALUES (53, "Thọ Lộc", 40);
INSERT INTO stations (id, name, province_id) VALUES (54, "Hoàn Lão", 40);
INSERT INTO stations (id, name, province_id) VALUES (55, "Lạc Giao", 40);
INSERT INTO stations (id, name, province_id) VALUES (56, "Phúc Tự", 40);
INSERT INTO stations (id, name, province_id) VALUES (57, "Đồng Hới", 40);
INSERT INTO stations (id, name, province_id) VALUES (58, "Lệ Kỳ", 40);
INSERT INTO stations (id, name, province_id) VALUES (59, "Long Đại", 40);
INSERT INTO stations (id, name, province_id) VALUES (60, "Mỹ Đức", 40);
INSERT INTO stations (id, name, province_id) VALUES (61, "Phú Hoà", 40);
INSERT INTO stations (id, name, province_id) VALUES (62, "Mỹ Trạch", 40);
INSERT INTO stations (id, name, province_id) VALUES (63, "Thượng Lâm", 40);
INSERT INTO stations (id, name, province_id) VALUES (64, "Minh Cẩm", 40);
-- Phu Yen
INSERT INTO stations (id, name, province_id) VALUES (65, "Phước Lãnh", 39);
INSERT INTO stations (id, name, province_id) VALUES (66, "La Hai", 39);
INSERT INTO stations (id, name, province_id) VALUES (67, "Tuy Hòa", 39);
INSERT INTO stations (id, name, province_id) VALUES (68, "Đông Tác", 39);
INSERT INTO stations (id, name, province_id) VALUES (69, "Phú Hiệp", 39);
-- Thanh Hoa
INSERT INTO stations (id, name, province_id) VALUES (70, "Thanh Hóa", 50);
INSERT INTO stations (id, name, province_id) VALUES (71, "Bỉm Sơn", 50);
INSERT INTO stations (id, name, province_id) VALUES (72, "Minh Khôi", 50);
-- Binh Thuan
INSERT INTO stations (id, name, province_id) VALUES (73, "Sông Mao", 10);
INSERT INTO stations (id, name, province_id) VALUES (74, "Phan Thiết", 10);
INSERT INTO stations (id, name, province_id) VALUES (75, "Ma Lâm", 10);
INSERT INTO stations (id, name, province_id) VALUES (76, "Bình Thuận", 10);
INSERT INTO stations (id, name, province_id) VALUES (77, "Suối Kiết", 10);
INSERT INTO stations (id, name, province_id) VALUES (78, "Gia Huynh", 10);
-- Binh Dinh
INSERT INTO stations (id, name, province_id) VALUES (79, "Bồng Sơn", 11);
INSERT INTO stations (id, name, province_id) VALUES (80, "Văn Phú", 11);
INSERT INTO stations (id, name, province_id) VALUES (81, "Quy Nhơn", 11);
INSERT INTO stations (id, name, province_id) VALUES (82, "Diêu Trì", 11);
INSERT INTO stations (id, name, province_id) VALUES (83, "Vân Canh", 11);
-- Phu Tho
INSERT INTO stations (id, name, province_id) VALUES (84, "Việt Trì", 38);
INSERT INTO stations (id, name, province_id) VALUES (85, "Phủ Đức", 38);
INSERT INTO stations (id, name, province_id) VALUES (86, "Tiên Kiên", 38);
INSERT INTO stations (id, name, province_id) VALUES (87, "Phú Thọ", 38);
INSERT INTO stations (id, name, province_id) VALUES (88, "Chí Phủ", 38);
INSERT INTO stations (id, name, province_id) VALUES (89, "Vũ Ẻn", 38);
INSERT INTO stations (id, name, province_id) VALUES (90, "Ấm Thượng", 38);
INSERT INTO stations (id, name, province_id) VALUES (91, "Đoan Thượng", 38);
-- Ha Tinh
INSERT INTO stations (id, name, province_id) VALUES (92, "Yên Trung", 19);
INSERT INTO stations (id, name, province_id) VALUES (93, "Đức Lạc", 19);
INSERT INTO stations (id, name, province_id) VALUES (94, "Yên Duệ", 19);
INSERT INTO stations (id, name, province_id) VALUES (95, "Hoà Duyệt", 19);
INSERT INTO stations (id, name, province_id) VALUES (96, "Thanh Luyện", 19);
INSERT INTO stations (id, name, province_id) VALUES (97, "Chu Lễ", 19);
INSERT INTO stations (id, name, province_id) VALUES (98, "Hương Phố", 19);
INSERT INTO stations (id, name, province_id) VALUES (99, "Phúc Trạch", 19);
-- Lâm Đồng
INSERT INTO stations (id, name, province_id) VALUES (100, "Đà Lạt", 30);
INSERT INTO stations (id, name, province_id) VALUES (101, "Trại Mát", 30);
-- Hà Nam
INSERT INTO stations (id, name, province_id) VALUES (102, "Phủ Lý", 17);
-- Ninh Bình
INSERT INTO stations (id, name, province_id) VALUES (103, "Ninh Bình", 36);
-- Bình Dương
INSERT INTO stations (id, name, province_id) VALUES (104, "Dĩ An", 8);
INSERT INTO stations (id, name, province_id) VALUES (105, "Sóng Thần", 8);
-- Đồng Nai
INSERT INTO stations (id, name, province_id) VALUES (106, "Biên Hòa", 62);
INSERT INTO stations (id, name, province_id) VALUES (107, "Long Khánh", 62);
INSERT INTO stations (id, name, province_id) VALUES (108, "Gia Ray", 62);
-- Lào Cai
INSERT INTO stations (id, name, province_id) VALUES (109, "Lào Cai", 32);
INSERT INTO stations (id, name, province_id) VALUES (110, "Bảo Hà", 32);
INSERT INTO stations (id, name, province_id) VALUES (111, "Thái Văn", 32);
INSERT INTO stations (id, name, province_id) VALUES (112, "Phố Lu", 32);
INSERT INTO stations (id, name, province_id) VALUES (113, "Thái Niên", 32);
INSERT INTO stations (id, name, province_id) VALUES (114, "Lào Cai", 32);
-- Yên Bái
INSERT INTO stations (id, name, province_id) VALUES (115, "Yên Bái", 57);
INSERT INTO stations (id, name, province_id) VALUES (116, "Cổ Phúc", 57);
INSERT INTO stations (id, name, province_id) VALUES (117, "Ngòi Hóp", 57);
INSERT INTO stations (id, name, province_id) VALUES (118, "Mậu A", 57);
INSERT INTO stations (id, name, province_id) VALUES (119, "Trái Hút", 57);
INSERT INTO stations (id, name, province_id) VALUES (120, "Lâm Giang", 57);
INSERT INTO stations (id, name, province_id) VALUES (121, "Lang Khay", 57);
INSERT INTO stations (id, name, province_id) VALUES (122, "Lang Thíp", 57);
-- Lạng Sơn
INSERT INTO stations (id, name, province_id) VALUES (123, "Voi Xô", 31);
INSERT INTO stations (id, name, province_id) VALUES (124, "Phố Vị", 31);
INSERT INTO stations (id, name, province_id) VALUES (125, "Bắc Lệ", 31);
INSERT INTO stations (id, name, province_id) VALUES (126, "Sông Hoá", 31);
INSERT INTO stations (id, name, province_id) VALUES (127, "Chi Lăng", 31);
INSERT INTO stations (id, name, province_id) VALUES (128, "Đồng Mỏ", 31);
INSERT INTO stations (id, name, province_id) VALUES (129, "Bắc Thuỷ", 31);
INSERT INTO stations (id, name, province_id) VALUES (130, "Bản Thí", 31);
INSERT INTO stations (id, name, province_id) VALUES (131, "Yên Trạch", 31);
INSERT INTO stations (id, name, province_id) VALUES (132, "Lạng Sơn", 31);
INSERT INTO stations (id, name, province_id) VALUES (133, "Đồng Đăng", 31);
-- Thái Nguyên
INSERT INTO stations (id, name, province_id) VALUES (134, "Thái Nguyên", 49);
INSERT INTO stations (id, name, province_id) VALUES (135, "Lương Sơn", 49);
INSERT INTO stations (id, name, province_id) VALUES (136, "Lưu Xá", 49);
INSERT INTO stations (id, name, province_id) VALUES (137, "Phổ Yên", 49);
INSERT INTO stations (id, name, province_id) VALUES (138, "Quán Triều", 49);
-- Quảng Ninh
INSERT INTO stations (id, name, province_id) VALUES (139, "Hạ Long", 43);
INSERT INTO stations (id, name, province_id) VALUES (140, "Đông Triều", 43);
INSERT INTO stations (id, name, province_id) VALUES (141, "Mạo Khê", 43);
INSERT INTO stations (id, name, province_id) VALUES (142, "Nam Khê", 43);
INSERT INTO stations (id, name, province_id) VALUES (143, "Uông Bí", 43);
INSERT INTO stations (id, name, province_id) VALUES (144, "Yên Cư", 43);
INSERT INTO stations (id, name, province_id) VALUES (145, "Yên Dưỡng", 43);
INSERT INTO stations (id, name, province_id) VALUES (146, "Bàn Cờ", 43);
-- Bắc Giang
INSERT INTO stations (id, name, province_id) VALUES (147, "Bắc Giang", 3);
INSERT INTO stations (id, name, province_id) VALUES (148, "Sen Hồ", 3);
INSERT INTO stations (id, name, province_id) VALUES (149, "Phố Tráng", 3);
INSERT INTO stations (id, name, province_id) VALUES (150, "Lan Mẫu", 3);
INSERT INTO stations (id, name, province_id) VALUES (151, "Bảo Sơn", 3);
INSERT INTO stations (id, name, province_id) VALUES (152, "Cẩm Lý", 3);
INSERT INTO stations (id, name, province_id) VALUES (153, "Kép", 3);
-- Vĩnh Phúc
INSERT INTO stations (id, name, province_id) VALUES (154, "Vĩnh Yên", 56);
INSERT INTO stations (id, name, province_id) VALUES (155, "Phúc Yên", 56);
-- Bắc Ninh
INSERT INTO stations (id, name, province_id) VALUES (156, "Bắc Ninh", 6);
INSERT INTO stations (id, name, province_id) VALUES (157, "Từ Sơn", 6);
INSERT INTO stations (id, name, province_id) VALUES (158, "Lim", 6);
-- Quảng Trị
INSERT INTO stations (id, name, province_id) VALUES (159, "Quảng Trị", 44);
INSERT INTO stations (id, name, province_id) VALUES (160, "Sa Lung", 44);
INSERT INTO stations (id, name, province_id) VALUES (161, "Tiên An", 44);
INSERT INTO stations (id, name, province_id) VALUES (162, "Hà Thanh", 44);
INSERT INTO stations (id, name, province_id) VALUES (163, "Đông Hà", 44);
INSERT INTO stations (id, name, province_id) VALUES (164, "Quảng Trị", 44);
INSERT INTO stations (id, name, province_id) VALUES (165, "Vĩnh Thuỷ", 44);
INSERT INTO stations (id, name, province_id) VALUES (166, "Diên Sanh", 44);
INSERT INTO stations (id, name, province_id) VALUES (167, "Mỹ Chánh", 44);
-- Quảng Nam
INSERT INTO stations (id, name, province_id) VALUES (168, "Tam Kỳ", 41);
INSERT INTO stations (id, name, province_id) VALUES (169, "Trà Kiệu", 41);
INSERT INTO stations (id, name, province_id) VALUES (170, "Phú Cang", 41);
INSERT INTO stations (id, name, province_id) VALUES (171, "Núi Thành", 41);
-- Ninh Thuận
INSERT INTO stations (id, name, province_id) VALUES (172, "Tháp Chàm", 37);
INSERT INTO stations (id, name, province_id) VALUES (173, "Cà Ná", 37);

-- Route
INSERT INTO routes (id, name) VALUES (1, "Sài Gòn - Hà Nội");
INSERT INTO routes (id, name) VALUES (2, "Hà Nội - Sài Gòn");
INSERT INTO routes (id, name) VALUES (3, "Sài Gòn - Đà Nẵng");
INSERT INTO routes (id, name) VALUES (4, "Đà Nẵng - Sài Gòn");

-- Train
-- SG - HN
INSERT INTO trains(id, name) VALUES (1, "SE1");
INSERT INTO trains(id, name) VALUES (2, "SE2");
INSERT INTO trains(id, name) VALUES (3, "SE3");
INSERT INTO trains(id, name) VALUES (4, "SE4");
INSERT INTO trains(id, name) VALUES (5, "SE5");
INSERT INTO trains(id, name) VALUES (6, "SE6");
INSERT INTO trains(id, name) VALUES (7, "SE7");
INSERT INTO trains(id, name) VALUES (8, "SE8");
-- HN - Vinh
INSERT INTO trains(id, name) VALUES (9, "NA1");
INSERT INTO trains(id, name) VALUES (10, "NA2");
INSERT INTO trains(id, name) VALUES (11, "SE35");
INSERT INTO trains(id, name) VALUES (12, "SE36");

