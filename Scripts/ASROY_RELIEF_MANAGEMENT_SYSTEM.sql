create  table Area (
Area_id varchar(4) primary key,
Area_name varchar(20) not null
);

create table Event (
Event_id varchar(4) primary key,
Event_name  ENUM ('Flood' , 'Cyclone'),
Date_of_occurrence date,
Time_of_occurrence time
);

create table Donation(
Donation_id varchar(5) primary key,
Donor_donation_id varchar(4),
Donation_item ENUM('Food' , 'Medicine' , 'Clothes'  , 'Others'),
Amount Numeric,
CONSTRAINT dd_id_f_k
FOREIGN KEY(Donor_donation_id)
REFERENCES Donor(Donor_id) on delete cascade on update cascade
);


create table Donation_Distribution(
Distribution_id varchar(5) primary key,
Donation_distributed_id varchar(5),
Event_distributed_id varchar(4),
Location_distributed_id varchar(4),
Goods_distributed_id varchar(4),
CONSTRAINT d_d_id_f_k
FOREIGN KEY(Donation_distributed_id)
REFERENCES Donation(Donation_id) on delete cascade on update cascade ,

CONSTRAINT e_d_id_f_k
FOREIGN KEY(Event_distributed_id)
REFERENCES Event(Event_id) on delete cascade on update cascade,

CONSTRAINT l_d_id_f_k
FOREIGN KEY(Location_distributed_id)
REFERENCES shelter_in_area(Location_id) on delete cascade on update cascade,

CONSTRAINT g_d_id_f_k
FOREIGN KEY(Goods_distributed_id)
REFERENCES Goods(Goods_id) on delete cascade on update cascade
);


create table shelter_in_area(
Location_id varchar(4) primary key,
shelter_id varchar(4),
area_id varchar(4),
CONSTRAINT sid_f_k
FOREIGN KEY(shelter_id)
REFERENCES Shelter(Shelter_id) on delete cascade on update cascade ,
CONSTRAINT aid_f_k
FOREIGN KEY(area_id)
REFERENCES Area(Area_id) on delete cascade on update cascade
);

create table Shelter(
Shelter_id varchar(4) primary key,
Shelter_name varchar(50) not null
);

create table Donor(
Donor_id varchar(4) primary key,
Donor_name varchar(20) not null,
Contact_number Numeric not null
);

CREATE TABLE Volunteer (
    Volunteer_id VARCHAR(4) PRIMARY KEY,
    Volunteer_name VARCHAR(50) NOT NULL,
    Volunteer_gender ENUM('Male', 'Female' ,'Better not to mention') DEFAULT 'Better not to mention',
    Volunteer_age NUMERIC not null check (Volunteer_age >15)
);

create table Rescue_Team (
Mission_id varchar(4) primary key,
Volunteer_rescue_id  varchar(4) ,
Situation varchar(20) not null,
Rescue_status ENUM('Done' , 'Ongoing' ,'Yet to start'),
CONSTRAINT rescue_vid_f_k
FOREIGN KEY(Volunteer_rescue_id)
REFERENCES Volunteer(Volunteer_id) on delete cascade on update cascade
);

create table Reconstruction_Team (
Project_id varchar(4) primary key,
Project_name varchar(50) not null,
Volunteer_reconstruction_id  varchar(4) ,
Fund Numeric,
CONSTRAINT reconstr_vid_f_k
FOREIGN KEY(Volunteer_reconstruction_id)
REFERENCES Volunteer(Volunteer_id) on delete cascade on update cascade
);

create table Goods(
Goods_id varchar(4) primary key,
Goods_name varchar(20) not null,
Goods_type  ENUM('Food' , 'Medicine' , 'Clothes'  , 'Others')
);

create table Food (
  Goods_Food VARCHAR(4) NOT NULL,
  Stock      NUMERIC check(Stock>=0),
  CONSTRAINT g_f_k
    FOREIGN KEY (Goods_Food)
    REFERENCES Goods (Goods_id) on delete cascade  on update cascade
);

create table Medicine (
  Goods_Food VARCHAR(4) NOT NULL,
  Stock      NUMERIC check(Stock>=0),
  CONSTRAINT m_f_k
    FOREIGN KEY (Goods_Food)
    REFERENCES Goods (Goods_id) on delete cascade  on update cascade
);

create table Clothes (
  Goods_Food VARCHAR(4) NOT NULL,
  Stock      NUMERIC check(Stock>=0),
  CONSTRAINT c_f_k
    FOREIGN KEY (Goods_Food)
    REFERENCES Goods (Goods_id) on delete cascade  on update cascade
);

create table Others (
  Goods_Food VARCHAR(4) NOT NULL,
  Stock      NUMERIC check(Stock>=0),
  CONSTRAINT o_f_k
    FOREIGN KEY (Goods_Food)
    REFERENCES Goods (Goods_id) on delete cascade  on update cascade
);


insert into Area
values
('A001' , 'Tekpara'),
('A002' ,'Baborkhana'),
('A003'  ,  'Ujirpur');


insert into Event
values
('E001', 'Flood',      '2025-03-15', '10:30:00'),
('E002', 'Cyclone',     '2025-05-22', '18:00:00'),
('E003', 'Flood',  '2025-06-05', '12:00:00'),
('E004', 'Flood',      '2025-08-10', '09:00:00'),
('E005', 'Cyclone', '2025-11-02', '15:45:00');


insert into Shelter
values
('S001' , 'Govt Primary School Dhaka'),
('S002' ,'Parallel High School'),
('S003'  ,  'Bera Bhanga High School and College');


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


insert into shelter_in_area
values
('L001'  , 'S001' , 'A001'),
('L002'  , 'S003' , 'A001'),
('L003'  , 'S003' , 'A003');


insert into Donation_Distribution
values
('DI001' , 'DO002' , 'E001' , 'L001' , 'G001'),
('DI002' , 'DO001' , 'E002' , 'L001' , 'G003'),
('DI003' , 'DO003' , 'E003' , 'L002' , 'G003');


