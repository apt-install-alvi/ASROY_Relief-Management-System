create table Area (
Area_id varchar(4) primary key,
Area_name varchar(20) not null
);

CREATE TABLE Event (
  Event_id VARCHAR(4) PRIMARY KEY,
  Event_area_id VARCHAR(4),
  Event_name ENUM('Flood','Cyclone','Landslide','Earthquake','Drought','Fire'),
  Date_of_occurrence DATE,
  Time_of_occurrence TIME,
  Status ENUM('Active','Not Active') DEFAULT 'Active',
  FOREIGN KEY (Event_area_id) REFERENCES Area(Area_id)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);

create table Donor(
Donor_id varchar(4) primary key,
Donor_name varchar(20) not null,
Contact_number Numeric not null
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


create table Shelter(
Shelter_id varchar(4) primary key,
Shelter_name varchar(50) not null
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

create table Goods(
Goods_id varchar(4) primary key,
Goods_name varchar(20) not null,
Goods_type  ENUM('Food' , 'Medicine' , 'Clothes'  , 'Others')
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


CREATE TABLE Volunteer (
    Volunteer_id VARCHAR(4) PRIMARY KEY,
    Volunteer_name VARCHAR(50) NOT NULL,
    Volunteer_gender ENUM('Male', 'Female' ,'Better not to mention') DEFAULT 'Better not to mention',
    Volunteer_age NUMERIC not null check (Volunteer_age >15)
);

create table Volunteer_Assigned_Distribution(
Volunteer_distribution_id varchar(5) primary key,
volunteer_id  varchar(4) ,
distribution_id varchar(5) ,
CONSTRAINT v_id_f_k
FOREIGN KEY(volunteer_id)
REFERENCES Volunteer(Volunteer_id) on delete cascade on update cascade ,
CONSTRAINT di_id_f_k
FOREIGN KEY(distribution_id)
REFERENCES Donation_Distribution(Distribution_id) on delete cascade on update cascade
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

create table Rescue_Location(
Rescue_location_id varchar(5) primary key,
Rescue_area_id varchar(4),
Rescue_mission_id varchar(4),
CONSTRAINT r_a_f_k
FOREIGN KEY(Rescue_area_id)
REFERENCES Area(Area_id) on delete cascade on update cascade ,
CONSTRAINT r_m_f_k
FOREIGN KEY(Rescue_mission_id)
REFERENCES Rescue_Team(Mission_id) on delete cascade on update cascade
);

create table Reconstruction_Location(
Reconstruction_location_id varchar(5) primary key,
Reconstruction_area_id varchar(4),
Reconstruction_project_id varchar(4),
CONSTRAINT re_a_f_k
FOREIGN KEY(Reconstruction_area_id)
REFERENCES Area(Area_id) on delete cascade on update cascade ,
CONSTRAINT re_p_f_k
FOREIGN KEY(Reconstruction_project_id)
REFERENCES Reconstruction_Team(Project_id) on delete cascade on update cascade
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
  Stock NUMERIC check(Stock>=0),
  CONSTRAINT o_f_k
    FOREIGN KEY (Goods_Food)
    REFERENCES Goods (Goods_id) on delete cascade  on update cascade
);


