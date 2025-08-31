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


insert into Donor
values
('D001' , 'Yeaser Ahmad' ,  01731176916),
('D002' , 'Than Than Thay'  ,  01739812758),
('D003' , 'Nurul Amin Pasha' ,01914128874),
('D004', 'Shahidul Islam',  01752123456),
('D005', 'Farhana Akter',   01833445566),
('D006', 'Mahbub Rahman',   01999887766);


insert into Volunteer
values
  ('V001' , 'Karim' , 'Male'  , 20),
  ('V002' , 'Kuddus Khan Pathan' , 'Male' , 70),
  ('V003' , 'Pinky Akhter' , default  , 35),
  ('V004', 'Ali Hassan',       'Male',    25),
  ('V005', 'Ayesha Siddique',  'Female',  30),
  ('V006', 'Rahim Uddin',      DEFAULT,   19),
  ('V007', 'Fatima Noor',      'Female',  27),
  ('V008', 'Imran Chowdhury',  'Male',    22),
  ('V009', 'Nasima Begum',     DEFAULT,   33);


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
