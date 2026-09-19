The lab is divided into three phases:

1. User Discovery

    In this phase you will have to discover a valid user registered to the web server in order to start the recover password procedure using that account.
    
2. Header Injection
    
    You will intercept and edit the recover password request in order to inject the attacker URL; doing so will allow you to send a poisonous email to the victim and if the victim will click on the reset password link you will obtain the unique token identifying the user to reset the password.
    
3. Password Reset
    
    With token you get from the previous step you will be able to change the password of the victim account and gain access to it.
    

If you want to try to solve the lab by yourself there you got some useful informations:

- You can open a virtual browser on the attacker container by reaching [`http://localhost:3000`](http://localhost:3000)
- You can open a shell on the attacker container
- The web server is available at [`http://webserver`](`http://webserver`) and is only accessible within the intranet, you can use the attacker browser to reach it
- The victim mail client is available at [`http://victim_mail`](http://victim_mail) and is only accessible within the intranet, you can use the attacker browser to reach it