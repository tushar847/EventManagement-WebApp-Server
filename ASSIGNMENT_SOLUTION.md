# Assignment Solutions

### Solution For Question No 1

Based on the given data no of SMS sent in an hour is 5000.

There can be multiple reasons behind this. I have listed the ones I could identify and their respective solutions below.

1. **UI Related Issues**

    - Due to side effects, It is possible that the api call to send the OTP has not been
    hooked up with useEffect hook properly because of which there is an infinite loop
    formed because of which the user is bombarded with tons of OTPs.
    
    <aside>
    💡        Fix - Enable logs to identify the point of the issue, Moving the side effect inside
           the useEffect hook and testing thoroughly.
    
    </aside>
    
    - Consider a system where we maintain a state based on which we send the request to the server to send OTP, if we fail to maintain the state properly then the user can make multiple requests.
    Ex -  Consider the system where we allow resending of the OTP based on a state
    If that state is not maintained properly the user may request for multiple OTPs.
        
        In other words we are enabling or disabling the resend otp button based on a
        state but that maintenance of the state is not proper then there may be
        scenarios where the user may request multiple OTPs.
        
    
    <aside>
    💡 Fix - Enable logs to identify the point of the issue, Identifying scenarios where
    updation of the state is failing and then writing logic for handling those cases.
    
    </aside>
    
2. **Server Related Issues.**

    - Consider a system where the server doesn’t maintain any state to check the if the
    OTP has been sent before and cooldown timer has expired , then the server will send
    req to a third party server for sending OTP every time it receives a request from UI.
    So in the case of 1.2 users can request multiple OTPs.
    
    <aside>
    💡 Fix - Enable logs to identify the point of the issue, Maintain a logic in our server
    to check the if OTP sent and if we can request for another one ( cooldown timer
    expired), so that even if there is a bug in the UI we may be able to save the no of
    requests.
    
    </aside>
    
    - There can be some issue in the logic for sending the request to a third party server.
    
    <aside>
    💡 Fix - We can go through the logs to check the issue and writing logic for
    handling those cases.
    
    </aside>
    
3. **Third Party Server Issues.**
    - The third party server is slow and unable to handle multiple requests as desired
    - The OTPs sent are not received by the user because the third party network is slow or unavailable to deliver the OTPs in the desired time.
    
    <aside>
    💡 Fix - We should ask for logs to analyze and identify the point issue.
    we should look for better third party sms service providers who are tied up with a better network and charge money only on the number of validation not on the no of sms sent eg Twilio.
    
    </aside>
    

### Solution For Question no 2

Following is the simple algorithm which can be used to perform the operation

1. Find all associated words.
    
    We have to find all the associated words related to the specific movie/series for
    example in our case the movie is spiderman therefore “SpiderMan”, “Spider-Man”,
    “Tom Holland”, “Spoiler”, ”Andrew Garfield”, “Tobe Maguire” etc.
    
2. Match Text
    
    Run a regular expression based matching for all the elements in the DOM containing
    any text.
    
3. Alter Display Properties
    
    If the content of any element matches then we try to trace back its ancestor element
    and make changes to its display properties.
    For eg. in the given picture  red component’s parent responsible for rendering the video is the blue div  with id = ‘dismissible’ we can trace back to this element and then set the display property to none. 
    
    ![Marked.png](/images/image_2.png)
    
    after doing the same the view changes, the video is gone which can be seen below.
    
    ![Screenshot (27).png](/images/image_3.png)