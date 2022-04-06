# Design Document

1. Basic System Design
2. Server Details
3. Database Schema
4. API
    1. Health Check
    2. Create
    3. Read
    4. Update
    5. Delete

## Basic System Design

Based on the given problem following is the basic system design consisting of a UI, Server and Database.

![Untitled Diagram.drawio (1).png](/images/image_1.png)

- The user will connect with the system using the frontend client.
- The client will interpret user actions and accordingly send requests to the server
- server will take requests and send the response back to the client after processing the data from the database.

## Server Details

Express framework for node.js was used for the construction of the server.

Winston logger was used for logging.

Express-validator package was used for the validation of the user request to keep a check on the datatypes passed on from the UI/Client.

Following is the snippet of valid request - response

```json
Request
{
    "eventName": "event x",
    "eventStartTime": "x1649233001267",
    "eventDuration": 1200000
}

Response
{
    "statusCode": 0,
    "data": []
}
```

Following is the snippet of invalid request - response

```json
Request
{
    "eventName": "event x",
    "eventStartTime": "x1649233001267",
    "eventDuration": 1200000
}

Response
{
    "statusCode": 1,
    "error": [
        {
            "value": "x1649233001267",
            "msg": "eventStartTime is wrong",
            "param": "eventStartTime",
            "location": "body"
        }
    ]
}
```

## Database schema

Based on the requirement following is the database schema.

| Column | Description |
| --- | --- |
| id | primary_key, auto_increment |
| event_name | text |
| start_time | bigInt |
| duration | bigInt |
- **id** will be the primary key to identify an event uniquely
- **event_name** will hold the event name as string
- **start_time** will hold the current date as number of milliseconds elapsed since January 1, 1970 UTC, we are using this format as this will avoid any kind of confusion related to time.
- **duration** will hold the duration of the events in number of milliseconds, we are choosing the duration in milliseconds so that if required we can directly perform mathematical operations on start_time if required.

## API

### a) Health Check

This api is just to check if the server is up or not.

End Point

```json
GET http://localhost:3030/healthCheck
```

Request

```json
// get request hence no body required
```

Response

```json
"lub  dub"
```

### b) Create

Following is the expected request and response for creating or adding entries in the database

End Point

```json
POST http://localhost:3030/events/add
```

Request

```json
{
    "eventName": "event x",
    "eventStartTime": 1649233001267,
    "eventDuration": 1200000
}
```

<aside>
💡 **eventStartTime** should be number of milliseconds elapsed since January 1, 1970 UTC.
**eventDuration** should be a duration of the events in number of milliseconds.

</aside>

Response

```json
{
    "statusCode": 0,
    "data": []
}
```

### c) Read

Following is the expected request and response for reading all the entries in the database

<aside>
💡 According to the problem given we are also required to classify the events into two categories UPCOMING and LIVE,  We do not store these details in the database rather we calculate this on the fly and return it to the user.

</aside>

<aside>
💡 We are using the following query to calculate if the event is upcoming or live

**select *,(${currentTime} between events.start_time- 600000 and events.start_time + events.duration) as isLive from events;**

If isLive is true then the event is live else it is upcoming.

</aside>

End Point

```json
GET http://localhost:3030/events
```

Request

```json
// get request hence no body required
```

Response

```json
{
    "statusCode": 0,
    "data": [
        {
            "id": 1,
            "event_name": "event_1",
            "start_time": "1649233001267",
            "duration": "1800000",
            "islive": false
        },
        {
            "id": 2,
            "event_name": "event_2",
            "start_time": "1649233001267",
            "duration": "1200000",
            "islive": false
        }
    ]
}
```

Following is the expected request and response for reading entry based on eventId in the database

End Point

```json
GET http://localhost:3030/events/1
```

Request

```json
// get request hence no body required
```

Response

```json
{
    "statusCode": 0,
    "data": [
        {
            "id": 1,
            "event_name": "event_1",
            "start_time": "1649233001267",
            "duration": "1800000",
            "islive": false
        }
    ]
}
```

Since the above read do not differentiate between already completed events and future events I have added another endpoint which take completed events also into consideration and returns if  the event is live or upcoming.

<aside>
💡 We are using the following query to calculate if the event is upcoming or live

**select *,(${currentTime} between events.start_time - 600000 and events.start_time + events.duration) as isLive, (${currentTime} < events.start_time - 600000) as isUpcoming from events;**

If isLive is true then the event is live else it is upcoming.

</aside>

End Point

```json
GET http://localhost:3030/eventsAll
```

Request

```json
// get request hence no body required
```

Response

```json
{
    "statusCode": 0,
    "data": [
        {
            "id": 1,
            "event_name": "event_1",
            "start_time": "1649233001267",
            "duration": "1800000",
            "islive": false,
						"isUpcoming": false
        },
        {
            "id": 2,
            "event_name": "event_2",
            "start_time": "1649233005267",
            "duration": "1200000",
            "islive": false,
						"isUpcoming": true
        }
    ]
}
```

Following is the expected request and response for reading entry based on eventId in the database

End Point

```json
GET http://localhost:3030/eventsAll/1
```

Request

```json
// get request hence no body required
```

Response

```json
{
    "statusCode": 0,
    "data": [
        {
            "id": 1,
            "event_name": "event_1",
            "start_time": "1649233001267",
            "duration": "1800000",
            "islive": false,
						"isUpcoming": false
        }
    ]
}
```

### d) Update

Following is the expected request and response for updating entries in the database.

End Point

```json
PUT http://localhost:3030/events/update
```

Request

```json
{
    "eventId": 1, 
    "eventName": "event 2",
    "eventStartTime": 1649233001267,
    "eventDuration": 1200000
}
```

<aside>
💡 **eventStartTime** should be number of milliseconds elapsed since January 1, 1970 UTC.
**eventDuration** should be a duration of the events in number of milliseconds.

</aside>

Response

```json
{
    "statusCode": 0,
    "data": []
}
```

### e) Delete

Following is the expected request and response for deleting entries in the database

End Point

```json
DELETE http://localhost:3030/events/delete
```

Request

```json
{
    "eventId":9
}
```

Response

```json
{
    "statusCode": 0,
    "data": []
}
```