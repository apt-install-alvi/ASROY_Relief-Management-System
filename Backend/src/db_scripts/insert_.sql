INSERT INTO Area (Area_id, Area_name)
VALUES
('A001', 'Bagerhat'),
('A002', 'Bandarban'),
('A003', 'Barguna'),
('A004', 'Barisal'),
('A005', 'Bhola'),
('A006', 'Bogura'),
('A007', 'Brahmanbaria'),
('A008', 'Chandpur'),
('A009', 'Chapai Nawabganj'),
('A010', 'Chattogram'),
('A011', 'Chuadanga'),
('A012', 'Coxs Bazar'),
('A013', 'Cumilla'),
('A014', 'Dhaka'),
('A015', 'Dinajpur'),
('A016', 'Faridpur'),
('A017', 'Feni'),
('A018', 'Gaibandha'),
('A019', 'Gazipur'),
('A020', 'Gopalganj'),
('A021', 'Habiganj'),
('A022', 'Jamalpur'),
('A023', 'Jashore'),
('A024', 'Jhalokathi'),
('A025', 'Jhenaidah'),
('A026', 'Joypurhat'),
('A027', 'Khagrachhari'),
('A028', 'Khulna'),
('A029', 'Kishoreganj'),
('A030', 'Kurigram'),
('A031', 'Kushtia'),
('A032', 'Lakshmipur'),
('A033', 'Lalmonirhat'),
('A034', 'Madaripur'),
('A035', 'Magura'),
('A036', 'Manikganj'),
('A037', 'Meherpur'),
('A038', 'Moulvibazar'),
('A039', 'Munshiganj'),
('A040', 'Mymensingh'),
('A041', 'Naogaon'),
('A042', 'Narail'),
('A043', 'Narayanganj'),
('A044', 'Narsingdi'),
('A045', 'Natore'),
('A046', 'Netrokona'),
('A047', 'Nilphamari'),
('A048', 'Noakhali'),
('A049', 'Pabna'),
('A050', 'Panchagarh'),
('A051', 'Patuakhali'),
('A052', 'Pirojpur'),
('A053', 'Rajbari'),
('A054', 'Rajshahi'),
('A055', 'Rangamati'),
('A056', 'Rangpur'),
('A057', 'Satkhira'),
('A058', 'Shariatpur'),
('A059', 'Sherpur'),
('A060', 'Sirajganj'),
('A061', 'Sunamganj'),
('A062', 'Sylhet'),
('A063', 'Tangail'),
('A064', 'Thakurgaon');

INSERT INTO Event (Event_id, Event_area_id, Event_name, Date_of_occurrence, Time_of_occurrence, Status)
VALUES
('E001', 'A062', 'Flood', STR_TO_DATE('15-JUN-2022', '%d-%b-%Y'), '08:00:00', 'Not Active'),   -- Sylhet
('E002', 'A038', 'Flood', STR_TO_DATE('16-JUN-2022', '%d-%b-%Y'), '09:15:00', 'Not Active'),   -- Moulvibazar
('E003', 'A021', 'Flood', STR_TO_DATE('17-JUN-2022', '%d-%b-%Y'), '10:30:00', 'Not Active'),   -- Habiganj
('E004', 'A061', 'Flood', STR_TO_DATE('18-JUN-2022', '%d-%b-%Y'), '07:45:00', 'Not Active'),   -- Sunamganj
('E005', 'A060', 'Drought', STR_TO_DATE('05-JUL-2022', '%d-%b-%Y'), '11:00:00', 'Not Active'), -- Sirajganj
('E006', 'A015', 'Drought', STR_TO_DATE('06-JUL-2022', '%d-%b-%Y'), '10:30:00', 'Not Active'), -- Dinajpur
('E007', 'A012', 'Cyclone', STR_TO_DATE('14-MAY-2023', '%d-%b-%Y'), '12:00:00', 'Not Active'), -- Coxs Bazar
('E008', 'A010', 'Cyclone', STR_TO_DATE('02-OCT-2023', '%d-%b-%Y'), '15:00:00', 'Not Active'), -- Chattogram
('E009', 'A010', 'Cyclone', STR_TO_DATE('12-NOV-2023', '%d-%b-%Y'), '16:30:00', 'Not Active'), -- Chattogram
('E010', 'A054', 'Drought', STR_TO_DATE('01-APR-2023', '%d-%b-%Y'), '10:00:00', 'Not Active'), -- Rajshahi
('E011', 'A041', 'Drought', STR_TO_DATE('02-APR-2023', '%d-%b-%Y'), '10:00:00', 'Not Active'), -- Naogaon
('E012', 'A009', 'Drought', STR_TO_DATE('03-APR-2023', '%d-%b-%Y'), '10:00:00', 'Not Active'), -- Chapainawabganj
('E013', 'A006', 'Drought', STR_TO_DATE('04-APR-2023', '%d-%b-%Y'), '10:00:00', 'Not Active'), -- Bogura
('E014', 'A059', 'Flood', STR_TO_DATE('06-OCT-2024', '%d-%b-%Y'), '09:30:00', 'Not Active'),   -- Sherpur
('E015', 'A062', 'Flood', STR_TO_DATE('20-MAY-2025', '%d-%b-%Y'), '07:45:00', 'Active'),       -- Sylhet
('E016', 'A061', 'Flood', STR_TO_DATE('21-MAY-2025', '%d-%b-%Y'), '08:00:00', 'Active'),       -- Sunamganj
('E017', 'A030', 'Flood', STR_TO_DATE('22-MAY-2025', '%d-%b-%Y'), '07:45:00', 'Active'),       -- Kurigram
('E018', 'A011', 'Cyclone', STR_TO_DATE('18-OCT-2024', '%d-%b-%Y'), '13:00:00', 'Not Active'); -- Teknaf

INSERT INTO Shelter VALUES ('S001', 'Bagerhat Govt. High School & Cyclone Shelter', 670, 468, NULL);
INSERT INTO Shelter VALUES ('S002', 'Bagerhat Govt. Primary School Shelter', 720, 503, NULL);
INSERT INTO Shelter VALUES ('S003', 'Bagerhat Community Centre Multipurpose Shelter', 770, 539, NULL);
INSERT INTO Shelter VALUES ('S004', 'Bandarban Govt. High School & Cyclone Shelter', 690, 482, NULL);
INSERT INTO Shelter VALUES ('S005', 'Bandarban Govt. Primary School Shelter', 740, 518, NULL);
INSERT INTO Shelter VALUES ('S006', 'Bandarban Community Centre Multipurpose Shelter', 790, 553, NULL);
INSERT INTO Shelter VALUES ('S007', 'Barguna Govt. High School & Cyclone Shelter', 710, 496, NULL);
INSERT INTO Shelter VALUES ('S008', 'Barguna Govt. Primary School Shelter', 760, 532, NULL);
INSERT INTO Shelter VALUES ('S009', 'Barguna Community Centre Multipurpose Shelter', 810, 567, NULL);
INSERT INTO Shelter VALUES ('S010', 'Barisal Govt. High School & Cyclone Shelter', 730, 510, NULL);
INSERT INTO Shelter VALUES ('S011', 'Barisal Govt. Primary School Shelter', 780, 546, NULL);
INSERT INTO Shelter VALUES ('S012', 'Barisal Community Centre Multipurpose Shelter', 830, 581, NULL);
INSERT INTO Shelter VALUES ('S013', 'Bhola Govt. High School & Cyclone Shelter', 650, 454, NULL);
INSERT INTO Shelter VALUES ('S014', 'Bhola Govt. Primary School Shelter', 700, 489, NULL);
INSERT INTO Shelter VALUES ('S015', 'Bhola Community Centre Multipurpose Shelter', 750, 525, NULL);
INSERT INTO Shelter VALUES ('S016', 'Bogura Govt. High School & Cyclone Shelter', 670, 468, NULL);
INSERT INTO Shelter VALUES ('S017', 'Bogura Govt. Primary School Shelter', 720, 503, NULL);
INSERT INTO Shelter VALUES ('S018', 'Bogura Community Centre Multipurpose Shelter', 770, 539, NULL);
INSERT INTO Shelter VALUES ('S019', 'Brahmanbaria Govt. High School & Cyclone Shelter', 690, 482, NULL);
INSERT INTO Shelter VALUES ('S020', 'Brahmanbaria Govt. Primary School Shelter', 740, 518, NULL);
INSERT INTO Shelter VALUES ('S021', 'Brahmanbaria Community Centre Multipurpose Shelter', 790, 553, NULL);
INSERT INTO Shelter VALUES ('S022', 'Chandpur Govt. High School & Cyclone Shelter', 710, 496, NULL);
INSERT INTO Shelter VALUES ('S023', 'Chandpur Govt. Primary School Shelter', 760, 532, NULL);
INSERT INTO Shelter VALUES ('S024', 'Chandpur Community Centre Multipurpose Shelter', 810, 567, NULL);
INSERT INTO Shelter VALUES ('S025', 'ChapaiNawabganj Govt. High School & Cyclone', 730, 510, NULL);
INSERT INTO Shelter VALUES ('S026', 'ChapaiNawabganj Govt. Primary School ', 780, 546, NULL);
INSERT INTO Shelter VALUES ('S027', 'ChapaiNawabganj Community Centre', 830, 581, NULL);
INSERT INTO Shelter VALUES ('S028', 'Chattogram Govt. High School & Cyclone Shelter', 650, 454, NULL);
INSERT INTO Shelter VALUES ('S029', 'Chattogram Govt. Primary School Shelter', 700, 489, NULL);
INSERT INTO Shelter VALUES ('S030', 'Chattogram Community Centre Multipurpose Shelter', 750, 525, NULL);
INSERT INTO Shelter VALUES ('S031', 'Chuadanga Govt. High School & Cyclone Shelter', 670, 468, NULL);
INSERT INTO Shelter VALUES ('S032', 'Chuadanga Govt. Primary School Shelter', 720, 503, NULL);
INSERT INTO Shelter VALUES ('S033', 'Chuadanga Community Centre Multipurpose Shelter', 770, 539, NULL);
INSERT INTO Shelter VALUES ('S034', 'Coxs Bazar Govt. High School & Cyclone Shelter', 690, 482, NULL);
INSERT INTO Shelter VALUES ('S035', 'Coxs Bazar Govt. Primary School Shelter', 740, 518, NULL);
INSERT INTO Shelter VALUES ('S036', 'Coxs Bazar Community Centre Multipurpose Shelter', 790, 553, NULL);
INSERT INTO Shelter VALUES ('S037', 'Cumilla Govt. High School & Cyclone Shelter', 710, 496, NULL);
INSERT INTO Shelter VALUES ('S038', 'Cumilla Govt. Primary School Shelter', 760, 532, NULL);
INSERT INTO Shelter VALUES ('S039', 'Cumilla Community Centre Multipurpose Shelter', 810, 567, NULL);
INSERT INTO Shelter VALUES ('S040', 'Dhaka Govt. High School & Cyclone Shelter', 730, 510, NULL);
INSERT INTO Shelter VALUES ('S041', 'Dhaka Govt. Primary School Shelter', 780, 546, NULL);
INSERT INTO Shelter VALUES ('S042', 'Dhaka Community Centre Multipurpose Shelter', 830, 581, NULL);
INSERT INTO Shelter VALUES ('S043', 'Dinajpur Govt. High School & Cyclone Shelter', 650, 454, NULL);
INSERT INTO Shelter VALUES ('S044', 'Dinajpur Govt. Primary School Shelter', 700, 489, NULL);
INSERT INTO Shelter VALUES ('S045', 'Dinajpur Community Centre Multipurpose Shelter', 750, 525, NULL);
INSERT INTO Shelter VALUES ('S046', 'Faridpur Govt. High School & Cyclone Shelter', 670, 468, NULL);
INSERT INTO Shelter VALUES ('S047', 'Faridpur Govt. Primary School Shelter', 720, 503, NULL);
INSERT INTO Shelter VALUES ('S048', 'Faridpur Community Centre Multipurpose Shelter', 770, 539, NULL);
INSERT INTO Shelter VALUES ('S049', 'Feni Govt. High School & Cyclone Shelter', 690, 482, NULL);
INSERT INTO Shelter VALUES ('S050', 'Feni Govt. Primary School Shelter', 740, 518, NULL);
INSERT INTO Shelter VALUES ('S051', 'Feni Community Centre Multipurpose Shelter', 790, 553, NULL);
INSERT INTO Shelter VALUES ('S052', 'Gaibandha Govt. High School & Cyclone Shelter', 710, 496, NULL);
INSERT INTO Shelter VALUES ('S053', 'Gaibandha Govt. Primary School Shelter', 760, 532, NULL);
INSERT INTO Shelter VALUES ('S054', 'Gaibandha Community Centre Multipurpose Shelter', 810, 567, NULL);
INSERT INTO Shelter VALUES ('S055', 'Gazipur Govt. High School & Cyclone Shelter', 730, 510, NULL);
INSERT INTO Shelter VALUES ('S056', 'Gazipur Govt. Primary School Shelter', 780, 546, NULL);
INSERT INTO Shelter VALUES ('S057', 'Gazipur Community Centre Multipurpose Shelter', 830, 581, NULL);
INSERT INTO Shelter VALUES ('S058', 'Gopalganj Govt. High School & Cyclone Shelter', 650, 454, NULL);
INSERT INTO Shelter VALUES ('S059', 'Gopalganj Govt. Primary School Shelter', 700, 489, NULL);
INSERT INTO Shelter VALUES ('S060', 'Gopalganj Community Centre Multipurpose Shelter', 750, 525, NULL);
INSERT INTO Shelter VALUES ('S061', 'Habiganj Govt. High School & Cyclone Shelter', 670, 468, NULL);
INSERT INTO Shelter VALUES ('S062', 'Habiganj Govt. Primary School Shelter', 720, 503, NULL);
INSERT INTO Shelter VALUES ('S063', 'Habiganj Community Centre Multipurpose Shelter', 770, 539, NULL);
INSERT INTO Shelter VALUES ('S064', 'Jamalpur Govt. High School & Cyclone Shelter', 690, 482, NULL);
INSERT INTO Shelter VALUES ('S065', 'Jamalpur Govt. Primary School Shelter', 740, 518, NULL);
INSERT INTO Shelter VALUES ('S066', 'Jamalpur Community Centre Multipurpose Shelter', 790, 553, NULL);
INSERT INTO Shelter VALUES ('S067', 'Jashore Govt. High School & Cyclone Shelter', 710, 496, NULL);
INSERT INTO Shelter VALUES ('S068', 'Jashore Govt. Primary School Shelter', 760, 532, NULL);
INSERT INTO Shelter VALUES ('S069', 'Jashore Community Centre Multipurpose Shelter', 810, 567, NULL);
INSERT INTO Shelter VALUES ('S070', 'Jhalokathi Govt. High School & Cyclone Shelter', 730, 510, NULL);
INSERT INTO Shelter VALUES ('S071', 'Jhalokathi Govt. Primary School Shelter', 780, 546, NULL);
INSERT INTO Shelter VALUES ('S072', 'Jhalokathi Community Centre Multipurpose Shelter', 830, 581, NULL);
INSERT INTO Shelter VALUES ('S073', 'Jhenaidah Govt. High School & Cyclone Shelter', 650, 454, NULL);
INSERT INTO Shelter VALUES ('S074', 'Jhenaidah Govt. Primary School Shelter', 700, 489, NULL);
INSERT INTO Shelter VALUES ('S075', 'Jhenaidah Community Centre Multipurpose Shelter', 750, 525, NULL);
INSERT INTO Shelter VALUES ('S076', 'Joypurhat Govt. High School & Cyclone Shelter', 670, 468, NULL);
INSERT INTO Shelter VALUES ('S077', 'Joypurhat Govt. Primary School Shelter', 720, 503, NULL);
INSERT INTO Shelter VALUES ('S078', 'Joypurhat Community Centre Multipurpose Shelter', 770, 539, NULL);
INSERT INTO Shelter VALUES ('S079', 'Khagrachhari Govt. High School & Cyclone Shelter', 690, 482, NULL);
INSERT INTO Shelter VALUES ('S080', 'Khagrachhari Govt. Primary School Shelter', 740, 518, NULL);
INSERT INTO Shelter VALUES ('S081', 'Khagrachhari Community Centre Multipurpose Shelter', 790, 553, NULL);
INSERT INTO Shelter VALUES ('S082', 'Khulna Govt. High School & Cyclone Shelter', 710, 496, NULL);
INSERT INTO Shelter VALUES ('S083', 'Khulna Govt. Primary School Shelter', 760, 532, NULL);
INSERT INTO Shelter VALUES ('S084', 'Khulna Community Centre Multipurpose Shelter', 810, 567, NULL);
INSERT INTO Shelter VALUES ('S085', 'Kishoreganj Govt. High School & Cyclone Shelter', 730, 510, NULL);
INSERT INTO Shelter VALUES ('S086', 'Kishoreganj Govt. Primary School Shelter', 780, 546, NULL);
INSERT INTO Shelter VALUES ('S087', 'Kishoreganj Community Centre Multipurpose Shelter', 830, 581, NULL);
INSERT INTO Shelter VALUES ('S088', 'Kurigram Govt. High School & Cyclone Shelter', 650, 454, NULL);
INSERT INTO Shelter VALUES ('S089', 'Kurigram Govt. Primary School Shelter', 700, 489, NULL);
INSERT INTO Shelter VALUES ('S090', 'Kurigram Community Centre Multipurpose Shelter', 750, 525, NULL);
INSERT INTO Shelter VALUES ('S091', 'Kushtia Govt. High School & Cyclone Shelter', 670, 468, NULL);
INSERT INTO Shelter VALUES ('S092', 'Kushtia Govt. Primary School Shelter', 720, 503, NULL);
INSERT INTO Shelter VALUES ('S093', 'Kushtia Community Centre Multipurpose Shelter', 770, 539, NULL);
INSERT INTO Shelter VALUES ('S094', 'Lakshmipur Govt. High School & Cyclone Shelter', 690, 482, NULL);
INSERT INTO Shelter VALUES ('S095', 'Lakshmipur Govt. Primary School Shelter', 740, 518, NULL);
INSERT INTO Shelter VALUES ('S096', 'Lakshmipur Community Centre Multipurpose Shelter', 790, 553, NULL);
INSERT INTO Shelter VALUES ('S097', 'Lalmonirhat Govt. High School & Cyclone Shelter', 710, 496, NULL);
INSERT INTO Shelter VALUES ('S098', 'Lalmonirhat Govt. Primary School Shelter', 760, 532, NULL);
INSERT INTO Shelter VALUES ('S099', 'Lalmonirhat Community Centre Multipurpose Shelter', 810, 567, NULL);
INSERT INTO Shelter VALUES ('S100', 'Madaripur Govt. High School & Cyclone Shelter', 730, 510, NULL);
INSERT INTO Shelter VALUES ('S101', 'Madaripur Govt. Primary School Shelter', 780, 546, NULL);
INSERT INTO Shelter VALUES ('S102', 'Madaripur Community Centre Multipurpose Shelter', 830, 581, NULL);
INSERT INTO Shelter VALUES ('S103', 'Magura Govt. High School & Cyclone Shelter', 650, 454, NULL);
INSERT INTO Shelter VALUES ('S104', 'Magura Govt. Primary School Shelter', 700, 489, NULL);
INSERT INTO Shelter VALUES ('S105', 'Magura Community Centre Multipurpose Shelter', 750, 525, NULL);
INSERT INTO Shelter VALUES ('S106', 'Manikganj Govt. High School & Cyclone Shelter', 670, 468, NULL);
INSERT INTO Shelter VALUES ('S107', 'Manikganj Govt. Primary School Shelter', 720, 503, NULL);
INSERT INTO Shelter VALUES ('S108', 'Manikganj Community Centre Multipurpose Shelter', 770, 539, NULL);
INSERT INTO Shelter VALUES ('S109', 'Meherpur Govt. High School & Cyclone Shelter', 690, 482, NULL);
INSERT INTO Shelter VALUES ('S110', 'Meherpur Govt. Primary School Shelter', 740, 518, NULL);
INSERT INTO Shelter VALUES ('S111', 'Meherpur Community Centre Multipurpose Shelter', 790, 553, NULL);
INSERT INTO Shelter VALUES ('S112', 'Moulvibazar Govt. High School & Cyclone Shelter', 710, 496, NULL);
INSERT INTO Shelter VALUES ('S113', 'Moulvibazar Govt. Primary School Shelter', 760, 532, NULL);
INSERT INTO Shelter VALUES ('S114', 'Moulvibazar Community Centre Multipurpose Shelter', 810, 567, NULL);
INSERT INTO Shelter VALUES ('S115', 'Munshiganj Govt. High School & Cyclone Shelter', 730, 510, NULL);
INSERT INTO Shelter VALUES ('S116', 'Munshiganj Govt. Primary School Shelter', 780, 546, NULL);
INSERT INTO Shelter VALUES ('S117', 'Munshiganj Community Centre Multipurpose Shelter', 830, 581, NULL);
INSERT INTO Shelter VALUES ('S118', 'Mymensingh Govt. High School & Cyclone Shelter', 650, 454, NULL);
INSERT INTO Shelter VALUES ('S119', 'Mymensingh Govt. Primary School Shelter', 700, 489, NULL);
INSERT INTO Shelter VALUES ('S120', 'Mymensingh Community Centre Multipurpose Shelter', 750, 525, NULL);
INSERT INTO Shelter VALUES ('S121', 'Naogaon Govt. High School & Cyclone Shelter', 670, 468, NULL);
INSERT INTO Shelter VALUES ('S122', 'Naogaon Govt. Primary School Shelter', 720, 503, NULL);
INSERT INTO Shelter VALUES ('S123', 'Naogaon Community Centre Multipurpose Shelter', 770, 539, NULL);
INSERT INTO Shelter VALUES ('S124', 'Narail Govt. High School & Cyclone Shelter', 690, 482, NULL);
INSERT INTO Shelter VALUES ('S125', 'Narail Govt. Primary School Shelter', 740, 518, NULL);
INSERT INTO Shelter VALUES ('S126', 'Narail Community Centre Multipurpose Shelter', 790, 553, NULL);
INSERT INTO Shelter VALUES ('S127', 'Narayanganj Govt. High School & Cyclone Shelter', 710, 496, NULL);
INSERT INTO Shelter VALUES ('S128', 'Narayanganj Govt. Primary School Shelter', 760, 532, NULL);
INSERT INTO Shelter VALUES ('S129', 'Narayanganj Community Centre Multipurpose Shelter', 810, 567, NULL);
INSERT INTO Shelter VALUES ('S130', 'Narsingdi Govt. High School & Cyclone Shelter', 730, 510, NULL);
INSERT INTO Shelter VALUES ('S131', 'Narsingdi Govt. Primary School Shelter', 780, 546, NULL);
INSERT INTO Shelter VALUES ('S132', 'Narsingdi Community Centre Multipurpose Shelter', 830, 581, NULL);
INSERT INTO Shelter VALUES ('S133', 'Natore Govt. High School & Cyclone Shelter', 650, 454, NULL);
INSERT INTO Shelter VALUES ('S134', 'Natore Govt. Primary School Shelter', 700, 489, NULL);
INSERT INTO Shelter VALUES ('S135', 'Natore Community Centre Multipurpose Shelter', 750, 525, NULL);
INSERT INTO Shelter VALUES ('S136', 'Netrokona Govt. High School & Cyclone Shelter', 670, 468, NULL);
INSERT INTO Shelter VALUES ('S137', 'Netrokona Govt. Primary School Shelter', 720, 503, NULL);
INSERT INTO Shelter VALUES ('S138', 'Netrokona Community Centre Multipurpose Shelter', 770, 539, NULL);
INSERT INTO Shelter VALUES ('S139', 'Nilphamari Govt. High School & Cyclone Shelter', 690, 482, NULL);
INSERT INTO Shelter VALUES ('S140', 'Nilphamari Govt. Primary School Shelter', 740, 518, NULL);
INSERT INTO Shelter VALUES ('S141', 'Nilphamari Community Centre Multipurpose Shelter', 790, 553, NULL);
INSERT INTO Shelter VALUES ('S142', 'Noakhali Govt. High School & Cyclone Shelter', 710, 496, NULL);
INSERT INTO Shelter VALUES ('S143', 'Noakhali Govt. Primary School Shelter', 760, 532, NULL);
INSERT INTO Shelter VALUES ('S144', 'Noakhali Community Centre Multipurpose Shelter', 810, 567, NULL);
INSERT INTO Shelter VALUES ('S145', 'Pabna Govt. High School & Cyclone Shelter', 730, 510, NULL);
INSERT INTO Shelter VALUES ('S146', 'Pabna Govt. Primary School Shelter', 780, 546, NULL);
INSERT INTO Shelter VALUES ('S147', 'Pabna Community Centre Multipurpose Shelter', 830, 581, NULL);
INSERT INTO Shelter VALUES ('S148', 'Panchagarh Govt. High School & Cyclone Shelter', 650, 454, NULL);
INSERT INTO Shelter VALUES ('S149', 'Panchagarh Govt. Primary School Shelter', 700, 489, NULL);
INSERT INTO Shelter VALUES ('S150', 'Panchagarh Community Centre Multipurpose Shelter', 750, 525, NULL);
INSERT INTO Shelter VALUES ('S151', 'Patuakhali Govt. High School & Cyclone Shelter', 670, 468, NULL);
INSERT INTO Shelter VALUES ('S152', 'Patuakhali Govt. Primary School Shelter', 720, 503, NULL);
INSERT INTO Shelter VALUES ('S153', 'Patuakhali Community Centre Multipurpose Shelter', 770, 539, NULL);
INSERT INTO Shelter VALUES ('S154', 'Pirojpur Govt. High School & Cyclone Shelter', 690, 482, NULL);
INSERT INTO Shelter VALUES ('S155', 'Pirojpur Govt. Primary School Shelter', 740, 518, NULL);
INSERT INTO Shelter VALUES ('S156', 'Pirojpur Community Centre Multipurpose Shelter', 790, 553, NULL);
INSERT INTO Shelter VALUES ('S157', 'Rajbari Govt. High School & Cyclone Shelter', 710, 496, NULL);
INSERT INTO Shelter VALUES ('S158', 'Rajbari Govt. Primary School Shelter', 760, 532, NULL);
INSERT INTO Shelter VALUES ('S159', 'Rajbari Community Centre Multipurpose Shelter', 810, 567, NULL);
INSERT INTO Shelter VALUES ('S160', 'Rajshahi Govt. High School & Cyclone Shelter', 730, 510, NULL);
INSERT INTO Shelter VALUES ('S161', 'Rajshahi Govt. Primary School Shelter', 780, 546, NULL);
INSERT INTO Shelter VALUES ('S162', 'Rajshahi Community Centre Multipurpose Shelter', 830, 581, NULL);
INSERT INTO Shelter VALUES ('S163', 'Rangamati Govt. High School & Cyclone Shelter', 650, 454, NULL);
INSERT INTO Shelter VALUES ('S164', 'Rangamati Govt. Primary School Shelter', 700, 489, NULL);
INSERT INTO Shelter VALUES ('S165', 'Rangamati Community Centre Multipurpose Shelter', 750, 525, NULL);
INSERT INTO Shelter VALUES ('S166', 'Rangpur Govt. High School & Cyclone Shelter', 670, 468, NULL);
INSERT INTO Shelter VALUES ('S167', 'Rangpur Govt. Primary School Shelter', 720, 503, NULL);
INSERT INTO Shelter VALUES ('S168', 'Rangpur Community Centre Multipurpose Shelter', 770, 539, NULL);
INSERT INTO Shelter VALUES ('S169', 'Satkhira Govt. High School & Cyclone Shelter', 690, 482, NULL);
INSERT INTO Shelter VALUES ('S170', 'Satkhira Govt. Primary School Shelter', 740, 518, NULL);
INSERT INTO Shelter VALUES ('S171', 'Satkhira Community Centre Multipurpose Shelter', 790, 553, NULL);
INSERT INTO Shelter VALUES ('S172', 'Shariatpur Govt. High School & Cyclone Shelter', 710, 496, NULL);
INSERT INTO Shelter VALUES ('S173', 'Shariatpur Govt. Primary School Shelter', 760, 532, NULL);
INSERT INTO Shelter VALUES ('S174', 'Shariatpur Community Centre Multipurpose Shelter', 810, 567, NULL);
INSERT INTO Shelter VALUES ('S175', 'Sherpur Govt. High School & Cyclone Shelter', 730, 510, NULL);
INSERT INTO Shelter VALUES ('S176', 'Sherpur Govt. Primary School Shelter', 780, 546, NULL);
INSERT INTO Shelter VALUES ('S177', 'Sherpur Community Centre Multipurpose Shelter', 830, 581, NULL);
INSERT INTO Shelter VALUES ('S178', 'Sirajganj Govt. High School & Cyclone Shelter', 650, 454, NULL);
INSERT INTO Shelter VALUES ('S179', 'Sirajganj Govt. Primary School Shelter', 700, 489, NULL);
INSERT INTO Shelter VALUES ('S180', 'Sirajganj Community Centre Multipurpose Shelter', 750, 525, NULL);
INSERT INTO Shelter VALUES ('S181', 'Sunamganj Govt. High School & Cyclone Shelter', 670, 468, NULL);
INSERT INTO Shelter VALUES ('S182', 'Sunamganj Govt. Primary School Shelter', 720, 503, NULL);
INSERT INTO Shelter VALUES ('S183', 'Sunamganj Community Centre Multipurpose Shelter', 770, 539, NULL);
INSERT INTO Shelter VALUES ('S184', 'Sylhet Govt. High School & Cyclone Shelter', 690, 482, NULL);
INSERT INTO Shelter VALUES ('S185', 'Sylhet Govt. Primary School Shelter', 740, 518, NULL);
INSERT INTO Shelter VALUES ('S186', 'Sylhet Community Centre Multipurpose Shelter', 790, 553, NULL);
INSERT INTO Shelter VALUES ('S187', 'Tangail Govt. High School & Cyclone Shelter', 710, 496, NULL);
INSERT INTO Shelter VALUES ('S188', 'Tangail Govt. Primary School Shelter', 760, 532, NULL);
INSERT INTO Shelter VALUES ('S189', 'Tangail Community Centre Multipurpose Shelter', 810, 567, NULL);
INSERT INTO Shelter VALUES ('S190', 'Thakurgaon Govt. High School & Cyclone Shelter', 730, 510, NULL);
INSERT INTO Shelter VALUES ('S191', 'Thakurgaon Govt. Primary School Shelter', 780, 546, NULL);
INSERT INTO Shelter VALUES ('S192', 'Thakurgaon Community Centre Multipurpose Shelter', 830, 581, NULL);

-- Shelter in Area Inserts
INSERT INTO shelter_in_area VALUES ('L001', 'S001', 'A001');
INSERT INTO shelter_in_area VALUES ('L002', 'S002', 'A001');
INSERT INTO shelter_in_area VALUES ('L003', 'S003', 'A001');
INSERT INTO shelter_in_area VALUES ('L004', 'S004', 'A002');
INSERT INTO shelter_in_area VALUES ('L005', 'S005', 'A002');
INSERT INTO shelter_in_area VALUES ('L006', 'S006', 'A002');
INSERT INTO shelter_in_area VALUES ('L007', 'S007', 'A003');
INSERT INTO shelter_in_area VALUES ('L008', 'S008', 'A003');
INSERT INTO shelter_in_area VALUES ('L009', 'S009', 'A003');
INSERT INTO shelter_in_area VALUES ('L010', 'S010', 'A004');
INSERT INTO shelter_in_area VALUES ('L011', 'S011', 'A004');
INSERT INTO shelter_in_area VALUES ('L012', 'S012', 'A004');
INSERT INTO shelter_in_area VALUES ('L013', 'S013', 'A005');
INSERT INTO shelter_in_area VALUES ('L014', 'S014', 'A005');
INSERT INTO shelter_in_area VALUES ('L015', 'S015', 'A005');
INSERT INTO shelter_in_area VALUES ('L016', 'S016', 'A006');
INSERT INTO shelter_in_area VALUES ('L017', 'S017', 'A006');
INSERT INTO shelter_in_area VALUES ('L018', 'S018', 'A006');
INSERT INTO shelter_in_area VALUES ('L019', 'S019', 'A007');
INSERT INTO shelter_in_area VALUES ('L020', 'S020', 'A007');
INSERT INTO shelter_in_area VALUES ('L021', 'S021', 'A007');
INSERT INTO shelter_in_area VALUES ('L022', 'S022', 'A008');
INSERT INTO shelter_in_area VALUES ('L023', 'S023', 'A008');
INSERT INTO shelter_in_area VALUES ('L024', 'S024', 'A008');
INSERT INTO shelter_in_area VALUES ('L025', 'S025', 'A009');
INSERT INTO shelter_in_area VALUES ('L026', 'S026', 'A009');
INSERT INTO shelter_in_area VALUES ('L027', 'S027', 'A009');
INSERT INTO shelter_in_area VALUES ('L028', 'S028', 'A010');
INSERT INTO shelter_in_area VALUES ('L029', 'S029', 'A010');
INSERT INTO shelter_in_area VALUES ('L030', 'S030', 'A010');
INSERT INTO shelter_in_area VALUES ('L031', 'S031', 'A011');
INSERT INTO shelter_in_area VALUES ('L032', 'S032', 'A011');
INSERT INTO shelter_in_area VALUES ('L033', 'S033', 'A011');
INSERT INTO shelter_in_area VALUES ('L034', 'S034', 'A012');
INSERT INTO shelter_in_area VALUES ('L035', 'S035', 'A012');
INSERT INTO shelter_in_area VALUES ('L036', 'S036', 'A012');
INSERT INTO shelter_in_area VALUES ('L037', 'S037', 'A013');
INSERT INTO shelter_in_area VALUES ('L038', 'S038', 'A013');
INSERT INTO shelter_in_area VALUES ('L039', 'S039', 'A013');
INSERT INTO shelter_in_area VALUES ('L040', 'S040', 'A014');
INSERT INTO shelter_in_area VALUES ('L041', 'S041', 'A014');
INSERT INTO shelter_in_area VALUES ('L042', 'S042', 'A014');
INSERT INTO shelter_in_area VALUES ('L043', 'S043', 'A015');
INSERT INTO shelter_in_area VALUES ('L044', 'S044', 'A015');
INSERT INTO shelter_in_area VALUES ('L045', 'S045', 'A015');
INSERT INTO shelter_in_area VALUES ('L046', 'S046', 'A016');
INSERT INTO shelter_in_area VALUES ('L047', 'S047', 'A016');
INSERT INTO shelter_in_area VALUES ('L048', 'S048', 'A016');
INSERT INTO shelter_in_area VALUES ('L049', 'S049', 'A017');
INSERT INTO shelter_in_area VALUES ('L050', 'S050', 'A017');
INSERT INTO shelter_in_area VALUES ('L051', 'S051', 'A017');
INSERT INTO shelter_in_area VALUES ('L052', 'S052', 'A018');
INSERT INTO shelter_in_area VALUES ('L053', 'S053', 'A018');
INSERT INTO shelter_in_area VALUES ('L054', 'S054', 'A018');
INSERT INTO shelter_in_area VALUES ('L055', 'S055', 'A019');
INSERT INTO shelter_in_area VALUES ('L056', 'S056', 'A019');
INSERT INTO shelter_in_area VALUES ('L057', 'S057', 'A019');
INSERT INTO shelter_in_area VALUES ('L058', 'S058', 'A020');
INSERT INTO shelter_in_area VALUES ('L059', 'S059', 'A020');
INSERT INTO shelter_in_area VALUES ('L060', 'S060', 'A020');
INSERT INTO shelter_in_area VALUES ('L061', 'S061', 'A021');
INSERT INTO shelter_in_area VALUES ('L062', 'S062', 'A021');
INSERT INTO shelter_in_area VALUES ('L063', 'S063', 'A021');
INSERT INTO shelter_in_area VALUES ('L064', 'S064', 'A022');
INSERT INTO shelter_in_area VALUES ('L065', 'S065', 'A022');
INSERT INTO shelter_in_area VALUES ('L066', 'S066', 'A022');
INSERT INTO shelter_in_area VALUES ('L067', 'S067', 'A023');
INSERT INTO shelter_in_area VALUES ('L068', 'S068', 'A023');
INSERT INTO shelter_in_area VALUES ('L069', 'S069', 'A023');
INSERT INTO shelter_in_area VALUES ('L070', 'S070', 'A024');
INSERT INTO shelter_in_area VALUES ('L071', 'S071', 'A024');
INSERT INTO shelter_in_area VALUES ('L072', 'S072', 'A024');
INSERT INTO shelter_in_area VALUES ('L073', 'S073', 'A025');
INSERT INTO shelter_in_area VALUES ('L074', 'S074', 'A025');
INSERT INTO shelter_in_area VALUES ('L075', 'S075', 'A025');
INSERT INTO shelter_in_area VALUES ('L076', 'S076', 'A026');
INSERT INTO shelter_in_area VALUES ('L077', 'S077', 'A026');
INSERT INTO shelter_in_area VALUES ('L078', 'S078', 'A026');
INSERT INTO shelter_in_area VALUES ('L079', 'S079', 'A027');
INSERT INTO shelter_in_area VALUES ('L080', 'S080', 'A027');
INSERT INTO shelter_in_area VALUES ('L081', 'S081', 'A027');
INSERT INTO shelter_in_area VALUES ('L082', 'S082', 'A028');
INSERT INTO shelter_in_area VALUES ('L083', 'S083', 'A028');
INSERT INTO shelter_in_area VALUES ('L084', 'S084', 'A028');
INSERT INTO shelter_in_area VALUES ('L085', 'S085', 'A029');
INSERT INTO shelter_in_area VALUES ('L086', 'S086', 'A029');
INSERT INTO shelter_in_area VALUES ('L087', 'S087', 'A029');
INSERT INTO shelter_in_area VALUES ('L088', 'S088', 'A030');
INSERT INTO shelter_in_area VALUES ('L089', 'S089', 'A030');
INSERT INTO shelter_in_area VALUES ('L090', 'S090', 'A030');
INSERT INTO shelter_in_area VALUES ('L091', 'S091', 'A031');
INSERT INTO shelter_in_area VALUES ('L092', 'S092', 'A031');
INSERT INTO shelter_in_area VALUES ('L093', 'S093', 'A031');
INSERT INTO shelter_in_area VALUES ('L094', 'S094', 'A032');
INSERT INTO shelter_in_area VALUES ('L095', 'S095', 'A032');
INSERT INTO shelter_in_area VALUES ('L096', 'S096', 'A032');
INSERT INTO shelter_in_area VALUES ('L097', 'S097', 'A033');
INSERT INTO shelter_in_area VALUES ('L098', 'S098', 'A033');
INSERT INTO shelter_in_area VALUES ('L099', 'S099', 'A033');
INSERT INTO shelter_in_area VALUES ('L100', 'S100', 'A034');
INSERT INTO shelter_in_area VALUES ('L101', 'S101', 'A034');
INSERT INTO shelter_in_area VALUES ('L102', 'S102', 'A034');
INSERT INTO shelter_in_area VALUES ('L103', 'S103', 'A035');
INSERT INTO shelter_in_area VALUES ('L104', 'S104', 'A035');
INSERT INTO shelter_in_area VALUES ('L105', 'S105', 'A035');
INSERT INTO shelter_in_area VALUES ('L106', 'S106', 'A036');
INSERT INTO shelter_in_area VALUES ('L107', 'S107', 'A036');
INSERT INTO shelter_in_area VALUES ('L108', 'S108', 'A036');
INSERT INTO shelter_in_area VALUES ('L109', 'S109', 'A037');
INSERT INTO shelter_in_area VALUES ('L110', 'S110', 'A037');
INSERT INTO shelter_in_area VALUES ('L111', 'S111', 'A037');
INSERT INTO shelter_in_area VALUES ('L112', 'S112', 'A038');
INSERT INTO shelter_in_area VALUES ('L113', 'S113', 'A038');
INSERT INTO shelter_in_area VALUES ('L114', 'S114', 'A038');
INSERT INTO shelter_in_area VALUES ('L115', 'S115', 'A039');
INSERT INTO shelter_in_area VALUES ('L116', 'S116', 'A039');
INSERT INTO shelter_in_area VALUES ('L117', 'S117', 'A039');
INSERT INTO shelter_in_area VALUES ('L118', 'S118', 'A040');
INSERT INTO shelter_in_area VALUES ('L119', 'S119', 'A040');
INSERT INTO shelter_in_area VALUES ('L120', 'S120', 'A040');
INSERT INTO shelter_in_area VALUES ('L121', 'S121', 'A041');
INSERT INTO shelter_in_area VALUES ('L122', 'S122', 'A041');
INSERT INTO shelter_in_area VALUES ('L123', 'S123', 'A041');
INSERT INTO shelter_in_area VALUES ('L124', 'S124', 'A042');
INSERT INTO shelter_in_area VALUES ('L125', 'S125', 'A042');
INSERT INTO shelter_in_area VALUES ('L126', 'S126', 'A042');
INSERT INTO shelter_in_area VALUES ('L127', 'S127', 'A043');
INSERT INTO shelter_in_area VALUES ('L128', 'S128', 'A043');
INSERT INTO shelter_in_area VALUES ('L129', 'S129', 'A043');
INSERT INTO shelter_in_area VALUES ('L130', 'S130', 'A044');
INSERT INTO shelter_in_area VALUES ('L131', 'S131', 'A044');
INSERT INTO shelter_in_area VALUES ('L132', 'S132', 'A044');
INSERT INTO shelter_in_area VALUES ('L133', 'S133', 'A045');
INSERT INTO shelter_in_area VALUES ('L134', 'S134', 'A045');
INSERT INTO shelter_in_area VALUES ('L135', 'S135', 'A045');
INSERT INTO shelter_in_area VALUES ('L136', 'S136', 'A046');
INSERT INTO shelter_in_area VALUES ('L137', 'S137', 'A046');
INSERT INTO shelter_in_area VALUES ('L138', 'S138', 'A046');
INSERT INTO shelter_in_area VALUES ('L139', 'S139', 'A047');
INSERT INTO shelter_in_area VALUES ('L140', 'S140', 'A047');
INSERT INTO shelter_in_area VALUES ('L141', 'S141', 'A047');
INSERT INTO shelter_in_area VALUES ('L142', 'S142', 'A048');
INSERT INTO shelter_in_area VALUES ('L143', 'S143', 'A048');
INSERT INTO shelter_in_area VALUES ('L144', 'S144', 'A048');
INSERT INTO shelter_in_area VALUES ('L145', 'S145', 'A049');
INSERT INTO shelter_in_area VALUES ('L146', 'S146', 'A049');
INSERT INTO shelter_in_area VALUES ('L147', 'S147', 'A049');
INSERT INTO shelter_in_area VALUES ('L148', 'S148', 'A050');
INSERT INTO shelter_in_area VALUES ('L149', 'S149', 'A050');
INSERT INTO shelter_in_area VALUES ('L150', 'S150', 'A050');
INSERT INTO shelter_in_area VALUES ('L151', 'S151', 'A051');
INSERT INTO shelter_in_area VALUES ('L152', 'S152', 'A051');
INSERT INTO shelter_in_area VALUES ('L153', 'S153', 'A051');
INSERT INTO shelter_in_area VALUES ('L154', 'S154', 'A052');
INSERT INTO shelter_in_area VALUES ('L155', 'S155', 'A052');
INSERT INTO shelter_in_area VALUES ('L156', 'S156', 'A052');
INSERT INTO shelter_in_area VALUES ('L157', 'S157', 'A053');
INSERT INTO shelter_in_area VALUES ('L158', 'S158', 'A053');
INSERT INTO shelter_in_area VALUES ('L159', 'S159', 'A053');
INSERT INTO shelter_in_area VALUES ('L160', 'S160', 'A054');
INSERT INTO shelter_in_area VALUES ('L161', 'S161', 'A054');
INSERT INTO shelter_in_area VALUES ('L162', 'S162', 'A054');
INSERT INTO shelter_in_area VALUES ('L163', 'S163', 'A055');
INSERT INTO shelter_in_area VALUES ('L164', 'S164', 'A055');
INSERT INTO shelter_in_area VALUES ('L165', 'S165', 'A055');
INSERT INTO shelter_in_area VALUES ('L166', 'S166', 'A056');
INSERT INTO shelter_in_area VALUES ('L167', 'S167', 'A056');
INSERT INTO shelter_in_area VALUES ('L168', 'S168', 'A056');
INSERT INTO shelter_in_area VALUES ('L169', 'S169', 'A057');
INSERT INTO shelter_in_area VALUES ('L170', 'S170', 'A057');
INSERT INTO shelter_in_area VALUES ('L171', 'S171', 'A057');
INSERT INTO shelter_in_area VALUES ('L172', 'S172', 'A058');
INSERT INTO shelter_in_area VALUES ('L173', 'S173', 'A058');
INSERT INTO shelter_in_area VALUES ('L174', 'S174', 'A058');
INSERT INTO shelter_in_area VALUES ('L175', 'S175', 'A059');
INSERT INTO shelter_in_area VALUES ('L176', 'S176', 'A059');
INSERT INTO shelter_in_area VALUES ('L177', 'S177', 'A059');
INSERT INTO shelter_in_area VALUES ('L178', 'S178', 'A060');
INSERT INTO shelter_in_area VALUES ('L179', 'S179', 'A060');
INSERT INTO shelter_in_area VALUES ('L180', 'S180', 'A060');
INSERT INTO shelter_in_area VALUES ('L181', 'S181', 'A061');
INSERT INTO shelter_in_area VALUES ('L182', 'S182', 'A061');
INSERT INTO shelter_in_area VALUES ('L183', 'S183', 'A061');
INSERT INTO shelter_in_area VALUES ('L184', 'S184', 'A062');
INSERT INTO shelter_in_area VALUES ('L185', 'S185', 'A062');
INSERT INTO shelter_in_area VALUES ('L186', 'S186', 'A062');
INSERT INTO shelter_in_area VALUES ('L187', 'S187', 'A063');
INSERT INTO shelter_in_area VALUES ('L188', 'S188', 'A063');
INSERT INTO shelter_in_area VALUES ('L189', 'S189', 'A063');
INSERT INTO shelter_in_area VALUES ('L190', 'S190', 'A064');
INSERT INTO shelter_in_area VALUES ('L191', 'S191', 'A064');
INSERT INTO shelter_in_area VALUES ('L192', 'S192', 'A064');


insert into Donor
values
('D001' , 'Yeaser Ahmad' ,  01731176916),
('D002' , 'Than Than Thay'  ,  01739812758),
('D003' , 'Nurul Amin Pasha' ,01914128874),
('D004', 'Shahidul Islam',  01752123456),
('D005', 'Farhana Akter',   01833445566),
('D006', 'Mahbub Rahman',   01999887766);


INSERT INTO Volunteer (Volunteer_id, Volunteer_name, Volunteer_gender, Volunteer_age, Volunteer_Image)
VALUES
  ('V001' , 'Karim' , 'Male'  , 20, NULL),
  ('V002' , 'Kuddus Khan Pathan' , 'Male' , 70, NULL),
  ('V003' , 'Pinky Akhter' , DEFAULT  , 35, NULL),
  ('V004', 'Ali Hassan', 'Male', 25, NULL),
  ('V005', 'Ayesha Siddique', 'Female', 30, NULL),
  ('V006', 'Rahim Uddin', DEFAULT, 19, NULL),
  ('V007', 'Fatima Noor', 'Female', 27, NULL),
  ('V008', 'Imran Chowdhury', 'Male', 22, NULL),
  ('V009', 'Nasima Begum', DEFAULT, 33, NULL);



insert into  Goods 
values
  ('G001', 'Rice',        'Food'),
  ('G002', 'Paracetamol', 'Medicine'),
  ('G003', 'Jacket',      'Clothes'),
  ('G021', 'Amoxicillin','Medicine'),
  ('G103', 'Ibuprofen',   'Medicine'),
  ('G512', 'Cetirizine',  'Medicine'),
  ('G801', 'Wheat Flour','Food'),
  ('G053', 'Pulses Mix', 'Food'),
  ('G562', 'Cooking Oil','Food'),
  ('G423', 'Sugar',      'Food'),
  ('G852', 'Cornflakes', 'Food');


insert into Food
values
('G001' , 4),
('G002' , 2),
('G003' , 1);


insert into Medicine
values
('G021' , 9),
('G103' , 2),
('G512' , 7);


insert into Clothes
values
('G801' , 15),
('G053' , 25),
('G562' , 12);


insert into Others
values
('G423' , 42),
('G423' , 212),
('G852' , 56);


insert into Rescue_team
values
('M001' , 'V001' , 'Drowning' , 'Done'),
('M002' , 'V002' , 'Illness' , 'Ongoing'),
('M003' , 'V003' , 'Pregnancy' , 'Done');


insert into Reconstruction_team
values
('P001', 'House Construction', 'V004', 50000),
('P002', 'Bridge Repair',      'V003', 175000),
('P003', 'Road Repair',        'V005', 30000);


insert into Donation
values
('DO001'  , 'D001' , 'Food'  , 4),
('DO002'  , 'D003' , 'Medicine'  , 6),
('DO003'  , 'D002' , 'Clothes'  , 100);




insert into Donation_Distribution
values
('DI001' , 'DO002' , 'E001' , 'L001' , 'G001'),
('DI002' , 'DO001' , 'E002' , 'L001' , 'G003'),
('DI003' , 'DO003' , 'E003' , 'L002' , 'G003');


insert into Volunteer_Assigned_Distribution
values
('VO001' , 'V001',  'DI001'),
('VO002' , 'V002',  'DI002'),
('VO003' , 'V001',  'DI003');


insert into Rescue_Location
values
('RE001' , 'A001',  'M001'),
('RE002' , 'A002',  'M002'),
('RE003' , 'A001',  'M003');


insert into Reconstruction_Location
values
('RC001' , 'A001',  'P001'),
('RC002' , 'A002',  'P002'),
('RC003' , 'A001',  'P003');
