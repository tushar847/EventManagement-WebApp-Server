create table events (
    id serial primary key,
    event_name text not null,
    start_time bigint not null,
    duration bigint not null
);

insert into events (event_name,start_time,duration) values 
('event_1',1649233001267,1200000),
('event_2',1649233001267,1200000),
('event_3',1649233001267,1200000);